/**
 * Mock Track Generator
 * Generates sample tracks with artwork for testing
 * Uses placeholder images from Unsplash/Pexels for artwork
 */

import Database from 'better-sqlite3';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, 'music.db'));

// Create table if it doesn't exist
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
    search_query TEXT
  )
`);

// Add cover_art and audio_url columns if they don't exist
try {
  db.exec(`ALTER TABLE tracks ADD COLUMN cover_art TEXT`);
} catch (e) {
  // Column already exists, ignore
}

try {
  db.exec(`ALTER TABLE tracks ADD COLUMN audio_url TEXT`);
} catch (e) {
  // Column already exists, ignore
}

const insertTrack = db.prepare(`
  INSERT OR IGNORE INTO tracks (
    title, artist, url, waveform_url, duration, genre, mood, style, tags, 
    license, search_query, cover_art, audio_url
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Sample tracks with artwork URLs (using Unsplash for placeholder images)
const MOCK_TRACKS = [
  // Happy/Upbeat
  { title: 'Sunshine Days', artist: 'The Brights', mood: ['happy', 'upbeat'], genre: ['pop'], coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop' },
  { title: 'Dancing in the Rain', artist: 'Joyful Sounds', mood: ['happy', 'energetic'], genre: ['electronic'], coverArt: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop' },
  { title: 'Summer Vibes', artist: 'Beach Waves', mood: ['happy', 'chill'], genre: ['pop'], coverArt: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop' },
  
  // Chill/Relaxed
  { title: 'Midnight Chill', artist: 'LoFi Dreams', mood: ['chill', 'relaxed'], genre: ['lofi'], coverArt: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500&h=500&fit=crop' },
  { title: 'Peaceful Moments', artist: 'Ambient Space', mood: ['relaxed', 'calm'], genre: ['ambient'], coverArt: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop' },
  { title: 'Coffee Shop Vibes', artist: 'Study Beats', mood: ['focus', 'chill'], genre: ['lofi'], coverArt: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop' },
  
  // Energetic/Workout
  { title: 'Power Up', artist: 'Energy Boost', mood: ['energetic', 'workout'], genre: ['electronic'], coverArt: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop' },
  { title: 'Run Fast', artist: 'Fitness Beats', mood: ['energetic', 'workout'], genre: ['electronic'], coverArt: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&h=500&fit=crop' },
  
  // Rock
  { title: 'Electric Storm', artist: 'Rock Legends', mood: ['energetic'], genre: ['rock'], coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop' },
  { title: 'Guitar Dreams', artist: 'Indie Rockers', mood: ['nostalgic'], genre: ['rock', 'indie'], coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop' },
  
  // Electronic
  { title: 'Digital Pulse', artist: 'Synth Wave', mood: ['energetic'], genre: ['electronic'], coverArt: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop' },
  { title: 'Neon Nights', artist: 'EDM Collective', mood: ['energetic', 'dance'], genre: ['electronic', 'edm'], coverArt: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop' },
  
  // Jazz/Classical
  { title: 'Smooth Jazz', artist: 'Jazz Quartet', mood: ['chill', 'relaxed'], genre: ['jazz'], coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop' },
  { title: 'Classical Elegance', artist: 'Symphony Orchestra', mood: ['calm', 'peaceful'], genre: ['classical'], coverArt: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop' },
  
  // Hip-Hop
  { title: 'Urban Flow', artist: 'Hip Hop Masters', mood: ['energetic'], genre: ['hip-hop'], coverArt: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop' },
  { title: 'Street Beats', artist: 'Rap Collective', mood: ['energetic'], genre: ['hip-hop', 'rap'], coverArt: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=500&fit=crop' },
  
  // Acoustic/Folk
  { title: 'Acoustic Memories', artist: 'Folk Stories', mood: ['nostalgic', 'calm'], genre: ['folk', 'acoustic'], coverArt: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop' },
  { title: 'Campfire Songs', artist: 'Acoustic Duo', mood: ['chill', 'relaxed'], genre: ['folk'], coverArt: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop' },
  
  // Sad/Emotional
  { title: 'Melancholy', artist: 'Emotional Sounds', mood: ['sad', 'emotional'], genre: ['indie'], coverArt: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop' },
  { title: 'Rainy Days', artist: 'Sad Songs', mood: ['sad', 'melancholic'], genre: ['acoustic'], coverArt: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500&fit=crop' },
  
  // Focus/Study
  { title: 'Study Session', artist: 'Focus Music', mood: ['focus', 'study'], genre: ['instrumental'], coverArt: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop' },
  { title: 'Concentration', artist: 'Study Beats', mood: ['focus'], genre: ['lofi'], coverArt: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500&h=500&fit=crop' },
];

// Generate more tracks by varying the data
function generateTracks(count: number = 200) {
  const tracks: any[] = [];
  const baseTracks = [...MOCK_TRACKS];
  
  // Duplicate and vary tracks to reach target count
  while (tracks.length < count) {
    const base = baseTracks[tracks.length % baseTracks.length];
    const variation = Math.floor(tracks.length / baseTracks.length);
    
    tracks.push({
      ...base,
      title: variation > 0 ? `${base.title} ${variation + 1}` : base.title,
      id: tracks.length + 1,
    });
  }
  
  return tracks.slice(0, count);
}

async function generateMockData() {
  console.log('🎵 Generating mock tracks with artwork...\n');
  
  const targetCount = 200;
  const tracks = generateTracks(targetCount);
  
  let inserted = 0;
  const tracksWithArtwork: any[] = [];
  
  for (const track of tracks) {
    const duration = 180 + Math.floor(Math.random() * 180); // 3-6 minutes
    const hasArtwork = !!track.coverArt;
    
    try {
      insertTrack.run(
        track.title,
        track.artist,
        `https://example.com/track/${track.id || inserted + 1}`,
        '', // waveform_url
        duration * 1000, // milliseconds
        JSON.stringify(track.genre || []),
        JSON.stringify(track.mood || []),
        JSON.stringify([]), // style
        JSON.stringify([]), // tags
        'CC-BY',
        'mock:generated',
        track.coverArt || '', // ✅ ARTWORK URL
        '' // audio_url (mock data)
      );
      inserted++;
      
      if (hasArtwork) {
        tracksWithArtwork.push(track);
      }
    } catch (error) {
      // Ignore duplicates
    }
  }
  
  // Export to JSON
  const allTracks = db.prepare('SELECT * FROM tracks').all();
  const jsonPath = path.join(dataDir, 'tracks.json');
  await fsPromises.writeFile(jsonPath, JSON.stringify(allTracks, null, 2));
  
  // Export to CSV
  const csvPath = path.join(dataDir, 'tracks.csv');
  const csvHeader = 'id,title,artist,url,duration,genre,mood,license,cover_art,has_artwork\n';
  const csvRows = allTracks.map((track: any) => {
    return [
      track.id,
      `"${(track.title || '').replace(/"/g, '""')}"`,
      `"${(track.artist || '').replace(/"/g, '""')}"`,
      track.url || '',
      track.duration,
      track.genre || '[]',
      track.mood || '[]',
      'CC-BY',
      track.cover_art || '',
      track.cover_art ? 'YES' : 'NO',
    ].join(',');
  });
  await fsPromises.writeFile(csvPath, csvHeader + csvRows.join('\n'));
  
  const artworkCount = allTracks.filter((t: any) => t.cover_art).length;
  const artworkPercentage = ((artworkCount / allTracks.length) * 100).toFixed(1);
  
  console.log(`
    ✅ COMPLETE: ${inserted} mock tracks generated
    
    📊 Statistics:
    - Total tracks: ${inserted}
    - Tracks with artwork: ${artworkCount} (${artworkPercentage}%)
    - Tracks without artwork: ${allTracks.length - artworkCount}
    - Source: Mock data (for testing)
    - License: Creative Commons (CC-BY)
    
    📁 Exports:
    - Database: ${path.join(dataDir, 'music.db')}
    - JSON: ${jsonPath}
    - CSV: ${csvPath}
    
    🎨 Artwork: ✅ YES - All tracks include cover art URLs from Unsplash
    🎵 Note: These are mock tracks for testing. Use Jamendo API for real music.
  `);
  
  db.close();
}

generateMockData().catch((error) => {
  console.error('❌ Fatal error:', error);
  db.close();
  process.exit(1);
});
