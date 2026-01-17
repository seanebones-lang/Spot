# Quick Start Guide - EmPulse Music

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: **http://localhost:3000**

## 📋 Available Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎯 Key Pages to Explore

### Music Features
- **Home**: `http://localhost:3000/` - Main dashboard with wellness features
- **Mood**: `http://localhost:3000/mood` - Revolutionary mood-based music selection
- **Search**: `http://localhost:3000/search` - Search all content
- **Library**: `http://localhost:3000/collection` - Your saved content

### Wellness Features
- **Check-in**: `http://localhost:3000/check-in` - Daily mood check-in
- **Journal**: `http://localhost:3000/journal` - Journaling
- **Affirmations**: `http://localhost:3000/affirmations` - Affirmations library
- **Wellness Hub**: `http://localhost:3000/wellness` - Mental health resources
- **Rewards**: `http://localhost:3000/rewards` - Points & rewards catalog

### Artist Features
- **Artist Signup**: `http://localhost:3000/artist/signup` - Complete onboarding workflow
- **Upload**: `http://localhost:3000/upload` - Track upload with mandatory mood tags
- **Dashboard**: `http://localhost:3000/dashboard/artist` - Artist dashboard with live stats

### Additional Pages
- **Radio**: `http://localhost:3000/radio` - Radio stations

## ⌨️ Keyboard Shortcuts

Try these while using the app:

- **Space**: Play/Pause music
- **← →**: Seek backward/forward 10 seconds
- **↑ ↓**: Volume up/down
- **Ctrl/Cmd + K**: Focus search bar
- **Ctrl/Cmd + ← →**: Previous/Next track

## 🎨 Key Features to Test

### Mood-Based Discovery
1. Go to `/mood`
2. Select a mood (e.g., "Joyful")
3. Choose feelings (e.g., "Great", "Confident")
4. Adjust vibe slider (e.g., 85%)
5. Select genres (e.g., "Pop", "Electronic")
6. See filtered playlists update in real-time

### Daily Check-in
1. Go to `/check-in`
2. Adjust mood sliders
3. Select feeling chips
4. (Optional) Add journal entry
5. Complete check-in to earn points

### Artist Upload Workflow
1. Go to `/artist/signup` (if not approved)
2. Complete 6-step legal signup
3. Go to `/upload` (after approval)
4. Upload audio file
5. Fill metadata
6. **Adjust mood tags** (required step)
7. Review and submit

### Player Features
1. Play any track from home/search/playlist
2. Click mood widget in player bar to see track mood tags
3. Click queue icon to view/manage queue
4. Click PiP icon to pop out player window
5. Adjust quality selector for lossless playback

## 🔍 What's Working

✅ All pages render correctly
✅ Player controls functional
✅ Mood filtering algorithm working
✅ State persistence (localStorage)
✅ Keyboard shortcuts active
✅ Responsive design
✅ Dark theme throughout

## 📝 Notes

- **Mock Data**: Currently uses JSON files in `data/mock/`
- **Audio Files**: Placeholder URLs - real files needed for playback
- **Backend**: Ready for API integration (replace `lib/data.ts`)

## 🐛 Troubleshooting

**Build Errors?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Port 3000 in use?**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**TypeScript Errors?**
- All types are defined in `types/` directory
- Check `tsconfig.json` for path aliases

## 📚 Documentation

- **README.md**: Full project overview
- **PROJECT_SUMMARY.md**: Complete implementation status
- **FEATURES.md**: Detailed feature list
- **DEPLOYMENT.md**: Production deployment guide

---

**Enjoy exploring EmPulse Music!** 🎵💚
