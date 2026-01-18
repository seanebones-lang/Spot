import { NextRequest, NextResponse } from 'next/server';
import { isOriginAllowed } from '@/lib/env';
import { generateCorrelationId } from '@/lib/logger';
import { getCsrfToken, validateCsrfToken } from '@/lib/csrf';

/**
 * Next.js Middleware
 * Handles:
 * - CORS validation
 * - Request correlation IDs
 * - Security headers
 */

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Generate correlation ID for request tracking
  const correlationId = generateCorrelationId();
  response.headers.set('X-Correlation-ID', correlationId);
  
  // Handle CORS for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const origin = request.headers.get('origin');
    
    // Validate origin
    if (origin && !isOriginAllowed(origin)) {
      return new NextResponse(
        JSON.stringify({ error: 'CORS policy: Origin not allowed' }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // Set CORS headers
    if (origin && isOriginAllowed(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }
    
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Correlation-ID, X-CSRF-Token');
    response.headers.set('Access-Control-Expose-Headers', 'X-Correlation-ID, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-CSRF-Token');
    
    // Ensure CSRF token cookie is set for API routes (non-GET requests)
    if (!request.cookies.get('csrf-token') && request.method !== 'GET') {
      try {
        const csrfToken = await getCsrfToken();
        response.cookies.set('csrf-token', csrfToken, {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24, // 24 hours
        });
        // Also set in response header for easy access
        response.headers.set('X-CSRF-Token', csrfToken);
      } catch (error) {
        // If token generation fails, continue (won't affect GET requests)
        console.error('Failed to generate CSRF token in middleware:', error);
      }
    } else if (request.cookies.get('csrf-token')) {
      // Include existing token in response header
      response.headers.set('X-CSRF-Token', request.cookies.get('csrf-token')!.value);
    }
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: response.headers,
      });
    }

    // CSRF validation for state-changing methods (except auth endpoints that handle it manually)
    const path = request.nextUrl.pathname;
    const isStateChangingMethod = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method);
    const skipCsrfPaths = ['/api/auth/login', '/api/auth/register']; // These handle CSRF manually if needed
    
    if (isStateChangingMethod && !skipCsrfPaths.some(p => path.startsWith(p))) {
      if (!validateCsrfToken(request)) {
        return new NextResponse(
          JSON.stringify({ error: 'CSRF token validation failed' }),
          {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }
    }
  }
  
  // Security headers for all responses
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // HSTS (only in production over HTTPS)
  if (process.env.NODE_ENV === 'production' && request.nextUrl.protocol === 'https:') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: 'unsafe-eval' may be needed for Next.js
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.x.ai",
    "media-src 'self' blob:",
    "frame-ancestors 'none'",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|empulseheart.png).*)',
  ],
};
