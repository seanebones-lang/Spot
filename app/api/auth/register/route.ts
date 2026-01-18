import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

/**
 * User Registration API
 * Creates a new user account
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Password strength check
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Hash the password (bcrypt)
    // 2. Check if user already exists in database
    // 3. Create user in database
    // 4. Send verification email

    // For now, create a mock user (replace with database)
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const user = {
      id: userId,
      email,
      name,
      role: 'user' as const,
      createdAt: new Date().toISOString(),
    };

    // Generate JWT token
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: '7d' }
    );

    // In production, save user to database here
    console.log('User registered:', { id: user.id, email: user.email });

    return NextResponse.json({
      success: true,
      user,
      token,
      message: 'Account created successfully',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
