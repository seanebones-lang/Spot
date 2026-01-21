<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { validateStartup } from "@/lib/startup-validation";
import { logger } from "@/lib/logger";
=======
import { NextRequest, NextResponse } from 'next/server';
import { validateStartup } from '@/lib/startup-validation';
import { logger } from '@/lib/logger';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Startup Check Endpoint
 * Validates environment configuration
 * Useful for health checks and deployment verification
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * This endpoint will:
 * - Validate all required environment variables
 * - Return 200 if valid, 500 if invalid
 * - Can be used by deployment platforms to verify configuration
 */
export async function GET(request: NextRequest) {
  try {
    validateStartup();
    return NextResponse.json({
<<<<<<< HEAD
      status: "ok",
      message: "Environment configuration is valid",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error("Startup check failed", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Environment configuration is invalid",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
=======
      status: 'ok',
      message: 'Environment configuration is valid',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Startup check failed', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Environment configuration is invalid',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }
}
