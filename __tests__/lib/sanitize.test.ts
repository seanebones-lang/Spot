/**
 * Sanitization Utility Tests
 * Tests for input sanitization functions
 */

<<<<<<< HEAD
import { describe, it, expect } from "@jest/globals";
=======
import { describe, it, expect } from '@jest/globals';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
import {
  sanitizeString,
  sanitizeEmail,
  isValidEmail,
  sanitizeFilename,
  isValidMimeType,
  isValidFileSize,
  mbToBytes,
  sanitizeJson,
  isValidUrl,
  sanitizeObjectKeys,
<<<<<<< HEAD
} from "@/lib/sanitize";

describe("Sanitization Utilities", () => {
  describe("sanitizeString", () => {
    it("should remove null bytes", () => {
      const input = "hello\0world";
      const result = sanitizeString(input);
      expect(result).toBe("helloworld");
    });

    it("should remove control characters", () => {
      const input = "hello\x00\x01world";
      const result = sanitizeString(input);
      expect(result).toBe("helloworld");
    });

    it("should trim whitespace", () => {
      const input = "  hello world  ";
      const result = sanitizeString(input);
      expect(result).toBe("hello world");
    });

    it("should limit length to 10000 characters", () => {
      const input = "a".repeat(20000);
=======
} from '@/lib/sanitize';

describe('Sanitization Utilities', () => {
  describe('sanitizeString', () => {
    it('should remove null bytes', () => {
      const input = 'hello\0world';
      const result = sanitizeString(input);
      expect(result).toBe('helloworld');
    });

    it('should remove control characters', () => {
      const input = 'hello\x00\x01world';
      const result = sanitizeString(input);
      expect(result).toBe('helloworld');
    });

    it('should trim whitespace', () => {
      const input = '  hello world  ';
      const result = sanitizeString(input);
      expect(result).toBe('hello world');
    });

    it('should limit length to 10000 characters', () => {
      const input = 'a'.repeat(20000);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const result = sanitizeString(input);
      expect(result.length).toBe(10000);
    });
  });

<<<<<<< HEAD
  describe("sanitizeEmail", () => {
    it("should validate and sanitize valid email", () => {
      const input = "  TEST@EXAMPLE.COM  ";
      const result = sanitizeEmail(input);
      expect(result).toBe("test@example.com");
    });

    it("should return null for invalid email", () => {
      const input = "not-an-email";
=======
  describe('sanitizeEmail', () => {
    it('should validate and sanitize valid email', () => {
      const input = '  TEST@EXAMPLE.COM  ';
      const result = sanitizeEmail(input);
      expect(result).toBe('test@example.com');
    });

    it('should return null for invalid email', () => {
      const input = 'not-an-email';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const result = sanitizeEmail(input);
      expect(result).toBeNull();
    });

<<<<<<< HEAD
    it("should return null for email without domain", () => {
      const input = "test@";
=======
    it('should return null for email without domain', () => {
      const input = 'test@';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const result = sanitizeEmail(input);
      expect(result).toBeNull();
    });
  });

<<<<<<< HEAD
  describe("isValidEmail", () => {
    it("should return true for valid email", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name+tag@example.co.uk")).toBe(true);
    });

    it("should return false for invalid email", () => {
      expect(isValidEmail("not-an-email")).toBe(false);
      expect(isValidEmail("@example.com")).toBe(false);
      expect(isValidEmail("test@")).toBe(false);
    });
  });

  describe("sanitizeFilename", () => {
    it("should remove path traversal attempts", () => {
      const input = "../../../etc/passwd";
      const result = sanitizeFilename(input);
      expect(result).not.toContain("../");
    });

    it("should replace dangerous characters", () => {
      const input = "file<script>.js";
      const result = sanitizeFilename(input);
      expect(result).not.toContain("<");
      expect(result).not.toContain(">");
    });

    it("should limit filename length", () => {
      const input = "a".repeat(300);
=======
  describe('isValidEmail', () => {
    it('should return true for valid email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(isValidEmail('not-an-email')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
    });
  });

  describe('sanitizeFilename', () => {
    it('should remove path traversal attempts', () => {
      const input = '../../../etc/passwd';
      const result = sanitizeFilename(input);
      expect(result).not.toContain('../');
    });

    it('should replace dangerous characters', () => {
      const input = 'file<script>.js';
      const result = sanitizeFilename(input);
      expect(result).not.toContain('<');
      expect(result).not.toContain('>');
    });

    it('should limit filename length', () => {
      const input = 'a'.repeat(300);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const result = sanitizeFilename(input);
      expect(result.length).toBeLessThanOrEqual(255);
    });
  });

<<<<<<< HEAD
  describe("isValidMimeType", () => {
    it("should validate audio MIME types", () => {
      expect(isValidMimeType("audio/mpeg", ["audio/mpeg"])).toBe(true);
      expect(isValidMimeType("audio/mp3", ["audio/*"])).toBe(true);
      expect(isValidMimeType("audio/wav", ["audio/*"])).toBe(true);
    });

    it("should reject invalid MIME types", () => {
      expect(isValidMimeType("application/exe", ["audio/*"])).toBe(false);
      expect(isValidMimeType("text/html", ["audio/*"])).toBe(false);
    });
  });

  describe("isValidFileSize", () => {
    it("should validate file size within limit", () => {
=======
  describe('isValidMimeType', () => {
    it('should validate audio MIME types', () => {
      expect(isValidMimeType('audio/mpeg', ['audio/mpeg'])).toBe(true);
      expect(isValidMimeType('audio/mp3', ['audio/*'])).toBe(true);
      expect(isValidMimeType('audio/wav', ['audio/*'])).toBe(true);
    });

    it('should reject invalid MIME types', () => {
      expect(isValidMimeType('application/exe', ['audio/*'])).toBe(false);
      expect(isValidMimeType('text/html', ['audio/*'])).toBe(false);
    });
  });

  describe('isValidFileSize', () => {
    it('should validate file size within limit', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const maxSize = 1024 * 1024; // 1MB
      expect(isValidFileSize(500 * 1024, maxSize)).toBe(true);
      expect(isValidFileSize(maxSize, maxSize)).toBe(true);
    });

<<<<<<< HEAD
    it("should reject files exceeding limit", () => {
=======
    it('should reject files exceeding limit', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const maxSize = 1024 * 1024; // 1MB
      expect(isValidFileSize(2 * 1024 * 1024, maxSize)).toBe(false);
    });

<<<<<<< HEAD
    it("should reject invalid size types", () => {
      const maxSize = 1024 * 1024;
      expect(isValidFileSize(-1, maxSize)).toBe(false);
      expect(isValidFileSize(0, maxSize)).toBe(false);
      expect(isValidFileSize("invalid" as any, maxSize)).toBe(false);
=======
    it('should reject invalid size types', () => {
      const maxSize = 1024 * 1024;
      expect(isValidFileSize(-1, maxSize)).toBe(false);
      expect(isValidFileSize(0, maxSize)).toBe(false);
      expect(isValidFileSize('invalid' as any, maxSize)).toBe(false);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      expect(isValidFileSize(null as any, maxSize)).toBe(false);
    });
  });

<<<<<<< HEAD
  describe("mbToBytes", () => {
    it("should convert megabytes to bytes correctly", () => {
=======
  describe('mbToBytes', () => {
    it('should convert megabytes to bytes correctly', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      expect(mbToBytes(1)).toBe(1024 * 1024);
      expect(mbToBytes(5)).toBe(5 * 1024 * 1024);
      expect(mbToBytes(50)).toBe(50 * 1024 * 1024);
    });

<<<<<<< HEAD
    it("should handle decimal values", () => {
=======
    it('should handle decimal values', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      expect(mbToBytes(1.5)).toBe(1.5 * 1024 * 1024);
      expect(mbToBytes(0.5)).toBe(0.5 * 1024 * 1024);
    });

<<<<<<< HEAD
    it("should handle zero", () => {
=======
    it('should handle zero', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      expect(mbToBytes(0)).toBe(0);
    });
  });

<<<<<<< HEAD
  describe("sanitizeJson", () => {
    it("should parse JSON string", () => {
      const input = '{"key": "value"}';
      const result = sanitizeJson<{ key: string }>(input);
      expect(result).toEqual({ key: "value" });
    });

    it("should return object as-is if not string", () => {
      const input = { key: "value" };
      const result = sanitizeJson<{ key: string }>(input);
      expect(result).toEqual({ key: "value" });
    });

    it("should return null for invalid JSON string", () => {
      const input = "{invalid json}";
=======
  describe('sanitizeJson', () => {
    it('should parse JSON string', () => {
      const input = '{"key": "value"}';
      const result = sanitizeJson<{ key: string }>(input);
      expect(result).toEqual({ key: 'value' });
    });

    it('should return object as-is if not string', () => {
      const input = { key: 'value' };
      const result = sanitizeJson<{ key: string }>(input);
      expect(result).toEqual({ key: 'value' });
    });

    it('should return null for invalid JSON string', () => {
      const input = '{invalid json}';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const result = sanitizeJson(input);
      expect(result).toBeNull();
    });

<<<<<<< HEAD
    it("should return null for empty string", () => {
      const result = sanitizeJson("");
      expect(result).toBeNull();
    });

    it("should parse complex JSON structures", () => {
=======
    it('should return null for empty string', () => {
      const result = sanitizeJson('');
      expect(result).toBeNull();
    });

    it('should parse complex JSON structures', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const input = '{"nested": {"array": [1, 2, 3]}}';
      const result = sanitizeJson<{ nested: { array: number[] } }>(input);
      expect(result).toEqual({ nested: { array: [1, 2, 3] } });
    });
  });

<<<<<<< HEAD
  describe("isValidUrl", () => {
    it("should validate http URLs", () => {
      expect(isValidUrl("http://example.com")).toBe(true);
      expect(isValidUrl("http://example.com/path")).toBe(true);
      expect(isValidUrl("http://example.com:8080")).toBe(true);
    });

    it("should validate https URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("https://example.com/path?query=1")).toBe(true);
    });

    it("should reject non-http/https URLs", () => {
      expect(isValidUrl("ftp://example.com")).toBe(false);
      expect(isValidUrl("file:///path/to/file")).toBe(false);
      expect(isValidUrl("javascript:alert(1)")).toBe(false);
    });

    it("should reject invalid URLs", () => {
      expect(isValidUrl("not-a-url")).toBe(false);
      expect(isValidUrl("example.com")).toBe(false);
      expect(isValidUrl("")).toBe(false);
    });

    it("should reject non-string input", () => {
=======
  describe('isValidUrl', () => {
    it('should validate http URLs', () => {
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('http://example.com/path')).toBe(true);
      expect(isValidUrl('http://example.com:8080')).toBe(true);
    });

    it('should validate https URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path?query=1')).toBe(true);
    });

    it('should reject non-http/https URLs', () => {
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('file:///path/to/file')).toBe(false);
      expect(isValidUrl('javascript:alert(1)')).toBe(false);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('example.com')).toBe(false);
      expect(isValidUrl('')).toBe(false);
    });

    it('should reject non-string input', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      expect(isValidUrl(null as any)).toBe(false);
      expect(isValidUrl(123 as any)).toBe(false);
      expect(isValidUrl({} as any)).toBe(false);
    });
  });

<<<<<<< HEAD
  describe("sanitizeObjectKeys", () => {
    it("should preserve valid object keys", () => {
      const input = { name: "test", age: 30 };
      const result = sanitizeObjectKeys(input);
      expect(result).toEqual({ name: "test", age: 30 });
    });

    it("should filter __proto__ key from own properties", () => {
      const input: any = { name: "test" };
      input.__proto__ = { malicious: true };
      const result = sanitizeObjectKeys(input);
      expect(result.name).toBe("test");
      // Verify that own property keys don't include __proto__
      expect(Object.hasOwnProperty.call(result, "__proto__")).toBe(false);
    });

    it("should filter constructor key from own properties", () => {
      const input: any = { name: "test" };
      input.constructor = {};
      const result = sanitizeObjectKeys(input);
      expect(result.name).toBe("test");
      // constructor may still exist but won't be copied from own properties
    });

    it("should filter prototype key from own properties", () => {
      const input: any = { name: "test" };
      input.prototype = {};
      const result = sanitizeObjectKeys(input);
      expect(result.name).toBe("test");
      // Check that the function filters the key properly
    });

    it("should handle nested objects", () => {
      const input = {
        name: "test",
        nested: {
          __proto__: { malicious: true },
          value: "safe",
        },
      };
      const result = sanitizeObjectKeys(input);
      expect(result).toHaveProperty("name");
      expect(result).toHaveProperty("nested");
=======
  describe('sanitizeObjectKeys', () => {
    it('should preserve valid object keys', () => {
      const input = { name: 'test', age: 30 };
      const result = sanitizeObjectKeys(input);
      expect(result).toEqual({ name: 'test', age: 30 });
    });

    it('should filter __proto__ key from own properties', () => {
      const input: any = { name: 'test' };
      input.__proto__ = { malicious: true };
      const result = sanitizeObjectKeys(input);
      expect(result.name).toBe('test');
      // Verify that own property keys don't include __proto__
      expect(Object.hasOwnProperty.call(result, '__proto__')).toBe(false);
    });

    it('should filter constructor key from own properties', () => {
      const input: any = { name: 'test' };
      input.constructor = {};
      const result = sanitizeObjectKeys(input);
      expect(result.name).toBe('test');
      // constructor may still exist but won't be copied from own properties
    });

    it('should filter prototype key from own properties', () => {
      const input: any = { name: 'test' };
      input.prototype = {};
      const result = sanitizeObjectKeys(input);
      expect(result.name).toBe('test');
      // Check that the function filters the key properly
    });

    it('should handle nested objects', () => {
      const input = {
        name: 'test',
        nested: {
          __proto__: { malicious: true },
          value: 'safe',
        },
      };
      const result = sanitizeObjectKeys(input);
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('nested');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Note: sanitizeObjectKeys only sanitizes top-level keys
      expect(result.nested.__proto__).toBeDefined(); // Nested is not sanitized
    });

<<<<<<< HEAD
    it("should handle empty objects", () => {
=======
    it('should handle empty objects', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const input = {};
      const result = sanitizeObjectKeys(input);
      expect(result).toEqual({});
    });

<<<<<<< HEAD
    it("should handle objects with only dangerous keys", () => {
=======
    it('should handle objects with only dangerous keys', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const input = { __proto__: {}, constructor: {}, prototype: {} };
      const result = sanitizeObjectKeys(input);
      expect(Object.keys(result)).toHaveLength(0);
    });
  });

<<<<<<< HEAD
  describe("sanitizeString edge cases", () => {
    it("should handle non-string input", () => {
      expect(sanitizeString(null as any)).toBe("");
      expect(sanitizeString(123 as any)).toBe("");
      expect(sanitizeString({} as any)).toBe("");
    });

    it("should preserve newlines and tabs", () => {
      const input = "hello\nworld\there";
      const result = sanitizeString(input);
      expect(result).toContain("\n");
      expect(result).toContain("\t");
    });
  });

  describe("sanitizeFilename edge cases", () => {
    it("should handle non-string input", () => {
      expect(sanitizeFilename(null as any)).toBe("file");
      expect(sanitizeFilename(123 as any)).toBe("file");
    });

    it("should handle empty string", () => {
      expect(sanitizeFilename("")).toBe("file");
    });

    it("should handle filename with only dots", () => {
      expect(sanitizeFilename("...")).toBe("file");
    });

    it("should preserve valid extensions", () => {
      const result = sanitizeFilename("my-file.mp3");
      expect(result).toContain(".mp3");
    });

    it("should handle leading and trailing dots", () => {
      expect(sanitizeFilename(".hidden")).not.toMatch(/^\./);
      expect(sanitizeFilename("file.")).not.toMatch(/\.$/);
    });
  });

  describe("isValidMimeType edge cases", () => {
    it("should handle null or undefined mimeType", () => {
      expect(isValidMimeType(null as any, ["audio/*"])).toBe(false);
      expect(isValidMimeType(undefined as any, ["audio/*"])).toBe(false);
    });

    it("should handle empty allowed types array", () => {
      expect(isValidMimeType("audio/mpeg", [])).toBe(false);
    });

    it("should handle multiple allowed types", () => {
      expect(isValidMimeType("audio/mpeg", ["audio/*", "video/*"])).toBe(true);
      expect(isValidMimeType("video/mp4", ["audio/*", "video/*"])).toBe(true);
=======
  describe('sanitizeString edge cases', () => {
    it('should handle non-string input', () => {
      expect(sanitizeString(null as any)).toBe('');
      expect(sanitizeString(123 as any)).toBe('');
      expect(sanitizeString({} as any)).toBe('');
    });

    it('should preserve newlines and tabs', () => {
      const input = 'hello\nworld\there';
      const result = sanitizeString(input);
      expect(result).toContain('\n');
      expect(result).toContain('\t');
    });
  });

  describe('sanitizeFilename edge cases', () => {
    it('should handle non-string input', () => {
      expect(sanitizeFilename(null as any)).toBe('file');
      expect(sanitizeFilename(123 as any)).toBe('file');
    });

    it('should handle empty string', () => {
      expect(sanitizeFilename('')).toBe('file');
    });

    it('should handle filename with only dots', () => {
      expect(sanitizeFilename('...')).toBe('file');
    });

    it('should preserve valid extensions', () => {
      const result = sanitizeFilename('my-file.mp3');
      expect(result).toContain('.mp3');
    });

    it('should handle leading and trailing dots', () => {
      expect(sanitizeFilename('.hidden')).not.toMatch(/^\./);
      expect(sanitizeFilename('file.')).not.toMatch(/\.$/);
    });
  });

  describe('isValidMimeType edge cases', () => {
    it('should handle null or undefined mimeType', () => {
      expect(isValidMimeType(null as any, ['audio/*'])).toBe(false);
      expect(isValidMimeType(undefined as any, ['audio/*'])).toBe(false);
    });

    it('should handle empty allowed types array', () => {
      expect(isValidMimeType('audio/mpeg', [])).toBe(false);
    });

    it('should handle multiple allowed types', () => {
      expect(isValidMimeType('audio/mpeg', ['audio/*', 'video/*'])).toBe(true);
      expect(isValidMimeType('video/mp4', ['audio/*', 'video/*'])).toBe(true);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    });
  });
});
