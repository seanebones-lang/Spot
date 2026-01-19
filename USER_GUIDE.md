# 📖 Spot Music - User Guide

## Quick Start

### 1. Web Access

Visit: **https://empulse-music.vercel.app**

### 2. Search & Play

1. Click **Search** in sidebar
2. Type: "chill beats" (or any genre/mood)
3. Click a track to play
4. Use player controls: Play, Pause, Skip, Volume

### 3. Visualizations & EQ

1. While playing, click **Visualizer** toggle
2. Choose: **Spectrum** (2D bars) or **3D** (WebGL)
3. Adjust **Equalizer**: 10-band EQ controls
4. Fine-tune frequencies for your preference

### 4. Mood Discovery

1. Go to **Mood** page
2. Play any track
3. Click **Analyze Mood**
4. AI will detect: Chill, Energetic, Melancholic, etc.
5. Get **Recommendations** based on mood

### 5. SoundCloud Import

1. Go to **Upload** page
2. Paste SoundCloud URL (owned tracks only)
3. Click **Bulk Import**
4. Tracks added to your library
5. Play from **Your Library**

### 6. Mobile App

1. **Download**: APK (Android) or TestFlight (iOS)
2. **Install**: Follow device instructions
3. **Login**: Use web account credentials
4. **Sync**: Library automatically syncs
5. **Play**: Same features as web

## Features

### Audio Player

- **High-Quality Playback**: Lossless audio support
- **10-Band EQ**: Professional equalizer
- **Playback Speed**: 0.5x to 2.0x
- **Seek**: Jump to any position
- **Volume**: Full control

### Visualizations

- **Spectrum Analyzer**: Real-time frequency bars
- **3D Visualizer**: WebGL immersive experience
- **Color Schemes**: Multiple themes
- **Fullscreen Mode**: Immersive viewing

### Mood Discovery

- **AI Analysis**: ML-powered mood detection
- **Smart Recommendations**: Based on mood
- **Mood Playlists**: Auto-generated playlists
- **Mood History**: Track your listening patterns

### Radio

- **Live Stations**: Stream radio stations
- **Genre Stations**: By music genre
- **Mood Stations**: By emotional state
- **Custom Stations**: Create your own

### Library Management

- **Playlists**: Create and manage playlists
- **Favorites**: Save favorite tracks
- **Recently Played**: Quick access
- **Search**: Full-text search

## Mobile App

### Installation

- **Android**: Download APK → Install → Open
- **iOS**: TestFlight → Install → Open

### Features

- All web features available
- Offline playback (cached tracks)
- Background playback
- Lock screen controls
- Widget support (iOS)

## API Access

### Health Check

```bash
curl https://spot-music-api.railway.app/api/health
```

### Mood Analysis

```bash
curl -X POST https://spot-music-api.railway.app/api/mood/analyze \
  -H "Content-Type: application/json" \
  -d '{"audioUrl": "https://example.com/track.mp3"}'
```

## Troubleshooting

### Audio Not Playing

- Check browser audio permissions
- Verify network connection
- Try different audio format

### Visualizer Not Showing

- Enable WebGL in browser
- Check browser compatibility
- Try different visualization mode

### Mobile Sync Issues

- Refresh app
- Re-login
- Check network connection

## Support

- **Documentation**: https://github.com/seanebones-lang/Spot/wiki
- **Issues**: GitHub Issues
- **Feedback**: Submit via app

---

**Enjoy Spot Music!** 🎵
