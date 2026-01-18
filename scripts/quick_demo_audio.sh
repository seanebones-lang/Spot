#!/bin/bash
# Quick script to generate musical demo audio - replaces droning tones with musical content

cd "$(dirname "$0")/.."
mkdir -p public/audio

echo "🎵 Generating musical demo audio (replacing tone files)..."

for i in {1..20}; do
    duration=$((20 + (i % 11)))
    pattern=$((i % 6))
    freq=$((220 + (i % 15) * 15))
    
    case $pattern in
        0) # Bass + Melody
            ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$duration,afade=t=in:ss=0:d=0.5" \
                -f lavfi -i "sine=frequency=$((freq*2)):duration=$duration,afade=t=in:ss=0.2:d=0.3" \
                -filter_complex "amix=inputs=2:duration=first,volume=0.7,treble=g=2" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$i.mp3" -y 2>/dev/null
            ;;
        1) # Chord progression
            ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$duration" \
                -f lavfi -i "sine=frequency=$((freq*5/4)):duration=$duration" \
                -f lavfi -i "sine=frequency=$((freq*3/2)):duration=$duration" \
                -filter_complex "amix=inputs=3:duration=first,volume=0.6,bass=g=1" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$i.mp3" -y 2>/dev/null
            ;;
        2) # Melodic pattern
            ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$duration" \
                -f lavfi -i "sine=frequency=$((freq*2)):duration=$duration,adelay=1000|1000" \
                -filter_complex "amix=inputs=2:duration=first,volume=0.6,highpass=f=100" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$i.mp3" -y 2>/dev/null
            ;;
        3) # Rhythmic pattern
            ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$duration" \
                -f lavfi -i "sine=frequency=$((freq/2)):duration=$duration,adelay=500|500" \
                -filter_complex "amix=inputs=2:duration=first,volume=0.7,bass=g=3" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$i.mp3" -y 2>/dev/null
            ;;
        4) # Harmonic
            ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$duration,afade=t=in:ss=0:d=0.8" \
                -f lavfi -i "sine=frequency=$((freq*2)):duration=$duration,afade=t=in:ss=0.4:d=0.6" \
                -filter_complex "amix=inputs=2:duration=first,volume=0.65" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$i.mp3" -y 2>/dev/null
            ;;
        5) # Layered
            ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$duration" \
                -f lavfi -i "sine=frequency=$((freq*2)):duration=$duration" \
                -f lavfi -i "sine=frequency=$((freq/2)):duration=$duration" \
                -filter_complex "amix=inputs=3:duration=first,volume=0.7" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$i.mp3" -y 2>/dev/null
            ;;
    esac
    echo "Generated track $i ($duration seconds)"
done

echo "✅ Done! First 20 tracks regenerated with musical content."
