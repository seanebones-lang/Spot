/**
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
}
