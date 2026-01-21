/**
<<<<<<< HEAD
 * Content Security Policy (CSP) Utilities
 * Generate and manage CSP nonces for script/style security
 */

import { randomBytes } from 'crypto';

/**
 * Generate a random nonce for CSP
 * @param length - Length of nonce in bytes (default: 16)
 * @returns Base64 encoded nonce string
 */
export function generateNonce(length: number = 16): string {
  return randomBytes(length).toString('base64');
}

/**
 * Get or generate CSP nonce from request headers
 * Falls back to generating a new nonce if not present
 */
export function getCSPNonce(request?: Request): string {
  if (request) {
    const nonce = request.headers.get('x-csp-nonce');
    if (nonce) {
      return nonce;
    }
  }
  return generateNonce();
}

/**
 * Build CSP header with nonces
 * @param nonce - Script nonce
 * @param styleNonce - Style nonce (optional, uses script nonce if not provided)
 * @returns CSP header string
 */
export function buildCSPHeader(
  nonce: string,
  styleNonce?: string,
): string {
  const styleSrc = styleNonce
    ? `style-src 'self' 'nonce-${styleNonce}' 'unsafe-inline'` // Keep unsafe-inline for Tailwind until fully migrated
    : `style-src 'self' 'nonce-${nonce}' 'unsafe-inline'`; // Fallback to script nonce

  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`, // Removed unsafe-inline - requires nonces
    styleSrc,
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.x.ai",
    "media-src 'self' blob:",
    "frame-ancestors 'none'",
  ].join('; ');
}

/**
 * Generate CSP nonces for both script and style
 * @returns Object with scriptNonce and styleNonce
 */
export function generateCSPNonces(): {
  scriptNonce: string;
  styleNonce: string;
} {
  return {
    scriptNonce: generateNonce(),
    styleNonce: generateNonce(),
  };
=======
 * CSP (Content Security Policy) Utility Functions
 * Provides helpers for managing CSP nonces and inline script execution
 */

import { headers } from 'next/headers';

/**
 * Get CSP nonce from response headers
 * Use this in layout.tsx to inject nonce into script tags
 * @returns CSP nonce string or empty string if not found
 */
export function getCspNonce(): string {
  try {
    const headersList = headers();
    const nonce = headersList.get('X-CSP-Nonce');
    return nonce || '';
  } catch (error) {
    // In client-side context, headers() throws; return empty
    return '';
  }
}

/**
 * Inject nonce into script tag
 * Usage in JSX: <script nonce={getCspNonce()} dangerouslySetInnerHTML={{ __html: `...` }} />
 * @returns Object with nonce property for script tags
 */
export function getNonceProps(): { nonce?: string } {
  const nonce = getCspNonce();
  return nonce ? { nonce } : {};
}

/**
 * CSP meta tag for client-side context
 * Add to <head> if needed for dynamic inline scripts
 */
export const CSP_META_TAG = 'meta[http-equiv="Content-Security-Policy"]';

/**
 * Validate if external URL is allowed by CSP
 * @param url - External URL to validate
 * @returns true if URL is in CSP connect-src allowlist
 */
export function isUrlCspAllowed(url: string): boolean {
  const allowedDomains = [
    'api.x.ai',
    'pinecone.io',
    'api.pinecone.io',
    'neo4j.io',
    'amazonaws.com',
    'api.resend.com',
    'api.upstash.com',
  ];

  try {
    const urlObj = new URL(url);
    return allowedDomains.some(domain =>
      urlObj.hostname.endsWith(domain) || urlObj.hostname === domain
    );
  } catch {
    return false;
  }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}
