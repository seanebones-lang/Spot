import { NextRequest, NextResponse } from 'next/server';
import { isOriginAllowed } from '@/lib/env';
import { generateCorrelationId } from '@/lib/logger';

/**
 * Next.js Middleware
 * Handles:
 * - CORS validation
 * - Request correlation IDs
 * - Security headers
 */

export function middleware(request: NextRequest) {
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
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Correlation-ID');
    response.headers.set('Access-Control-Expose-Headers', 'X-Correlation-ID, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset');
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: response.headers,
      });
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
