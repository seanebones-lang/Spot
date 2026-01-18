import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

/**
 * GTA V Radio Station Configuration
 * Maps station IDs to YouTube video IDs and metadata
 */
const STATIONS = {
  'radio-los-santos': {
    videoId: 'C3_FSXZtRe8',
    name: 'Radio Los Santos',
    duration: 7200, // 2 hours in seconds
    genre: 'Modern Hip-Hop',
  },
  'non-stop-pop': {
    videoId: 'Fjp0wu3lEHk',
    name: 'Non-Stop-Pop FM',
    duration: 7200,
    genre: 'Pop Hits',
  },
  'west-coast-classics': {
    videoId: 'z0Wf3IuZnf0',
    name: 'West Coast Classics',
    duration: 7200,
    genre: 'Old-School Rap',
  },
  'los-santos-rock-radio': {
    videoId: 'fZPV-9GlM-c',
    name: 'Los Santos Rock Radio',
    duration: 7200,
    genre: 'Classic Rock',
  },
  'blonded-los-santos': {
    videoId: '-tVumJBaTWY',
    name: 'blonded Los Santos 97.8 FM',
    duration: 5400, // 1.5 hours
    genre: 'R&B/Eclectic',
  },
  'blaine-county-talk': {
    videoId: 'HS1IG2uy1VE',
    name: 'Blaine County Talk Radio',
    duration: 3600, // 1 hour
    genre: 'Talk/Conspiracy',
  },
} as const;

type StationId = keyof typeof STATIONS;

/**
 * Check if yt-dlp is available in the system
 */
async function checkYtDlpAvailable(): Promise<boolean> {
  try {
    await execAsync('yt-dlp --version');
    return true;
  } catch {
    try {
      await execAsync('youtube-dl --version');
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Stream YouTube audio using yt-dlp
 * Extracts audio-only stream and supports seeking for "live radio" feel
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ station: string }> }
) {
  try {
    const params = await context.params;
    const stationId = params.station as StationId;
    const station = STATIONS[stationId];

    if (!station) {
      return NextResponse.json(
        { error: 'Station not found' },
        { status: 404 }
      );
    }

    // Check if yt-dlp is available
    const ytDlpAvailable = await checkYtDlpAvailable();
    if (!ytDlpAvailable) {
      console.error('yt-dlp or youtube-dl not found in system PATH');
      return NextResponse.json(
        { 
          error: 'Streaming service unavailable. Please ensure yt-dlp is installed.',
          hint: 'Install with: brew install yt-dlp (macOS) or pip install yt-dlp'
        },
        { status: 503 }
      );
    }

    // Get start time from query params (for random mid-stream start)
    const searchParams = request.nextUrl.searchParams;
    const startTime = parseInt(searchParams.get('start') || '0', 10);
    const randomStart = searchParams.get('random') === 'true';
    
    // Calculate actual start time
    const actualStart = randomStart 
      ? Math.floor(Math.random() * station.duration)
      : Math.max(0, Math.min(startTime, station.duration - 60)); // Ensure we don't start too close to end

    const youtubeUrl = `https://www.youtube.com/watch?v=${station.videoId}`;

    // Use yt-dlp to extract best audio format and stream it
    // Format: bestaudio[ext=m4a]/bestaudio[ext=mp3]/bestaudio
    // We'll pipe directly to response for streaming
    const ytDlpCommand = process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp';
    
    // Build yt-dlp command for audio-only streaming
    const args = [
      '-f', 'bestaudio[ext=m4a]/bestaudio[ext=mp3]/bestaudio/best',
      '--no-playlist',
      '--no-warnings',
      '--quiet',
      '--no-check-certificate',
      '-o', '-', // Output to stdout
      youtubeUrl,
    ];

    // Create a readable stream from yt-dlp
    const ytDlpProcess = spawn(ytDlpCommand, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    // Handle errors
    ytDlpProcess.stderr?.on('data', (data) => {
      const error = data.toString();
      // Filter out non-critical warnings
      if (!error.includes('WARNING') && !error.includes('DeprecationWarning')) {
        console.error('yt-dlp error:', error);
      }
    });

    ytDlpProcess.on('error', (error) => {
      console.error('Failed to spawn yt-dlp:', error);
    });

    // Create a response stream
    const stream = new ReadableStream({
      async start(controller) {
        // If we need to seek, we'll need to use ffmpeg to handle the seek
        // For now, we'll stream from the beginning and let the client handle seeking
        // In a production setup, you'd pipe through ffmpeg: ffmpeg -ss ${start} -i pipe:0 -f mp3 pipe:1
        
        ytDlpProcess.stdout?.on('data', (chunk) => {
          try {
            controller.enqueue(new Uint8Array(chunk));
          } catch (error) {
            console.error('Stream error:', error);
            controller.error(error);
          }
        });

        ytDlpProcess.stdout?.on('end', () => {
          controller.close();
        });

        ytDlpProcess.on('close', (code) => {
          if (code !== 0 && code !== null) {
            console.error(`yt-dlp process exited with code ${code}`);
            controller.error(new Error(`Stream process exited with code ${code}`));
          } else {
            controller.close();
          }
        });
      },
      cancel() {
        ytDlpProcess.kill();
      },
    });

    // Set appropriate headers for audio streaming
    const headers = new Headers();
    headers.set('Content-Type', 'audio/mpeg');
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
    headers.set('Accept-Ranges', 'bytes');
    // Allow CORS for local development
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new NextResponse(stream, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('Radio stream error:', error);
    return NextResponse.json(
      { error: 'Failed to start stream', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * Handle OPTIONS for CORS preflight
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
