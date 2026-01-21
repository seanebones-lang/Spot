/**
 * ⚠️⚠️⚠️ CRITICAL LEGAL WARNING ⚠️⚠️⚠️
 *
 * SoundCloud's Terms of Service EXPLICITLY PROHIBIT web scraping:
 * - Section 5.2: "You agree not to... use any automated system... to access the Service"
 * - Violation may result in:
 *   - Permanent IP ban
 *   - Legal action and lawsuits
 *   - Account termination
 *   - DMCA takedown requests
 *
 * ⚠️ THIS SCRIPT VIOLATES SOUNDCLOUD'S TERMS OF SERVICE ⚠️
 *
 * RECOMMENDED ALTERNATIVE (100% LEGAL):
 * Use Jamendo API instead - See lib/music-apis/jamendo.ts
 * - 100k+ Creative Commons tracks
 * - Legal API access
 * - Free tier: 200 requests/day
 * - No ToS violations
 *
 * IF YOU USE THIS SCRIPT:
 * - You are violating SoundCloud's Terms of Service
 * - You risk legal action
 * - You risk IP ban
 * - Use at your own risk
 * - We strongly recommend using Jamendo API instead
 */

import puppeteer from "puppeteer";
import Database from "better-sqlite3";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

// ⚠️ WARNING: SoundCloud ToS prohibits scraping
const USE_SCRAPER = process.env.ALLOW_SOUNDCLOUD_SCRAPING === "true";

if (!USE_SCRAPER) {
  console.error(`
    ⚠️⚠️⚠️  SCRAPING DISABLED ⚠️⚠️⚠️
    
    SoundCloud scraping is disabled by default due to ToS violations.
    
    To enable (NOT RECOMMENDED - YOU RISK LEGAL ACTION):
    - Set ALLOW_SOUNDCLOUD_SCRAPING=true in .env
    - Understand you're violating SoundCloud's Terms of Service
    - Risk IP ban, legal action, or account termination
    
    ⭐ RECOMMENDED: Use Jamendo API instead (legal, free, 100k+ tracks)
    - Get API key: https://devportal.jamendo.com/
    - See: lib/music-apis/jamendo.ts
    - API routes: /api/tracks/mood/[mood]
    - No legal risks, no ToS violations
  `);
  process.exit(1);
}

// Comprehensive genre list (60+)
const GENRES = [
  "rock",
  "pop",
  "hip-hop",
  "rap",
  "r&b",
  "soul",
  "funk",
  "disco",
  "electronic",
  "edm",
  "techno",
  "house",
  "dubstep",
  "trance",
  "drum and bass",
  "ambient",
  "lofi",
  "chillwave",
  "chillhop",
  "jazz",
  "blues",
  "swing",
  "classical",
  "orchestral",
  "piano",
  "acoustic",
  "folk",
  "indie",
  "alternative",
  "punk",
  "grunge",
  "metal",
  "heavy metal",
  "thrash",
  "reggae",
  "dancehall",
  "ska",
  "latin",
  "salsa",
  "reggaeton",
  "bachata",
  "country",
  "bluegrass",
  "world",
  "african",
  "indian",
  "k-pop",
  "bollywood",
  "soundtrack",
  "cinematic",
  "game",
  "chiptune",
  "vaporwave",
  "synthwave",
  "phonk",
  "hyperpop",
  "drill",
  "trap",
  "grime",
  "uk drill",
];

// Comprehensive mood list (35+)
const MOODS = [
  "happy",
  "joyful",
  "upbeat",
  "energetic",
  "dance",
  "party",
  "workout",
  "running",
  "excited",
  "positive",
  "uplifting",
  "motivational",
  "chill",
  "relaxed",
  "calm",
  "peaceful",
  "serene",
  "meditative",
  "focus",
  "study",
  "sleep",
  "lofi",
  "nostalgic",
  "melancholic",
  "sad",
  "emotional",
  "heartbreak",
  "reflective",
  "dreamy",
  "atmospheric",
  "epic",
  "intense",
  "aggressive",
  "dark",
  "mysterious",
];

