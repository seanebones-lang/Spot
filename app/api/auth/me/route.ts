import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { logger, generateCorrelationId } from '@/lib/logger';

/**
 * Get Current User API
 * Returns authenticated user info from JWT token
 */
export async function GET(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();
  
  try {
    // Require authentication (this will throw if not authenticated)
    const authUser = requireAuth(request);

    // In production, fetch user from database using authUser.userId
    // const user = await db.users.findById(authUser.userId);
    // if (!user) {
    //   logger.warn('User not found in database', { correlationId, userId: authUser.userId });
    //   return NextResponse.json({ error: 'User not found' }, { status: 404 });
    // }
    //
    // return NextResponse.json({
    //   success: true,
    //   user: {
    //     id: user.id,
    //     email: user.email,
    //     name: user.name,
    //     role: user.role,
    //     createdAt: user.createdAt,
    //   },
    // });

    // Mock user (replace with database lookup)
    const user = {
      id: authUser.userId,
      email: authUser.email,
      name: authUser.email?.split('@')[0] || 'User',
      role: authUser.role || 'user',
      createdAt: new Date().toISOString(),
    };

    const duration = Date.now() - startTime;
    logger.info('User info retrieved', { correlationId, userId: user.id, duration });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    if (error instanceof Error && error.message === 'Unauthorized') {
      logger.warn('Unauthorized access attempt', { correlationId, duration });
      return NextResponse.json(
        { error: 'No authorization token provided or token is invalid' },
        { status: 401 }
      );
    }
    
    logger.error('Auth check error', error, { correlationId, duration });
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
