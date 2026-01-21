<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { logger, generateCorrelationId } from "@/lib/logger";
import prisma from "@/lib/db";
=======
import { NextRequest, NextResponse } from 'next/server';
import { logger, generateCorrelationId } from '@/lib/logger';
import prisma from '@/lib/db';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Email Verification Endpoint
 * Verifies user email addresses using verification tokens
 * GET /api/auth/verify?token=...
 */
export async function GET(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
<<<<<<< HEAD
    const token = request.nextUrl.searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 },
=======
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Find user with matching verification token
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationExpires: {
          gt: new Date(), // Token must not be expired
        },
      },
    });

    if (!user) {
<<<<<<< HEAD
      logger.warn("Invalid or expired verification token", { correlationId });
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 },
=======
      logger.warn('Invalid or expired verification token', { correlationId });
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Verify the user's email
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isActive: true,
        emailVerifiedAt: new Date(),
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    });

    const duration = Date.now() - startTime;
<<<<<<< HEAD
    logger.info("Email verified successfully", {
      correlationId,
      userId: user.id,
      duration,
    });

    // Redirect to frontend success page or return JSON
    const frontendUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
    const redirectUrl = new URL("/login?verified=true", frontendUrl);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Email verification error", error, {
      correlationId,
      duration,
    });

    return NextResponse.json(
      { error: "Failed to verify email. Please try again." },
      { status: 500 },
=======
    logger.info('Email verified successfully', { correlationId, userId: user.id, duration });

    // Redirect to frontend success page or return JSON
    const frontendUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';
    const redirectUrl = new URL('/login?verified=true', frontendUrl);

    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Email verification error', error, { correlationId, duration });

    return NextResponse.json(
      { error: 'Failed to verify email. Please try again.' },
      { status: 500 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }
}

/**
 * POST /api/auth/verify
 * Alternative endpoint that accepts token in body (for API clients)
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
    const body = await request.json();
    const { token } = body;

<<<<<<< HEAD
    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 },
=======
    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Find user with matching verification token
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        emailVerificationExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
<<<<<<< HEAD
      logger.warn("Invalid or expired verification token", { correlationId });
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 },
=======
      logger.warn('Invalid or expired verification token', { correlationId });
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Verify the user's email
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isActive: true,
        emailVerifiedAt: new Date(),
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    });

    const duration = Date.now() - startTime;
<<<<<<< HEAD
    logger.info("Email verified successfully", {
      correlationId,
      userId: user.id,
      duration,
    });

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Email verification error", error, {
      correlationId,
      duration,
    });

    return NextResponse.json(
      { error: "Failed to verify email. Please try again." },
      { status: 500 },
=======
    logger.info('Email verified successfully', { correlationId, userId: user.id, duration });

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Email verification error', error, { correlationId, duration });

    return NextResponse.json(
      { error: 'Failed to verify email. Please try again.' },
      { status: 500 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }
}
