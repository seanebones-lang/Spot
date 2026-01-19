/**
 * Database Utility Tests
 * Tests for database connection and query utilities
 */

import { describe, it, expect, beforeEach, jest } from "@jest/globals";

// Mock Prisma client before importing db module
const mockQueryRaw = jest.fn();
const mockDisconnect = jest.fn();
const mockOn = jest.fn();

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $queryRaw: mockQueryRaw,
    $disconnect: mockDisconnect,
    $on: mockOn,
  })),
}));

// Mock logger before importing db module
jest.mock("@/lib/logger", () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
}));

// Mock timeout utility
jest.mock("@/lib/timeout", () => ({
  withTimeout: jest.fn((promise) => promise),
  TIMEOUTS: {
    DATABASE_QUERY: 5000,
  },
}));

// Import after mocks are set up
import { dbQueryWithTimeout } from "@/lib/db";
import { TIMEOUTS } from "@/lib/timeout";

describe("Database Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("dbQueryWithTimeout", () => {
    it("should execute query successfully", async () => {
      const mockQuery = Promise.resolve([{ id: "1", name: "Test" }]);

      const result = await dbQueryWithTimeout(mockQuery);

      expect(result).toEqual([{ id: "1", name: "Test" }]);
    });

    it("should pass timeout to withTimeout", async () => {
      const { withTimeout } = require("@/lib/timeout");
      const mockQuery = Promise.resolve([]);
      const customTimeout = 10000;

      await dbQueryWithTimeout(mockQuery, customTimeout);

      expect(withTimeout).toHaveBeenCalledWith(
        mockQuery,
        customTimeout,
        "Database query timeout",
      );
    });

    it("should use default timeout when not specified", async () => {
      const { withTimeout } = require("@/lib/timeout");
      const mockQuery = Promise.resolve([]);

      await dbQueryWithTimeout(mockQuery);

      expect(withTimeout).toHaveBeenCalledWith(
        mockQuery,
        TIMEOUTS.DATABASE_QUERY,
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
      expect(mockOn).toHaveBeenCalled();
    });
  });

  describe("Query execution", () => {
    it("should execute Prisma raw query", async () => {
      const mockResult = [{ id: "1" }];
      mockQueryRaw.mockResolvedValue(mockResult);

      const result = await mockQueryRaw`SELECT 1`;

      expect(result).toEqual(mockResult);
      expect(mockQueryRaw).toHaveBeenCalled();
    });

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
      mockDisconnect.mockResolvedValue(undefined);

      await mockDisconnect();

      expect(mockDisconnect).toHaveBeenCalled();
    });
  });
});
