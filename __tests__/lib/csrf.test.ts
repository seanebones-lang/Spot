/**
 * CSRF Protection Tests
 * Tests for CSRF token generation and validation
 */

<<<<<<< HEAD
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { generateCsrfToken, validateCsrfToken } from "@/lib/csrf";
import { NextRequest } from "next/server";

// Mock logger to avoid console output during tests
jest.mock("@/lib/logger", () => ({
=======
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { generateCsrfToken, validateCsrfToken } from '@/lib/csrf';
import { NextRequest } from 'next/server';

// Mock logger to avoid console output during tests
jest.mock('@/lib/logger', () => ({
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  logger: {
    warn: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
}));

<<<<<<< HEAD
describe("CSRF Protection", () => {
=======
describe('CSRF Protection', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  beforeEach(() => {
    jest.clearAllMocks();
  });

<<<<<<< HEAD
  describe("generateCsrfToken", () => {
    it("should generate a valid CSRF token", () => {
      const token = generateCsrfToken();

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
=======
  describe('generateCsrfToken', () => {
    it('should generate a valid CSRF token', () => {
      const token = generateCsrfToken();
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      expect(token.length).toBe(64); // 32 bytes = 64 hex characters
      expect(token).toMatch(/^[a-f0-9]{64}$/i); // Hex format
    });

<<<<<<< HEAD
    it("should generate unique tokens", () => {
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();

      expect(token1).not.toBe(token2);
    });

    it("should generate tokens with sufficient entropy", () => {
=======
    it('should generate unique tokens', () => {
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();
      
      expect(token1).not.toBe(token2);
    });

    it('should generate tokens with sufficient entropy', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const tokens = new Set();
      for (let i = 0; i < 100; i++) {
        tokens.add(generateCsrfToken());
      }
<<<<<<< HEAD

=======
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // All 100 tokens should be unique
      expect(tokens.size).toBe(100);
    });
  });

<<<<<<< HEAD
  describe("validateCsrfToken", () => {
    const createMockRequest = (
      method: string,
      headerToken?: string,
      cookieToken?: string,
    ): NextRequest => {
      const url = new URL("http://localhost:3000/api/test");
      const headers = new Headers();
      if (headerToken) {
        headers.set("X-CSRF-Token", headerToken);
      }

      const cookies = new Map();
      if (cookieToken) {
        cookies.set("csrf-token", cookieToken);
      }

=======
  describe('validateCsrfToken', () => {
    const createMockRequest = (method: string, headerToken?: string, cookieToken?: string): NextRequest => {
      const url = new URL('http://localhost:3000/api/test');
      const headers = new Headers();
      if (headerToken) {
        headers.set('X-CSRF-Token', headerToken);
      }
      
      const cookies = new Map();
      if (cookieToken) {
        cookies.set('csrf-token', cookieToken);
      }
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      return {
        method,
        nextUrl: url,
        headers,
        cookies: {
          get: (name: string) => {
            const value = cookies.get(name);
            return value ? { value } : undefined;
          },
          has: (name: string) => cookies.has(name),
          set: jest.fn(),
        },
      } as any;
    };

<<<<<<< HEAD
    it("should allow GET requests without CSRF token", () => {
      const request = createMockRequest("GET");
      const result = validateCsrfToken(request);

      expect(result).toBe(true);
    });

    it("should allow HEAD requests without CSRF token", () => {
      const request = createMockRequest("HEAD");
      const result = validateCsrfToken(request);

      expect(result).toBe(true);
    });

    it("should allow OPTIONS requests without CSRF token", () => {
      const request = createMockRequest("OPTIONS");
      const result = validateCsrfToken(request);

      expect(result).toBe(true);
    });

    it("should validate matching header and cookie tokens", () => {
      const token = generateCsrfToken();
      const request = createMockRequest("POST", token, token);

      const result = validateCsrfToken(request);

      expect(result).toBe(true);
    });

    it("should reject POST request without header token", () => {
      const token = generateCsrfToken();
      const request = createMockRequest("POST", undefined, token);

      const result = validateCsrfToken(request);

      expect(result).toBe(false);
    });

    it("should reject POST request without cookie token", () => {
      const token = generateCsrfToken();
      const request = createMockRequest("POST", token, undefined);

      const result = validateCsrfToken(request);

      expect(result).toBe(false);
    });

    it("should reject POST request with mismatched tokens", () => {
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();
      const request = createMockRequest("POST", token1, token2);

      const result = validateCsrfToken(request);

      expect(result).toBe(false);
    });

    it("should reject invalid token format", () => {
      const request = createMockRequest(
        "POST",
        "invalid-token",
        "invalid-token",
      );

      const result = validateCsrfToken(request);

      expect(result).toBe(false);
    });

    it("should reject token that is too short", () => {
      const shortToken = "abc123";
      const request = createMockRequest("POST", shortToken, shortToken);

      const result = validateCsrfToken(request);

      expect(result).toBe(false);
    });

    it("should reject token that is too long", () => {
      const longToken = "a".repeat(65);
      const request = createMockRequest("POST", longToken, longToken);

      const result = validateCsrfToken(request);

      expect(result).toBe(false);
    });

    it("should reject token with invalid characters", () => {
      const invalidToken = "g".repeat(64) + "z"; // Contains non-hex character 'z'
      const request = createMockRequest("POST", invalidToken, invalidToken);

      const result = validateCsrfToken(request);

      expect(result).toBe(false);
    });

    it("should validate PUT requests", () => {
      const token = generateCsrfToken();
      const request = createMockRequest("PUT", token, token);

      const result = validateCsrfToken(request);

      expect(result).toBe(true);
    });

    it("should validate DELETE requests", () => {
      const token = generateCsrfToken();
      const request = createMockRequest("DELETE", token, token);

      const result = validateCsrfToken(request);

      expect(result).toBe(true);
    });

    it("should validate PATCH requests", () => {
      const token = generateCsrfToken();
      const request = createMockRequest("PATCH", token, token);

      const result = validateCsrfToken(request);

=======
    it('should allow GET requests without CSRF token', () => {
      const request = createMockRequest('GET');
      const result = validateCsrfToken(request);
      
      expect(result).toBe(true);
    });

    it('should allow HEAD requests without CSRF token', () => {
      const request = createMockRequest('HEAD');
      const result = validateCsrfToken(request);
      
      expect(result).toBe(true);
    });

    it('should allow OPTIONS requests without CSRF token', () => {
      const request = createMockRequest('OPTIONS');
      const result = validateCsrfToken(request);
      
      expect(result).toBe(true);
    });

    it('should validate matching header and cookie tokens', () => {
      const token = generateCsrfToken();
      const request = createMockRequest('POST', token, token);
      
      const result = validateCsrfToken(request);
      
      expect(result).toBe(true);
    });

    it('should reject POST request without header token', () => {
      const token = generateCsrfToken();
      const request = createMockRequest('POST', undefined, token);
      
      const result = validateCsrfToken(request);
      
      expect(result).toBe(false);
    });

    it('should reject POST request without cookie token', () => {
      const token = generateCsrfToken();
      const request = createMockRequest('POST', token, undefined);
      
      const result = validateCsrfToken(request);
      
      expect(result).toBe(false);
    });

    it('should reject POST request with mismatched tokens', () => {
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();
      const request = createMockRequest('POST', token1, token2);
      
      const result = validateCsrfToken(request);
      
      expect(result).toBe(false);
    });

    it('should reject invalid token format', () => {
      const request = createMockRequest('POST', 'invalid-token', 'invalid-token');
      
      const result = validateCsrfToken(request);
      
      expect(result).toBe(false);
    });

    it('should reject token that is too short', () => {
      const shortToken = 'abc123';
      const request = createMockRequest('POST', shortToken, shortToken);
      
      const result = validateCsrfToken(request);
      
      expect(result).toBe(false);
    });

    it('should reject token that is too long', () => {
      const longToken = 'a'.repeat(65);
      const request = createMockRequest('POST', longToken, longToken);
      
      const result = validateCsrfToken(request);
      
      expect(result).toBe(false);
    });

    it('should reject token with invalid characters', () => {
      const invalidToken = 'g'.repeat(64) + 'z'; // Contains non-hex character 'z'
      const request = createMockRequest('POST', invalidToken, invalidToken);
      
      const result = validateCsrfToken(request);
      
      expect(result).toBe(false);
    });

    it('should validate PUT requests', () => {
      const token = generateCsrfToken();
      const request = createMockRequest('PUT', token, token);
      
      const result = validateCsrfToken(request);
      
      expect(result).toBe(true);
    });

    it('should validate DELETE requests', () => {
      const token = generateCsrfToken();
      const request = createMockRequest('DELETE', token, token);
      
      const result = validateCsrfToken(request);
      
      expect(result).toBe(true);
    });

    it('should validate PATCH requests', () => {
      const token = generateCsrfToken();
      const request = createMockRequest('PATCH', token, token);
      
      const result = validateCsrfToken(request);
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      expect(result).toBe(true);
    });
  });
});
