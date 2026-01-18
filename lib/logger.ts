/**
 * Structured Logging Utility
 * Provides consistent logging across the application
 */

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  
  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }
  
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext = {
      ...context,
      ...(error instanceof Error
        ? {
            errorMessage: error.message,
            errorStack: error.stack,
            errorName: error.name,
          }
        : { error: String(error) }),
    };
    
    console.error(this.formatMessage('error', message, errorContext));
  }
  
  warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage('warn', message, context));
  }
  
  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.info(this.formatMessage('info', message, context));
    }
  }
  
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage('debug', message, context));
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
    context?: LogContext
  ): void {
    const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
    this[level](
      `${method} ${path} ${statusCode} ${duration}ms`,
      { method, path, statusCode, duration, ...context }
    );
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
