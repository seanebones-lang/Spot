# Music API Setup Guide

## 🎯 Overview

EmPulse Music uses **Jamendo API** for legal, royalty-free music tracks. All tracks are Creative Commons licensed and can be used freely with proper attribution.

## ✅ Recommended: Jamendo API (Legal, Free)

### Setup

1. **Get API Key**:
   - Visit: https://devportal.jamendo.com/
   - Sign up for free account
   - Get your API key (free tier: 200 requests/day)

2. **Configure Environment**:

   ```bash
   cp .env.example .env
   # Add your Jamendo API key
   JAMENDO_API_KEY=your_api_key_here
   ```

3. **Test API**:
   ```bash
   npm run dev
   # Visit: http://localhost:3001/api/tracks/mood/happy
   ```

### API Endpoints

- **Mood Playlists**: `/api/tracks/mood/[mood]`
  - Example: `/api/tracks/mood/happy?limit=50`
  - Moods: happy, sad, chill, energetic, focus, relaxed, workout, romantic, nostalgic

- **Genre Playlists**: `/api/tracks/genre/[genre]`
  - Example: `/api/tracks/genre/rock?limit=50`
  - Genres: rock, pop, hip-hop, electronic, classical, jazz, ambient, lofi, metal

### Usage in Components

```tsx
// app/mood/[mood]/page.tsx
import { Suspense } from "react";
import { use } from "react";

async function getMoodTracks(mood: string) {
  const res = await fetch(`/api/tracks/mood/${mood}?limit=50`);
  return res.json();
}

function MoodTracks({ mood }: { mood: string }) {
  const data = use(getMoodTracks(mood));
  return <VirtualizedTrackList tracks={data.tracks} />;
}
```

## ⚠️ SoundCloud Scraper (NOT RECOMMENDED - SEE WARNING BELOW)

**⚠️ CRITICAL**: See `SCRAPER_WARNING.md` for legal warnings before using scraper.

### Legal Warning

**SoundCloud's Terms of Service PROHIBIT web scraping:**

- Section 5.2: "You agree not to... use any automated system... to access the Service"
- Violation may result in:
  - IP ban
  - Legal action
  - Account termination

### If You Must Use (Educational Only)

1. **Enable Scraping** (NOT RECOMMENDED):

   ```bash
   # In .env
   ALLOW_SOUNDCLOUD_SCRAPING=true
   ```

2. **Install Dependencies**:

   ```bash
   npm install puppeteer better-sqlite3
   npm install -D @types/better-sqlite3 tsx
   ```

3. **Run Scraper**:

   ```bash
   npm run scrape:soundcloud
   ```

4. **Database**:
   - Creates SQLite database at `data/music.db`
   - Stores tracks with genre/mood classification
   - Only scrapes Creative Commons licensed content

### Risks

- ⚠️ Violates SoundCloud ToS
- ⚠️ Risk of IP ban
- ⚠️ Legal liability
- ⚠️ Account termination

**RECOMMENDED: Use Jamendo API instead**

## 📊 Database Schema

If using scraper, tracks are stored in SQLite:

```sql
CREATE TABLE tracks (
  id INTEGER PRIMARY KEY,
  title TEXT,
  artist TEXT,
  url TEXT UNIQUE,
  waveform_url TEXT,
  duration INTEGER,
  genre TEXT,  -- JSON array
  mood TEXT,   -- JSON array
  tags TEXT,   -- JSON array
  license TEXT DEFAULT 'CC-BY',
  scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎵 Mood Classification

Moods are automatically classified based on track tags:

- **happy**: upbeat, summer, party, positive
- **sad**: melancholic, emotional, ballad
- **chill**: lofi, relax, study, calm
- **energetic**: dance, upbeat, party
- **focus**: instrumental, study, concentration
- **relaxed**: ambient, lounge, peaceful
- **workout**: energetic, dance, intense
- **romantic**: romantic, ballad, love
- **nostalgic**: vintage, retro, classic

## 🔧 Integration

### Update Mood Page

Replace the example file with actual implementation:

```bash
# Copy example to actual page
cp app/mood/[mood]/page.example.tsx app/mood/[mood]/page.tsx
```

### Add to Homepage

```tsx
// app/page.tsx
import { getTracksByMood } from "@/lib/music-apis/jamendo";

// In component
const happyTracks = await getTracksByMood("happy", 10);
```

## 📝 Attribution

All tracks from Jamendo are Creative Commons licensed. Display attribution:

```tsx
<div className="text-xs text-spotify-text-gray">
  Music provided by Jamendo (CC-BY)
</div>
```

## 🚀 Next Steps

1. ✅ Get Jamendo API key
2. ✅ Add to `.env`
3. ✅ Test API endpoints
4. ✅ Integrate with mood pages
5. ✅ Add attribution UI

## 📚 Resources

- **Jamendo API Docs**: https://devportal.jamendo.com/v3.0
- **Creative Commons**: https://creativecommons.org/
- **Free Music Archive**: https://freemusicarchive.org/

---

**Status**: ✅ Jamendo API integrated and ready to use
**Legal**: ✅ All tracks are Creative Commons licensed
**Recommendation**: ✅ Use Jamendo API, avoid SoundCloud scraping
