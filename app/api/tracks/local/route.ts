import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

/**
 * GET /api/tracks/local
 * Returns tracks from local database (scraped or generated)
 * 
 * Query params:
 * - mood: Filter by mood
 * - genre: Filter by genre
 * - limit: Number of tracks (default: 50)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mood = searchParams.get('mood');
    const genre = searchParams.get('genre');
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const dbPath = path.join(process.cwd(), 'data', 'music.db');
    
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json(
        { error: 'No tracks database found. Run npm run generate:mock first.' },
        { status: 404 }
      );
    }

    const db = new Database(dbPath);

    let query = 'SELECT * FROM tracks WHERE 1=1';
    const params: any[] = [];

    if (mood) {
      query += ' AND mood LIKE ?';
      params.push(`%${mood}%`);
    }

    if (genre) {
      query += ' AND genre LIKE ?';
      params.push(`%${genre}%`);
    }

    query += ' ORDER BY id DESC LIMIT ?';
    params.push(limit);

    const tracks = db.prepare(query).all(...params) as any[];

    // Convert to EmPulse Track format
    const formattedTracks = tracks.map((track) => ({
      id: `local-${track.id}`,
      name: track.title,
      artist: track.artist,
      artistId: `local-artist-${track.id}`,
      album: 'Unknown Album',
      albumId: '',
      duration: track.duration || 0,
      audioUrl: track.audio_url || '',
      coverArt: track.cover_art || '', // ✅ ARTWORK
      moodTags: {
        mood: track.mood ? JSON.parse(track.mood) : [],
        feeling: [],
        vibe: [],
        genre: track.genre ? JSON.parse(track.genre) : [],
      },
      format: 'MP3',
      quality: 'standard',
    }));

    const artworkCount = formattedTracks.filter(t => t.coverArt).length;

    db.close();

    return NextResponse.json({
      tracks: formattedTracks,
      count: formattedTracks.length,
      source: 'local',
      license: 'CC-BY',
      artwork: {
        total: formattedTracks.length,
        withArtwork: artworkCount,
        percentage: ((artworkCount / formattedTracks.length) * 100).toFixed(1) + '%',
      },
    });
  } catch (error) {
    console.error('[API] Error fetching local tracks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracks' },
      { status: 500 }
    );
  }
}
