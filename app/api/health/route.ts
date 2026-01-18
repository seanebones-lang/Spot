import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';
import { logger, generateCorrelationId } from '@/lib/logger';
import prisma from '@/lib/db';
import { getSystemHealthReport } from '@/lib/pipelineHealth';
import { getMetricsCollector } from '@/lib/pipelineMetrics';
import { getEmbeddingCache } from '@/lib/embeddingCache';

/**
 * Health Check Endpoint
 * Used by load balancers and monitoring systems
 * Returns 200 if service is healthy, 503 if unhealthy
 */
export async function GET(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();
  const health: {
    status: 'healthy' | 'unhealthy';
    timestamp: string;
    uptime: number;
    checks: Record<string, { status: string; message?: string }>;
  } = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {},
  };

  // Check environment variables
  try {
    getEnv();
    health.checks.environment = { status: 'ok' };
  } catch (error) {
    health.status = 'unhealthy';
    health.checks.environment = {
      status: 'error',
      message: error instanceof Error ? error.message : 'Environment validation failed',
    };
    logger.error('Health check: environment validation failed', error, { correlationId });
  }

  // Check database connectivity
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.checks.database = { status: 'ok' };
  } catch (error) {
    health.status = 'unhealthy';
    health.checks.database = {
      status: 'error',
      message: error instanceof Error ? error.message : 'Database connection failed',
    };
    logger.error('Health check: database connection failed', error, { correlationId });
  }

  // Check external API (xAI) - optional
  if (process.env.XAI_API_KEY) {
    try {
      // Quick connectivity check (with timeout)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch('https://api.x.ai/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
        },
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId));
      
      if (response.ok) {
        health.checks.xai_api = { status: 'ok' };
      } else {
        health.checks.xai_api = { status: 'degraded', message: `API returned ${response.status}` };
      }
    } catch (error) {
      // Don't fail health check for external API issues
      health.checks.xai_api = {
        status: 'degraded',
        message: error instanceof Error ? error.message : 'External API check failed',
      };
    }
  } else {
    health.checks.xai_api = { status: 'skipped', message: 'XAI_API_KEY not configured' };
  }

  // Check memory usage (warn if > 90%)
  const memoryUsage = process.memoryUsage();
  const memoryPercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
  if (memoryPercent > 90) {
    health.status = 'unhealthy';
    health.checks.memory = {
      status: 'error',
      message: `High memory usage: ${memoryPercent.toFixed(2)}%`,
    };
  } else {
    health.checks.memory = {
      status: 'ok',
      message: `Memory usage: ${memoryPercent.toFixed(2)}%`,
    };
  }

    // Check RAG pipeline components (optional - only if configured)
    try {
      const cache = getEmbeddingCache();
      const cacheStats = cache.getStats();
      
      health.checks.embedding_cache = {
        status: cacheStats.size < cacheStats.maxSize * 0.9 ? 'ok' : 'degraded',
        message: `Cache: ${cacheStats.size}/${cacheStats.maxSize} entries`,
      };
    } catch (error) {
      health.checks.embedding_cache = {
        status: 'degraded',
        message: error instanceof Error ? error.message : 'Cache check failed',
      };
    }

    // Check pipeline metrics
    try {
      const metricsCollector = getMetricsCollector();
      const aggregates = metricsCollector.getAggregateMetrics();
      
      if (aggregates.length > 0) {
        const avgLatency = aggregates.reduce((sum, m) => sum + m.avgDuration, 0) / aggregates.length;
        health.checks.pipeline_metrics = {
          status: avgLatency < 200 ? 'ok' : 'degraded',
          message: `Avg latency: ${avgLatency.toFixed(2)}ms, Stages: ${aggregates.length}`,
        };
      } else {
        health.checks.pipeline_metrics = {
          status: 'ok',
          message: 'No metrics collected yet',
        };
      }
    } catch (error) {
      health.checks.pipeline_metrics = {
        status: 'degraded',
        message: error instanceof Error ? error.message : 'Metrics check failed',
      };
    }

    // Note: Vector DB and Neo4j health checks require active connections
    // These are checked separately in pipeline orchestration, not in general health endpoint
    // For production, add specific endpoint: /api/health/pipeline

    const responseTime = Date.now() - startTime;
    health.checks.responseTime = {
      status: 'ok',
      message: `${responseTime}ms`,
    };

    const duration = Date.now() - startTime;
    if (health.status === 'healthy') {
      logger.debug('Health check passed', { correlationId, duration, checks: Object.keys(health.checks) });
    } else {
      logger.warn('Health check failed', { correlationId, duration, checks: health.checks });
    }

    return NextResponse.json(health, {
      status: health.status === 'healthy' ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Correlation-ID': correlationId,
      },
    });
}
