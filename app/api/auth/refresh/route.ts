import { NextRequest, NextResponse } from "next/server";
import {
  generateTokenPair,
  verifyRefreshToken,
  revokeRefreshToken,
} from "@/lib/auth";
import { logger, generateCorrelationId } from "@/lib/logger";

/**
 * Refresh Token Endpoint
 * Exchanges a refresh token for a new access token and refresh token pair
 * Implements token rotation for enhanced security
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken || typeof refreshToken !== "string") {
      return NextResponse.json(
        { error: "Refresh token is required" },
        { status: 400 },
      );
    }

    // Verify refresh token and get user
    let user;
    try {
      user = await verifyRefreshToken(refreshToken);
    } catch (error) {
      logger.warn("Invalid refresh token", {
        correlationId,
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return NextResponse.json(
        { error: "Invalid or expired refresh token" },
        { status: 401 },
      );
    }

    // Revoke old refresh token (token rotation)
    await revokeRefreshToken(refreshToken);

    // Generate new token pair
    const tokens = await generateTokenPair(user, request);

    const duration = Date.now() - startTime;
    logger.info("Token refresh successful", {
      correlationId,
      userId: user.userId,
      duration,
    });

    return NextResponse.json({
      success: true,
      ...tokens,
      message: "Tokens refreshed successfully",
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Token refresh error", error, { correlationId, duration });

    return NextResponse.json(
      { error: "Failed to refresh tokens. Please log in again." },
      { status: 500 },
    );
  }
}
