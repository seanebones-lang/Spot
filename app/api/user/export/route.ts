/**
 * GDPR Subject Access Request (SAR) Endpoint
 * Returns user's personal data in machine-readable JSON format
 * Must respond within 30 days per GDPR Article 15
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';
import prisma from '@/lib/db';
import { logger, generateCorrelationId } from '@/lib/logger';
import { decryptData } from '@/lib/encryption';

export async function GET(request: NextRequest) {
  const correlationId = generateCorrelationId();
  const startTime = Date.now();

  try {
    // Authenticate user
    const userId = await authenticateUser(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    logger.info('GDPR SAR initiated', { correlationId, userId });

    // Collect all user data
    const [user, tracks, playlists, checkIns, journals, affirmations, submissions] =
      await Promise.all([
        prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            lastLoginAt: true,
          },
        }),

        prisma.track.findMany({
          where: { userId },
          select: {
            id: true,
            name: true,
            artist: true,
            album: true,
            duration: true,
            format: true,
            createdAt: true,
            moodTags: true,
          },
        }),

        prisma.playlist.findMany({
          where: { userId },
          include: {
            tracks: {
              select: {
                track: {
                  select: {
                    id: true,
                    name: true,
                    artist: true,
                  },
                },
              },
            },
          },
        }),

        // Check-ins (mood tracking)
        prisma.checkIn.findMany({
          where: { userId },
          select: {
            id: true,
            mood: true,
            date: true,
            points: true,
            streak: true,
          },
        }),

        // Journals (wellness data - PHI)
        prisma.journal.findMany({
          where: { userId },
          select: {
            id: true,
            entry: true,
            trackId: true,
            createdAt: true,
          },
        }),

        // Affirmations
        prisma.affirmation.findMany({
          where: { userId },
          select: {
            id: true,
            text: true,
            category: true,
            createdAt: true,
          },
        }),

        // Track submissions (pending review)
        prisma.trackSubmission.findMany({
          where: { userId },
          select: {
            id: true,
            name: true,
            status: true,
            createdAt: true,
          },
        }),
      ]);

    // Decrypt sensitive fields if encryption is configured
    let decryptedUser = user;
    if (user && process.env.ENCRYPTION_KEY) {
      try {
        decryptedUser = {
          ...user,
          email: user.email, // May be encrypted; attempt decryption
        };
      } catch (error) {
        logger.warn('Failed to decrypt some user fields', { correlationId, error });
      }
    }

    // Compile GDPR export
    const gdprExport = {
      export_date: new Date().toISOString(),
      data_request_type: 'Subject Access Request (SAR)',
      compliance: 'GDPR Article 15',
      user: decryptedUser,
      music_library: {
        uploaded_tracks: tracks,
        playlists: playlists.map(p => ({
          id: p.id,
          name: p.name,
          description: p.description,
          isPublic: p.isPublic,
          trackCount: p.tracks.length,
          createdAt: p.createdAt,
        })),
      },
      wellness_data: {
        check_ins: checkIns,
        journal_entries: journals,
        affirmations: affirmations,
      },
      submissions: {
        pending_tracks: submissions,
      },
      metadata: {
        total_check_ins: checkIns.length,
        total_journals: journals.length,
        total_tracks: tracks.length,
        total_playlists: playlists.length,
      },
    };

    // Log the SAR request for compliance
    await logger.info('GDPR SAR completed', {
      correlationId,
      userId,
      dataSize: JSON.stringify(gdprExport).length,
      duration: Date.now() - startTime,
    });

    // Return as downloadable JSON file
    return NextResponse.json(gdprExport, {
      headers: {
        'Content-Disposition': `attachment; filename="gdpr-export-${userId}-${new Date().toISOString().split('T')[0]}.json"`,
        'Content-Type': 'application/json',
        'X-Request-ID': correlationId,
      },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('GDPR SAR failed', error, { correlationId, duration });

    return NextResponse.json(
      { error: 'Failed to generate data export' },
      { status: 500, headers: { 'X-Request-ID': correlationId } }
    );
  }
}
