<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";
import { logger, generateCorrelationId } from "@/lib/logger";
import { hashPassword, validatePasswordStrength } from "@/lib/password";
import { revokeAllRefreshTokens } from "@/lib/auth";
import prisma from "@/lib/db";
=======
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { logger, generateCorrelationId } from '@/lib/logger';
import { hashPassword, validatePasswordStrength } from '@/lib/password';
import { revokeAllRefreshTokens } from '@/lib/auth';
import prisma from '@/lib/db';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Reset Password Endpoint
 * Validates reset token and updates password
 * Rate limited: 5 requests per hour per IP
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
<<<<<<< HEAD
    const rateLimit = await checkRateLimit(
      clientId,
      "/api/auth/reset-password",
    );
    if (!rateLimit.allowed) {
      logger.warn("Rate limit exceeded for reset password", {
        correlationId,
        clientId,
      });
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": String(rateLimit.remaining),
            "X-RateLimit-Reset": String(rateLimit.resetTime),
            "Retry-After": String(
              Math.ceil((rateLimit.resetTime - Date.now()) / 1000),
            ),
          },
        },
=======
    const rateLimit = await checkRateLimit(clientId, '/api/auth/reset-password');
    if (!rateLimit.allowed) {
      logger.warn('Rate limit exceeded for reset password', { correlationId, clientId });
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': String(rateLimit.remaining),
            'X-RateLimit-Reset': String(rateLimit.resetTime),
            'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
          },
        }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    const body = await request.json();
    const { token, password } = body;

<<<<<<< HEAD
    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Reset token is required" },
        { status: 400 },
      );
    }

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "New password is required" },
        { status: 400 },
=======
    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Reset token is required' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'New password is required' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
<<<<<<< HEAD
        {
          error: "Password does not meet requirements",
          details: passwordValidation.errors,
        },
        { status: 400 },
=======
        { error: 'Password does not meet requirements', details: passwordValidation.errors },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Find user with matching reset token
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date(), // Token must not be expired
        },
      },
    });

    if (!user) {
<<<<<<< HEAD
      logger.warn("Invalid or expired password reset token", { correlationId });
      return NextResponse.json(
        {
          error:
            "Invalid or expired reset token. Please request a new password reset.",
        },
        { status: 400 },
=======
      logger.warn('Invalid or expired password reset token', { correlationId });
      return NextResponse.json(
        { error: 'Invalid or expired reset token. Please request a new password reset.' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Hash new password
    let passwordHash: string;
    try {
      passwordHash = await hashPassword(password);
    } catch (error) {
<<<<<<< HEAD
      logger.error("Password hashing failed", error, {
        correlationId,
        userId: user.id,
      });
      return NextResponse.json(
        { error: "Failed to process password" },
        { status: 500 },
=======
      logger.error('Password hashing failed', error, { correlationId, userId: user.id });
      return NextResponse.json(
        { error: 'Failed to process password' },
        { status: 500 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null,
        failedLoginAttempts: 0, // Reset failed attempts
        lockedUntil: null, // Unlock account if locked
      },
    });

    // Revoke all refresh tokens (force re-login on all devices for security)
    await revokeAllRefreshTokens(user.id);

    const duration = Date.now() - startTime;
<<<<<<< HEAD
    logger.info("Password reset successful", {
      correlationId,
      userId: user.id,
      duration,
    });

    return NextResponse.json({
      success: true,
      message:
        "Password has been reset successfully. Please log in with your new password.",
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Reset password error", error, { correlationId, duration });

    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 },
=======
    logger.info('Password reset successful', { correlationId, userId: user.id, duration });

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully. Please log in with your new password.',
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Reset password error', error, { correlationId, duration });

    return NextResponse.json(
      { error: 'Failed to reset password. Please try again.' },
      { status: 500 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }
}
