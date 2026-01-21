/**
 * Request Timeout Utilities
 * Prevents hanging requests by enforcing timeouts
 */

/**
 * Create a fetch request with timeout
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
<<<<<<< HEAD
  timeoutMs: number = 30000, // 30 seconds default
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

=======
  timeoutMs: number = 30000 // 30 seconds default
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
<<<<<<< HEAD
    if (error instanceof Error && error.name === "AbortError") {
=======
    if (error instanceof Error && error.name === 'AbortError') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      throw new Error(`Request timeout after ${timeoutMs}ms`);
    }
    throw error;
  }
}

/**
 * Default timeout values for different operations
 */
export const TIMEOUTS = {
<<<<<<< HEAD
  DATABASE_QUERY: 5000, // 5 seconds for DB queries
  EXTERNAL_API: 30000, // 30 seconds for external APIs
  FILE_UPLOAD: 120000, // 2 minutes for file uploads
  EMAIL_SEND: 10000, // 10 seconds for email sending
  DEFAULT: 30000, // 30 seconds default
=======
  DATABASE_QUERY: 5000,      // 5 seconds for DB queries
  EXTERNAL_API: 30000,       // 30 seconds for external APIs
  FILE_UPLOAD: 120000,       // 2 minutes for file uploads
  EMAIL_SEND: 10000,         // 10 seconds for email sending
  DEFAULT: 30000,            // 30 seconds default
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
};

/**
 * Wrap a promise with timeout
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 30000,
<<<<<<< HEAD
  errorMessage?: string,
=======
  errorMessage?: string
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
<<<<<<< HEAD
        () =>
          reject(
            new Error(errorMessage || `Operation timeout after ${timeoutMs}ms`),
          ),
        timeoutMs,
      ),
=======
        () => reject(new Error(errorMessage || `Operation timeout after ${timeoutMs}ms`)),
        timeoutMs
      )
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    ),
  ]);
}
