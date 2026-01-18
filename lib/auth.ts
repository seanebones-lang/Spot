import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { getEnv } from '@/lib/env';
import { logger } from '@/lib/logger';

/**
 * Authentication utilities
 * Helper functions for JWT token verification and user extraction
 */

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

/**
 * Get JWT secret - throws error if not configured
 */
function getJwtSecret(): string {
  const env = getEnv();
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured. This is required for authentication.');
  }
  return env.JWT_SECRET;
}

/**
 * Verify JWT token from request
 * Returns decoded user info or null if invalid
 */
export function verifyToken(request: NextRequest): AuthUser | null {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const secret = getJwtSecret();

    const decoded = verify(token, secret) as AuthUser;
    return decoded;
  } catch (error) {
    logger.debug('Token verification failed', { error });
    return null;
  }
}

/**
 * Require authentication middleware
 * Returns user if authenticated, throws error if not
 */
export function requireAuth(request: NextRequest): AuthUser {
  const user = verifyToken(request);
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

/**
 * Require specific role
 */
export function requireRole(request: NextRequest, allowedRoles: string[]): AuthUser {
  const user = requireAuth(request);
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Forbidden: Insufficient permissions');
  }
  return user;
}
