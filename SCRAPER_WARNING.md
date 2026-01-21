# ⚠️ CRITICAL WARNING: SoundCloud Scraper

## 🚨 Legal Notice

**SoundCloud's Terms of Service EXPLICITLY PROHIBIT web scraping.**

### Terms of Service Violation

Section 5.2 of SoundCloud's Terms of Service states:
> "You agree not to... use any automated system (including, without limitation, robots, spiders, offline readers, scrapers) to access the Service"

### Consequences of Violation

If you use the scraper scripts, you risk:
- ⚠️ **Permanent IP ban** from SoundCloud
- ⚠️ **Legal action** and potential lawsuits
- ⚠️ **Account termination** if you have a SoundCloud account
- ⚠️ **DMCA takedown requests**
- ⚠️ **Criminal charges** in some jurisdictions

## ✅ RECOMMENDED ALTERNATIVE: Jamendo API

**Use Jamendo API instead - It's 100% legal and better:**

### Why Jamendo API?

1. ✅ **Legal** - Official API, no ToS violations
2. ✅ **Free** - 200 requests/day on free tier
3. ✅ **Large Catalog** - 100k+ Creative Commons tracks
4. ✅ **Reliable** - No risk of bans or legal issues
5. ✅ **Better Quality** - Curated, properly licensed tracks
6. ✅ **Easy Integration** - Already implemented in this codebase

### Setup Jamendo API

```bash
# 1. Get free API key
# Visit: https://devportal.jamendo.com/

# 2. Add to .env
JAMENDO_API_KEY=your_api_key_here

# 3. Use the API
# Already implemented! See:
# - lib/music-apis/jamendo.ts
# - app/api/tracks/mood/[mood]/route.ts
# - app/api/tracks/genre/[genre]/route.ts
```

### Usage

```typescript
// Legal, safe, reliable
const tracks = await getTracksByMood('happy', 50);
// Returns 50 happy tracks from Jamendo
```

## ⚠️ If You Still Want to Use the Scraper

### Requirements

1. **Understand the risks** - You are violating ToS
2. **Enable explicitly** - Set `ALLOW_SOUNDCLOUD_SCRAPING=true` in `.env`
3. **Use responsibly** - Rate limit, respect robots.txt
4. **Only CC content** - Only scrape Creative Commons licensed tracks
5. **Add attribution** - Display proper attribution for CC tracks

### Installation

```bash
npm install puppeteer better-sqlite3
npm install -D @types/better-sqlite3 tsx
```

### Usage

```bash
# Basic scraper (simple)
npm run scrape:soundcloud

# Comprehensive scraper (all genres/moods/styles)
npm run scrape:comprehensive
```

### What It Does

- Scrapes SoundCloud for Creative Commons tracks
- Classifies tracks by genre, mood, and style
- Stores in SQLite database (`data/music.db`)
- Exports to JSON and CSV
- Target: 200+ tracks minimum

### Limitations

- ⚠️ Violates SoundCloud ToS
- ⚠️ Risk of IP ban
- ⚠️ May stop working if SoundCloud changes structure
- ⚠️ Rate limiting required (3-5s between requests)
- ⚠️ Only finds CC-licensed content

## 📊 Comparison

| Feature | Jamendo API | SoundCloud Scraper |
|---------|-------------|-------------------|
| Legal | ✅ Yes | ❌ No (ToS violation) |
| Risk | ✅ None | ⚠️ IP ban, legal action |
| Reliability | ✅ High | ⚠️ May break |
| Catalog Size | ✅ 100k+ tracks | ⚠️ Limited to CC only |
| Setup | ✅ Easy (API key) | ⚠️ Complex (scraping) |
| Maintenance | ✅ None needed | ⚠️ Frequent updates |
| Cost | ✅ Free | ⚠️ Legal risk |

## 🎯 Recommendation

**DO NOT USE THE SCRAPER**

Instead:
1. ✅ Get Jamendo API key (free)
2. ✅ Use existing API integration
3. ✅ Enjoy legal, reliable access to 100k+ tracks
4. ✅ No legal risks, no ToS violations

## 📚 Resources

- **Jamendo API**: https://devportal.jamendo.com/
- **SoundCloud ToS**: https://soundcloud.com/terms-of-use
- **Creative Commons**: https://creativecommons.org/
- **Setup Guide**: See `MUSIC_API_SETUP.md`

---

**Bottom Line**: Use Jamendo API. It's legal, free, reliable, and already implemented. Don't risk legal action for scraping.
