/**
 * Redis-based Rate Limiting
 * Uses Upstash Redis for distributed rate limiting across multiple server instances
 * Falls back to in-memory rate limiting if Redis is not configured
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { logger } from "./logger";

// Rate limit configurations per endpoint
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  "/api/auth/login": { windowMs: 60 * 1000, maxRequests: 5 }, // 5 per minute
  "/api/auth/register": { windowMs: 60 * 60 * 1000, maxRequests: 3 }, // 3 per hour
  "/api/auth/forgot-password": { windowMs: 60 * 60 * 1000, maxRequests: 5 }, // 5 per hour
  "/api/auth/reset-password": { windowMs: 60 * 60 * 1000, maxRequests: 5 }, // 5 per hour
  "/api/chat": { windowMs: 60 * 60 * 1000, maxRequests: 20 }, // 20 per hour
  "/api/tracks/submit": { windowMs: 24 * 60 * 60 * 1000, maxRequests: 10 }, // 10 per day
  "/api/artist/signup": { windowMs: 24 * 60 * 60 * 1000, maxRequests: 5 }, // 5 per day
  "/api/mood/validate": { windowMs: 60 * 1000, maxRequests: 30 }, // 30 per minute
  default: { windowMs: 60 * 1000, maxRequests: 100 }, // 100 per minute for general APIs
};

// Redis client singleton
let redisClient: Redis | null = null;
let ratelimitInstance: Ratelimit | null = null;

/**
 * Initialize Redis client (Upstash)
 */
function getRedisClient(): Redis | null {
  if (redisClient) {
    return redisClient;
  }

  const restUrl = process.env.UPSTASH_REDIS_REST_URL;
  const restToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!restUrl || !restToken) {
    logger.warn(
      "Upstash Redis not configured. Falling back to in-memory rate limiting.",
    );
    return null;
  }

  try {
    redisClient = new Redis({
      url: restUrl,
      token: restToken,
    });
    logger.info("Upstash Redis client initialized");
    return redisClient;
  } catch (error) {
    logger.error("Failed to initialize Redis client", error);
    return null;
  }
}

/**
 * Get or create rate limiter instance
 */
function getRatelimit(): Ratelimit | null {
  if (ratelimitInstance) {
    return ratelimitInstance;
  }

  const redis = getRedisClient();
  if (!redis) {
    return null;
  }

  // Create ratelimit instance with sliding window algorithm
  ratelimitInstance = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "1 m"), // Default: 100 requests per minute
    analytics: true, // Enable analytics for monitoring
  });

  return ratelimitInstance;
}

/**
 * Rate limit result
 */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
}

/**
 * Check rate limit using Redis (with fallback to in-memory)
 */
export async function checkRateLimitRedis(
  identifier: string,
  endpoint: string,
): Promise<RateLimitResult> {
  const config = RATE_LIMITS[endpoint] || RATE_LIMITS.default;
  const ratelimit = getRatelimit();

  // If Redis is not configured, return allowed (will fall back to in-memory in rateLimit.ts)
  if (!ratelimit) {
    // Return a result that indicates fallback should be used
    return {
      allowed: true, // Will be checked by in-memory rate limiter
      remaining: config.maxRequests,
      resetTime: Date.now() + config.windowMs,
    };
  }

  try {
    // Convert window to seconds for Ratelimit
    const windowSeconds = Math.ceil(config.windowMs / 1000);

    // Create endpoint-specific ratelimit instance
    const endpointRatelimit = new Ratelimit({
      redis: getRedisClient()!,
      limiter: Ratelimit.slidingWindow(
        config.maxRequests,
        `${windowSeconds} s`,
      ),
      analytics: true,
    });

    const key = `${identifier}:${endpoint}`;
    const result = await endpointRatelimit.limit(key);

    // Calculate reset time (approximate)
    const resetTime = Date.now() + config.windowMs;

    return {
      allowed: result.success,
      remaining: result.remaining,
      resetTime,
    };
  } catch (error) {
    logger.error("Redis rate limit error, falling back", error, {
      identifier,
      endpoint,
    });

    // Fallback: allow the request (will be handled by in-memory rate limiter)
    return {
      allowed: true,
      remaining: config.maxRequests,
      resetTime: Date.now() + config.windowMs,
    };
  }
}

/**
 * Check rate limit per user (not just IP)
 */
export async function checkRateLimitUser(
  userId: string,
  endpoint: string,
): Promise<RateLimitResult> {
  return checkRateLimitRedis(`user:${userId}`, endpoint);
}

/**
 * Hybrid rate limiting: check both IP and user (if authenticated)
 */
export async function checkRateLimitHybrid(
  identifier: string,
  userId: string | null,
  endpoint: string,
): Promise<RateLimitResult> {
  // Check IP-based limit
  const ipResult = await checkRateLimitRedis(identifier, endpoint);

  // If user is authenticated, also check user-based limit
  if (userId) {
    const userResult = await checkRateLimitUser(userId, endpoint);

    // User must pass both checks
    return {
      allowed: ipResult.allowed && userResult.allowed,
      remaining: Math.min(ipResult.remaining, userResult.remaining),
      resetTime: Math.max(ipResult.resetTime, userResult.resetTime),
    };
  }

  return ipResult;
}
