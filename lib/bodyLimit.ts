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
  maxSize: number = MAX_JSON_BODY_SIZE
): { valid: boolean; error?: string } {
  if (!contentLength) {
    return { valid: true }; // No content length header, let it proceed
  }

  const size = parseInt(contentLength, 10);
  
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
  if (contentType.includes('multipart/form-data')) {
    return MAX_FORM_DATA_SIZE;
  }

  // JSON bodies are limited to 1MB
  if (contentType.includes('application/json')) {
    return MAX_JSON_BODY_SIZE;
  }

  return MAX_JSON_BODY_SIZE;
}

/**
 * Middleware helper to validate body size before parsing
 */
export function checkBodySize(request: Request): { valid: boolean; error?: string } {
  const contentLength = request.headers.get('content-length');
  const contentType = request.headers.get('content-type');
  const maxSize = getMaxBodySize(contentType);

  return validateBodySize(contentLength, contentType, maxSize);
}
