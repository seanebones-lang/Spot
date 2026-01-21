/**
 * Pipeline Configuration Constants
 * Centralized configuration values to replace hard-coded thresholds
 */

/**
 * Similarity thresholds
 */
export const SIMILARITY_THRESHOLDS = {
  MIN_SIMILARITY: 0.6,
  SIMILARITY_THRESHOLD: 0.7,
  MOOD_SIMILARITY_THRESHOLD: 0.8,
  HIGH_CONFIDENCE: 0.85,
  VERY_HIGH_CONFIDENCE: 0.9,
} as const;

/**
 * Performance targets
 */
export const PERFORMANCE_TARGETS = {
  MOOD_ANALYSIS_LATENCY_MS: 200,
  BATCH_PROCESSING_SECONDS_PER_TRACK: 5,
  GRAPH_QUERY_LATENCY_MS: 100,
  MIN_ACCURACY: 0.9,
} as const;

/**
 * Default limits
 */
export const DEFAULT_LIMITS = {
  TOP_K_SIMILAR: 5,
  TOP_K_RECOMMENDATIONS: 10,
  MAX_SIMILAR_TRACKS: 20,
  MAX_RECOMMENDATIONS: 20,
  BATCH_MAX_CONCURRENCY: 3,
  CACHE_MAX_SIZE: 1000,
  CACHE_TTL_MS: 24 * 60 * 60 * 1000, // 24 hours
} as const;

/**
 * Retry configuration
 */
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  INITIAL_DELAY_MS: 1000,
  MAX_DELAY_MS: 10000,
  BACKOFF_MULTIPLIER: 2,
} as const;

/**
 * Vector DB configuration
 */
export const VECTOR_DB_CONFIG = {
  DEFAULT_EMBEDDING_DIMENSIONS: 768, // Standard for BERT-base
  MAX_EMBEDDING_DIMENSIONS: 4096,
  MIN_EMBEDDING_DIMENSIONS: 128,
} as const;

/**
 * Neo4j configuration
 */
export const NEO4J_CONFIG = {
  DEFAULT_POOL_SIZE: 20,
  MAX_POOL_SIZE: 50,
  CONNECTION_TIMEOUT_MS: 60000,
} as const;

/**
 * Feature extraction configuration
 */
export const FEATURE_EXTRACTION_CONFIG = {
  SAMPLE_RATE: 44100,
  FFT_SIZE: 4096,
  HOP_SIZE: 512,
  MFCC_COEFFICIENTS: 13,
} as const;

/**
 * Get configuration with environment variable overrides
 */
export function getConfig() {
  return {
    similarity: SIMILARITY_THRESHOLDS,
    performance: PERFORMANCE_TARGETS,
    limits: DEFAULT_LIMITS,
    retry: RETRY_CONFIG,
    vectorDB: VECTOR_DB_CONFIG,
    neo4j: {
      ...NEO4J_CONFIG,
<<<<<<< HEAD
      poolSize: parseInt(
        process.env.NEO4J_POOL_SIZE || String(NEO4J_CONFIG.DEFAULT_POOL_SIZE),
      ),
=======
      poolSize: parseInt(process.env.NEO4J_POOL_SIZE || String(NEO4J_CONFIG.DEFAULT_POOL_SIZE)),
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    },
    features: FEATURE_EXTRACTION_CONFIG,
  };
}
