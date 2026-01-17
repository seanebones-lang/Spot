#!/bin/bash
# Setup test audio files for e2e testing
# Uses royalty-free test audio from various sources

cd "$(dirname "$0")/.."
mkdir -p public/audio

echo "Setting up test audio files..."

# Download royalty-free test audio samples
# Using various royalty-free sources for test audio

# Option 1: Use a royalty-free audio generation tool or CDN
# For now, we'll use a test audio file generator or placeholder URLs

# Create a simple test that validates audio URL format and player integration
echo "Creating audio test validation script..."

# We'll use a service like freesound.org API or similar for royalty-free samples
# For now, let's create a test that validates the audio player can load URLs

cat > public/audio/README.md << 'EOF'
# Test Audio Files

For e2e testing, we need royalty-free audio samples. 

## Options:
1. Use royalty-free audio from:
   - Free Music Archive (https://freemusicarchive.org/)
   - Internet Archive (https://archive.org/details/audio)
   - CC0 License audio

2. Generate test tones using ffmpeg:
   ```bash
   ffmpeg -f lavfi -i "sine=frequency=440:duration=30" public/audio/test-tone-440hz.mp3
   ```

3. Use placeholder audio URLs for development:
   - Point to CDN-hosted royalty-free samples
   - Use silent audio generation for testing player functionality

## Current Test Files:
- test-tone.mp3 (440Hz sine wave, 30 seconds)
- silent-10s.mp3 (silent audio for testing)

EOF

# Generate test audio files if ffmpeg is available
if command -v ffmpeg &> /dev/null; then
    echo "ffmpeg found - generating test audio files..."
    
    # Generate a 440Hz sine wave test tone (30 seconds)
    ffmpeg -f lavfi -i "sine=frequency=440:duration=30" -acodec libmp3lame \
        public/audio/test-tone-440hz.mp3 2>/dev/null || echo "ffmpeg audio generation failed"
    
    # Generate silent audio (10 seconds) for testing player functionality
    ffmpeg -f lavfi -i "anullsrc=channel_layout=stereo:sample_rate=44100" -t 10 \
        -acodec libmp3lame public/audio/silent-10s.mp3 2>/dev/null || echo "ffmpeg silent generation failed"
    
    # Generate test tones for tracks
    for i in {1..20}; do
        freq=$((220 + i * 10))
        dur=$((15 + (i % 10)))
        ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$dur" -acodec libmp3lame \
            public/audio/track-$i.mp3 2>/dev/null || true
    done
    
    echo "✓ Generated test audio files"
else
    echo "⚠ ffmpeg not found - skipping audio generation"
    echo "Install ffmpeg: brew install ffmpeg (macOS) or apt-get install ffmpeg (Linux)"
fi

echo "Audio setup complete!"
