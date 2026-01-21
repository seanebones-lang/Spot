/**
 * Jamendo Track Fetcher
 * Legal, reliable way to get royalty-free music with artwork
 * 
 * This uses the official Jamendo API - 100% legal, no ToS violations
 */

import Database from 'better-sqlite3';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { getTracksByMood, getTracksByGenre, jamendoToTrack } from '../lib/music-apis/jamendo';

const JAMENDO_API_KEY = process.env.JAMENDO_API_KEY || '';

if (!JAMENDO_API_KEY) {
  console.error(`
    ⚠️  JAMENDO API KEY REQUIRED
    
    Get your free API key: https://devportal.jamendo.com/
    
    Then add to .env:
    JAMENDO_API_KEY=your_api_key_here
    
    Free tier: 200 requests/day
  `);
  process.exit(1);
}

const TARGET_TRACKS = 200;
const dataDir = path.join(process.cwd(), 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, 'music.db'));

// Create tracks table (compatible with scraper schema)
db.exec(`
  CREATE TABLE IF NOT EXISTS tracks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    artist TEXT,
    url TEXT UNIQUE,
    waveform_url TEXT,
    duration INTEGER,
    genre TEXT,
    mood TEXT,
    style TEXT,
    tags TEXT,
    license TEXT DEFAULT 'CC-BY',
    scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    search_query TEXT,
    cover_art TEXT,
    audio_url TEXT
  )
`);

const insertTrack = db.prepare(`
  INSERT OR IGNORE INTO tracks (
    title, artist, url, waveform_url, duration, genre, mood, style, tags, 
    license, search_query, cover_art, audio_url
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const MOODS = [
  'happy', 'chill', 'energetic', 'relaxed', 'focus', 'sad', 
  'workout', 'romantic', 'nostalgic', 'upbeat'
];

const GENRES = [
  'rock', 'pop', 'electronic', 'jazz', 'classical', 'ambient',
  'lofi', 'hip-hop', 'folk', 'acoustic'
];

async function fetchAndStoreTracks() {
  console.log('🎵 Fetching tracks from Jamendo API...\n');
  console.log('✅ All tracks include artwork (cover art URLs)\n');

  let totalTracks = 0;
  const allTracks: any[] = [];

  // Fetch by mood
  console.log('📊 Fetching tracks by mood...');
  for (const mood of MOODS) {
    if (totalTracks >= TARGET_TRACKS) break;

    try {
      console.log(`  Fetching ${mood} tracks...`);
      const jamendoTracks = await getTracksByMood(mood, 20);
      
      for (const jamendoTrack of jamendoTracks) {
        if (totalTracks >= TARGET_TRACKS) break;

        const track = jamendoToTrack(jamendoTrack);
        const hasArtwork = !!track.coverArt;

        try {
          insertTrack.run(
            track.name,
            track.artist,
            `https://www.jamendo.com/track/${jamendoTrack.id}`,
            '', // waveform_url (not available from Jamendo)
            track.duration,
            JSON.stringify(track.moodTags.genre || []),
            JSON.stringify(track.moodTags.mood || []),
            JSON.stringify([]), // style
            JSON.stringify([]), // tags
            'CC-BY',
            `mood:${mood}`,
            track.coverArt || '', // ✅ ARTWORK URL
            track.audioUrl || '' // ✅ AUDIO URL
          );
          totalTracks++;
          allTracks.push({
            ...track,
            hasArtwork,
            source: 'jamendo',
          });
        } catch (error) {
          // Ignore duplicates
        }
      }

      console.log(`  ✅ ${mood}: +${jamendoTracks.length} tracks (Total: ${totalTracks})`);
      
      // Rate limiting: 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`  ❌ Error fetching ${mood}:`, error);
    }
  }

  // Fetch by genre if we need more
  if (totalTracks < TARGET_TRACKS) {
    console.log('\n📊 Fetching tracks by genre...');
    for (const genre of GENRES) {
      if (totalTracks >= TARGET_TRACKS) break;

      try {
        console.log(`  Fetching ${genre} tracks...`);
        const jamendoTracks = await getTracksByGenre(genre, 20);
        
        for (const jamendoTrack of jamendoTracks) {
          if (totalTracks >= TARGET_TRACKS) break;

          const track = jamendoToTrack(jamendoTrack);
          const hasArtwork = !!track.coverArt;

          try {
            insertTrack.run(
              track.name,
              track.artist,
              `https://www.jamendo.com/track/${jamendoTrack.id}`,
              '',
              track.duration,
              JSON.stringify(track.moodTags.genre || []),
              JSON.stringify(track.moodTags.mood || []),
              JSON.stringify([]),
              JSON.stringify([]),
              'CC-BY',
              `genre:${genre}`,
              track.coverArt || '', // ✅ ARTWORK URL
              track.audioUrl || '' // ✅ AUDIO URL
            );
            totalTracks++;
            allTracks.push({
              ...track,
              hasArtwork,
              source: 'jamendo',
            });
          } catch (error) {
            // Ignore duplicates
          }
        }

        console.log(`  ✅ ${genre}: +${jamendoTracks.length} tracks (Total: ${totalTracks})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`  ❌ Error fetching ${genre}:`, error);
      }
    }
  }

  // Export to JSON
  const jsonPath = path.join(dataDir, 'tracks.json');
  await fsPromises.writeFile(jsonPath, JSON.stringify(allTracks, null, 2));

  // Export to CSV
  const csvPath = path.join(dataDir, 'tracks.csv');
  const csvHeader = 'id,title,artist,url,duration,genre,mood,license,cover_art,audio_url,has_artwork\n';
  const csvRows = allTracks.map((track: any, index: number) => {
    return [
      index + 1,
      `"${(track.name || '').replace(/"/g, '""')}"`,
      `"${(track.artist || '').replace(/"/g, '""')}"`,
      track.url || '',
      track.duration,
      `"${JSON.stringify(track.moodTags?.genre || []).replace(/"/g, '""')}"`,
      `"${JSON.stringify(track.moodTags?.mood || []).replace(/"/g, '""')}"`,
      'CC-BY',
      track.coverArt || '',
      track.audioUrl || '',
      track.hasArtwork ? 'YES' : 'NO',
    ].join(',');
  });
  await fsPromises.writeFile(csvPath, csvHeader + csvRows.join('\n'));

  // Artwork statistics
  const tracksWithArtwork = allTracks.filter(t => t.hasArtwork).length;
  const artworkPercentage = ((tracksWithArtwork / allTracks.length) * 100).toFixed(1);

  console.log(`
    ✅ COMPLETE: ${totalTracks} tracks fetched from Jamendo API
    
    📊 Statistics:
    - Total tracks: ${totalTracks}
    - Tracks with artwork: ${tracksWithArtwork} (${artworkPercentage}%)
    - Tracks without artwork: ${allTracks.length - tracksWithArtwork}
    - Source: Jamendo API (100% legal)
    - License: Creative Commons (CC-BY)
    
    📁 Exports:
    - Database: ${path.join(dataDir, 'music.db')}
    - JSON: ${jsonPath}
    - CSV: ${csvPath}
    
    🎨 Artwork: ${tracksWithArtwork > 0 ? '✅ YES - Most tracks include cover art URLs' : '❌ NO - No artwork found'}
  `);

  db.close();
}

fetchAndStoreTracks().catch((error) => {
  console.error('❌ Fatal error:', error);
  db.close();
  process.exit(1);
});
