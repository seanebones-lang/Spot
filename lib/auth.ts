import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

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
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

    const decoded = verify(token, secret) as AuthUser;
    return decoded;
  } catch (error) {
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
