/**
 * Health Check API Route Tests
 * Tests for /api/health endpoint
 */

import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { GET } from "@/app/api/health/route";
import { NextRequest } from "next/server";

// Mock dependencies
jest.mock("@/lib/db");
jest.mock("@/lib/logger");
jest.mock("@/lib/env");
jest.mock("@/lib/pipelineHealth");
jest.mock("@/lib/pipelineMetrics");
jest.mock("@/lib/embeddingCache");

describe("Health Check API", () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create mock NextRequest
    mockRequest = {
      nextUrl: new URL("http://localhost:3000/api/health"),
      headers: new Headers(),
    } as any;

    // Mock logger
    const { logger } = require("@/lib/logger");
    logger.error = jest.fn();
    logger.warn = jest.fn();
    logger.info = jest.fn();
    logger.debug = jest.fn();

    // Mock env validation
    const { getEnv } = require("@/lib/env");
    getEnv.mockReturnValue({
      JWT_SECRET: "test-secret",
      NODE_ENV: "test",
    });
  });

  it("should return healthy status when all checks pass", async () => {
    // Mock Prisma database query
    const prisma = require("@/lib/db").default;
    (prisma.$queryRaw as jest.Mock) = jest
      .fn()
      .mockResolvedValue([{ "?column?": 1 }]);

    // Mock pipeline components (optional)
    const { getEmbeddingCache } = require("@/lib/embeddingCache");
    getEmbeddingCache.mockReturnValue({
      getStats: () => ({ size: 10, maxSize: 100 }),
    });

    const { getMetricsCollector } = require("@/lib/pipelineMetrics");
    getMetricsCollector.mockReturnValue({
      getAggregateMetrics: () => [],
    });

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe("healthy");
    expect(data.checks).toBeDefined();
    expect(data.checks.environment?.status).toBe("ok");
    expect(data.checks.database?.status).toBe("ok");
    expect(data.timestamp).toBeDefined();
    expect(data.uptime).toBeDefined();
  });

  it("should return unhealthy status when database check fails", async () => {
    // Mock database failure
    const prisma = require("@/lib/db").default;
    (prisma.$queryRaw as jest.Mock) = jest
      .fn()
      .mockRejectedValue(new Error("Connection failed"));

    const { getEmbeddingCache } = require("@/lib/embeddingCache");
    getEmbeddingCache.mockReturnValue({
      getStats: () => ({ size: 10, maxSize: 100 }),
    });

    const { getMetricsCollector } = require("@/lib/pipelineMetrics");
    getMetricsCollector.mockReturnValue({
      getAggregateMetrics: () => [],
    });

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.status).toBe("unhealthy");
    expect(data.checks.database?.status).toBe("error");
    expect(data.checks.database?.message).toBeDefined();
  });

  it("should return unhealthy status when environment validation fails", async () => {
    // Mock environment validation failure
    const { getEnv } = require("@/lib/env");
    getEnv.mockImplementation(() => {
      throw new Error("JWT_SECRET is required");
    });

    // Mock database as working
    const prisma = require("@/lib/db").default;
    (prisma.$queryRaw as jest.Mock) = jest
      .fn()
      .mockResolvedValue([{ "?column?": 1 }]);

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.status).toBe("unhealthy");
    expect(data.checks.environment?.status).toBe("error");
  });

  it("should include correlation ID in response headers", async () => {
    const prisma = require("@/lib/db").default;
    (prisma.$queryRaw as jest.Mock) = jest
      .fn()
      .mockResolvedValue([{ "?column?": 1 }]);

    const { getEmbeddingCache } = require("@/lib/embeddingCache");
    getEmbeddingCache.mockReturnValue({
      getStats: () => ({ size: 10, maxSize: 100 }),
    });

    const { getMetricsCollector } = require("@/lib/pipelineMetrics");
    getMetricsCollector.mockReturnValue({
      getAggregateMetrics: () => [],
    });

    const response = await GET(mockRequest);

    expect(response.headers.get("X-Correlation-ID")).toBeDefined();
    expect(response.headers.get("Cache-Control")).toBe(
      "no-cache, no-store, must-revalidate",
    );
  });

  it("should include memory usage check", async () => {
    const prisma = require("@/lib/db").default;
    (prisma.$queryRaw as jest.Mock) = jest
      .fn()
      .mockResolvedValue([{ "?column?": 1 }]);

    const { getEmbeddingCache } = require("@/lib/embeddingCache");
    getEmbeddingCache.mockReturnValue({
      getStats: () => ({ size: 10, maxSize: 100 }),
    });

    const { getMetricsCollector } = require("@/lib/pipelineMetrics");
    getMetricsCollector.mockReturnValue({
      getAggregateMetrics: () => [],
    });

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(data.checks.memory).toBeDefined();
    expect(data.checks.memory.status).toBeDefined();
  });

  it("should handle optional xAI API check", async () => {
    // Mock with XAI_API_KEY
    process.env.XAI_API_KEY = "test-key";

    const prisma = require("@/lib/db").default;
    (prisma.$queryRaw as jest.Mock) = jest
      .fn()
      .mockResolvedValue([{ "?column?": 1 }]);

    const { getEmbeddingCache } = require("@/lib/embeddingCache");
    getEmbeddingCache.mockReturnValue({
      getStats: () => ({ size: 10, maxSize: 100 }),
    });

    const { getMetricsCollector } = require("@/lib/pipelineMetrics");
    getMetricsCollector.mockReturnValue({
      getAggregateMetrics: () => [],
    });

    // Mock fetch for xAI API call
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
    } as any) as any;

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(data.checks.xai_api).toBeDefined();

    delete process.env.XAI_API_KEY;
  });
});
