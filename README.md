# EmPulse Music - Revolutionary Mood-Based Music Discovery

A pixel-perfect Spotify UI clone with innovative mood-based music selection and comprehensive wellness integration. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎯 Features

### Core Music Features
- **Pixel-Perfect Spotify UI**: Exact replica of Spotify's web player interface
- **Custom Audio Player**: Howler.js-based player with full controls (play, pause, seek, volume, shuffle, repeat)
- **Mood-Based Discovery**: Revolutionary 4-dimensional mood system:
  - **Mood**: Discrete emotional states (Melancholic, Nostalgic, Reflective, Content, Joyful, Euphoric)
  - **Feeling**: Multi-select emotional tags (Anxious/Overwhelmed → Great/Confident)
  - **Vibe**: Continuous energy slider (Calm ↔ Energetic)
  - **Genre**: Multi-select chips
- **Player Bar Mood Widget**: Shows current track's mood tags with similar tracks popover
- **Lossless Audio Support**: Quality selector for WAV, FLAC, MP3 formats
- **Picture-in-Picture Player**: Pop-out player window using browser PiP API

### Wellness Integration
- **Daily Mood Check-ins**: Track mood with sliders, feeling chips, and optional journaling
- **Journaling System**: Timeline journal with mood tags and music association
- **Affirmations**: Audio affirmations with team/artist voices, categories, and daily reminders
- **Points & Gamification**: Earn points for check-ins, journaling, and music discovery. Redeem for merch, tickets, and exclusive content
- **Mental Health Hub**: Crisis support resources, therapy directory, educational content, and partnership links

### Artist Features
- **Legal Signup Workflow**: Multi-step artist onboarding with:
  - W-9 tax form collection
  - PRO (BMI/ASCAP/SESAC) registration guidance
  - Digital signature and document signing
  - Approval workflow before upload access
- **Enhanced Upload Interface**: 
  - Drag-and-drop file upload (WAV, FLAC, MP3, M4A, MP4)
  - **Mandatory Mood Tag Adjustment**: AI pre-populates mood tags, artists MUST review and certify accuracy
  - High-quality format validation
  - Cover art upload (3000x3000px recommended)
- **Artist Dashboard**: 
  - Live stream statistics (real-time updates)
  - Publish/Unpublish toggle per track
  - Earnings dashboard ($0.004/stream - transparent)
  - Track management with analytics

### Additional Features
- **Radio Stations**: Built-in radio platform with genres, channels, and mental health podcasts
- **Keyboard Shortcuts**: Space (play/pause), Arrow keys (seek/volume), Ctrl+K (search)
- **Search**: Real-time search across tracks, artists, albums, playlists
- **Library Management**: Save tracks, albums, playlists with filtering

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
Spot/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with Sidebar, TopBar, Player
│   ├── page.tsx           # Home page
│   ├── search/            # Search page
│   ├── collection/        # Library page
│   ├── mood/              # Mood-based music selection
│   ├── check-in/          # Daily mood check-in
│   ├── journal/           # Journaling interface
│   ├── affirmations/      # Affirmations library
│   ├── wellness/          # Mental health hub
│   ├── radio/             # Radio stations
│   ├── rewards/           # Points & rewards
│   ├── artist/            # Artist signup
│   ├── upload/            # Track upload
│   └── dashboard/artist/  # Artist dashboard
├── components/            # React components
│   ├── Sidebar.tsx       # Left navigation
│   ├── TopBar.tsx        # Top navigation
│   ├── Player.tsx        # Bottom player bar
│   ├── mood/             # Mood selection components
│   └── ...
├── stores/               # Zustand state management
│   ├── playerStore.ts   # Player state
│   ├── moodStore.ts     # Mood selection state
│   ├── checkInStore.ts  # Daily check-in state
│   └── ...
├── lib/                  # Utilities
│   ├── player.ts        # Audio player logic
│   ├── data.ts          # Mock data accessor
│   └── keyboardShortcuts.ts
├── types/               # TypeScript type definitions
└── data/mock/          # Mock JSON data
```

## 🎨 Design System

### Colors
- **Spotify Green**: `#1DB954` (music controls)
- **Background**: `#121212` (main), `#181818` (dark gray), `#282828` (light gray)
- **EmPulse Brand**:
  - Red (`#E63946`) - emotion/courage
  - Blue (`#457B9D`) - safety/trust
  - Purple (`#7209B7`) - transformation/creativity

### Typography
- Font: Circular (Spotify font family equivalent)
- Sizes: Matching Spotify's exact typography scale

## 🎵 Mock Data

The app currently uses mock JSON data files in `data/mock/`:
- `tracks.json` - Sample tracks with mood tags
- `artists.json` - Sample artists
- `albums.json` - Sample albums
- `playlists.json` - Playlists with mood metadata

Replace these with backend API calls when ready.

## ⌨️ Keyboard Shortcuts

- **Space**: Play/Pause
- **Left Arrow**: Seek backward 10 seconds
- **Right Arrow**: Seek forward 10 seconds
- **Up Arrow**: Volume up
- **Down Arrow**: Volume down
- **Ctrl/Cmd + K**: Focus search
- **Ctrl/Cmd + Arrow Right**: Next track
- **Ctrl/Cmd + Arrow Left**: Previous track

## 🔧 Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with localStorage persistence
- **Audio**: Howler.js
- **Icons**: Lucide React
- **File Upload**: react-dropzone

## 📝 Development Notes

### Audio Player
- Custom implementation using Howler.js (no Spotify SDK)
- Supports multiple formats: MP3, WAV, FLAC, M4A, MP4
- Quality selection for lossless playback

### Mood Matching Algorithm
- Weighted scoring system:
  - Mood exact match: 40%
  - Feeling overlap: 30%
  - Vibe proximity: 20%
  - Genre match: 10%

### State Persistence
- Player state (current track, progress, volume, queue) saved to localStorage
- Check-in streaks and points persist across sessions
- Journal entries saved locally (ready for backend integration)

## 🚧 Future Enhancements

- Backend API integration
- Real audio file streaming
- User authentication
- Payment processing for artist payouts
- Advanced analytics
- Mobile app

## 📄 License

See LICENSE file for details.

## 🤝 Contributing

This is a proprietary project for NextEleven. For internal development use only.

---

**EmPulse Music** - Revolutionary mood-based music discovery never done before.
