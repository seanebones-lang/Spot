<<<<<<< HEAD
import { NextRequest } from "next/server";
import { verify, sign } from "jsonwebtoken";
import { randomBytes } from "crypto";
import { getEnv } from "@/lib/env";
import { logger } from "@/lib/logger";
import prisma from "@/lib/db";
=======
import { NextRequest } from 'next/server';
import { verify, sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { getEnv } from '@/lib/env';
import { logger } from '@/lib/logger';
import prisma from '@/lib/db';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Authentication utilities
 * Helper functions for JWT token verification and user extraction
 */

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

/**
 * Get JWT secret - throws error if not configured
 */
function getJwtSecret(): string {
  const env = getEnv();
  if (!env.JWT_SECRET) {
<<<<<<< HEAD
    throw new Error(
      "JWT_SECRET is not configured. This is required for authentication.",
    );
=======
    throw new Error('JWT_SECRET is not configured. This is required for authentication.');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }
  return env.JWT_SECRET;
}

/**
 * Verify JWT token from request
 * Returns decoded user info or null if invalid
 */
export function verifyToken(request: NextRequest): AuthUser | null {
  try {
<<<<<<< HEAD
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
=======
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      return null;
    }

    const token = authHeader.substring(7);
    const secret = getJwtSecret();

    const decoded = verify(token, secret) as AuthUser;
    return decoded;
  } catch (error) {
<<<<<<< HEAD
    logger.debug("Token verification failed", { error });
=======
    logger.debug('Token verification failed', { error });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return null;
  }
}

/**
 * Require authentication middleware
 * Returns user if authenticated, throws error if not
 */
export function requireAuth(request: NextRequest): AuthUser {
  const user = verifyToken(request);
  if (!user) {
<<<<<<< HEAD
    throw new Error("Unauthorized");
=======
    throw new Error('Unauthorized');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }
  return user;
}

/**
 * Require specific role
 */
<<<<<<< HEAD
export function requireRole(
  request: NextRequest,
  allowedRoles: string[],
): AuthUser {
  const user = requireAuth(request);
  if (!allowedRoles.includes(user.role)) {
    throw new Error("Forbidden: Insufficient permissions");
=======
export function requireRole(request: NextRequest, allowedRoles: string[]): AuthUser {
  const user = requireAuth(request);
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Forbidden: Insufficient permissions');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }
  return user;
}

/**
 * Token pair for authentication
 */
export interface TokenPair {
<<<<<<< HEAD
  accessToken: string; // Short-lived (15 minutes)
=======
  accessToken: string;  // Short-lived (15 minutes)
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  refreshToken: string; // Long-lived (30 days), stored in database
}

/**
 * Generate access token and refresh token pair
 */
export async function generateTokenPair(
  user: AuthUser,
<<<<<<< HEAD
  request: NextRequest,
): Promise<TokenPair> {
  const env = getEnv();
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
=======
  request: NextRequest
): Promise<TokenPair> {
  const env = getEnv();
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }

  // Generate short-lived access token (15 minutes)
  const accessToken = sign(
    { userId: user.userId, email: user.email, role: user.role },
    env.JWT_SECRET,
<<<<<<< HEAD
    { expiresIn: "15m" },
  );

  // Generate refresh token (random, stored in DB)
  const refreshToken = randomBytes(32).toString("hex");

  // Get client info
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
=======
    { expiresIn: '15m' }
  );

  // Generate refresh token (random, stored in DB)
  const refreshToken = randomBytes(32).toString('hex');

  // Get client info
  const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                    request.headers.get('x-real-ip') ||
                    'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

  // Store refresh token in database with expiration (30 days)
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.userId,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      ipAddress,
      userAgent,
    },
  });

  return { accessToken, refreshToken };
}

/**
 * Revoke refresh token
 */
export async function revokeRefreshToken(token: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: {
      token,
      revokedAt: null, // Only revoke if not already revoked
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

/**
 * Revoke all refresh tokens for a user
 */
export async function revokeAllRefreshTokens(userId: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: {
      userId,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

/**
 * Verify refresh token and return user
 */
export async function verifyRefreshToken(token: string): Promise<AuthUser> {
  const tokenRecord = await prisma.refreshToken.findUnique({
    where: { token },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          isActive: true,
        },
      },
    },
  });

  if (!tokenRecord) {
<<<<<<< HEAD
    throw new Error("Invalid refresh token");
  }

  if (tokenRecord.revokedAt) {
    throw new Error("Refresh token has been revoked");
  }

  if (tokenRecord.expiresAt < new Date()) {
    throw new Error("Refresh token has expired");
  }

  if (!tokenRecord.user.isActive) {
    throw new Error("User account is not active");
=======
    throw new Error('Invalid refresh token');
  }

  if (tokenRecord.revokedAt) {
    throw new Error('Refresh token has been revoked');
  }

  if (tokenRecord.expiresAt < new Date()) {
    throw new Error('Refresh token has expired');
  }

  if (!tokenRecord.user.isActive) {
    throw new Error('User account is not active');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }

  return {
    userId: tokenRecord.user.id,
    email: tokenRecord.user.email,
    role: tokenRecord.user.role,
  };
}
