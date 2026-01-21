<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { getSystemHealthReport } from "@/lib/pipelineHealth";
import { logger, generateCorrelationId } from "@/lib/logger";
import { getRAGPipeline } from "@/lib/aiMoodAnalysis";
import { getKnowledgeGraph } from "@/lib/knowledgeGraph";
import { getEmbeddingCache } from "@/lib/embeddingCache";
import { getEnv } from "@/lib/env";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";
=======
import { NextRequest, NextResponse } from 'next/server';
import { getSystemHealthReport } from '@/lib/pipelineHealth';
import { logger, generateCorrelationId } from '@/lib/logger';
import { getRAGPipeline } from '@/lib/aiMoodAnalysis';
import { getKnowledgeGraph } from '@/lib/knowledgeGraph';
import { getEmbeddingCache } from '@/lib/embeddingCache';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Pipeline Health Check Endpoint
 * Provides detailed health status for RAG pipeline components
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * GET /api/health/pipeline
 */
export async function GET(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
<<<<<<< HEAD
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = await checkRateLimit(clientId, "/api/health/pipeline");
    if (!rateLimit.allowed) {
      logger.warn("Rate limit exceeded for pipeline health check", {
        correlationId,
        clientId,
      });
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "10",
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": String(rateLimit.resetTime),
            "Retry-After": String(
              Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
            ),
          },
        },
      );
    }
    // Get health report for pipeline components
    // Note: This requires components to be initialized
    // In production, components should be initialized at startup

    const cache = getEmbeddingCache();

    // Try to get pipeline components (may not be initialized)
    let vectorDB: any = null;
    let neo4jDriver: any = null;

=======
    // Get health report for pipeline components
    // Note: This requires components to be initialized
    // In production, components should be initialized at startup
    
    const cache = getEmbeddingCache();
    
    // Try to get pipeline components (may not be initialized)
    let vectorDB: any = null;
    let neo4jDriver: any = null;
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    try {
      const pipeline = getRAGPipeline();
      vectorDB = pipeline.getVectorDB();
    } catch (error) {
      // Pipeline not initialized - that's okay
    }
<<<<<<< HEAD

    try {
      // Note: Knowledge graph needs credentials to initialize
      // For health check, we check if it's configured but don't initialize unnecessarily
      const env = getEnv();
      if (env.NEO4J_URI) {
=======
    
    try {
      // Note: Knowledge graph needs credentials to initialize
      // For health check, we check if it's configured but don't initialize unnecessarily
      const graphUri = process.env.NEO4J_URI;
      if (graphUri) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        // Would check driver if available, but don't create new connection
        // This is a lightweight check
      }
    } catch (error) {
      // Neo4j not configured or not accessible
    }

    // Get system health report
    const healthReport = await getSystemHealthReport({
      vectorDB: vectorDB || undefined,
      neo4jDriver: neo4jDriver || undefined,
      cache,
    });

    const duration = Date.now() - startTime;

<<<<<<< HEAD
    logger.debug("Pipeline health check completed", {
=======
    logger.debug('Pipeline health check completed', {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      correlationId,
      duration,
      overall: healthReport.overall,
      components: healthReport.components.length,
    });

    return NextResponse.json(
      {
        ...healthReport,
        responseTime: duration,
        correlationId,
      },
      {
<<<<<<< HEAD
        status:
          healthReport.overall === "healthy"
            ? 200
            : healthReport.overall === "degraded"
              ? 200
              : 503,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "X-Correlation-ID": correlationId,
        },
      },
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Pipeline health check failed", error, {
      correlationId,
      duration,
    });

    return NextResponse.json(
      {
        overall: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
=======
        status: healthReport.overall === 'healthy' ? 200 : healthReport.overall === 'degraded' ? 200 : 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Correlation-ID': correlationId,
        },
      }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Pipeline health check failed', error, { correlationId, duration });

    return NextResponse.json(
      {
        overall: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        timestamp: Date.now(),
        responseTime: duration,
        correlationId,
      },
      {
        status: 503,
        headers: {
<<<<<<< HEAD
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "X-Correlation-ID": correlationId,
        },
      },
=======
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Correlation-ID': correlationId,
        },
      }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }
}
