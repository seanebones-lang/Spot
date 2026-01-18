/**
 * Password Utility Tests
 * Tests for password hashing, verification, and strength validation
 */

import { describe, it, expect } from '@jest/globals';
import {
  hashPassword,
  verifyPassword,
  validatePasswordStrength,
} from '@/lib/password';

describe('Password Utilities', () => {
  describe('hashPassword', () => {
    it('should hash a valid password', async () => {
      const password = 'TestPassword123';
      const hash = await hashPassword(password);
      
      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash.length).toBeGreaterThan(0);
      expect(hash).not.toBe(password); // Hash should be different from password
      expect(hash).toMatch(/^\$2[aby]\$/); // bcrypt hash format
    });

    it('should throw error for empty password', async () => {
      await expect(hashPassword('')).rejects.toThrow('Password must be a non-empty string');
    });

    it('should throw error for non-string password', async () => {
      await expect(hashPassword(null as any)).rejects.toThrow('Password must be a non-empty string');
      await expect(hashPassword(123 as any)).rejects.toThrow('Password must be a non-empty string');
    });

    it('should throw error for password less than 8 characters', async () => {
      await expect(hashPassword('Short1')).rejects.toThrow('Password must be at least 8 characters long');
    });

    it('should hash different passwords differently', async () => {
      const password1 = 'TestPassword123';
      const password2 = 'TestPassword456';
      
      const hash1 = await hashPassword(password1);
      const hash2 = await hashPassword(password2);
      
      expect(hash1).not.toBe(hash2);
    });

    it('should hash same password differently each time (salt)', async () => {
      const password = 'TestPassword123';
      
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      // Same password should produce different hashes due to salt
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('verifyPassword', () => {
    it('should verify correct password against hash', async () => {
      const password = 'TestPassword123';
      const hash = await hashPassword(password);
      
      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const password = 'TestPassword123';
      const wrongPassword = 'WrongPassword123';
      const hash = await hashPassword(password);
      
      const isValid = await verifyPassword(wrongPassword, hash);
      expect(isValid).toBe(false);
    });

    it('should return false for null password', async () => {
      const hash = await hashPassword('TestPassword123');
      const isValid = await verifyPassword(null as any, hash);
      expect(isValid).toBe(false);
    });

    it('should return false for null hash', async () => {
      const isValid = await verifyPassword('TestPassword123', null as any);
      expect(isValid).toBe(false);
    });

    it('should return false for empty strings', async () => {
      const hash = await hashPassword('TestPassword123');
      const isValid1 = await verifyPassword('', hash);
      const isValid2 = await verifyPassword('TestPassword123', '');
      
      expect(isValid1).toBe(false);
      expect(isValid2).toBe(false);
    });

    it('should handle malformed hash gracefully', async () => {
      const isValid = await verifyPassword('TestPassword123', 'not-a-valid-hash');
      expect(isValid).toBe(false);
    });
  });

  describe('validatePasswordStrength', () => {
    it('should accept valid password', () => {
      const result = validatePasswordStrength('ValidPassword123');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject password less than 8 characters', () => {
      const result = validatePasswordStrength('Short1');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be at least 8 characters long');
    });

    it('should reject password longer than 128 characters', () => {
      const longPassword = 'A'.repeat(129) + 'a1';
      const result = validatePasswordStrength(longPassword);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be less than 128 characters');
    });

    it('should reject password without lowercase letter', () => {
      const result = validatePasswordStrength('UPPERCASE123');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    it('should reject password without uppercase letter', () => {
      const result = validatePasswordStrength('lowercase123');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should reject password without number', () => {
      const result = validatePasswordStrength('NoNumbersHere');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('should report multiple errors', () => {
      const result = validatePasswordStrength('short');
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
      expect(result.errors).toContain('Password must be at least 8 characters long');
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('should accept password with special characters', () => {
      const result = validatePasswordStrength('Valid!Pass@123');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should accept password exactly 8 characters', () => {
      const result = validatePasswordStrength('ValidP12');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should accept password exactly 128 characters', () => {
      const password = 'A'.repeat(124) + 'a123'; // 124 + 4 = 128
      const result = validatePasswordStrength(password);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
