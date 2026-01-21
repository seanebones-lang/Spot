<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { logger, generateCorrelationId } from "@/lib/logger";
import prisma from "@/lib/db";
=======
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { logger, generateCorrelationId } from '@/lib/logger';
import prisma from '@/lib/db';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Get Current User API
 * Returns authenticated user info from JWT token
 */
export async function GET(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  try {
    // Require authentication (this will throw if not authenticated)
    const authUser = requireAuth(request);

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
        emailVerifiedAt: true,
      },
    });

    if (!user) {
<<<<<<< HEAD
      logger.warn("User not found in database", {
        correlationId,
        userId: authUser.userId,
      });
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const duration = Date.now() - startTime;
    logger.info("User info retrieved", {
      correlationId,
      userId: user.id,
      duration,
    });
=======
      logger.warn('User not found in database', { correlationId, userId: authUser.userId });
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const duration = Date.now() - startTime;
    logger.info('User info retrieved', { correlationId, userId: user.id, duration });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
<<<<<<< HEAD
    if (error instanceof Error && error.message === "Unauthorized") {
      logger.warn("Unauthorized access attempt", { correlationId, duration });
      return NextResponse.json(
        { error: "No authorization token provided or token is invalid" },
        { status: 401 },
      );
    }

    logger.error("Auth check error", error, { correlationId, duration });
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
=======
    if (error instanceof Error && error.message === 'Unauthorized') {
      logger.warn('Unauthorized access attempt', { correlationId, duration });
      return NextResponse.json(
        { error: 'No authorization token provided or token is invalid' },
        { status: 401 }
      );
    }
    
    logger.error('Auth check error', error, { correlationId, duration });
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }
}
