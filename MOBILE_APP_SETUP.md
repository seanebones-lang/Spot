# 📱 Mobile App Setup - Spot Music App

## Cross-Platform Strategy

### Primary: Flutter (iOS + Android)

- Single codebase for both platforms
- Native performance
- Audio player support
- 3D visualizations

### Alternative: React Native

- Code sharing with web app
- Faster development
- Web audio compatibility

## Flutter Setup

### 1. Install Flutter

```bash
# macOS
brew install flutter

# Verify
flutter doctor
```

### 2. Create Flutter Project

```bash
flutter create spot_music_mobile
cd spot_music_mobile
```

### 3. Dependencies (pubspec.yaml)

```yaml
dependencies:
  flutter:
    sdk: flutter

  # Audio
  audioplayers: ^5.2.1
  just_audio: ^0.9.36

  # Networking
  http: ^1.1.0
  dio: ^5.4.0

  # State Management
  provider: ^6.1.1
  riverpod: ^2.4.9

  # UI
  flutter_svg: ^2.0.9
  cached_network_image: ^3.3.0

  # Visualizations
  flutter_gl: ^0.0.1 # WebGL for 3D
  charts_flutter: ^0.12.0 # Spectrum viz

  # Storage
  shared_preferences: ^2.2.2
  hive: ^2.2.3

  # SoundCloud Import
  soundcloud_api: ^0.1.0 # Custom package
```

### 4. Features to Implement

- ✅ Audio player with EQ controls
- ✅ Spectrum visualizer (2D)
- ✅ 3D visualizer (WebGL)
- ✅ Mood discovery (ML integration)
- ✅ SoundCloud import
- ✅ Playlist management
- ✅ Radio streaming

## React Native Alternative

### 1. Initialize Project

```bash
npx react-native init SpotMusicMobile
cd SpotMusicMobile
```

### 2. Install Dependencies

```bash
npm install \
  react-native-track-player \
  @react-native-async-storage/async-storage \
  react-native-sound \
  react-native-svg \
  @react-three/fiber \
  three \
  @react-native-community/netinfo
```

### 3. Code Sharing

- Share API client with web app
- Reuse components where possible
- Platform-specific audio implementations

## Deployment

### iOS (TestFlight)

```bash
# Build
flutter build ios --release
# OR
cd ios && xcodebuild archive

# Upload to TestFlight
# Via Xcode or fastlane
```

### Android (Play Store)

```bash
# Build
flutter build appbundle --release
# OR
flutter build apk --release

# Upload to Play Console
```

## Integration with Backend

### API Endpoints

- `GET /api/tracks` - Fetch tracks
- `POST /api/mood/analyze` - Mood analysis
- `GET /api/radio/stream` - Radio streaming
- `POST /api/soundcloud/import` - Import from SoundCloud

### Authentication

- JWT tokens
- Refresh token rotation
- Biometric login (mobile)

---

**Status**: Ready for development 📱
