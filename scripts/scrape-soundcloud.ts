/**
 * ⚠️ LEGAL WARNING ⚠️
 *
 * SoundCloud's Terms of Service PROHIBIT web scraping:
 * - Section 5.2: "You agree not to... use any automated system... to access the Service"
 * - Violation may result in IP ban, legal action, or account termination
 *
 * ⚠️ THIS SCRIPT IS FOR EDUCATIONAL PURPOSES ONLY ⚠️
 *
 * RECOMMENDED ALTERNATIVES (Legal):
 * 1. Jamendo API (https://devportal.jamendo.com/) - 100k+ CC tracks, free tier
 * 2. Free Music Archive API - Royalty-free music
 * 3. Pixabay Music API - Free music with attribution
 *
 * If you must use this script:
 * - Only scrape Creative Commons licensed content
 * - Respect rate limits (1 request/second)
 * - Add proper attribution
 * - Use at your own risk
 *
 * USE JAMENDO API INSTEAD - See lib/music-apis/jamendo.ts
 */

import puppeteer from "puppeteer";
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// ⚠️ WARNING: SoundCloud ToS prohibits scraping
const USE_SCRAPER = process.env.ALLOW_SOUNDCLOUD_SCRAPING === "true";

if (!USE_SCRAPER) {
  console.error(`
    ⚠️  SCRAPING DISABLED ⚠️
    
    SoundCloud scraping is disabled by default due to ToS violations.
    
    To enable (NOT RECOMMENDED):
    - Set ALLOW_SOUNDCLOUD_SCRAPING=true in .env
    - Understand you're violating SoundCloud's Terms of Service
    - Risk IP ban, legal action, or account termination
    
    RECOMMENDED: Use Jamendo API instead (legal, free, 100k+ tracks)
    - Get API key: https://devportal.jamendo.com/
    - See: lib/music-apis/jamendo.ts
    - API routes: /api/tracks/mood/[mood]
  `);
  process.exit(1);
}

const GENRES = [
  "rock",
  "pop",
  "hip-hop",
  "electronic",
  "classical",
  "jazz",
  "ambient",
  "lofi",
  "metal",
];
const MOODS = [
  "happy",
  "sad",
  "chill",
  "energetic",
  "focus",
  "relaxed",
  "workout",
];
const BASE_URL = "https://soundcloud.com/search/sounds?q=";

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, "music.db"));

