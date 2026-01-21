<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/env";
import { sanitizeEmail } from "@/lib/sanitize";
import { verifyPassword } from "@/lib/password";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";
import { logger, generateCorrelationId } from "@/lib/logger";
import { generateTokenPair } from "@/lib/auth";
import prisma, { dbQueryWithTimeout } from "@/lib/db";
=======
import { NextRequest, NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';
import { sanitizeEmail } from '@/lib/sanitize';
import { verifyPassword } from '@/lib/password';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { logger, generateCorrelationId } from '@/lib/logger';
import { generateTokenPair } from '@/lib/auth';
import prisma, { dbQueryWithTimeout } from '@/lib/db';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * User Login API
 * Authenticates user and returns JWT token
 * Rate limited: 5 requests per minute
 */
export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();
<<<<<<< HEAD

  try {
    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimit = await checkRateLimit(clientId, "/api/auth/login");
    if (!rateLimit.allowed) {
      logger.warn("Rate limit exceeded for login", { correlationId, clientId });
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    const body = await request.json();
    const { email, password } = body;

    // Validation and sanitization
    if (!email || !password) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "Email and password are required" },
        { status: 400 },
=======
        { error: 'Email and password are required' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    const sanitizedEmail = sanitizeEmail(email);
    if (!sanitizedEmail) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "Invalid email format" },
        { status: 400 },
=======
        { error: 'Invalid email format' },
        { status: 400 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Find user by email in database (with timeout)
    type UserWithLock = {
      id: string;
      email: string;
      name: string | null;
      passwordHash: string;
      isActive: boolean;
      role: string;
      lockedUntil: Date | null;
      failedLoginAttempts: number;
    };
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    const userQuery = prisma.user.findUnique({
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
    }) as Promise<UserWithLock | null>;
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    const user = await dbQueryWithTimeout<UserWithLock | null>(userQuery);

    // Use generic error message to prevent email enumeration
    if (!user) {
<<<<<<< HEAD
      logger.warn("Login attempt with non-existent email", {
        correlationId,
        email: sanitizedEmail,
      });
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
=======
      logger.warn('Login attempt with non-existent email', { correlationId, email: sanitizedEmail });
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
<<<<<<< HEAD
      const minutesRemaining = Math.ceil(
        (user.lockedUntil.getTime() - Date.now()) / 1000 / 60,
      );
      logger.warn("Login attempt on locked account", {
        correlationId,
        userId: user.id,
      });
      return NextResponse.json(
        {
          error:
            "Account is temporarily locked due to too many failed login attempts",
          lockedUntil: user.lockedUntil.toISOString(),
          minutesRemaining,
        },
        { status: 423 }, // 423 Locked
=======
      const minutesRemaining = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 1000 / 60);
      logger.warn('Login attempt on locked account', { correlationId, userId: user.id });
      return NextResponse.json(
        { 
          error: 'Account is temporarily locked due to too many failed login attempts',
          lockedUntil: user.lockedUntil.toISOString(),
          minutesRemaining,
        },
        { status: 423 } // 423 Locked
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Verify password
    const passwordValid = await verifyPassword(password, user.passwordHash);
<<<<<<< HEAD

    if (!passwordValid) {
      // Increment failed login attempts
      const newFailedAttempts = user.failedLoginAttempts + 1;
      const lockUntil =
        newFailedAttempts >= 5
          ? new Date(Date.now() + 15 * 60 * 1000) // Lock for 15 minutes
          : null;

=======
    
    if (!passwordValid) {
      // Increment failed login attempts
      const newFailedAttempts = user.failedLoginAttempts + 1;
      const lockUntil = newFailedAttempts >= 5 
        ? new Date(Date.now() + 15 * 60 * 1000) // Lock for 15 minutes
        : null;
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: newFailedAttempts,
          lockedUntil: lockUntil,
        },
      });

<<<<<<< HEAD
      logger.warn("Login attempt with invalid password", {
        correlationId,
=======
      logger.warn('Login attempt with invalid password', { 
        correlationId, 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        userId: user.id,
        failedAttempts: newFailedAttempts,
      });

      if (lockUntil) {
        return NextResponse.json(
<<<<<<< HEAD
          {
            error:
              "Account locked due to too many failed login attempts. Please try again in 15 minutes.",
          },
          { status: 423 },
=======
          { 
            error: 'Account locked due to too many failed login attempts. Please try again in 15 minutes.',
          },
          { status: 423 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        );
      }

      return NextResponse.json(
<<<<<<< HEAD
        { error: "Invalid credentials" },
        { status: 401 },
=======
        { error: 'Invalid credentials' },
        { status: 401 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Check if account is active/verified
    if (!user.isActive) {
      return NextResponse.json(
<<<<<<< HEAD
        { error: "Account is not active. Please verify your email address." },
        { status: 403 },
=======
        { error: 'Account is not active. Please verify your email address.' },
        { status: 403 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
      logger.error("JWT_SECRET not configured", { correlationId });
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
=======
      logger.error('JWT_SECRET not configured', { correlationId });
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Generate token pair (access token + refresh token)
    const tokens = await generateTokenPair(
      { userId: user.id, email: user.email, role: user.role },
<<<<<<< HEAD
      request,
    );

    const duration = Date.now() - startTime;
    logger.info("Login successful", {
      correlationId,
      userId: user.id,
      duration,
    });
=======
      request
    );

    const duration = Date.now() - startTime;
    logger.info('Login successful', { correlationId, userId: user.id, duration });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

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
<<<<<<< HEAD
      message: "Login successful",
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error("Login error", error, { correlationId, duration });
    return NextResponse.json(
      { error: "Login failed. Please try again." },
      { status: 500 },
=======
      message: 'Login successful',
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Login error', error, { correlationId, duration });
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }
}
