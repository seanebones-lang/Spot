import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

/**
 * Get Current User API
 * Returns authenticated user info from JWT token
 */
export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

    // Verify token
    let decoded: any;
    try {
      decoded = verify(token, secret);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // In production, fetch user from database using decoded.userId
    // const user = await db.users.findById(decoded.userId);
    // if (!user) {
    //   return NextResponse.json({ error: 'User not found' }, { status: 404 });
    // }

    // Mock user (replace with database lookup)
    const user = {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.email?.split('@')[0] || 'User',
      role: decoded.role || 'user',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
