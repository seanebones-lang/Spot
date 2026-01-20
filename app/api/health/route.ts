import { NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import prisma from "@/lib/db";
import { logger, generateCorrelationId } from "@/lib/logger";

/**
 * Health Check Endpoint
 * Verifies basic service health and critical dependencies
 * GET /api/health
 */
export async function GET() {
  const correlationId = generateCorrelationId();
  try {
    const env = getEnv();
    
    // Check database connectivity
    let dbStatus = "unknown";
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbStatus = "connected";
    } catch (error) {
      dbStatus = "disconnected";
      logger.warn("Database health check failed", { correlationId });
    }

    // Basic health check
    const health = {
      status: dbStatus === "connected" ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      service: "empulse-music-api",
      version: process.env.npm_package_version || "1.0.0",
      environment: env.NODE_ENV,
      dependencies: {
        database: dbStatus,
      },
    };

    return NextResponse.json(health, { 
      status: health.status === "ok" ? 200 : 503 
    });
  } catch (error) {
    logger.error("Health check failed", error, { correlationId });
    return NextResponse.json(
      { status: "error", message: "Health check failed" },
      { status: 500 },
    );
  }
}