// Style tags (25+)
const STYLES = [
  "instrumental",
  "vocal",
  "female vocal",
  "male vocal",
  "choir",
  "remix",
  "cover",
  "live",
  "acoustic version",
  "piano version",
  "guitar",
  "synth",
  "beats",
  "loop",
  "sample pack",
  "original",
  "demo",
  "unplugged",
  "stripped",
  "orchestral",
  "symphonic",
  "minimal",
  "ambient",
  "experimental",
];

const BASE_URL = "https://soundcloud.com/search/sounds?q=";
const TARGET_TRACKS = 200; // Minimum target
const MAX_TRACKS = 500; // Maximum to prevent excessive scraping

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, "music.db"));

// Create enhanced tracks table
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

const insertTrack = db.prepare(`
  INSERT OR IGNORE INTO tracks (title, artist, url, waveform_url, duration, genre, mood, style, tags, search_query)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

/**
 * Advanced classification using keyword matching
 * (Transformers would require @xenova/transformers but adds complexity)
 */
function classifyTrack(
  title: string,
  artist: string,
  tags: string[],
  searchQuery: string,
): { genres: string[]; moods: string[]; styles: string[] } {
  const allText =
    `${title} ${artist} ${tags.join(" ")} ${searchQuery}`.toLowerCase();

  // Genre classification
  const genres: string[] = [];
  for (const genre of GENRES) {
    if (allText.includes(genre.toLowerCase())) {
      genres.push(genre);
    }
  }

  // Mood classification
  const moods: string[] = [];
  for (const mood of MOODS) {
    if (allText.includes(mood.toLowerCase())) {
      moods.push(mood);
    }
  }

  // Style classification
  const styles: string[] = [];
  for (const style of STYLES) {
    if (allText.includes(style.toLowerCase())) {
      styles.push(style);
    }
  }

  // Extract from tags
  tags.forEach((tag) => {
    const lowerTag = tag.toLowerCase();
    if (GENRES.some((g) => lowerTag.includes(g))) {
      const genre = GENRES.find((g) => lowerTag.includes(g));
      if (genre && !genres.includes(genre)) genres.push(genre);
    }
    if (MOODS.some((m) => lowerTag.includes(m))) {
      const mood = MOODS.find((m) => lowerTag.includes(m));
      if (mood && !moods.includes(mood)) moods.push(mood);
    }
    if (STYLES.some((s) => lowerTag.includes(s))) {
      const style = STYLES.find((s) => lowerTag.includes(s));
      if (style && !styles.includes(style)) styles.push(style);
    }
  });

  return {
    genres: genres.length > 0 ? genres : ["unknown"],
    moods: moods.length > 0 ? moods : ["chill"],
    styles: styles.length > 0 ? styles : [],
  };
}

/**
 * Scrape SoundCloud with a specific query
 * ⚠️ WARNING: This violates SoundCloud's ToS
 */
async function scrapeQuery(
  query: string,
  pageNum: number = 1,
): Promise<number> {
  const fullQuery = `${query} creativecommons royalty free`;
  console.log(`[Scraper] Query: "${fullQuery}" | Page: ${pageNum}`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  );

  try {
    const searchUrl = `${BASE_URL}${encodeURIComponent(fullQuery)}&page=${pageNum}`;
    await page.goto(searchUrl, {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for tracks to load
    try {
      await page.waitForSelector('article[data-testid="track"]', {
        timeout: 10000,
      });
    } catch (e) {
      console.log(`[Scraper] No tracks found for: ${fullQuery}`);
      await browser.close();
      return 0;
    }

    const tracks = await page.evaluate(() => {
      const items = Array.from(
        document.querySelectorAll('article[data-testid="track"]'),
      );
      return items
        .slice(0, 20)
        .map((el) => {
          const titleEl = el.querySelector(
            '[data-testid="trackTitle"]',
          ) as HTMLElement;
          const artistEl = el.querySelector(
            '[data-testid="trackArtist"]',
          ) as HTMLElement;
          const linkEl = el.querySelector('a[href*="/"]') as HTMLAnchorElement;
          const waveformEl = el.querySelector(
            '[data-testid="waveform"]',
          ) as HTMLImageElement;
          const durationEl = el.querySelector(
            '[data-testid="trackDuration"]',
          ) as HTMLElement;
          const tagEls = Array.from(el.querySelectorAll(".sc-tag, .tag"));

          const title = titleEl?.textContent?.trim() || "";
          const artist = artistEl?.textContent?.trim() || "";
          const url = linkEl?.getAttribute("href") || "";
          const waveform = waveformEl?.getAttribute("src") || "";
          const durationText = durationEl?.textContent?.trim() || "0:00";
          const tags = tagEls
            .map((t) => (t as HTMLElement).textContent?.trim())
            .filter(Boolean) as string[];

          // Parse duration
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

          // Full URL
          const fullUrl = url.startsWith("http")
            ? url
            : `https://soundcloud.com${url}`;

          return {
            title,
            artist,
            url: fullUrl,
            waveform_url: waveform,
            duration,
            tags: tags.filter(
              (t) =>
                t.toLowerCase().includes("cc") ||
                t.toLowerCase().includes("creativecommons") ||
                t.toLowerCase().includes("royalty") ||
                t.toLowerCase().includes("free"),
            ),
          };
        })
        .filter((t) => {
          // Only include tracks with CC tags
          const hasCC = t.tags.some(
            (tag) =>
              tag.toLowerCase().includes("cc") ||
              tag.toLowerCase().includes("creativecommons") ||
              tag.toLowerCase().includes("royalty-free"),
          );
          return t.title && t.artist && t.url && hasCC;
        });
    });

    let added = 0;
    for (const track of tracks) {
      // Check if we've reached max
      const currentCount = (
        db.prepare("SELECT COUNT(*) as count FROM tracks").get() as {
          count: number;
        }
      ).count;
      if (currentCount >= MAX_TRACKS) {
        console.log(
          `[Scraper] Reached maximum tracks (${MAX_TRACKS}), stopping...`,
        );
        break;
      }

      // Classify track
      const { genres, moods, styles } = classifyTrack(
        track.title,
        track.artist,
        track.tags,
        query,
      );

      try {
        insertTrack.run(
          track.title,
          track.artist,
          track.url,
          track.waveform_url,
          track.duration,
          JSON.stringify(genres),
          JSON.stringify(moods),
          JSON.stringify(styles),
          JSON.stringify(track.tags),
          query,
        );
        added++;
      } catch (error) {
        // Ignore duplicate errors
        if (!(error as Error).message.includes("UNIQUE constraint")) {
          console.error(`[Scraper] Error inserting track:`, error);
        }
      }
    }

    const totalCount = (
      db.prepare("SELECT COUNT(*) as count FROM tracks").get() as {
        count: number;
      }
    ).count;
    console.log(
      `[Scraper] Added: ${added} | Total: ${totalCount}/${TARGET_TRACKS}`,
    );

    await browser.close();
    return added;
  } catch (error) {
    console.error(`[Scraper] Error scraping "${query}":`, error);
    await browser.close();
    return 0;
  }
}

