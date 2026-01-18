/**
 * Sanitization Utility Tests
 * Tests for input sanitization functions
 */

import { describe, it, expect } from '@jest/globals';
import {
  sanitizeString,
  sanitizeEmail,
  isValidEmail,
  sanitizeFilename,
  isValidMimeType,
  isValidFileSize,
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
      const result = sanitizeString(input);
      expect(result.length).toBe(10000);
    });
  });

  describe('sanitizeEmail', () => {
    it('should validate and sanitize valid email', () => {
      const input = '  TEST@EXAMPLE.COM  ';
      const result = sanitizeEmail(input);
      expect(result).toBe('test@example.com');
    });

    it('should return null for invalid email', () => {
      const input = 'not-an-email';
      const result = sanitizeEmail(input);
      expect(result).toBeNull();
    });

    it('should return null for email without domain', () => {
      const input = 'test@';
      const result = sanitizeEmail(input);
      expect(result).toBeNull();
    });
  });

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
      const result = sanitizeFilename(input);
      expect(result.length).toBeLessThanOrEqual(255);
    });
  });

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
      const maxSize = 1024 * 1024; // 1MB
      expect(isValidFileSize(500 * 1024, maxSize)).toBe(true);
      expect(isValidFileSize(maxSize, maxSize)).toBe(true);
    });

    it('should reject files exceeding limit', () => {
      const maxSize = 1024 * 1024; // 1MB
      expect(isValidFileSize(2 * 1024 * 1024, maxSize)).toBe(false);
    });
  });
});
