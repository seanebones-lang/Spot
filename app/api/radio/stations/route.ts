import { NextRequest, NextResponse } from 'next/server';

/**
 * GTA V Radio Station Metadata
 * Returns all available stations with their configuration
 */
const STATIONS = [
  {
    id: 'radio-los-santos',
    name: 'Radio Los Santos',
    genre: 'Modern Hip-Hop',
    description: 'FlyLo FM-style banter, ads like Ammu-Nation',
    videoId: 'C3_FSXZtRe8',
    duration: 7200,
  },
  {
    id: 'non-stop-pop',
    name: 'Non-Stop-Pop FM',
    genre: 'Pop Hits',
    description: 'Cara Delevingne DJ, ego-boost commercials',
    videoId: 'Fjp0wu3lEHk',
    duration: 7200,
  },
  {
    id: 'west-coast-classics',
    name: 'West Coast Classics',
    genre: 'Old-School Rap',
    description: 'DJ Pooh vibes, gangsta ads',
    videoId: 'z0Wf3IuZnf0',
    duration: 7200,
  },
  {
    id: 'los-santos-rock-radio',
    name: 'Los Santos Rock Radio',
    genre: 'Classic Rock',
    description: 'Kenny Loggins hosting, Pißwasser jingles',
    videoId: 'fZPV-9GlM-c',
    duration: 7200,
  },
  {
    id: 'blonded-los-santos',
    name: 'blonded Los Santos 97.8 FM',
    genre: 'R&B/Eclectic',
    description: 'Frank Ocean curated, chill ads',
    videoId: '-tVumJBaTWY',
    duration: 5400,
  },
  {
    id: 'blaine-county-talk',
    name: 'Blaine County Talk Radio',
    genre: 'Talk/Conspiracy',
    description: 'Pure talk, no music—callers, rants',
    videoId: 'HS1IG2uy1VE',
    duration: 3600,
  },
];

/**
 * GET /api/radio/stations
 * Returns list of all available radio stations
 */
export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    stations: STATIONS,
    count: STATIONS.length,
  });
  
  // Allow CORS for cross-origin requests (Vercel frontend to Railway backend)
  const origin = request.headers.get('origin');
  response.headers.set('Access-Control-Allow-Origin', origin || '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  
  return response;
}

/**
 * Handle OPTIONS for CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}
