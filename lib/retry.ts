/**
 * Retry Logic Utilities
 * Implements exponential backoff retry for external service calls
 */

export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  backoffMultiplier?: number;
  retryableErrors?: string[];
  onRetry?: (attempt: number, error: Error) => void;
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 10000,
  backoffMultiplier: 2,
  retryableErrors: [],
  onRetry: () => {},
};

/**
 * Check if an error is retryable
 */
function isRetryableError(error: Error, retryableErrors: string[]): boolean {
  // Always retry on network/timeout errors
  const networkErrors = [
    "ECONNRESET",
    "ETIMEDOUT",
    "ENOTFOUND",
    "ECONNREFUSED",
    "timeout",
  ];
  if (
    networkErrors.some((e) => error.message.includes(e) || error.name === e)
  ) {
    return true;
  }

  // Retry on specific error messages
  if (retryableErrors.length > 0) {
    return retryableErrors.some((pattern) => error.message.includes(pattern));
  }

  // Default: don't retry
  return false;
}

/**
 * Calculate delay with exponential backoff
 */
function calculateDelay(
  attempt: number,
  initialDelayMs: number,
  maxDelayMs: number,
  backoffMultiplier: number,
): number {
  const delay = initialDelayMs * Math.pow(backoffMultiplier, attempt);
  return Math.min(delay, maxDelayMs);
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Execute a function with retry logic
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const opts = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on last attempt
      if (attempt === opts.maxRetries) {
        break;
      }

      // Check if error is retryable
      if (!isRetryableError(lastError, opts.retryableErrors)) {
        throw lastError;
      }

      // Calculate delay
      const delay = calculateDelay(
        attempt,
        opts.initialDelayMs,
        opts.maxDelayMs,
        opts.backoffMultiplier,
      );

      // Call retry callback
      opts.onRetry(attempt + 1, lastError);

      // Wait before retry
      await sleep(delay);
    }
  }

  // All retries exhausted
  throw lastError || new Error("Retry failed: unknown error");
}

/**
 * Retry with timeout wrapper
 */
export async function withRetryAndTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number,
  options: RetryOptions = {},
): Promise<T> {
  const { withTimeout } = await import("./timeout");

  return withRetry(() => withTimeout(fn(), timeoutMs), options);
}

/**
 * Circuit breaker state
 */
export enum CircuitState {
  CLOSED = "closed", // Normal operation
  OPEN = "open", // Failing, reject requests
  HALF_OPEN = "half_open", // Testing if recovered
}

/**
 * Simple circuit breaker implementation
 */
export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount = 0;
  private lastFailureTime: number = 0;
  private successCount = 0;

  constructor(
    private options: {
      failureThreshold?: number;
      successThreshold?: number;
      timeoutMs?: number;
      resetTimeoutMs?: number;
    } = {},
  ) {
    this.options = {
      failureThreshold: 5,
      successThreshold: 2,
      timeoutMs: 60000,
      resetTimeoutMs: 60000,
      ...options,
    };
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    // Check if circuit should be opened
    if (this.state === CircuitState.CLOSED && this.shouldOpen()) {
      this.state = CircuitState.OPEN;
      this.lastFailureTime = Date.now();
    }

    // Check if circuit should be half-open (testing recovery)
    if (this.state === CircuitState.OPEN && this.shouldHalfOpen()) {
      this.state = CircuitState.HALF_OPEN;
      this.successCount = 0;
    }

    // Reject if circuit is open
    if (this.state === CircuitState.OPEN) {
      throw new Error("Circuit breaker is OPEN - service unavailable");
    }

    // Execute function
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private shouldOpen(): boolean {
    return this.failureCount >= (this.options.failureThreshold || 5);
  }

  private shouldHalfOpen(): boolean {
    const resetTimeout = this.options.resetTimeoutMs || 60000;
    return Date.now() - this.lastFailureTime >= resetTimeout;
  }

  private onSuccess(): void {
    if (this.state === CircuitState.HALF_OPEN) {
      this.successCount++;
      if (this.successCount >= (this.options.successThreshold || 2)) {
        this.state = CircuitState.CLOSED;
        this.failureCount = 0;
      }
    } else {
      this.failureCount = 0;
    }
  }

  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.state === CircuitState.HALF_OPEN) {
      this.state = CircuitState.OPEN;
    }
  }

  getState(): CircuitState {
    return this.state;
  }

  reset(): void {
    this.state = CircuitState.CLOSED;
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = 0;
  }
}
