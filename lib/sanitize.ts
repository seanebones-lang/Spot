/**
<<<<<<< HEAD
 * Input Sanitization Utilities
 * Prevents XSS and injection attacks
 */

/**
 * Sanitize string input - remove dangerous characters
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") {
    return "";
  }

  return (
    input
      .trim()
      // Remove null bytes
      .replace(/\0/g, "")
      // Remove control characters except newlines and tabs
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
      // Limit length (prevent DoS)
      .slice(0, 10000)
  );
}

/**
 * Sanitize filename - remove path traversal and dangerous characters
 */
export function sanitizeFilename(filename: string): string {
  if (typeof filename !== "string") {
    return "file";
  }

  return (
    filename
      .replace(/[^a-zA-Z0-9._-]/g, "_") // Only allow alphanumeric, dots, underscores, hyphens
      .replace(/\.\./g, "") // Remove path traversal
      .replace(/^\.+/, "") // Remove leading dots
      .replace(/\.+$/, "") // Remove trailing dots
      .slice(0, 255) || // Limit length
    "file"
  ); // Fallback if empty
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== "string") {
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
  allowedTypes: string[],
): boolean {
  if (!mimeType || typeof mimeType !== "string") {
    return false;
  }

  return allowedTypes.some((allowed) => {
    if (allowed.endsWith("/*")) {
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
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/wave",
  "audio/x-wav",
  "audio/flac",
  "audio/x-flac",
  "audio/aac",
  "audio/mp4",
  "audio/x-m4a",
  "audio/ogg",
  "audio/webm",
];

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

/**
 * Validate file size
 */
export function isValidFileSize(size: number, maxSizeBytes: number): boolean {
  return typeof size === "number" && size > 0 && size <= maxSizeBytes;
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
    if (typeof input === "string") {
      return JSON.parse(input) as T;
    }
    return input as T;
  } catch {
    return null;
=======
 * XSS Sanitization Utility
 * Prevents XSS attacks in user-generated content (journal entries, affirmations, etc.)
 * 
 * Note: For production, use DOMPurify library for comprehensive sanitization
 * This is a basic implementation for common XSS vectors
 */

/**
 * Basic HTML sanitization - removes script tags and dangerous attributes
 * For production, use: npm install dompurify @types/dompurify
 */
export function sanitizeHTML(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: basic string replacement
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }

  // Client-side: use DOMPurify if available, otherwise basic sanitization
  try {
    // Try to use DOMPurify if installed
    const DOMPurify = require('dompurify');
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      ALLOWED_ATTR: [],
    });
  } catch (e) {
    // Fallback to basic sanitization
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }
}

/**
<<<<<<< HEAD
 * Validate and sanitize URL
 */
export function isValidUrl(url: string): boolean {
  if (typeof url !== "string") {
    return false;
  }

  try {
    const parsed = new URL(url);
    // Only allow http and https
    return parsed.protocol === "http:" || parsed.protocol === "https:";
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
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        continue;
      }
      sanitized[key] = obj[key];
    }
  }
  return sanitized;
=======
 * Sanitize plain text - escapes HTML entities
 */
export function sanitizeText(text: string): string {
  if (typeof text !== 'string') {
    return '';
  }

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Sanitize user input for display
 * Use this for journal entries, comments, etc.
 */
export function sanitizeUserInput(input: string, allowHTML: boolean = false): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  if (allowHTML) {
    return sanitizeHTML(input);
  }

  return sanitizeText(input);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}
