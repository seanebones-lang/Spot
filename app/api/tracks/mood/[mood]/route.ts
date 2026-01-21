import { NextResponse } from 'next/server';
import { getTracksByMood, jamendoToTrack } from '@/lib/music-apis/jamendo';
import { getCached, setCached, getCacheKey } from '@/lib/music-apis/cache';

/**
 * GET /api/tracks/mood/[mood]
 * Returns tracks filtered by mood using Jamendo API
 * 
 * All tracks are Creative Commons licensed (royalty-free)
 * Responses are cached for 1 hour to reduce API calls
 */
export async function GET(
  request: Request,
  { params }: { params: { mood: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const mood = params.mood;

    if (!mood) {
      return NextResponse.json(
        { error: 'Mood parameter is required' },
        { status: 400 }
      );
    }

    // Check cache first
    const cacheKey = getCacheKey('mood', mood, limit);
    const cached = getCached<{ tracks: any[]; count: number; mood: string; source: string; license: string }>(cacheKey);
    
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          'X-Cache': 'HIT',
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      });
    }

    // Fetch from Jamendo API
    const jamendoTracks = await getTracksByMood(mood, limit);

    // Convert to EmPulse Track format
    const tracks = jamendoTracks.map(jamendoToTrack);

    const response = {
      tracks,
      count: tracks.length,
      mood,
      source: 'jamendo',
      license: 'Creative Commons',
    };

    // Cache the response
    setCached(cacheKey, response);

    return NextResponse.json(response, {
      headers: {
        'X-Cache': 'MISS',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('[API] Error fetching mood tracks:', error);
    
    // Return more specific error messages
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tracks';
    
    // Check if it's an API key issue
    if (errorMessage.includes('API key') || errorMessage.includes('client_id')) {
      return NextResponse.json(
        { 
          error: 'Jamendo API key not configured. Please set JAMENDO_API_KEY in your .env file.',
          details: 'Get your free API key at https://devportal.jamendo.com/'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
