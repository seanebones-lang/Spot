/**
 * CSRF Protection
 * Implements double-submit cookie pattern for CSRF protection
 * Generates and validates CSRF tokens
 * 
 * Uses Web Crypto API for Edge Runtime compatibility
 */

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { logger } from './logger';

const CSRF_TOKEN_COOKIE = 'csrf-token';
const CSRF_TOKEN_HEADER = 'X-CSRF-Token';
const CSRF_TOKEN_LENGTH = 32; // 32 bytes = 64 hex characters

/**
 * Generate secure random bytes using Web Crypto API (Edge Runtime compatible)
 */
function getRandomBytes(length: number): Uint8Array {
  const arr = new Uint8Array(length);
  // Use Web Crypto API which works in both Node.js and Edge Runtime
  crypto.getRandomValues(arr);
  return arr;
}

/**
 * Convert Uint8Array to hex string
 */
function toHex(arr: Uint8Array): string {
  return Array.from(arr)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Generate CSRF token
 * Uses Web Crypto API for Edge Runtime compatibility
 */
export function generateCsrfToken(): string {
  const randomBytes = getRandomBytes(CSRF_TOKEN_LENGTH);
  return toHex(randomBytes);
}

/**
 * Get or create CSRF token (sets cookie if doesn't exist)
 */
export async function getCsrfToken(): Promise<string> {
  const cookieStore = await cookies();
  let token = cookieStore.get(CSRF_TOKEN_COOKIE)?.value;

  if (!token) {
    token = generateCsrfToken();
    cookieStore.set(CSRF_TOKEN_COOKIE, token, {
      httpOnly: false, // Must be readable by JavaScript for header
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });
  }

  return token;
}

/**
 * Validate CSRF token from request
 */
export function validateCsrfToken(request: NextRequest): boolean {
  // Skip CSRF check for GET, HEAD, OPTIONS requests (read-only)
  const method = request.method.toUpperCase();
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return true;
  }

  // Get token from header
  const headerToken = request.headers.get(CSRF_TOKEN_HEADER);

  // Get token from cookie
  const cookieToken = request.cookies.get(CSRF_TOKEN_COOKIE)?.value;

  // Both tokens must exist and match
  if (!headerToken || !cookieToken) {
    logger.warn('CSRF token missing', {
      hasHeaderToken: !!headerToken,
      hasCookieToken: !!cookieToken,
      path: request.nextUrl.pathname,
    });
    return false;
  }

  if (headerToken !== cookieToken) {
    logger.warn('CSRF token mismatch', {
      path: request.nextUrl.pathname,
    });
    return false;
  }

  // Validate token format (64 hex characters)
  if (!/^[a-f0-9]{64}$/i.test(headerToken)) {
    logger.warn('Invalid CSRF token format', {
      path: request.nextUrl.pathname,
    });
    return false;
  }

  return true;
}

/**
 * Middleware function to validate CSRF token
 * Throws error if validation fails
 */
export function requireCsrfToken(request: NextRequest): void {
  if (!validateCsrfToken(request)) {
    throw new Error('CSRF token validation failed');
  }
}

/**
 * Get CSRF token for response (to include in API responses)
 */
export async function getCsrfTokenForResponse(): Promise<string> {
  return getCsrfToken();
}
