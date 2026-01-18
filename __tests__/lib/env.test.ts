/**
 * Environment Variable Validation Tests
 * Tests for environment variable validation logic
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

// Store original env vars
const originalEnv = process.env;

describe('Environment Variable Validation', () => {
  beforeEach(() => {
    // Reset environment before each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original environment
    process.env = originalEnv;
  });

  describe('JWT_SECRET validation', () => {
    it('should throw error if JWT_SECRET is missing', () => {
      delete process.env.JWT_SECRET;
      delete process.env.NODE_ENV;
      
      // Dynamically import to get fresh validation
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).toThrow('JWT_SECRET is required');
    });

    it('should throw error if JWT_SECRET is too short', () => {
      process.env.JWT_SECRET = 'short';
      process.env.NODE_ENV = 'production';
      
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).toThrow('JWT_SECRET must be at least 32 characters long');
    });

    it('should throw error if JWT_SECRET is default value', () => {
      process.env.JWT_SECRET = 'your-secret-key-change-in-production';
      process.env.NODE_ENV = 'production';
      
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).toThrow('JWT_SECRET must be changed from the default value');
    });

    it('should accept valid JWT_SECRET', () => {
      process.env.JWT_SECRET = 'a'.repeat(32);
      process.env.NODE_ENV = 'development';
      
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).not.toThrow();
    });
  });

  describe('NODE_ENV validation', () => {
    it('should throw error if NODE_ENV is missing', () => {
      process.env.JWT_SECRET = 'a'.repeat(32);
      delete process.env.NODE_ENV;
      
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).toThrow('NODE_ENV is required');
    });

    it('should throw error if NODE_ENV is invalid', () => {
      process.env.JWT_SECRET = 'a'.repeat(32);
      process.env.NODE_ENV = 'invalid';
      
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).toThrow('NODE_ENV must be one of');
    });

    it('should accept valid NODE_ENV values', () => {
      process.env.JWT_SECRET = 'a'.repeat(32);
      
      for (const env of ['development', 'production', 'test']) {
        process.env.NODE_ENV = env;
        const { validateEnv } = require('@/lib/env');
        expect(() => validateEnv()).not.toThrow();
      }
    });
  });

  describe('Production environment validations', () => {
    beforeEach(() => {
      process.env.JWT_SECRET = 'a'.repeat(32);
      process.env.NODE_ENV = 'production';
    });

    it('should require Neo4j URI in production', () => {
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).toThrow('NEO4J_URI is required in production');
    });

    it('should validate Neo4j URI format', () => {
      process.env.NEO4J_URI = 'invalid-uri';
      
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).toThrow('NEO4J_URI is required in production');
    });

    it('should accept valid Neo4j URI', () => {
      process.env.NEO4J_URI = 'neo4j://localhost:7687';
      process.env.NEO4J_USER = 'neo4j';
      process.env.NEO4J_PASSWORD = 'password';
      process.env.PINECONE_API_KEY = 'pcsk_test_key';
      process.env.PINECONE_INDEX_NAME = 'test-index';
      
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).not.toThrow();
    });

    it('should require Neo4j USER in production', () => {
      process.env.NEO4J_URI = 'neo4j://localhost:7687';
      
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).toThrow('NEO4J_USER is required in production');
    });

    it('should require Neo4j PASSWORD in production', () => {
      process.env.NEO4J_URI = 'neo4j://localhost:7687';
      process.env.NEO4J_USER = 'neo4j';
      
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).toThrow('NEO4J_PASSWORD is required in production');
    });

    it('should require Pinecone API key in production', () => {
      process.env.NEO4J_URI = 'neo4j://localhost:7687';
      process.env.NEO4J_USER = 'neo4j';
      process.env.NEO4J_PASSWORD = 'password';
      
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).toThrow('PINECONE_API_KEY is required in production');
    });

    it('should validate Pinecone API key format', () => {
      process.env.NEO4J_URI = 'neo4j://localhost:7687';
      process.env.NEO4J_USER = 'neo4j';
      process.env.NEO4J_PASSWORD = 'password';
      process.env.PINECONE_API_KEY = 'invalid-key';
      
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).toThrow('PINECONE_API_KEY is required in production');
    });

    it('should require Pinecone index name in production', () => {
      process.env.NEO4J_URI = 'neo4j://localhost:7687';
      process.env.NEO4J_USER = 'neo4j';
      process.env.NEO4J_PASSWORD = 'password';
      process.env.PINECONE_API_KEY = 'pcsk_test_key';
      
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).toThrow('PINECONE_INDEX_NAME is required in production');
    });
  });

  describe('Development environment', () => {
    beforeEach(() => {
      process.env.JWT_SECRET = 'a'.repeat(32);
      process.env.NODE_ENV = 'development';
    });

    it('should not require Neo4j in development', () => {
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).not.toThrow();
    });

    it('should not require Pinecone in development', () => {
      const { validateEnv } = require('@/lib/env');
      
      expect(() => validateEnv()).not.toThrow();
    });
  });

  describe('getEnv function', () => {
    it('should return validated environment variables', () => {
      process.env.JWT_SECRET = 'a'.repeat(32);
      process.env.NODE_ENV = 'development';
      process.env.XAI_API_KEY = 'test-key';
      
      const { getEnv } = require('@/lib/env');
      const env = getEnv();
      
      expect(env.JWT_SECRET).toBe('a'.repeat(32));
      expect(env.NODE_ENV).toBe('development');
      expect(env.XAI_API_KEY).toBe('test-key');
    });
  });
});
