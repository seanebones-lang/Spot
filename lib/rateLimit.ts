/**
 * Rate Limiting Utility
 * Hybrid rate limiting: Uses Redis (Upstash) if configured, falls back to in-memory
 * For production, Redis is recommended for distributed systems
 */

import { checkRateLimitRedis, RateLimitResult } from "./rateLimitRedis";

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (fallback when Redis is not configured)
const store: RateLimitStore = {};

// Cleanup old entries every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    Object.keys(store).forEach((key) => {
      if (store[key].resetTime < now) {
        delete store[key];
      }
    });
  },
  5 * 60 * 1000,
);

/**
 * Rate limit configurations per endpoint
 */
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

/**
 * Check if request should be rate limited
 * Hybrid: Tries Redis first, falls back to in-memory
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param endpoint - API endpoint path
 * @returns Object with allowed status and remaining requests
 */
export async function checkRateLimit(
  identifier: string,
  endpoint: string,
): Promise<RateLimitResult> {
  // Try Redis first (will return fallback indication if not configured)
  const redisResult = await checkRateLimitRedis(identifier, endpoint);

  // If Redis is configured and returned a result, use it
  if (redisResult.allowed || process.env.UPSTASH_REDIS_REST_URL) {
    return redisResult;
  }

  // Fallback to in-memory rate limiting
  const config = RATE_LIMITS[endpoint] || RATE_LIMITS.default;
  const key = `${identifier}:${endpoint}`;
  const now = Date.now();

  // Get or create entry
  let entry = store[key];

  if (!entry || entry.resetTime < now) {
    // Create new window
    entry = {
      count: 0,
      resetTime: now + config.windowMs,
    };
    store[key] = entry;
  }

  // Increment count
  entry.count++;

  const allowed = entry.count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - entry.count);

  return {
    allowed,
    remaining,
    resetTime: entry.resetTime,
  };
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";

  // In production, you might want to use user ID if authenticated
  return ip;
}

/**
 * Rate limit middleware for Next.js API routes
 */
export function withRateLimit(
  handler: (req: Request) => Promise<Response>,
  endpoint: string,
) {
  return async (req: Request): Promise<Response> => {
    const identifier = getClientIdentifier(req);
    const result = await checkRateLimit(identifier, endpoint);

    if (!result.allowed) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          message: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Limit": String(
              RATE_LIMITS[endpoint]?.maxRequests ||
                RATE_LIMITS.default.maxRequests,
            ),
            "X-RateLimit-Remaining": String(result.remaining),
            "X-RateLimit-Reset": String(result.resetTime),
            "Retry-After": String(
              Math.ceil((result.resetTime - Date.now()) / 1000),
            ),
          },
        },
      );
    }

    // Add rate limit headers to response
    const response = await handler(req);
    response.headers.set(
      "X-RateLimit-Limit",
      String(
        RATE_LIMITS[endpoint]?.maxRequests || RATE_LIMITS.default.maxRequests,
      ),
    );
    response.headers.set("X-RateLimit-Remaining", String(result.remaining));
    response.headers.set("X-RateLimit-Reset", String(result.resetTime));

    return response;
  };
}