// Create tracks table
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
    tags TEXT,
    license TEXT DEFAULT 'CC-BY',
    scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const insertTrack = db.prepare(`
  INSERT OR IGNORE INTO tracks (title, artist, url, waveform_url, duration, genre, mood, tags)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

/**
 * Classify track by genre and mood based on tags
 */
function classify(
  tags: string[],
  primaryGenre: string,
): { genre: string[]; mood: string[] } {
  const genreMap: Record<string, string[]> = {
    rock: ["rock", "indie", "alternative"],
    pop: ["pop", "dance", "electronic-pop"],
    "hip-hop": ["hip-hop", "rap", "trap"],
    electronic: ["electronic", "edm", "techno", "house"],
    classical: ["classical", "orchestral", "symphony"],
    jazz: ["jazz", "swing", "bebop"],
    ambient: ["ambient", "atmospheric", "drone"],
    lofi: ["lofi", "chillhop", "lo-fi"],
    metal: ["metal", "hard-rock", "heavy-metal"],
  };

  const moodMap: Record<string, string[]> = {
    happy: ["upbeat", "summer", "party", "joyful", "positive"],
    sad: ["melancholic", "emotional", "ballad", "sad", "depressing"],
    chill: ["lofi", "relax", "study", "calm", "peaceful"],
    energetic: ["dance", "upbeat", "party", "energetic", "intense"],
    focus: ["instrumental", "study", "concentration", "focus", "work"],
    relaxed: ["ambient", "lounge", "chill", "peaceful", "relax"],
    workout: ["energetic", "dance", "intense", "workout", "fitness"],
  };

  const genres = [primaryGenre];
  const moods: string[] = [];

  // Match tags to genres
  for (const tag of tags) {
    const lowerTag = tag.toLowerCase();
    for (const [genre, keywords] of Object.entries(genreMap)) {
      if (keywords.some((kw) => lowerTag.includes(kw))) {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      }
    }

    // Match tags to moods
    for (const [mood, keywords] of Object.entries(moodMap)) {
      if (keywords.some((kw) => lowerTag.includes(kw))) {
        if (!moods.includes(mood)) {
          moods.push(mood);
        }
      }
    }
  }

  return {
    genre: genres.length > 0 ? genres : [primaryGenre],
    mood: moods.length > 0 ? moods : ["chill"],
  };
}

/**
 * Scrape SoundCloud for a specific genre
 * ⚠️ WARNING: This violates SoundCloud's ToS
 */
async function scrapeGenre(
  genre: string,
  pageNum: number = 1,
): Promise<number> {
  console.log(`[Scraper] Scraping ${genre} (page ${pageNum})...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  );

  try {
    const searchQuery = encodeURIComponent(
      `royalty free ${genre} creativecommons`,
    );
    await page.goto(`${BASE_URL}${searchQuery}&page=${pageNum}`, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for tracks to load
    await page.waitForSelector('article[data-testid="track"]', {
      timeout: 10000,
    });

    const tracks = await page.evaluate(() => {
      const items = Array.from(
        document.querySelectorAll('article[data-testid="track"]'),
      );
      return items
        .slice(0, 50)
        .map((el) => {
          const titleEl = el.querySelector('[data-testid="trackTitle"]');
          const artistEl = el.querySelector('[data-testid="trackArtist"]');
          const linkEl = el.querySelector('a[href*="/"]');
          const waveformEl = el.querySelector('[data-testid="waveform"]');
          const durationEl = el.querySelector('[data-testid="trackDuration"]');
          const tagEls = Array.from(el.querySelectorAll(".tag"));

          const title = titleEl?.textContent?.trim() || "";
          const artist = artistEl?.textContent?.trim() || "";
          const url = linkEl?.getAttribute("href") || "";
          const waveform = waveformEl?.getAttribute("src") || "";
          const durationText = durationEl?.textContent?.trim() || "0:00";
          const tags = tagEls
            .map((t) => t.textContent?.trim() || "")
            .filter(Boolean);

          // Parse duration (MM:SS or HH:MM:SS)
          const durationParts = durationText.split(":").map(Number);
          let duration = 0;
          if (durationParts.length === 2) {
            duration = durationParts[0] * 60 + durationParts[1];
          } else if (durationParts.length === 3) {
            duration =
              durationParts[0] * 3600 +
              durationParts[1] * 60 +
              durationParts[2];
          }

          return {
            title,
            artist,
            url: url.startsWith("http") ? url : `https://soundcloud.com${url}`,
            waveform_url: waveform,
            duration,
            tags,
          };
        })
        .filter((t) => {
          // Only include CC-licensed tracks
          const hasCC = t.tags.some(
            (tag) =>
              tag.toLowerCase().includes("cc") ||
              tag.toLowerCase().includes("creativecommons") ||
              tag.toLowerCase().includes("royalty-free"),
          );
          return t.title && t.artist && hasCC;
        });
    });

    let inserted = 0;
    for (const track of tracks) {
      const { genre: genres, mood: moods } = classify(track.tags, genre);

      try {
        insertTrack.run(
          track.title,
          track.artist,
          track.url,
          track.waveform_url,
          track.duration,
          JSON.stringify(genres),
          JSON.stringify(moods),
          JSON.stringify(track.tags),
        );
        inserted++;
      } catch (error) {
        // Ignore duplicate errors
        if (!(error as Error).message.includes("UNIQUE constraint")) {
          console.error(`[Scraper] Error inserting track:`, error);
        }
      }
    }

    console.log(
      `[Scraper] Inserted ${inserted} tracks for ${genre} (page ${pageNum})`,
    );
    return inserted;
  } catch (error) {
    console.error(`[Scraper] Error scraping ${genre}:`, error);
    return 0;
  } finally {
    await browser.close();
  }
}

/**
 * Main scraping function
 * ⚠️ WARNING: This violates SoundCloud's ToS
 */
async function main() {
  console.log(`
    ⚠️  SOUNDCLOUD SCRAPER ⚠️
    
    This script violates SoundCloud's Terms of Service.
    Use at your own risk. IP bans and legal action are possible.
    
    RECOMMENDED: Use Jamendo API instead (legal, free)
    See: lib/music-apis/jamendo.ts
  `);

  let totalTracks = 0;

  for (const genre of GENRES) {
    for (let page = 1; page <= 3; page++) {
      const count = await scrapeGenre(genre, page);
      totalTracks += count;

      // Rate limiting: 2 seconds between requests
      if (page < 3) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    // Longer delay between genres
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  db.close();
  console.log(`\n✅ Scraping complete! Total tracks: ${totalTracks}`);
  console.log(
    `\n⚠️  Remember: This data was scraped illegally. Use Jamendo API instead.`,
  );
}

if (require.main === module) {
  main().catch(console.error);
}

export { scrapeGenre, classify };
