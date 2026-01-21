/**
 * Health Check API Route Tests
 * Tests for /api/health endpoint
 */

<<<<<<< HEAD
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
=======
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GET } from '@/app/api/health/route';
import { NextRequest } from 'next/server';

// Mock dependencies
jest.mock('@/lib/db');
jest.mock('@/lib/logger');
jest.mock('@/lib/env');
jest.mock('@/lib/pipelineHealth');
jest.mock('@/lib/pipelineMetrics');
jest.mock('@/lib/embeddingCache');

describe('Health Check API', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  let mockRequest: NextRequest;

  beforeEach(() => {
    jest.clearAllMocks();
<<<<<<< HEAD

    // Create mock NextRequest
    mockRequest = {
      nextUrl: new URL("http://localhost:3000/api/health"),
=======
    
    // Create mock NextRequest
    mockRequest = {
      nextUrl: new URL('http://localhost:3000/api/health'),
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      headers: new Headers(),
    } as any;

    // Mock logger
<<<<<<< HEAD
    const { logger } = require("@/lib/logger");
=======
    const { logger } = require('@/lib/logger');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    logger.error = jest.fn();
    logger.warn = jest.fn();
    logger.info = jest.fn();
    logger.debug = jest.fn();

    // Mock env validation
<<<<<<< HEAD
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
=======
    const { getEnv } = require('@/lib/env');
    getEnv.mockReturnValue({
      JWT_SECRET: 'test-secret',
      NODE_ENV: 'test',
    });
  });

  it('should return healthy status when all checks pass', async () => {
    // Mock Prisma database query
    const prisma = require('@/lib/db').default;
    prisma.$queryRaw = jest.fn().mockResolvedValue([{ '?column?': 1 }]);

    // Mock pipeline components (optional)
    const { getEmbeddingCache } = require('@/lib/embeddingCache');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    getEmbeddingCache.mockReturnValue({
      getStats: () => ({ size: 10, maxSize: 100 }),
    });

<<<<<<< HEAD
    const { getMetricsCollector } = require("@/lib/pipelineMetrics");
=======
    const { getMetricsCollector } = require('@/lib/pipelineMetrics');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    getMetricsCollector.mockReturnValue({
      getAggregateMetrics: () => [],
    });

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
<<<<<<< HEAD
    expect(data.status).toBe("healthy");
    expect(data.checks).toBeDefined();
    expect(data.checks.environment?.status).toBe("ok");
    expect(data.checks.database?.status).toBe("ok");
=======
    expect(data.status).toBe('healthy');
    expect(data.checks).toBeDefined();
    expect(data.checks.environment?.status).toBe('ok');
    expect(data.checks.database?.status).toBe('ok');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    expect(data.timestamp).toBeDefined();
    expect(data.uptime).toBeDefined();
  });

<<<<<<< HEAD
  it("should return unhealthy status when database check fails", async () => {
    // Mock database failure
    const prisma = require("@/lib/db").default;
    (prisma.$queryRaw as jest.Mock) = jest
      .fn()
      .mockRejectedValue(new Error("Connection failed"));

    const { getEmbeddingCache } = require("@/lib/embeddingCache");
=======
  it('should return unhealthy status when database check fails', async () => {
    // Mock database failure
    const prisma = require('@/lib/db').default;
    prisma.$queryRaw = jest.fn().mockRejectedValue(new Error('Connection failed'));

    const { getEmbeddingCache } = require('@/lib/embeddingCache');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    getEmbeddingCache.mockReturnValue({
      getStats: () => ({ size: 10, maxSize: 100 }),
    });

<<<<<<< HEAD
    const { getMetricsCollector } = require("@/lib/pipelineMetrics");
=======
    const { getMetricsCollector } = require('@/lib/pipelineMetrics');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    getMetricsCollector.mockReturnValue({
      getAggregateMetrics: () => [],
    });

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(503);
<<<<<<< HEAD
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
=======
    expect(data.status).toBe('unhealthy');
    expect(data.checks.database?.status).toBe('error');
    expect(data.checks.database?.message).toBeDefined();
  });

  it('should return unhealthy status when environment validation fails', async () => {
    // Mock environment validation failure
    const { getEnv } = require('@/lib/env');
    getEnv.mockImplementation(() => {
      throw new Error('JWT_SECRET is required');
    });

    // Mock database as working
    const prisma = require('@/lib/db').default;
    prisma.$queryRaw = jest.fn().mockResolvedValue([{ '?column?': 1 }]);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(503);
<<<<<<< HEAD
    expect(data.status).toBe("unhealthy");
    expect(data.checks.environment?.status).toBe("error");
  });

  it("should include correlation ID in response headers", async () => {
    const prisma = require("@/lib/db").default;
    (prisma.$queryRaw as jest.Mock) = jest
      .fn()
      .mockResolvedValue([{ "?column?": 1 }]);

    const { getEmbeddingCache } = require("@/lib/embeddingCache");
=======
    expect(data.status).toBe('unhealthy');
    expect(data.checks.environment?.status).toBe('error');
  });

  it('should include correlation ID in response headers', async () => {
    const prisma = require('@/lib/db').default;
    prisma.$queryRaw = jest.fn().mockResolvedValue([{ '?column?': 1 }]);

    const { getEmbeddingCache } = require('@/lib/embeddingCache');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    getEmbeddingCache.mockReturnValue({
      getStats: () => ({ size: 10, maxSize: 100 }),
    });

<<<<<<< HEAD
    const { getMetricsCollector } = require("@/lib/pipelineMetrics");
=======
    const { getMetricsCollector } = require('@/lib/pipelineMetrics');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    getMetricsCollector.mockReturnValue({
      getAggregateMetrics: () => [],
    });

    const response = await GET(mockRequest);

<<<<<<< HEAD
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
=======
    expect(response.headers.get('X-Correlation-ID')).toBeDefined();
    expect(response.headers.get('Cache-Control')).toBe('no-cache, no-store, must-revalidate');
  });

  it('should include memory usage check', async () => {
    const prisma = require('@/lib/db').default;
    prisma.$queryRaw = jest.fn().mockResolvedValue([{ '?column?': 1 }]);

    const { getEmbeddingCache } = require('@/lib/embeddingCache');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    getEmbeddingCache.mockReturnValue({
      getStats: () => ({ size: 10, maxSize: 100 }),
    });

<<<<<<< HEAD
    const { getMetricsCollector } = require("@/lib/pipelineMetrics");
=======
    const { getMetricsCollector } = require('@/lib/pipelineMetrics');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    getMetricsCollector.mockReturnValue({
      getAggregateMetrics: () => [],
    });

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(data.checks.memory).toBeDefined();
    expect(data.checks.memory.status).toBeDefined();
  });

<<<<<<< HEAD
  it("should handle optional xAI API check", async () => {
    // Mock with XAI_API_KEY
    process.env.XAI_API_KEY = "test-key";

    const prisma = require("@/lib/db").default;
    (prisma.$queryRaw as jest.Mock) = jest
      .fn()
      .mockResolvedValue([{ "?column?": 1 }]);

    const { getEmbeddingCache } = require("@/lib/embeddingCache");
=======
  it('should handle optional xAI API check', async () => {
    // Mock with XAI_API_KEY
    process.env.XAI_API_KEY = 'test-key';

    const prisma = require('@/lib/db').default;
    prisma.$queryRaw = jest.fn().mockResolvedValue([{ '?column?': 1 }]);

    const { getEmbeddingCache } = require('@/lib/embeddingCache');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    getEmbeddingCache.mockReturnValue({
      getStats: () => ({ size: 10, maxSize: 100 }),
    });

<<<<<<< HEAD
    const { getMetricsCollector } = require("@/lib/pipelineMetrics");
=======
    const { getMetricsCollector } = require('@/lib/pipelineMetrics');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    getMetricsCollector.mockReturnValue({
      getAggregateMetrics: () => [],
    });

    // Mock fetch for xAI API call
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
<<<<<<< HEAD
    } as any) as any;
=======
    });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

    const response = await GET(mockRequest);
    const data = await response.json();

    expect(data.checks.xai_api).toBeDefined();

    delete process.env.XAI_API_KEY;
  });
});
