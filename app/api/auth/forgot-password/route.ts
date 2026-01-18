import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { logger, generateCorrelationId } from '@/lib/logger';
import { sanitizeEmail } from '@/lib/sanitize';
import { sendPasswordResetEmail } from '@/lib/email';
import prisma from '@/lib/db';

/**
 * Forgot Password Endpoint
 * Generates password reset token and sends reset email
 * Rate limited: 5 requests per hour per IP
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = await checkRateLimit(clientId, '/api/auth/forgot-password');
    if (!rateLimit.allowed) {
      logger.warn('Rate limit exceeded for forgot password', { correlationId, clientId });
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
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Sanitize and validate email
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      // Return success even if email doesn't exist (prevent email enumeration)
      logger.info('Forgot password request for invalid/non-existent email', { correlationId });
      return NextResponse.json({
        success: true,
        message: 'If an account exists with that email, a password reset link has been sent.',
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
      select: { id: true, email: true, isActive: true },
    });

    // Return success even if user doesn't exist (prevent email enumeration)
    if (!user) {
      logger.info('Forgot password request for non-existent email', { correlationId, email: sanitizedEmail });
      return NextResponse.json({
        success: true,
        message: 'If an account exists with that email, a password reset link has been sent.',
      });
    }

    // Check if account is active
    if (!user.isActive) {
      logger.warn('Password reset requested for inactive account', { correlationId, userId: user.id });
      // Still return success to prevent account enumeration
      return NextResponse.json({
        success: true,
        message: 'If an account exists with that email, a password reset link has been sent.',
      });
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Save reset token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      },
    });

    // Send password reset email
    const emailSent = await sendPasswordResetEmail(user.email, resetToken);

    if (!emailSent) {
      logger.error('Failed to send password reset email', new Error('Email service unavailable'), {
        correlationId,
        userId: user.id,
      });
      // Still return success to user (don't reveal email service issues)
      return NextResponse.json({
        success: true,
        message: 'If an account exists with that email, a password reset link has been sent.',
      });
    }

    const duration = Date.now() - startTime;
    logger.info('Password reset email sent', { correlationId, userId: user.id, duration });

    return NextResponse.json({
      success: true,
      message: 'If an account exists with that email, a password reset link has been sent.',
    });

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Forgot password error', error, { correlationId, duration });

    // Return generic success to prevent information leakage
    return NextResponse.json({
      success: true,
      message: 'If an account exists with that email, a password reset link has been sent.',
    });
  }
}
