/**
 * Embedding Cache Layer
 * Caches embeddings by file hash to avoid recomputation
 */

export interface CacheEntry {
  embedding: number[];
  features?: any;
  timestamp: number;
}

export interface CacheOptions {
  maxSize?: number;
  ttlMs?: number;
  cleanupIntervalMs?: number;
}

const DEFAULT_OPTIONS: Required<CacheOptions> = {
  maxSize: 1000,
  ttlMs: 24 * 60 * 60 * 1000, // 24 hours
  cleanupIntervalMs: 60 * 60 * 1000, // 1 hour
};

/**
 * Simple in-memory cache for embeddings
 */
export class EmbeddingCache {
  private cache: Map<string, CacheEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;
  private options: Required<CacheOptions>;

  constructor(options: CacheOptions = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.startCleanup();
  }

  /**
   * Get embedding from cache or compute using function
   */
  async getOrCompute<T>(
    key: string,
    computeFn: () => Promise<T>,
    extractEmbedding: (result: T) => number[] | undefined
  ): Promise<{ result: T; fromCache: boolean; embedding?: number[] }> {
    // Check cache first
    const cached = this.get(key);
    if (cached) {
      return {
        result: { embedding: cached.embedding } as T, // Return cached embedding
        fromCache: true,
        embedding: cached.embedding,
      };
    }

    // Compute new embedding
    const result = await computeFn();
    const embedding = extractEmbedding(result);

    // Cache if embedding available
    if (embedding) {
      this.set(key, embedding, result);
    }

    return {
      result,
      fromCache: false,
      embedding,
    };
  }

  /**
   * Get embedding by key
   */
  get(key: string): CacheEntry | null {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    // Check TTL
    const age = Date.now() - entry.timestamp;
    if (age > this.options.ttlMs) {
      this.cache.delete(key);
      return null;
    }

    return entry;
  }

  /**
   * Set embedding in cache
   */
  set(key: string, embedding: number[], metadata?: any): void {
    // Check cache size
    if (this.cache.size >= this.options.maxSize) {
      this.evictOldest();
    }

    this.cache.set(key, {
      embedding,
      features: metadata,
      timestamp: Date.now(),
    });
  }

  /**
   * Check if key exists in cache (without retrieving)
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Delete entry from cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    size: number;
    maxSize: number;
    hitRate?: number;
  } {
    return {
      size: this.cache.size,
      maxSize: this.options.maxSize,
    };
  }

  /**
   * Evict oldest entry (LRU)
   */
  private evictOldest(): void {
    let oldestKey: string | null = null;
    let oldestTimestamp = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Start periodic cleanup
   */
  private startCleanup(): void {
    if (this.cleanupInterval) {
      return;
    }

    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.options.cleanupIntervalMs);
  }

  /**
   * Stop periodic cleanup
   */
  stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Cleanup expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      const age = now - entry.timestamp;
      if (age > this.options.ttlMs) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      this.cache.delete(key);
    }

    if (keysToDelete.length > 0) {
      console.log(`🧹 Cleaned up ${keysToDelete.length} expired cache entries`);
    }
  }
}

/**
 * Singleton cache instance
 */
let globalCache: EmbeddingCache | null = null;

export function getEmbeddingCache(options?: CacheOptions): EmbeddingCache {
  if (!globalCache) {
    globalCache = new EmbeddingCache(options);
  }
  return globalCache;
}
