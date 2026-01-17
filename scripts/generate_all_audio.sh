#!/bin/bash
# Generate all audio files for 150 tracks

cd "$(dirname "$0")/.."
mkdir -p public/audio

echo "Generating audio files for all 150 tracks..."

if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg not found. Install it first: brew install ffmpeg"
    exit 1
fi

# Generate audio files for tracks 1-150
for i in {1..150}; do
    # Vary frequency and duration to make tracks unique
    freq=$((220 + (i % 20) * 15))  # 220-505 Hz
    dur=$((15 + (i % 15)))  # 15-29 seconds
    
    if [ ! -f "public/audio/track-$i.mp3" ]; then
        ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$dur" \
            -acodec libmp3lame -b:a 128k -ar 44100 -ac 2 \
            "public/audio/track-$i.mp3" 2>/dev/null &
        
        # Limit concurrent processes
        if [ $(jobs -r | wc -l) -ge 8 ]; then
            wait
        fi
    fi
done

wait
echo "✅ Generated audio files for all tracks"

# Verify
count=$(ls -1 public/audio/track-*.mp3 2>/dev/null | wc -l)
echo "Total audio files: $count/150"
