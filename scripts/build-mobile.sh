#!/bin/bash
# Build Mobile App - Flutter (iOS/Android)

set -e

echo "🚀 Building Spot Music Mobile App..."

# Check if Flutter is installed
if ! command -v flutter &> /dev/null; then
    echo "❌ Flutter not found. Install with: brew install flutter"
    exit 1
fi

cd mobile/spot_music_mobile || {
    echo "❌ Mobile app directory not found. Create it first."
    exit 1
}

# Get dependencies
echo "📦 Installing dependencies..."
flutter pub get

# Build Android APK
if [ "$1" == "android" ] || [ "$1" == "all" ]; then
    echo "🤖 Building Android APK..."
    flutter build apk --release
    echo "✅ Android APK: build/app/outputs/flutter-apk/app-release.apk"
fi

# Build Android App Bundle
if [ "$1" == "bundle" ] || [ "$1" == "all" ]; then
    echo "📦 Building Android App Bundle..."
    flutter build appbundle --release
    echo "✅ Android Bundle: build/app/outputs/bundle/release/app-release.aab"
fi

# Build iOS
if [ "$1" == "ios" ] || [ "$1" == "all" ]; then
    echo "🍎 Building iOS..."
    flutter build ios --release
    echo "✅ iOS build complete. Open ios/Runner.xcworkspace in Xcode to archive."
fi

echo "🎉 Build complete!"
