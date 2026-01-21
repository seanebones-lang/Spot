/**
 * Request Body Size Limits
 * Prevents DoS attacks via large payloads
 */

const MAX_JSON_BODY_SIZE = 1024 * 1024; // 1MB
const MAX_FORM_DATA_SIZE = 100 * 1024 * 1024; // 100MB (for file uploads)

/**
 * Check if request body size exceeds limit
 */
export function validateBodySize(
  contentLength: string | null,
  contentType: string | null,
<<<<<<< HEAD
  maxSize: number = MAX_JSON_BODY_SIZE,
=======
  maxSize: number = MAX_JSON_BODY_SIZE
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
): { valid: boolean; error?: string } {
  if (!contentLength) {
    return { valid: true }; // No content length header, let it proceed
  }

  const size = parseInt(contentLength, 10);
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  if (isNaN(size)) {
    return { valid: true }; // Invalid content length, let it proceed
  }

  if (size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `Request body too large. Maximum size is ${maxSizeMB}MB.`,
    };
  }

  return { valid: true };
}

/**
 * Get max body size based on content type
 */
export function getMaxBodySize(contentType: string | null): number {
  if (!contentType) {
    return MAX_JSON_BODY_SIZE;
  }

  // Form data can be larger (for file uploads)
<<<<<<< HEAD
  if (contentType.includes("multipart/form-data")) {
=======
  if (contentType.includes('multipart/form-data')) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return MAX_FORM_DATA_SIZE;
  }

  // JSON bodies are limited to 1MB
<<<<<<< HEAD
  if (contentType.includes("application/json")) {
=======
  if (contentType.includes('application/json')) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return MAX_JSON_BODY_SIZE;
  }

  return MAX_JSON_BODY_SIZE;
}

/**
 * Middleware helper to validate body size before parsing
 */
<<<<<<< HEAD
export function checkBodySize(request: Request): {
  valid: boolean;
  error?: string;
} {
  const contentLength = request.headers.get("content-length");
  const contentType = request.headers.get("content-type");
=======
export function checkBodySize(request: Request): { valid: boolean; error?: string } {
  const contentLength = request.headers.get('content-length');
  const contentType = request.headers.get('content-type');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const maxSize = getMaxBodySize(contentType);

  return validateBodySize(contentLength, contentType, maxSize);
}
