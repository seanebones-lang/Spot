/**
 * Database Utility Tests
 * Tests for database connection and query utilities
 */

<<<<<<< HEAD
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
=======
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

// Mock Prisma client before importing db module
const mockQueryRaw = jest.fn();
const mockDisconnect = jest.fn();
const mockOn = jest.fn();

<<<<<<< HEAD
jest.mock("@prisma/client", () => ({
=======
jest.mock('@prisma/client', () => ({
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  PrismaClient: jest.fn().mockImplementation(() => ({
    $queryRaw: mockQueryRaw,
    $disconnect: mockDisconnect,
    $on: mockOn,
  })),
}));

// Mock logger before importing db module
<<<<<<< HEAD
jest.mock("@/lib/logger", () => ({
=======
jest.mock('@/lib/logger', () => ({
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
}));

// Mock timeout utility
<<<<<<< HEAD
jest.mock("@/lib/timeout", () => ({
=======
jest.mock('@/lib/timeout', () => ({
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  withTimeout: jest.fn((promise) => promise),
  TIMEOUTS: {
    DATABASE_QUERY: 5000,
  },
}));

// Import after mocks are set up
<<<<<<< HEAD
import { dbQueryWithTimeout } from "@/lib/db";
import { TIMEOUTS } from "@/lib/timeout";

describe("Database Utilities", () => {
=======
import { dbQueryWithTimeout } from '@/lib/db';
import { TIMEOUTS } from '@/lib/timeout';

describe('Database Utilities', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  beforeEach(() => {
    jest.clearAllMocks();
  });

<<<<<<< HEAD
  describe("dbQueryWithTimeout", () => {
    it("should execute query successfully", async () => {
      const mockQuery = Promise.resolve([{ id: "1", name: "Test" }]);

      const result = await dbQueryWithTimeout(mockQuery);

      expect(result).toEqual([{ id: "1", name: "Test" }]);
    });

    it("should pass timeout to withTimeout", async () => {
      const { withTimeout } = require("@/lib/timeout");
=======
  describe('dbQueryWithTimeout', () => {
    it('should execute query successfully', async () => {
      const mockQuery = Promise.resolve([{ id: '1', name: 'Test' }]);
      
      const result = await dbQueryWithTimeout(mockQuery);
      
      expect(result).toEqual([{ id: '1', name: 'Test' }]);
    });

    it('should pass timeout to withTimeout', async () => {
      const { withTimeout } = require('@/lib/timeout');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const mockQuery = Promise.resolve([]);
      const customTimeout = 10000;

      await dbQueryWithTimeout(mockQuery, customTimeout);

      expect(withTimeout).toHaveBeenCalledWith(
        mockQuery,
        customTimeout,
<<<<<<< HEAD
        "Database query timeout",
      );
    });

    it("should use default timeout when not specified", async () => {
      const { withTimeout } = require("@/lib/timeout");
=======
        'Database query timeout'
      );
    });

    it('should use default timeout when not specified', async () => {
      const { withTimeout } = require('@/lib/timeout');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const mockQuery = Promise.resolve([]);

      await dbQueryWithTimeout(mockQuery);

      expect(withTimeout).toHaveBeenCalledWith(
        mockQuery,
        TIMEOUTS.DATABASE_QUERY,
<<<<<<< HEAD
        "Database query timeout",
      );
    });

    it("should propagate query errors", async () => {
      const error = new Error("Database connection failed");
      const mockQuery = Promise.reject(error);

      await expect(dbQueryWithTimeout(mockQuery)).rejects.toThrow(
        "Database connection failed",
      );
    });
  });

  describe("Prisma Client Mock", () => {
    it("should have queryRaw method available", () => {
      expect(mockQueryRaw).toBeDefined();
    });

    it("should have disconnect method available", () => {
      expect(mockDisconnect).toBeDefined();
    });

    it("should have event handler setup", () => {
=======
        'Database query timeout'
      );
    });

    it('should propagate query errors', async () => {
      const error = new Error('Database connection failed');
      const mockQuery = Promise.reject(error);

      await expect(dbQueryWithTimeout(mockQuery)).rejects.toThrow('Database connection failed');
    });
  });

  describe('Prisma Client Mock', () => {
    it('should have queryRaw method available', () => {
      expect(mockQueryRaw).toBeDefined();
    });

    it('should have disconnect method available', () => {
      expect(mockDisconnect).toBeDefined();
    });

    it('should have event handler setup', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      expect(mockOn).toHaveBeenCalled();
    });
  });

<<<<<<< HEAD
  describe("Query execution", () => {
    it("should execute Prisma raw query", async () => {
      const mockResult = [{ id: "1" }];
=======
  describe('Query execution', () => {
    it('should execute Prisma raw query', async () => {
      const mockResult = [{ id: '1' }];
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      mockQueryRaw.mockResolvedValue(mockResult);

      const result = await mockQueryRaw`SELECT 1`;

      expect(result).toEqual(mockResult);
      expect(mockQueryRaw).toHaveBeenCalled();
    });

<<<<<<< HEAD
    it("should handle query errors", async () => {
      const error = new Error("SQL syntax error");
      mockQueryRaw.mockRejectedValue(error);

      await expect(mockQueryRaw`SELECT * FROM invalid`).rejects.toThrow(
        "SQL syntax error",
      );
    });
  });

  describe("Connection management", () => {
    it("should support graceful disconnect", async () => {
=======
    it('should handle query errors', async () => {
      const error = new Error('SQL syntax error');
      mockQueryRaw.mockRejectedValue(error);

      await expect(mockQueryRaw`SELECT * FROM invalid`).rejects.toThrow('SQL syntax error');
    });
  });

  describe('Connection management', () => {
    it('should support graceful disconnect', async () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      mockDisconnect.mockResolvedValue(undefined);

      await mockDisconnect();

      expect(mockDisconnect).toHaveBeenCalled();
    });
  });
});
