/**
 * Request Timeout Utilities
 * Prevents hanging requests by enforcing timeouts
 */

/**
 * Create a fetch request with timeout
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 30000 // 30 seconds default
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeoutMs}ms`);
    }
    throw error;
  }
}

/**
 * Default timeout values for different operations
 */
export const TIMEOUTS = {
  DATABASE_QUERY: 5000,      // 5 seconds for DB queries
  EXTERNAL_API: 30000,       // 30 seconds for external APIs
  FILE_UPLOAD: 120000,       // 2 minutes for file uploads
  EMAIL_SEND: 10000,         // 10 seconds for email sending
  DEFAULT: 30000,            // 30 seconds default
};

/**
 * Wrap a promise with timeout
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 30000,
  errorMessage?: string
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(errorMessage || `Operation timeout after ${timeoutMs}ms`)),
        timeoutMs
      )
    ),
  ]);
}
