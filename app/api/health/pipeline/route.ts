import { NextRequest, NextResponse } from "next/server";
import { getSystemHealthReport } from "@/lib/pipelineHealth";
import { logger, generateCorrelationId } from "@/lib/logger";
import { getRAGPipeline } from "@/lib/aiMoodAnalysis";
import { getKnowledgeGraph } from "@/lib/knowledgeGraph";
import { getEmbeddingCache } from "@/lib/embeddingCache";

/**
 * Pipeline Health Check Endpoint
 * Provides detailed health status for RAG pipeline components
 *
 * GET /api/health/pipeline
 */
export async function GET(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
    // Get health report for pipeline components
    // Note: This requires components to be initialized
    // In production, components should be initialized at startup

    const cache = getEmbeddingCache();

    // Try to get pipeline components (may not be initialized)
    let vectorDB: any = null;
    let neo4jDriver: any = null;

    try {
      const pipeline = getRAGPipeline();
      vectorDB = pipeline.getVectorDB();
    } catch (error) {
      // Pipeline not initialized - that's okay
    }

    try {
      // Note: Knowledge graph needs credentials to initialize
      // For health check, we check if it's configured but don't initialize unnecessarily
      const graphUri = process.env.NEO4J_URI;
      if (graphUri) {
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

    logger.debug("Pipeline health check completed", {
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
        timestamp: Date.now(),
        responseTime: duration,
        correlationId,
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "X-Correlation-ID": correlationId,
        },
      },
    );
  }
}
