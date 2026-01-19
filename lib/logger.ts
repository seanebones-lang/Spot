/**
 * Structured Logging Utility
 * Provides consistent logging across the application
 * Sanitizes sensitive data to prevent leakage
 */

type LogLevel = "error" | "warn" | "info" | "debug";

interface LogContext {
  [key: string]: any;
}

/**
 * Sensitive field names that should be redacted from logs
 */
const SENSITIVE_FIELDS = [
  "password",
  "token",
  "secret",
  "key",
  "auth",
  "authorization",
  "ssn",
  "socialSecurity",
  "creditCard",
  "cardNumber",
  "cvv",
  "apiKey",
  "apikey",
  "accessToken",
  "refreshToken",
  "email", // Sometimes we want to redact emails in logs
  "emailVerificationToken",
  "resetToken",
];

/**
 * Sanitize log data to remove sensitive information
 */
function sanitizeLogData(data: any): any {
  if (!data || typeof data !== "object") {
    return data;
  }

  const sanitized = Array.isArray(data) ? [...data] : { ...data };

  for (const key of Object.keys(sanitized)) {
    const keyLower = key.toLowerCase();

    // Check if key contains any sensitive field name
    if (SENSITIVE_FIELDS.some((field) => keyLower.includes(field))) {
      sanitized[key] = "[REDACTED]";
      continue;
    }

    // Recursively sanitize nested objects
    if (typeof sanitized[key] === "object" && sanitized[key] !== null) {
      sanitized[key] = sanitizeLogData(sanitized[key]);
    }
  }

  return sanitized;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext = {
      ...sanitizeLogData(context),
      ...(error instanceof Error
        ? {
            errorMessage: error.message,
            errorStack: error.stack,
            errorName: error.name,
          }
        : { error: String(error) }),
    };

    console.error(
      this.formatMessage("error", message, sanitizeLogData(errorContext)),
    );
  }

  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage("warn", message, sanitizeLogData(context)));
  }

  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.info(
        this.formatMessage("info", message, sanitizeLogData(context)),
      );
    }
  }

  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(
        this.formatMessage("debug", message, sanitizeLogData(context)),
      );
    }
  }

  /**
   * Log API request
   */
  logRequest(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    context?: LogContext,
  ): void {
    const level =
      statusCode >= 500 ? "error" : statusCode >= 400 ? "warn" : "info";
    this[level](`${method} ${path} ${statusCode} ${duration}ms`, {
      method,
      path,
      statusCode,
      duration,
      ...context,
    });
  }
}

export const logger = new Logger();

/**
 * Create request logger with correlation ID
 */
export function createRequestLogger(correlationId: string) {
  return {
    error: (message: string, error?: Error | unknown, context?: LogContext) =>
      logger.error(message, error, { correlationId, ...context }),
    warn: (message: string, context?: LogContext) =>
      logger.warn(message, { correlationId, ...context }),
    info: (message: string, context?: LogContext) =>
      logger.info(message, { correlationId, ...context }),
    debug: (message: string, context?: LogContext) =>
      logger.debug(message, { correlationId, ...context }),
  };
}

/**
 * Generate correlation ID for request tracking
 */
export function generateCorrelationId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
