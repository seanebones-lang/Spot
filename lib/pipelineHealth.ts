/**
 * Pipeline Health Check Utilities
 * Health monitoring for RAG pipeline components
 */

<<<<<<< HEAD
import { PipelineHealthStatus, SystemHealthReport } from "./types/pipeline";
import { withTimeout, TIMEOUTS } from "./timeout";
=======
import { PipelineHealthStatus, SystemHealthReport } from './types/pipeline';
import { withTimeout, TIMEOUTS } from './timeout';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Check health of vector database
 */
export async function checkVectorDBHealth(
<<<<<<< HEAD
  vectorDB: any, // VectorDatabase interface
): Promise<PipelineHealthStatus> {
  const startTime = Date.now();

=======
  vectorDB: any // VectorDatabase interface
): Promise<PipelineHealthStatus> {
  const startTime = Date.now();
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  try {
    // Try a simple query to test connectivity
    // This would be a lightweight query for health check
    await withTimeout(
      Promise.resolve(), // Placeholder - would call vectorDB.healthCheck() if available
      TIMEOUTS.DATABASE_QUERY,
<<<<<<< HEAD
      "Vector DB health check timeout",
    );

    const latency = Date.now() - startTime;

    return {
      component: "vector_db",
      status: latency < 500 ? "healthy" : "degraded",
=======
      'Vector DB health check timeout'
    );
    
    const latency = Date.now() - startTime;
    
    return {
      component: 'vector_db',
      status: latency < 500 ? 'healthy' : 'degraded',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      latency,
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
<<<<<<< HEAD
      component: "vector_db",
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
=======
      component: 'vector_db',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      timestamp: Date.now(),
    };
  }
}

/**
 * Check health of Neo4j knowledge graph
 */
export async function checkNeo4jHealth(
<<<<<<< HEAD
  driver: any, // Neo4j driver
): Promise<PipelineHealthStatus> {
  const startTime = Date.now();

=======
  driver: any // Neo4j driver
): Promise<PipelineHealthStatus> {
  const startTime = Date.now();
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  try {
    await withTimeout(
      driver.verifyConnectivity(),
      TIMEOUTS.DATABASE_QUERY,
<<<<<<< HEAD
      "Neo4j health check timeout",
    );

    const latency = Date.now() - startTime;

    return {
      component: "neo4j",
      status: latency < 500 ? "healthy" : "degraded",
=======
      'Neo4j health check timeout'
    );
    
    const latency = Date.now() - startTime;
    
    return {
      component: 'neo4j',
      status: latency < 500 ? 'healthy' : 'degraded',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      latency,
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
<<<<<<< HEAD
      component: "neo4j",
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
=======
      component: 'neo4j',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      timestamp: Date.now(),
    };
  }
}

/**
 * Check health of embedding cache
 */
export async function checkCacheHealth(
<<<<<<< HEAD
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
=======
  cache: any // EmbeddingCache
): Promise<PipelineHealthStatus> {
  const startTime = Date.now();
  
  try {
    const stats = cache.getStats();
    const cacheFullness = stats.size / stats.maxSize;
    
    const latency = Date.now() - startTime;
    
    // Cache is healthy if it's not full and responding quickly
    const status = cacheFullness < 0.9 && latency < 10 ? 'healthy' : 'degraded';
    
    return {
      component: 'embedding_cache',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      status,
      latency,
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
<<<<<<< HEAD
      component: "embedding_cache",
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error",
=======
      component: 'embedding_cache',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Check each component
  if (options.vectorDB) {
    components.push(await checkVectorDBHealth(options.vectorDB));
  }
<<<<<<< HEAD

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

=======
  
  if (options.neo4jDriver) {
    components.push(await checkNeo4jHealth(options.neo4jDriver));
  }
  
  if (options.cache) {
    components.push(await checkCacheHealth(options.cache));
  }
  
  // Determine overall health
  const unhealthyCount = components.filter(c => c.status === 'unhealthy').length;
  const degradedCount = components.filter(c => c.status === 'degraded').length;
  
  let overall: 'healthy' | 'degraded' | 'unhealthy';
  if (unhealthyCount > 0) {
    overall = 'unhealthy';
  } else if (degradedCount > 0) {
    overall = 'degraded';
  } else {
    overall = 'healthy';
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  return {
    overall,
    components,
    timestamp: Date.now(),
  };
}
