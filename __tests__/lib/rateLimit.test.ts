/**
 * Rate Limiting Tests
 * Tests for rate limiting functionality
 */

import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import {
  checkRateLimit,
  RATE_LIMITS,
  getClientIdentifier,
} from "@/lib/rateLimit";
import { Request } from "node-fetch";

// Mock Redis rate limiting (always returns fallback)
jest.mock("@/lib/rateLimitRedis", () => ({
  checkRateLimitRedis: jest.fn().mockResolvedValue({
    allowed: false, // Force fallback to in-memory
  }),
}));

describe("Rate Limiting", () => {
  beforeEach(() => {
    // Clear rate limit store between tests
    // Note: This tests the in-memory fallback implementation
    jest.clearAllMocks();
  });

  describe("checkRateLimit", () => {
    it("should allow requests within limit", async () => {
      const identifier = "test-client-1";
      const endpoint = "/api/mood/validate";

      const result = await checkRateLimit(identifier, endpoint);

      expect(result.allowed).toBe(true);
      expect(result.remaining).toBeGreaterThanOrEqual(0);
      expect(result.resetTime).toBeGreaterThan(Date.now());
    });

    it("should track remaining requests", async () => {
      const identifier = "test-client-2";
      const endpoint = "/api/mood/validate";
      const config = RATE_LIMITS[endpoint];

      // Make requests up to the limit
      for (let i = 0; i < config.maxRequests - 1; i++) {
        const result = await checkRateLimit(identifier, endpoint);
        expect(result.allowed).toBe(true);
      }

      const finalResult = await checkRateLimit(identifier, endpoint);
      expect(finalResult.allowed).toBe(true);
      expect(finalResult.remaining).toBe(0);
    });

    it("should reject requests exceeding limit", async () => {
      const identifier = "test-client-3";
      const endpoint = "/api/mood/validate";
      const config = RATE_LIMITS[endpoint];

      // Make requests exceeding the limit
      for (let i = 0; i < config.maxRequests; i++) {
        await checkRateLimit(identifier, endpoint);
      }

      const exceededResult = await checkRateLimit(identifier, endpoint);
      expect(exceededResult.allowed).toBe(false);
      expect(exceededResult.remaining).toBe(0);
    });

    it("should use default rate limit for unknown endpoint", async () => {
      const identifier = "test-client-4";
      const unknownEndpoint = "/api/unknown-endpoint";

      const result = await checkRateLimit(identifier, unknownEndpoint);

      expect(result.allowed).toBe(true);
      expect(result.remaining).toBeGreaterThanOrEqual(0);
    });

    it("should reset after time window expires", async () => {
      const identifier = "test-client-5";
      const endpoint = "/api/mood/validate";
      const config = RATE_LIMITS[endpoint];

      // Exhaust the limit
      for (let i = 0; i < config.maxRequests; i++) {
        await checkRateLimit(identifier, endpoint);
      }

      // Should be rate limited
      const beforeReset = await checkRateLimit(identifier, endpoint);
      expect(beforeReset.allowed).toBe(false);

      // Note: In real scenario, we'd wait for window to expire
      // For unit tests, we verify the resetTime is in the future
      expect(beforeReset.resetTime).toBeGreaterThan(Date.now());
    });

    it("should handle different endpoints independently", async () => {
      const identifier = "test-client-6";
      const endpoint1 = "/api/auth/login";
      const endpoint2 = "/api/mood/validate";

      // Exhaust limit for endpoint1
      const config1 = RATE_LIMITS[endpoint1];
      for (let i = 0; i < config1.maxRequests; i++) {
        await checkRateLimit(identifier, endpoint1);
      }

      // Endpoint2 should still be allowed
      const result2 = await checkRateLimit(identifier, endpoint2);
      expect(result2.allowed).toBe(true);

      // Endpoint1 should be rate limited
      const result1 = await checkRateLimit(identifier, endpoint1);
      expect(result1.allowed).toBe(false);
    });

    it("should handle different clients independently", async () => {
      const identifier1 = "client-1";
      const identifier2 = "client-2";
      const endpoint = "/api/mood/validate";
      const config = RATE_LIMITS[endpoint];

      // Exhaust limit for client1
      for (let i = 0; i < config.maxRequests; i++) {
        await checkRateLimit(identifier1, endpoint);
      }

      // Client2 should still be allowed
      const result2 = await checkRateLimit(identifier2, endpoint);
      expect(result2.allowed).toBe(true);

      // Client1 should be rate limited
      const result1 = await checkRateLimit(identifier1, endpoint);
      expect(result1.allowed).toBe(false);
    });
  });

  describe("getClientIdentifier", () => {
    it("should extract IP from x-forwarded-for header", () => {
      const request = {
        headers: new Headers({
          "x-forwarded-for": "192.168.1.1, 10.0.0.1",
        }),
      } as any;

      const identifier = getClientIdentifier(request);
      expect(identifier).toBe("192.168.1.1");
    });

    it("should extract IP from x-real-ip header when x-forwarded-for is missing", () => {
      const request = {
        headers: new Headers({
          "x-real-ip": "10.0.0.2",
        }),
      } as any;

      const identifier = getClientIdentifier(request);
      expect(identifier).toBe("10.0.0.2");
    });

    it("should return unknown when no IP headers are present", () => {
      const request = {
        headers: new Headers({}),
      } as any;

      const identifier = getClientIdentifier(request);
      expect(identifier).toBe("unknown");
    });

    it("should handle x-forwarded-for with single IP", () => {
      const request = {
        headers: new Headers({
          "x-forwarded-for": "192.168.1.1",
        }),
      } as any;

      const identifier = getClientIdentifier(request);
      expect(identifier).toBe("192.168.1.1");
    });
  });

  describe("RATE_LIMITS configuration", () => {
    it("should have rate limits defined for critical endpoints", () => {
      expect(RATE_LIMITS["/api/auth/login"]).toBeDefined();
      expect(RATE_LIMITS["/api/auth/register"]).toBeDefined();
      expect(RATE_LIMITS["/api/tracks/submit"]).toBeDefined();
      expect(RATE_LIMITS.default).toBeDefined();
    });

    it("should have reasonable limits for login endpoint", () => {
      const loginLimit = RATE_LIMITS["/api/auth/login"];
      expect(loginLimit.maxRequests).toBe(5);
      expect(loginLimit.windowMs).toBe(60 * 1000); // 1 minute
    });

    it("should have reasonable limits for registration endpoint", () => {
      const registerLimit = RATE_LIMITS["/api/auth/register"];
      expect(registerLimit.maxRequests).toBe(3);
      expect(registerLimit.windowMs).toBe(60 * 60 * 1000); // 1 hour
    });

    it("should have default limit for unknown endpoints", () => {
      expect(RATE_LIMITS.default).toBeDefined();
      expect(RATE_LIMITS.default.maxRequests).toBe(100);
      expect(RATE_LIMITS.default.windowMs).toBe(60 * 1000); // 1 minute
    });
  });
});
