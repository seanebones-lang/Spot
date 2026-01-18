import { NextRequest, NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

/**
 * User Login API
 * Authenticates user and returns JWT token
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Find user by email in database
    // 2. Verify password hash (bcrypt.compare)
    // 3. Check if account is active/verified

    // For now, mock authentication (replace with database lookup)
    // In production, verify against database:
    // const user = await db.users.findByEmail(email);
    // if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    //   return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    // }

    // Mock user for demo (replace with actual database query)
    const user = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0], // Extract name from email
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

    return NextResponse.json({
      success: true,
      user,
      token,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
