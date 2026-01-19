# 📱 Mobile Flutter App + SoundCloud Integration

## Phase 7 & 8: Complete Setup

### ✅ Mobile App Structure

```
mobile/spot_music_mobile/
├── lib/
│   ├── services/
│   │   └── spot_player.dart  ✅ Core audio player
│   ├── models/
│   ├── providers/
│   ├── screens/
│   ├── widgets/
│   └── utils/
├── pubspec.yaml  ✅ Dependencies configured
└── README.md
```

### ✅ SoundCloud MCP Tool

**Location**: `tools/soundcloud-mcp.js`

**Usage**:

```bash
# Single track
npm run soundcloud:import "https://soundcloud.com/artist/track"

# Multiple tracks
node tools/soundcloud-mcp.js "url1" "url2" "url3"
```

**Legal Notice**:

- Production: Use SoundCloud API for owned tracks only
- Development: yt-dlp fallback (legal use only)
- Respect SoundCloud's Terms of Service

### Build & Deploy

#### Android

```bash
# Build APK
npm run mobile:build:android
# Output: mobile/spot_music_mobile/build/app/outputs/flutter-apk/app-release.apk

# Build App Bundle (Play Store)
bash scripts/build-mobile.sh bundle
# Output: mobile/spot_music_mobile/build/app/outputs/bundle/release/app-release.aab
```

#### iOS

```bash
# Build iOS
npm run mobile:build:ios

# Open in Xcode
open mobile/spot_music_mobile/ios/Runner.xcworkspace

# Archive and upload to TestFlight
# Product → Archive → Distribute App → TestFlight
```

### Integration with Web App

#### Upload Flow

1. User goes to `/upload` on web app
2. Paste SoundCloud URL(s)
3. Click "Bulk Import"
4. MCP tool downloads tracks
5. Tracks added to player queue
6. Available on mobile app via API sync

#### API Endpoints

- `POST /api/soundcloud/import` - Import SoundCloud track
- `GET /api/tracks` - Fetch all tracks (including imported)
- `POST /api/playlist/add` - Add to playlist

### Mobile App Features

#### Core Features (Implemented)

- ✅ Audio player (`SpotPlayer` class)
- ✅ MP3 playback
- ✅ Play/Pause/Stop/Seek
- ✅ Volume control
- ✅ Playback rate control
- ✅ Position/Duration streams

#### Features (To Implement)

- [ ] SoundCloud import integration
- [ ] Equalizer controls
- [ ] Spectrum visualizer
- [ ] 3D visualizer (WebGL)
- [ ] Mood analysis
- [ ] Playlist management
- [ ] Radio streaming
- [ ] Offline playback

### Testing

#### Local Development

```bash
cd mobile/spot_music_mobile
flutter pub get
flutter run -d ios      # iOS simulator
flutter run -d android  # Android emulator
```

#### Device Testing

```bash
flutter devices  # List connected devices
flutter run -d <device-id>
```

### Deployment Checklist

#### Android (Play Store)

- [ ] Build App Bundle: `flutter build appbundle --release`
- [ ] Create Play Console listing
- [ ] Upload AAB file
- [ ] Submit for review

#### iOS (TestFlight)

- [ ] Build iOS: `flutter build ios --release`
- [ ] Archive in Xcode
- [ ] Upload to App Store Connect
- [ ] Add to TestFlight
- [ ] Invite beta testers

### Production Metrics

**Monitor**:

- Vercel Dashboard → Analytics
- App Store Connect → Analytics
- Play Console → Statistics

**Scale**:

- Current: Single server (Railway)
- 1K users: Add Redis, optimize queries
- 10K users: Read replicas, CDN
- 1M users: Kubernetes cluster, microservices

---

**Status**: Mobile app structure ready ✅  
**Next**: Implement UI screens and SoundCloud API integration
