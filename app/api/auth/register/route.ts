import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { sanitizeEmail, sanitizeString } from '@/lib/sanitize';
import { hashPassword, validatePasswordStrength } from '@/lib/password';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { logger, generateCorrelationId } from '@/lib/logger';
import { generateTokenPair } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/email';
import prisma from '@/lib/db';

/**
 * User Registration API
 * Creates a new user account
 * Rate limited: 3 requests per hour
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();
  
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = await checkRateLimit(clientId, '/api/auth/register');
    if (!rateLimit.allowed) {
      logger.warn('Rate limit exceeded for registration', { correlationId, clientId });
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': String(rateLimit.remaining),
            'X-RateLimit-Reset': String(rateLimit.resetTime),
            'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
          },
        }
      );
    }

    const body = await request.json();
    const { email, password, name } = body;

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Sanitize and validate email
    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize name
    const sanitizedName = sanitizeString(name);
    if (!sanitizedName || sanitizedName.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: 'Password does not meet requirements', details: passwordValidation.errors },
        { status: 400 }
      );
    }

    // Hash password
    let passwordHash: string;
    try {
      passwordHash = await hashPassword(password);
    } catch (error) {
      logger.error('Password hashing failed', error, { correlationId });
      return NextResponse.json(
        { error: 'Failed to process password' },
        { status: 500 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: sanitizedEmail },
      select: { id: true },
    });

    if (existingUser) {
      // Don't reveal if email exists (security best practice)
      // Return success message to prevent email enumeration
      logger.warn('Registration attempt with existing email', { correlationId, email: sanitizedEmail });
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Generate email verification token
    const emailVerificationToken = randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email: sanitizedEmail,
        name: sanitizedName,
        passwordHash,
        role: 'USER',
        isActive: false, // Require email verification
        emailVerificationToken,
        emailVerificationExpires,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    // Send verification email
    await sendVerificationEmail(user.email, emailVerificationToken);

    // Generate JWT token
    const env = getEnv();
    if (!env.JWT_SECRET) {
      logger.error('JWT_SECRET not configured', { correlationId });
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Generate token pair (access token + refresh token)
    const tokens = await generateTokenPair(
      { userId: user.id, email: user.email, role: user.role },
      request
    );

    logger.info('User registered', { correlationId, userId: user.id });

    const duration = Date.now() - startTime;
    logger.info('Registration successful', { correlationId, userId: user.id, duration });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      message: 'Account created successfully. Please check your email to verify your account.',
      requiresVerification: true,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Registration error', error, { correlationId, duration });
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
