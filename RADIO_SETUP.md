# GTA V Radio Stations Setup Guide

This guide explains how to set up the featured radio stations feature that streams GTA V Los Santos radio stations.

## Overview

The radio feature streams audio-only content from YouTube videos containing full GTA V radio broadcasts (with DJ banter, ads, jingles, and shuffled tracks). This creates an immersive "live radio" experience.

## Prerequisites

### Install yt-dlp

The streaming backend requires `yt-dlp` (or `youtube-dl` as fallback) to extract audio from YouTube videos.

#### macOS
```bash
brew install yt-dlp
```

#### Linux
```bash
pip install yt-dlp
# or
sudo apt-get install yt-dlp
```

#### Windows
```bash
pip install yt-dlp
# or download from https://github.com/yt-dlp/yt-dlp/releases
```

#### Verify Installation
```bash
yt-dlp --version
```

## Architecture

### Backend API Routes

1. **`/api/radio/stations`** - Returns list of all available stations
2. **`/api/radio/stream/[station]`** - Streams audio for a specific station

### Frontend Components

- **Radio Store** (`stores/radioStore.ts`) - Zustand store managing radio state
- **Radio Page** (`app/radio/page.tsx`) - UI for station selection and playback

### Station Configuration

Stations are configured in `/app/api/radio/stream/[station]/route.ts`:

- Radio Los Santos (Modern Hip-Hop)
- Non-Stop-Pop FM (Pop Hits)
- West Coast Classics (Old-School Rap)
- Los Santos Rock Radio (Classic Rock)
- blonded Los Santos 97.8 FM (R&B/Eclectic)
- Blaine County Talk Radio (Talk/Conspiracy)

## Features

- **Random Start**: Each station starts at a random point in the stream for "live radio" feel
- **Auto-Repeat**: Stations loop automatically when they end
- **Seamless Playback**: Uses HTML5 Audio API with Howler.js integration
- **State Persistence**: Current station and volume persist across sessions

## Usage

1. Navigate to `/radio` page
2. Click any featured station to start playback
3. Click again to pause/resume
4. Switch stations by clicking a different one

## Troubleshooting

### "Streaming service unavailable" Error

This means `yt-dlp` is not installed or not in your system PATH.

**Solution:**
1. Install yt-dlp (see Prerequisites above)
2. Verify it's accessible: `which yt-dlp` (macOS/Linux) or `where yt-dlp` (Windows)
3. Restart your Next.js dev server

### Audio Not Playing

1. **Browser Autoplay Restrictions**: Some browsers block autoplay. Click the play button manually.
2. **CORS Issues**: Ensure the API route is accessible (check browser console)
3. **YouTube Rate Limiting**: If streams fail, YouTube may be rate-limiting. Wait a few minutes and try again.

### Stream Quality Issues

The backend uses `bestaudio` format selection. If quality is poor:
- Check your internet connection
- YouTube may be throttling the stream
- Try a different station

## Development Notes

### Adding New Stations

1. Find a YouTube video ID for the station
2. Add entry to `STATIONS` object in `/app/api/radio/stream/[station]/route.ts`
3. Add corresponding entry in `/app/api/radio/stations/route.ts`
4. Add icon mapping in `app/radio/page.tsx` if needed

### Testing Locally

```bash
# Start dev server
npm run dev

# Test API endpoint
curl http://localhost:3001/api/radio/stations

# Test stream (will download audio)
curl http://localhost:3001/api/radio/stream/radio-los-santos?start=0 > test.mp3
```

## Legal Considerations

⚠️ **Internal Demo Only**: This implementation is for internal demo purposes only.

- Uses YouTube embeds/streams which are TOS-compliant for non-commercial use
- Do not distribute publicly
- Consider self-hosting audio files for production use
- No official Rockstar API exists for GTA V radio content

## Performance

- **Bandwidth**: ~128kbps per stream (audio-only)
- **Concurrent Users**: Each user gets their own stream (no shared sessions)
- **Caching**: Station metadata is cached, but audio streams are not (live streaming)

## Future Enhancements

- [ ] Add more GTA V stations (FlyLo FM, The Lab, etc.)
- [ ] Implement crossfading between stations
- [ ] Add station favorites
- [ ] Background playback support (Service Worker)
- [ ] Self-hosted audio files for production
- [ ] Station history/recently played
