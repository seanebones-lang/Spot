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
    // Removed /api/admin/delete-all-album-art from exclusions - admin endpoints must have CSRF + role auth
    const skipCsrfPaths = ['/api/auth/login', '/api/auth/register'];
    
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
  
  // Content Security Policy (Enhanced for XSS Protection)
  // Generate nonce for inline scripts (React hydration)
  const cspNonce = Buffer.from(Math.random().toString()).toString('base64').slice(0, 32);

  // External API sources for third-party services
  const externalSources = [
    'https://api.x.ai', // X.AI for LLM (if integrated)
    'https://pinecone.io', // Pinecone vector DB
    'https://api.pinecone.io', // Pinecone API
    'https://neo4j.io', // Neo4j knowledge graphs
    'https://*.amazonaws.com', // AWS S3 and other services
    'https://api.resend.com', // Resend email API
    'https://api.upstash.com', // Upstash Redis
  ].join(' ');

  // Content Security Policy directive
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${cspNonce}'`, // Use nonce instead of unsafe-inline
    "style-src 'self' 'unsafe-inline'", // Tailwind requires inline styles (no nonce needed for CSS)
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    `connect-src 'self' ${externalSources}`, // Allow third-party API calls
    "media-src 'self' blob: https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests", // Upgrade HTTP to HTTPS in production
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  // Store nonce in request for use in components
  response.headers.set('X-CSP-Nonce', cspNonce);
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|empulseheart.png).*)',
  ],
};
