/**
 * Rate Limiting Middleware
 * Implements sliding-window rate limiting using Upstash Redis
 * Protects against brute-force attacks on sensitive endpoints
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

// Initialize Redis connection
const redis = Redis.fromEnv();

/**
 * Rate Limiter Configurations
 * Each configured with appropriate thresholds for security + UX
 */

// Login attempts: 5 per 15 minutes (prevents brute-force)
export const loginRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  analytics: true,
  prefix: "ratelimit:login",
});

// Password reset requests: 3 per hour (prevents email flooding)
export const passwordResetRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
  analytics: true,
  prefix: "ratelimit:password-reset",
});

// Registration: 10 per hour (prevents account creation spam)
export const registerRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  analytics: true,
  prefix: "ratelimit:register",
});

// Email verification resend: 5 per hour (prevents email spam)
export const emailVerificationRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
  prefix: "ratelimit:email-verification",
});

// API requests (general): 100 per hour (per user quota)
export const apiRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "1 h"),
  analytics: true,
  prefix: "ratelimit:api",
});

/**
 * Extract identifier for rate limiting
 * Priority: User ID > IP Address
 */
export function getIdentifier(request: NextRequest): string {
  // Try to extract user ID from JWT token
  try {
    const authHeader = request.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      const [, payloadB64] = token.split(".");
      const payload = JSON.parse(Buffer.from(payloadB64, "base64").toString());
      if (payload.sub || payload.userId) {
        return `user:${payload.sub || payload.userId}`;
      }
    }
  } catch (error) {
    logger.debug("Failed to extract user ID from token");
  }

  // Fallback to IP address
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    request.ip ||
    "unknown";
  return `ip:${ip}`;
}

/**
 * Rate limit check for login attempts
 * Returns { success, remaining, reset }
 */
export async function checkLoginRateLimit(identifier: string) {
  try {
    const result = await loginRateLimiter.limit(identifier);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
      retryAfter: result.retryAfter,
    };
  } catch (error) {
    logger.error("Rate limit check failed:", error);
    // Fail open: if Redis fails, allow request (don't block users)
    return { success: true, remaining: 1, reset: 0, retryAfter: 0 };
  }
}

/**
 * Rate limit check for password reset
 */
export async function checkPasswordResetRateLimit(identifier: string) {
  try {
    const result = await passwordResetRateLimiter.limit(identifier);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
      retryAfter: result.retryAfter,
    };
  } catch (error) {
    logger.error("Rate limit check failed:", error);
    return { success: true, remaining: 1, reset: 0, retryAfter: 0 };
  }
}

/**
 * Rate limit check for registration
 */
export async function checkRegisterRateLimit(identifier: string) {
  try {
    const result = await registerRateLimiter.limit(identifier);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
      retryAfter: result.retryAfter,
    };
  } catch (error) {
    logger.error("Rate limit check failed:", error);
    return { success: true, remaining: 1, reset: 0, retryAfter: 0 };
  }
}

/**
 * Rate limit check for email verification resend
 */
export async function checkEmailVerificationRateLimit(identifier: string) {
  try {
    const result = await emailVerificationRateLimiter.limit(identifier);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
      retryAfter: result.retryAfter,
    };
  } catch (error) {
    logger.error("Rate limit check failed:", error);
    return { success: true, remaining: 1, reset: 0, retryAfter: 0 };
  }
}

/**
 * Rate limit check for general API requests
 */
export async function checkApiRateLimit(identifier: string) {
  try {
    const result = await apiRateLimiter.limit(identifier);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
      retryAfter: result.retryAfter,
    };
  } catch (error) {
    logger.error("Rate limit check failed:", error);
    return { success: true, remaining: 1, reset: 0, retryAfter: 0 };
  }
}

/**
 * Middleware wrapper for rate limiting
 * Returns 429 Too Many Requests if limit exceeded
 */
export async function withRateLimit(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
  rateLimiter: ReturnType<(typeof Ratelimit)["slidingWindow"]>,
  options?: {
    keyPrefix?: string;
    onLimitExceeded?: (remaining: number) => void;
  },
): Promise<NextResponse> {
  const identifier = getIdentifier(request);

  try {
    const { success, remaining, reset, retryAfter } =
      await rateLimiter.limit(identifier);

    if (!success) {
      logger.warn(`Rate limit exceeded for ${identifier}`, {
        remaining,
        reset,
      });

      // Call optional callback
      options?.onLimitExceeded?.(remaining);

      // Return 429 Too Many Requests
      return new NextResponse(
        JSON.stringify({
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please try again later.",
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(retryAfter / 1000)),
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": String(Math.max(0, remaining)),
            "X-RateLimit-Reset": String(reset),
          },
        },
      );
    }

    // Rate limit OK; proceed with handler
    const response = await handler(request);

    // Add rate limit headers to response
    response.headers.set("X-RateLimit-Limit", "5");
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    response.headers.set("X-RateLimit-Reset", String(reset));

    return response;
  } catch (error) {
    logger.error("Rate limit middleware error:", error);
    // Fail open on Redis errors; don't block users
    return handler(request);
  }
}

/**
 * Account lockout mechanism (after repeated failed login attempts)
 * Locks account for 30 minutes after 10 failed attempts
 */
export async function checkAccountLockout(
  email: string,
  maxAttempts: number = 10,
  lockoutDuration: number = 30 * 60 * 1000, // 30 minutes
): Promise<{ locked: boolean; remainingTime?: number }> {
  try {
    const lockoutKey = `lockout:${email}`;
    const attemptsKey = `failed-login:${email}`;

    // Check if account is locked
    const lockoutTime = await redis.get<number>(lockoutKey);
    if (lockoutTime !== null) {
      const remainingTime = Math.max(0, lockoutTime - Date.now());
      return { locked: true, remainingTime };
    }

    return { locked: false };
  } catch (error) {
    logger.error("Account lockout check failed:", error);
    return { locked: false };
  }
}

/**
 * Increment failed login attempt counter
 */
export async function incrementFailedLoginAttempt(
  email: string,
  maxAttempts: number = 10,
  lockoutDuration: number = 30 * 60 * 1000,
): Promise<number> {
  try {
    const attemptsKey = `failed-login:${email}`;
    const lockoutKey = `lockout:${email}`;

    // Increment failed attempts
    const attempts = await redis.incr(attemptsKey);

    // Set expiry: 1 hour (reset counter if no login for 1 hour)
    await redis.expire(attemptsKey, 3600);

    // Lock account if max attempts exceeded
    if (attempts >= maxAttempts) {
      const lockoutTime = Date.now() + lockoutDuration;
      await redis.set(lockoutKey, lockoutTime, {
        ex: Math.ceil(lockoutDuration / 1000),
      });
      logger.warn(`Account locked due to failed login attempts: ${email}`, {
        attempts,
      });
    }

    return attempts;
  } catch (error) {
    logger.error("Failed to increment login attempt counter:", error);
    return 0;
  }
}

/**
 * Clear failed login attempts (on successful login)
 */
export async function clearFailedLoginAttempts(email: string): Promise<void> {
  try {
    const attemptsKey = `failed-login:${email}`;
    await redis.del(attemptsKey);
  } catch (error) {
    logger.error("Failed to clear login attempts:", error);
  }
}
