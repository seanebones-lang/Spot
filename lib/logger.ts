/**
 * Structured Logging Utility
 * Provides consistent logging across the application
 * Sanitizes sensitive data to prevent leakage
 */

<<<<<<< HEAD
type LogLevel = "error" | "warn" | "info" | "debug";
=======
type LogLevel = 'error' | 'warn' | 'info' | 'debug';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface LogContext {
  [key: string]: any;
}

/**
 * Sensitive field names that should be redacted from logs
 */
const SENSITIVE_FIELDS = [
<<<<<<< HEAD
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
=======
  'password',
  'token',
  'secret',
  'key',
  'auth',
  'authorization',
  'ssn',
  'socialSecurity',
  'creditCard',
  'cardNumber',
  'cvv',
  'apiKey',
  'apikey',
  'accessToken',
  'refreshToken',
  'email', // Sometimes we want to redact emails in logs
  'emailVerificationToken',
  'resetToken',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
];

/**
 * Sanitize log data to remove sensitive information
 */
function sanitizeLogData(data: any): any {
<<<<<<< HEAD
  if (!data || typeof data !== "object") {
=======
  if (!data || typeof data !== 'object') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return data;
  }

  const sanitized = Array.isArray(data) ? [...data] : { ...data };

  for (const key of Object.keys(sanitized)) {
    const keyLower = key.toLowerCase();
<<<<<<< HEAD

    // Check if key contains any sensitive field name
    if (SENSITIVE_FIELDS.some((field) => keyLower.includes(field))) {
      sanitized[key] = "[REDACTED]";
=======
    
    // Check if key contains any sensitive field name
    if (SENSITIVE_FIELDS.some(field => keyLower.includes(field))) {
      sanitized[key] = '[REDACTED]';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      continue;
    }

    // Recursively sanitize nested objects
<<<<<<< HEAD
    if (typeof sanitized[key] === "object" && sanitized[key] !== null) {
=======
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      sanitized[key] = sanitizeLogData(sanitized[key]);
    }
  }

  return sanitized;
}

class Logger {
<<<<<<< HEAD
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

=======
  private isDevelopment = process.env.NODE_ENV === 'development';
  
  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD

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

=======
    
    console.error(this.formatMessage('error', message, sanitizeLogData(errorContext)));
  }
  
  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage('warn', message, sanitizeLogData(context)));
  }
  
  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.info(this.formatMessage('info', message, sanitizeLogData(context)));
    }
  }
  
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message, sanitizeLogData(context)));
    }
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Log API request
   */
  logRequest(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
<<<<<<< HEAD
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
=======
    context?: LogContext
  ): void {
    const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    this[level](
      `${method} ${path} ${statusCode} ${duration}ms`,
      { method, path, statusCode, duration, ...context }
    );
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
