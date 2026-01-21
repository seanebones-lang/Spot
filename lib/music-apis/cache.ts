/**
 * Music API Cache
 * Caches Jamendo API responses to reduce API calls and improve performance
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const cache = new Map<string, CacheEntry<any>>();

/**
 * Get cached data if available and not expired
 */
export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

/**
 * Set cache entry
 */
export function setCached<T>(
  key: string,
  data: T,
  duration: number = CACHE_DURATION,
): void {
  const now = Date.now();
  cache.set(key, {
    data,
    timestamp: now,
    expiresAt: now + duration,
  });
}

/**
 * Clear cache entry
 */
export function clearCache(key: string): void {
  cache.delete(key);
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  cache.clear();
}

/**
 * Generate cache key for mood/genre queries
 */
export function getCacheKey(
  type: "mood" | "genre",
  value: string,
  limit: number,
): string {
  return `music:${type}:${value}:${limit}`;
}
