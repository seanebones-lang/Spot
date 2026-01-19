/**
 * Pipeline Health Check Utilities
 * Health monitoring for RAG pipeline components
 */

import { PipelineHealthStatus, SystemHealthReport } from "./types/pipeline";
import { withTimeout, TIMEOUTS } from "./timeout";

/**
 * Check health of vector database
 */
export async function checkVectorDBHealth(
  vectorDB: any, // VectorDatabase interface
): Promise<PipelineHealthStatus> {
  const startTime = Date.now();

  try {
    // Try a simple query to test connectivity
    // This would be a lightweight query for health check
    await withTimeout(
      Promise.resolve(), // Placeholder - would call vectorDB.healthCheck() if available
      TIMEOUTS.DATABASE_QUERY,
      "Vector DB health check timeout",
    );

    const latency = Date.now() - startTime;

    return {
      component: "vector_db",
      status: latency < 500 ? "healthy" : "degraded",
      latency,
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
      component: "vector_db",
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}

/**
 * Check health of Neo4j knowledge graph
 */
export async function checkNeo4jHealth(
  driver: any, // Neo4j driver
): Promise<PipelineHealthStatus> {
  const startTime = Date.now();

  try {
    await withTimeout(
      driver.verifyConnectivity(),
      TIMEOUTS.DATABASE_QUERY,
      "Neo4j health check timeout",
    );

    const latency = Date.now() - startTime;

    return {
      component: "neo4j",
      status: latency < 500 ? "healthy" : "degraded",
      latency,
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
      component: "neo4j",
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}

/**
 * Check health of embedding cache
 */
export async function checkCacheHealth(
  cache: any, // EmbeddingCache
): Promise<PipelineHealthStatus> {
  const startTime = Date.now();

  try {
    const stats = cache.getStats();
    const cacheFullness = stats.size / stats.maxSize;

    const latency = Date.now() - startTime;

    // Cache is healthy if it's not full and responding quickly
    const status = cacheFullness < 0.9 && latency < 10 ? "healthy" : "degraded";

    return {
      component: "embedding_cache",
      status,
      latency,
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
      component: "embedding_cache",
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: Date.now(),
    };
  }
}

/**
 * Get comprehensive system health report
 */
export async function getSystemHealthReport(options: {
  vectorDB?: any;
  neo4jDriver?: any;
  cache?: any;
}): Promise<SystemHealthReport> {
  const components: PipelineHealthStatus[] = [];

  // Check each component
  if (options.vectorDB) {
    components.push(await checkVectorDBHealth(options.vectorDB));
  }

  if (options.neo4jDriver) {
    components.push(await checkNeo4jHealth(options.neo4jDriver));
  }

  if (options.cache) {
    components.push(await checkCacheHealth(options.cache));
  }

  // Determine overall health
  const unhealthyCount = components.filter(
    (c) => c.status === "unhealthy",
  ).length;
  const degradedCount = components.filter(
    (c) => c.status === "degraded",
  ).length;

  let overall: "healthy" | "degraded" | "unhealthy";
  if (unhealthyCount > 0) {
    overall = "unhealthy";
  } else if (degradedCount > 0) {
    overall = "degraded";
  } else {
    overall = "healthy";
  }

  return {
    overall,
    components,
    timestamp: Date.now(),
  };
}
