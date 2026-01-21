<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { revokeRefreshToken, revokeAllRefreshTokens } from "@/lib/auth";
import { logger, generateCorrelationId } from "@/lib/logger";
=======
import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { revokeRefreshToken, revokeAllRefreshTokens } from '@/lib/auth';
import { logger, generateCorrelationId } from '@/lib/logger';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Logout Endpoint
 * Revokes refresh tokens to invalidate sessions
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
    // Require authentication
    const user = requireAuth(request);

    const body = await request.json();
    const { refreshToken, allDevices } = body;

    // If refreshToken provided, revoke that specific token
<<<<<<< HEAD
    if (refreshToken && typeof refreshToken === "string") {
      await revokeRefreshToken(refreshToken);
      logger.info("Refresh token revoked", {
        correlationId,
        userId: user.userId,
      });
=======
    if (refreshToken && typeof refreshToken === 'string') {
      await revokeRefreshToken(refreshToken);
      logger.info('Refresh token revoked', { correlationId, userId: user.userId });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }

    // If allDevices is true, revoke all refresh tokens for the user
    if (allDevices === true) {
      await revokeAllRefreshTokens(user.userId);
<<<<<<< HEAD
      logger.info("All refresh tokens revoked", {
        correlationId,
        userId: user.userId,
      });
=======
      logger.info('All refresh tokens revoked', { correlationId, userId: user.userId });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }

    // If neither provided, revoke all tokens (default behavior)
    if (!refreshToken && allDevices !== true) {
      await revokeAllRefreshTokens(user.userId);
<<<<<<< HEAD
      logger.info("All refresh tokens revoked (default)", {
        correlationId,
        userId: user.userId,
      });
    }

    const duration = Date.now() - startTime;
    logger.info("Logout successful", {
      correlationId,
      userId: user.userId,
      duration,
    });

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    const duration = Date.now() - startTime;

    // If not authenticated, still return success (idempotent)
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({
        success: true,
        message: "Logged out successfully",
      });
    }

    logger.error("Logout error", error, { correlationId, duration });

    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
=======
      logger.info('All refresh tokens revoked (default)', { correlationId, userId: user.userId });
    }

    const duration = Date.now() - startTime;
    logger.info('Logout successful', { correlationId, userId: user.userId, duration });

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    
    // If not authenticated, still return success (idempotent)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({
        success: true,
        message: 'Logged out successfully',
      });
    }

    logger.error('Logout error', error, { correlationId, duration });

    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }
}
