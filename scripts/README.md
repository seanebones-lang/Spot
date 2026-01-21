# Scraper Scripts

## ⚠️ Legal Warning

**All scraper scripts violate SoundCloud's Terms of Service.**

See `SCRAPER_WARNING.md` for complete legal information.

**RECOMMENDED**: Use Jamendo API instead (legal, free, 100k+ tracks)

## Available Scripts

### 1. Basic Scraper (`scrape-soundcloud.ts`)

Simple scraper for educational purposes.

```bash
npm run scrape:soundcloud
```

**Features**:
- Basic genre scraping
- CC license filtering
- SQLite storage
- Simple classification

### 2. Comprehensive Scraper (`scrape-comprehensive.ts`)

Advanced scraper with full genre/mood/style coverage.

```bash
npm run scrape:comprehensive
```

**Features**:
- 60+ genres
- 35+ moods
- 25+ styles
- Advanced classification
- JSON/CSV export
- Target: 200+ tracks minimum
- Progress logging

**Requirements**:
```bash
npm install puppeteer better-sqlite3
npm install -D @types/better-sqlite3 tsx
```

**Configuration**:
```env
ALLOW_SOUNDCLOUD_SCRAPING=true  # Required to enable
```

## Output

Both scripts create:
- `data/music.db` - SQLite database
- `data/tracks.json` - JSON export (comprehensive only)
- `data/tracks.csv` - CSV export (comprehensive only)

## Database Schema

```sql
CREATE TABLE tracks (
  id INTEGER PRIMARY KEY,
  title TEXT,
  artist TEXT,
  url TEXT UNIQUE,
  waveform_url TEXT,
  duration INTEGER,
  genre TEXT,      -- JSON array
  mood TEXT,       -- JSON array
  style TEXT,      -- JSON array (comprehensive only)
  tags TEXT,       -- JSON array
  license TEXT DEFAULT 'CC-BY',
  scraped_at DATETIME,
  search_query TEXT  -- (comprehensive only)
);
```

## Usage in App

After scraping, you can query the database:

```typescript
import Database from 'better-sqlite3';
const db = new Database('data/music.db');

// Get tracks by mood
const tracks = db
  .prepare('SELECT * FROM tracks WHERE json_each(mood) LIKE ?')
  .all('%happy%');
```

## ⚠️ Remember

- These scripts violate SoundCloud's ToS
- Use at your own risk
- **RECOMMENDED**: Use Jamendo API instead
