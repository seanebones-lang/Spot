/**
 * Input Sanitization Utilities
 * Prevents XSS and injection attacks
 */

/**
 * Sanitize string input - remove dangerous characters
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove control characters except newlines and tabs
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Limit length (prevent DoS)
    .slice(0, 10000);
}

/**
 * Sanitize filename - remove path traversal and dangerous characters
 */
export function sanitizeFilename(filename: string): string {
  if (typeof filename !== 'string') {
    return 'file';
  }
  
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Only allow alphanumeric, dots, underscores, hyphens
    .replace(/\.\./g, '') // Remove path traversal
    .replace(/^\.+/, '') // Remove leading dots
    .replace(/\.+$/, '') // Remove trailing dots
    .slice(0, 255) // Limit length
    || 'file'; // Fallback if empty
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate and sanitize email
 */
export function sanitizeEmail(email: string): string | null {
  const sanitized = sanitizeString(email).toLowerCase();
  return isValidEmail(sanitized) ? sanitized : null;
}

/**
 * Validate file MIME type
 */
export function isValidMimeType(
  mimeType: string,
  allowedTypes: string[]
): boolean {
  if (!mimeType || typeof mimeType !== 'string') {
    return false;
  }
  
  return allowedTypes.some(allowed => {
    if (allowed.endsWith('/*')) {
      // Wildcard match (e.g., "audio/*")
      const base = allowed.slice(0, -2);
      return mimeType.startsWith(base);
    }
    return mimeType === allowed;
  });
}

/**
 * Allowed MIME types for file uploads
 */
export const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/wave',
  'audio/x-wav',
  'audio/flac',
  'audio/x-flac',
  'audio/aac',
  'audio/mp4',
  'audio/x-m4a',
  'audio/ogg',
  'audio/webm',
];

export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

/**
 * Validate file size
 */
export function isValidFileSize(size: number, maxSizeBytes: number): boolean {
  return typeof size === 'number' && size > 0 && size <= maxSizeBytes;
}

/**
 * Convert MB to bytes
 */
export function mbToBytes(mb: number): number {
  return mb * 1024 * 1024;
}

/**
 * Sanitize JSON input (basic validation)
 */
export function sanitizeJson<T>(input: unknown): T | null {
  try {
    if (typeof input === 'string') {
      return JSON.parse(input) as T;
    }
    return input as T;
  } catch {
    return null;
  }
}

/**
 * Validate and sanitize URL
 */
export function isValidUrl(url: string): boolean {
  if (typeof url !== 'string') {
    return false;
  }
  
  try {
    const parsed = new URL(url);
    // Only allow http and https
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Sanitize object keys (prevent prototype pollution)
 */
export function sanitizeObjectKeys<T extends Record<string, any>>(obj: T): T {
  const sanitized = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // Prevent prototype pollution
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        continue;
      }
      sanitized[key] = obj[key];
    }
  }
  return sanitized;
}