/**
 * Generate search queries combining genres, moods, and styles
 */
function generateQueries(): string[] {
  const queries: string[] = [];

  // Genre-only queries
  for (const genre of GENRES) {
    queries.push(`${genre} royalty free`);
  }

  // Genre + mood combinations (sample for speed)
  for (const genre of GENRES.slice(0, 15)) {
    for (const mood of MOODS.slice(0, 10)) {
      queries.push(`${genre} ${mood}`);
    }
  }

  // Style queries
  for (const style of STYLES) {
    queries.push(`${style} creativecommons`);
  }

  // Genre + style combinations
  for (const genre of GENRES.slice(0, 10)) {
    for (const style of STYLES.slice(0, 5)) {
      queries.push(`${genre} ${style}`);
    }
  }

  return [...new Set(queries)]; // Remove duplicates
}

/**
 * Main scraping function
 * ⚠️ WARNING: This violates SoundCloud's ToS
 */
async function main() {
  console.log(`
    ⚠️⚠️⚠️  SOUNDCLOUD COMPREHENSIVE SCRAPER ⚠️⚠️⚠️
    
    This script violates SoundCloud's Terms of Service.
    Use at your own risk. IP bans and legal action are possible.
    
    Target: ${TARGET_TRACKS}+ tracks
    Genres: ${GENRES.length}
    Moods: ${MOODS.length}
    Styles: ${STYLES.length}
    
    ⭐ RECOMMENDED: Use Jamendo API instead (legal, free)
    See: lib/music-apis/jamendo.ts
  `);

  const queries = generateQueries();
  console.log(`[Scraper] Generated ${queries.length} search queries\n`);

  let totalAdded = 0;
  let queryIndex = 0;

  for (const query of queries) {
    // Check if we've reached target
    const currentCount = (
      db.prepare("SELECT COUNT(*) as count FROM tracks").get() as {
        count: number;
      }
    ).count;
    if (currentCount >= TARGET_TRACKS) {
      console.log(`\n[Scraper] ✅ Target reached: ${currentCount} tracks`);
      break;
    }

    // Scrape up to 5 pages per query
    for (let page = 1; page <= 5; page++) {
      const currentCount = (
        db.prepare("SELECT COUNT(*) as count FROM tracks").get() as {
          count: number;
        }
      ).count;
      if (currentCount >= TARGET_TRACKS) {
        break;
      }

      const added = await scrapeQuery(query, page);
      totalAdded += added;

      // Rate limiting: 3-5 seconds between requests
      const delay = 3000 + Math.random() * 2000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    queryIndex++;
    console.log(
      `[Scraper] Progress: ${queryIndex}/${queries.length} queries processed\n`,
    );
  }

  // Export to JSON
  const allTracks = db.prepare("SELECT * FROM tracks").all();
  const jsonPath = path.join(dataDir, "tracks.json");
  await fsPromises.writeFile(jsonPath, JSON.stringify(allTracks, null, 2));

  // Export to CSV
  const csvPath = path.join(dataDir, "tracks.csv");
  const csvHeader =
    "id,title,artist,url,duration,genre,mood,style,license,scraped_at\n";
  const csvRows = allTracks.map((track: any) => {
    return [
      track.id,
      `"${(track.title || "").replace(/"/g, '""')}"`,
      `"${(track.artist || "").replace(/"/g, '""')}"`,
      track.url,
      track.duration,
      `"${(track.genre || "").replace(/"/g, '""')}"`,
      `"${(track.mood || "").replace(/"/g, '""')}"`,
      `"${(track.style || "").replace(/"/g, '""')}"`,
      track.license,
      track.scraped_at,
    ].join(",");
  });
  await fsPromises.writeFile(csvPath, csvHeader + csvRows.join("\n"));

  const finalCount = allTracks.length;
  console.log(`
    ✅ COMPREHENSIVE SCRAPING COMPLETE
    
    Total Tracks: ${finalCount}
    Target: ${TARGET_TRACKS}+
    Status: ${finalCount >= TARGET_TRACKS ? "✅ TARGET MET" : "⚠️ BELOW TARGET"}
    
    Exports:
    - JSON: ${jsonPath}
    - CSV: ${csvPath}
    
    ⚠️  Remember: This data was scraped illegally.
    ⭐ Use Jamendo API instead for legal access.
  `);

  db.close();
}

if (require.main === module) {
  main().catch((error) => {
    console.error("[Scraper] Fatal error:", error);
    db.close();
    process.exit(1);
  });
}

export { scrapeQuery, classifyTrack, generateQueries };
