import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';
import { getEnv } from '@/lib/env';
import { sanitizeEmail, sanitizeString } from '@/lib/sanitize';
import { hashPassword, validatePasswordStrength } from '@/lib/password';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';
import { logger, generateCorrelationId } from '@/lib/logger';

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
    const rateLimit = checkRateLimit(clientId, '/api/auth/register');
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

    // In production, you would:
    // 1. Check if user already exists in database
    // 2. Create user in database with hashed password
    // 3. Send verification email
    //
    // Example implementation:
    // const existingUser = await db.users.findByEmail(sanitizedEmail);
    // if (existingUser) {
    //   return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    // }
    //
    // const user = await db.users.create({
    //   email: sanitizedEmail,
    //   name: sanitizedName,
    //   passwordHash,
    //   role: 'user',
    //   isActive: false, // Require email verification
    //   createdAt: new Date(),
    // });
    //
    // await sendVerificationEmail(user.email, user.id);

    // For now, create a mock user (replace with database)
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const user = {
      id: userId,
      email: sanitizedEmail,
      name: sanitizedName,
      role: 'user' as const,
      createdAt: new Date().toISOString(),
    };

    // Generate JWT token
    const env = getEnv();
    if (!env.JWT_SECRET) {
      logger.error('JWT_SECRET not configured', { correlationId });
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // In production, save user to database here
    logger.info('User registered', { correlationId, userId: user.id, email: user.email });

    const duration = Date.now() - startTime;
    logger.info('Registration successful', { correlationId, userId: user.id, duration });

    return NextResponse.json({
      success: true,
      user,
      token,
      message: 'Account created successfully',
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
