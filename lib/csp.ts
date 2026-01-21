/**
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
}
