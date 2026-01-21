/**
 * API Client Configuration
 * Centralized API endpoint management for connecting frontend (Vercel) to backend (Railway)
 */

const getApiUrl = () => {
  // Use Railway backend URL if set, otherwise use relative path (for local dev)
<<<<<<< HEAD
  if (typeof window !== "undefined") {
    // Client-side: use environment variable or relative path
    return process.env.NEXT_PUBLIC_API_URL || "";
  }
  // Server-side: use environment variable or default to Railway
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "";
=======
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable or relative path
    return process.env.NEXT_PUBLIC_API_URL || '';
  }
  // Server-side: use environment variable or default to Railway
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
};

/**
 * Get the full API endpoint URL
 */
export const getApiEndpoint = (path: string): string => {
  const baseUrl = getApiUrl();
<<<<<<< HEAD
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (baseUrl) {
    // Remove trailing slash from baseUrl and leading slash from path
    return `${baseUrl.replace(/\/$/, "")}${cleanPath}`;
  }

=======
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  if (baseUrl) {
    // Remove trailing slash from baseUrl and leading slash from path
    return `${baseUrl.replace(/\/$/, '')}${cleanPath}`;
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Fallback to relative path (for same-origin requests)
  return cleanPath;
};

/**
 * Make API request with proper error handling
 */
export async function apiRequest<T>(
  endpoint: string,
<<<<<<< HEAD
  options: RequestInit = {},
): Promise<T> {
  const url = getApiEndpoint(endpoint);

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
=======
  options: RequestInit = {}
): Promise<T> {
  const url = getApiEndpoint(endpoint);
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      ...options.headers,
    },
  });

  if (!response.ok) {
<<<<<<< HEAD
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(
      error.error || `API request failed: ${response.statusText}`,
    );
=======
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `API request failed: ${response.statusText}`);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }

  return response.json();
}
