# 📱 Mobile App Kickoff - Flutter Setup

## Phase 7: Mobile (Flutter) - Quick Start

### Prerequisites

```bash
# Install Flutter
brew install flutter

# Verify installation
flutter doctor

# Install Xcode (for iOS)
# Install Android Studio (for Android)
```

### Step 1: Create Flutter Project

```bash
# Create new Flutter project
flutter create spot_music_mobile
cd spot_music_mobile

# Or use template (if available)
# flutter create --template=app spot_music_mobile
```

### Step 2: Configure Dependencies (pubspec.yaml)

```yaml
name: spot_music_mobile
description: EmPulse Music - Mobile App
version: 0.1.0

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter

  # Audio Playback
  audioplayers: ^5.2.1
  just_audio: ^0.9.36
  flutter_ffmpeg: ^0.4.2 # MP3 processing

  # Networking
  http: ^1.1.0
  dio: ^5.4.0

  # State Management
  provider: ^6.1.1
  riverpod: ^2.4.9

  # UI Components
  flutter_svg: ^2.0.9
  cached_network_image: ^3.3.0
  shimmer: ^3.0.0

  # Visualizations
  flutter_gl: ^0.0.1 # WebGL for 3D
  charts_flutter: ^0.12.0 # Spectrum viz
  fl_chart: ^0.65.0

  # Storage
  shared_preferences: ^2.2.2
  hive: ^2.2.3
  path_provider: ^2.1.1

  # SoundCloud Integration
  soundcloud_api: ^0.1.0 # Custom package or HTTP client

  # ML/AI (Mood Analysis)
  tflite_flutter: ^0.10.4 # TensorFlow Lite

  # Utilities
  intl: ^0.18.1
  url_launcher: ^6.2.2
```

### Step 3: Install Dependencies

```bash
flutter pub get
```

### Step 4: Project Structure

```
lib/
├── main.dart
├── models/
│   ├── track.dart
│   ├── playlist.dart
│   └── mood.dart
├── services/
│   ├── audio_service.dart
│   ├── api_service.dart
│   └── mood_service.dart
├── providers/
│   ├── player_provider.dart
│   └── playlist_provider.dart
├── screens/
│   ├── home_screen.dart
│   ├── player_screen.dart
│   ├── mood_screen.dart
│   └── radio_screen.dart
├── widgets/
│   ├── audio_player.dart
│   ├── equalizer.dart
│   ├── spectrum_viz.dart
│   └── mood_analyzer.dart
└── utils/
    ├── constants.dart
    └── helpers.dart
```

### Step 5: Core Features Implementation

#### Audio Player

```dart
// lib/services/audio_service.dart
import 'package:audioplayers/audioplayers.dart';

class AudioService {
  final AudioPlayer _player = AudioPlayer();

  Future<void> play(String url) async {
    await _player.play(UrlSource(url));
  }

  Future<void> pause() async {
    await _player.pause();
  }

  Stream<Duration> get positionStream => _player.onPositionChanged;
}
```

#### Equalizer

```dart
// lib/widgets/equalizer.dart
import 'package:audioplayers/audioplayers.dart';

class Equalizer extends StatefulWidget {
  @override
  _EqualizerState createState() => _EqualizerState();
}

class _EqualizerState extends State<Equalizer> {
  final List<double> _bands = [60, 170, 310, 600, 1000, 3000, 6000, 12000, 14000, 16000];
  final List<double> _gains = List.filled(10, 0.0);

  // Implement EQ controls
}
```

#### Spectrum Visualizer

```dart
// lib/widgets/spectrum_viz.dart
import 'package:fl_chart/fl_chart.dart';

class SpectrumVisualizer extends StatelessWidget {
  final List<double> frequencies;

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        // Configure spectrum bars
      ),
    );
  }
}
```

#### Mood Analysis

```dart
// lib/services/mood_service.dart
import 'package:tflite_flutter/tflite_flutter.dart';

class MoodService {
  Interpreter? _interpreter;

  Future<void> loadModel() async {
    _interpreter = await Interpreter.fromAsset('mood_model.tflite');
  }

  Future<String> analyzeMood(String audioPath) async {
    // Analyze audio and return mood
  }
}
```

### Step 6: API Integration

```dart
// lib/services/api_service.dart
import 'package:dio/dio.dart';

class ApiService {
  final Dio _dio = Dio(BaseOptions(
    baseUrl: 'https://spot-music-api.up.railway.app',
  ));

  Future<List<Track>> getTracks() async {
    final response = await _dio.get('/api/tracks');
    return (response.data as List).map((json) => Track.fromJson(json)).toList();
  }

  Future<MoodAnalysis> analyzeMood(String trackId) async {
    final response = await _dio.post('/api/mood/analyze', data: {'trackId': trackId});
    return MoodAnalysis.fromJson(response.data);
  }
}
```

### Step 7: Build & Deploy

#### iOS (TestFlight)

```bash
# Build iOS release
flutter build ios --release

# Open in Xcode
open ios/Runner.xcworkspace

# Archive and upload to TestFlight
# Via Xcode: Product → Archive → Distribute App → TestFlight
```

#### Android (Play Store)

```bash
# Build Android App Bundle
flutter build appbundle --release

# Or build APK
flutter build apk --release

# Upload to Play Console
# https://play.google.com/console
```

### Step 8: Testing

```bash
# Run on iOS simulator
flutter run -d ios

# Run on Android emulator
flutter run -d android

# Run on connected device
flutter devices
flutter run -d <device-id>
```

## Integration Checklist

- [ ] Audio player with EQ controls
- [ ] Spectrum visualizer (2D)
- [ ] 3D visualizer (WebGL)
- [ ] Mood discovery (ML integration)
- [ ] SoundCloud import
- [ ] Playlist management
- [ ] Radio streaming
- [ ] API integration
- [ ] Authentication (JWT)
- [ ] Offline playback

---

**Status**: Ready for development 📱
**Next**: `/agent ai mood-ml` for ML model integration 🤖
