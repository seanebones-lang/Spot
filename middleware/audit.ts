/**
 * Audit Logging Middleware
 * Logs all sensitive operations for compliance and security monitoring
 * Tracks: data access, modifications, deletions, and privileged operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

interface AuditLogEntry {
  timestamp: string;
  userId?: string;
  action: string;
  resource: string;
  method: string;
  path: string;
  ipAddress?: string;
  userAgent?: string;
  status: number;
  duration: number;
  changes?: Record<string, unknown>;
  error?: string;
}

// Sensitive operations that require audit logging
const AUDITED_PATHS = [
  '/api/user/export', // GDPR data export
  '/api/user/delete', // GDPR right-to-be-forgotten
  '/api/user/privacy-preferences', // CCPA preferences
  '/api/admin', // All admin operations
  '/api/auth/login', // Authentication attempts
  '/api/auth/register', // New account creation
  '/api/tracks/submit', // Track uploads
  '/api/artist/verify', // Artist verification
  '/api/ai', // AI operation audit
];

/**
 * Create audit log entry
 */
export async function createAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    // Log to application logger (stores in logs directory and Upstash if configured)
    logger.info('AUDIT', {
      timestamp: entry.timestamp,
      userId: entry.userId,
      action: entry.action,
      resource: entry.resource,
      method: entry.method,
      path: entry.path,
      ipAddress: entry.ipAddress,
      status: entry.status,
      duration: entry.duration,
      ...(entry.changes && { changes: sanitizeChanges(entry.changes) }),
      ...(entry.error && { error: entry.error }),
    });

    // TODO: In production, also store in secure audit log database (CloudTrail, DataDog, Splunk)
    // This prevents tampering with logs if application compromised
    if (process.env.AUDIT_LOG_ENDPOINT) {
      await fetch(process.env.AUDIT_LOG_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...entry,
          changes: sanitizeChanges(entry.changes),
        }),
      }).catch(err => {
        logger.error('Failed to send audit log to remote endpoint:', err);
      });
    }
  } catch (error) {
    logger.error('Failed to create audit log:', error);
  }
}

/**
 * Sanitize changes object to prevent logging sensitive data
 */
function sanitizeChanges(changes: Record<string, unknown>): Record<string, unknown> {
  const sanitized = { ...changes };
  const sensitiveFields = ['password', 'passwordHash', 'token', 'secret', 'key'];

  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  }

  return sanitized;
}

/**
 * Audit logging middleware
 * Wraps request/response to log audit events
 */
export async function withAuditLogging(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const startTime = Date.now();
  const path = request.nextUrl.pathname;
  const method = request.method;

  try {
    // Check if this path should be audited
    const shouldAudit = AUDITED_PATHS.some(auditPath =>
      path.startsWith(auditPath)
    );

    if (!shouldAudit) {
      // Non-audited path; pass through
      return handler(request);
    }

    // Extract user info from JWT (if available)
    const authHeader = request.headers.get('Authorization');
    const userId = await extractUserIdFromToken(authHeader);

    // Execute handler
    const response = await handler(request);
    const duration = Date.now() - startTime;

    // Create audit log
    await createAuditLog({
      timestamp: new Date().toISOString(),
      userId,
      action: `${method} ${path}`,
      resource: path.split('/').slice(0, 4).join('/'), // e.g., '/api/user'
      method,
      path,
      ipAddress: request.headers.get('x-forwarded-for') || request.ip,
      userAgent: request.headers.get('user-agent') || undefined,
      status: response.status,
      duration,
    });

    return response;
  } catch (error) {
    const duration = Date.now() - startTime;

    // Log error
    await createAuditLog({
      timestamp: new Date().toISOString(),
      action: `${method} ${path} [ERROR]`,
      resource: path.split('/').slice(0, 4).join('/'),
      method,
      path,
      ipAddress: request.headers.get('x-forwarded-for') || request.ip,
      userAgent: request.headers.get('user-agent') || undefined,
      status: 500,
      duration,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    throw error;
  }
}

/**
 * Extract user ID from JWT token
 */
async function extractUserIdFromToken(authHeader?: string | null): Promise<string | undefined> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return undefined;
  }

  try {
    const token = authHeader.substring(7);
    // Decode JWT without verification (signature already validated by middleware)
    const [, payloadB64] = token.split('.');
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString());
    return payload.sub || payload.userId;
  } catch {
    return undefined;
  }
}

/**
 * Get audit logs for compliance requests
 */
export async function getAuditLogs(filters: {
  userId?: string;
  action?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}): Promise<AuditLogEntry[]> {
  // TODO: Implement querying from audit log database
  // This is a placeholder for integration with your audit log storage
  logger.info('Audit log query requested:', filters);
  return [];
}
