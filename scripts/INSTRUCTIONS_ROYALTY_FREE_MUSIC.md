# Instructions: Getting Real Royalty-Free Music for Demo Tracks

## Quick Solution: Download Mood-Matched Tracks

### Option 1: Pixabay Music (Recommended - Easiest)

1. **Visit**: https://pixabay.com/music/
2. **Search by mood**:
   - Melancholic: Search "sad emotional instrumental"
   - Nostalgic: Search "nostalgic retro"
   - Reflective: Search "calm peaceful ambient"
   - Content: Search "happy peaceful acoustic"
   - Joyful: Search "happy upbeat cheerful"
   - Euphoric: Search "energetic exciting"
3. **Download tracks** (Free, no attribution needed for most)
4. **Rename and place** in `public/audio/` as `track-1.mp3`, `track-2.mp3`, etc.

### Option 2: Free Music Archive

1. **Visit**: https://freemusicarchive.org/
2. **Browse by genre/mood**
3. **Filter by license** (CC0 = no attribution needed)
4. **Download and rename** to track-X.mp3

### Option 3: YouTube Audio Library

1. **Visit**: https://studio.youtube.com/channel/UC.../music
2. **Search by mood/feeling**
3. **Download tracks**
4. **Place in** `public/audio/`

### Option 4: Incompetech (Kevin MacLeod)

1. **Visit**: https://incompetech.com/music/royalty-free/
2. **Browse moods**: melancholic, upbeat, calm, etc.
3. **Download** (requires attribution in production, fine for demos)
4. **Rename to** track-X.mp3

### Option 5: Freesound.org

1. **Visit**: https://freesound.org/
2. **Search mood tags** + "music"
3. **Filter by CC0 license**
4. **Download and convert to MP3** if needed

## Automated Script Option

If you want to automate with Pixabay API:

1. **Get free API key**: https://pixabay.com/api/docs/
2. **Edit** `scripts/download_pixabay_music.py`
3. **Set** `PIXABAY_API_KEY = "your-key-here"`
4. **Run** the script

## Manual Download Template

For each mood, download ~25 tracks:

- **Melancholic** (tracks 1-20): Sad, slow, emotional instrumental tracks
- **Nostalgic** (tracks 21-40): Retro, vintage, reminiscent tracks
- **Reflective** (tracks 41-60): Calm, peaceful, ambient tracks
- **Content** (tracks 61-80): Happy, peaceful, acoustic tracks
- **Joyful** (tracks 81-100): Upbeat, cheerful, energetic tracks
- **Euphoric** (tracks 101-120): Very energetic, exciting, uplifting tracks
- **Mixed** (tracks 121-150): Variety of moods

## File Naming

Rename downloaded files to:

- `track-1.mp3` through `track-150.mp3`
- Place all in `public/audio/` directory

## Quick Start (One Track Per Mood)

If you just want to test quickly, download **one track per mood** (6 tracks total):

1. **Melancholic**: Download 1 sad/emotional track → `track-1.mp3`
2. **Nostalgic**: Download 1 nostalgic track → `track-21.mp3`
3. **Reflective**: Download 1 calm track → `track-41.mp3`
4. **Content**: Download 1 happy peaceful track → `track-61.mp3`
5. **Joyful**: Download 1 upbeat track → `track-81.mp3`
6. **Euphoric**: Download 1 energetic track → `track-101.mp3`

Then copy each to create multiple variations (track-1, track-2, etc. for melancholic mood).

## Recommended Sources by Mood

### Melancholic

- Pixabay: "sad piano", "emotional instrumental"
- Incompetech: "Temptation March", "Darkest Child"

### Joyful

- Pixabay: "happy upbeat", "cheerful pop"
- Incompetech: "Jazz Brunch", "Monkeys Spinning Monkeys"

### Euphoric

- Pixabay: "energetic electronic", "uplifting"
- Incompetech: "Scheming Weasel", "Blizzards"
