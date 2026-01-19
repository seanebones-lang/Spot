import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';
import { sanitizeEmail } from '@/lib/sanitize';
import { verifyPassword } from '@/lib/password';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { logger, generateCorrelationId } from '@/lib/logger';
import { generateTokenPair } from '@/lib/auth';
import prisma, { dbQueryWithTimeout } from '@/lib/db';

/**
 * User Login API
 * Authenticates user and returns JWT token
 * Rate limited: 5 requests per minute
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();
  
  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = await checkRateLimit(clientId, '/api/auth/login');
    if (!rateLimit.allowed) {
      logger.warn('Rate limit exceeded for login', { correlationId, clientId });
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
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
    const { email, password } = body;

    // Validation and sanitization
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Find user by email in database (with timeout)
    const user = await dbQueryWithTimeout(
      prisma.user.findUnique({
        where: { email: sanitizedEmail },
        select: {
          id: true,
          email: true,
          name: true,
          passwordHash: true,
          isActive: true,
          role: true,
          lockedUntil: true,
          failedLoginAttempts: true,
        },
      })
    );

    // Use generic error message to prevent email enumeration
    if (!user) {
      logger.warn('Login attempt with non-existent email', { correlationId, email: sanitizedEmail });
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const minutesRemaining = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 1000 / 60);
      logger.warn('Login attempt on locked account', { correlationId, userId: user.id });
      return NextResponse.json(
        { 
          error: 'Account is temporarily locked due to too many failed login attempts',
          lockedUntil: user.lockedUntil.toISOString(),
          minutesRemaining,
        },
        { status: 423 } // 423 Locked
      );
    }

    // Verify password
    const passwordValid = await verifyPassword(password, user.passwordHash);
    
    if (!passwordValid) {
      // Increment failed login attempts
      const newFailedAttempts = user.failedLoginAttempts + 1;
      const lockUntil = newFailedAttempts >= 5 
        ? new Date(Date.now() + 15 * 60 * 1000) // Lock for 15 minutes
        : null;
      
      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: newFailedAttempts,
          lockedUntil: lockUntil,
        },
      });

      logger.warn('Login attempt with invalid password', { 
        correlationId, 
        userId: user.id,
        failedAttempts: newFailedAttempts,
      });

      if (lockUntil) {
        return NextResponse.json(
          { 
            error: 'Account locked due to too many failed login attempts. Please try again in 15 minutes.',
          },
          { status: 423 }
        );
      }

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check if account is active/verified
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is not active. Please verify your email address.' },
        { status: 403 }
      );
    }

    // Reset failed login attempts on successful login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: new Date(),
      },
    });

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

    const duration = Date.now() - startTime;
    logger.info('Login successful', { correlationId, userId: user.id, duration });

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
      message: 'Login successful',
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Login error', error, { correlationId, duration });
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
