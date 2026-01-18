/**
 * Admin API: Delete All Album Art
 * This endpoint clears all coverArt references from the database
 * 
 * WARNING: This is a destructive operation that cannot be undone
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { logger, generateCorrelationId } from '@/lib/logger';
import { requireRole } from '@/lib/auth';
import { requireCsrfToken } from '@/lib/csrf';

export async function POST(request: NextRequest) {
  const correlationId = generateCorrelationId();
  
  try {
    // Require CSRF token (removed from middleware exclusions)
    try {
      requireCsrfToken(request);
    } catch (error) {
      logger.warn('CSRF token validation failed for admin endpoint', { correlationId });
      return NextResponse.json(
        { error: 'CSRF token validation failed' },
        { status: 403 }
      );
    }

    // Require ADMIN role
    try {
      requireRole(request, ['ADMIN']);
    } catch (error) {
      logger.warn('Unauthorized access attempt to admin endpoint', { correlationId });
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    logger.info('Starting album art deletion...', { correlationId });

    // Clear coverArt from Albums
    const albumsResult = await prisma.album.updateMany({
      where: {
        coverArt: {
          not: null,
        },
      },
      data: {
        coverArt: null,
      },
    });
    logger.info(`Cleared coverArt from ${albumsResult.count} albums`, { correlationId });

    // Clear coverArt from Tracks
    const tracksResult = await prisma.track.updateMany({
      where: {
        coverArt: {
          not: null,
        },
      },
      data: {
        coverArt: null,
      },
    });
    logger.info(`Cleared coverArt from ${tracksResult.count} tracks`, { correlationId });

    // Clear coverArtUrl from TrackSubmissions
    const submissionsResult = await prisma.trackSubmission.updateMany({
      where: {
        coverArtUrl: {
          not: null,
        },
      },
      data: {
        coverArtUrl: null,
        coverArtFileName: null,
        coverArtFileSize: null,
      },
    });
    logger.info(`Cleared coverArt from ${submissionsResult.count} track submissions`, { correlationId });

    return NextResponse.json({
      success: true,
      message: 'All album art references have been cleared',
      results: {
        albums: albumsResult.count,
        tracks: tracksResult.count,
        submissions: submissionsResult.count,
      },
    });

  } catch (error) {
    logger.error('Error deleting album art', error, { correlationId });
    return NextResponse.json(
      { error: 'Failed to delete album art', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}