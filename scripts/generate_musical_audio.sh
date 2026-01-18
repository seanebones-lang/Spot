#!/bin/bash
# Generate musical demo audio files using ffmpeg
# Creates more realistic music with multiple tones, rhythms, and variations

cd "$(dirname "$0")/.."
mkdir -p public/audio

echo "🎵 Generating musical demo audio files..."
echo "This will create realistic music tracks instead of simple tones"

if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg not found. Install it first: brew install ffmpeg"
    exit 1
fi

# Function to generate a musical track
generate_musical_track() {
    local track_num=$1
    local duration=$2
    
    # Create different musical patterns based on track number
    local pattern=$((track_num % 6))
    local base_freq=220
    
    case $pattern in
        0)
            # Bass + melody pattern (like dance/electronic)
            ffmpeg -f lavfi -i "amovie=/dev/zero,asplit=4[out1][a][b][c]; \
                [a]afreqshift=shift=$((base_freq + 100))[aa]; \
                [b]afreqshift=shift=$((base_freq * 2 + 50))[bb]; \
                [c]afreqshift=shift=$((base_freq * 3 + 75))[cc]; \
                [aa][bb][cc]amix=inputs=3,volume=0.6" \
                -t $duration -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$track_num.mp3" 2>/dev/null || \
            ffmpeg -f lavfi -i "sine=frequency=$base_freq:duration=$duration,afade=t=in:ss=0:d=0.5,afade=t=out:st=$((duration-0.5)):d=0.5" \
                -f lavfi -i "sine=frequency=$((base_freq*2)):duration=$duration,afade=t=in:ss=0.2:d=0.3,afade=t=out:st=$((duration-0.3)):d=0.3" \
                -filter_complex "amix=inputs=2:duration=first:dropout_transition=3,volume=0.7,treble=g=2" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$track_num.mp3" 2>/dev/null
            ;;
        1)
            # Chord progression (like jazz/pop)
            local freq1=$base_freq
            local freq2=$((base_freq * 125 / 100))
            local freq3=$((base_freq * 150 / 100))
            ffmpeg -f lavfi -i "sine=frequency=$freq1:duration=$duration,afade=t=in:ss=0:d=1" \
                -f lavfi -i "sine=frequency=$freq2:duration=$duration,afade=t=in:ss=0.3:d=0.7" \
                -f lavfi -i "sine=frequency=$freq3:duration=$duration,afade=t=in:ss=0.6:d=0.4" \
                -filter_complex "amix=inputs=3:duration=first:dropout_transition=2,volume=0.6,bass=g=1" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$track_num.mp3" 2>/dev/null
            ;;
        2)
            # Melodic pattern (like ambient)
            local freq=$((base_freq + (track_num * 7)))
            ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$duration" \
                -f lavfi -i "sine=frequency=$((freq*2)):duration=$duration,adelay=1000|1000" \
                -f lavfi -i "sine=frequency=$((freq*3)):duration=$duration,adelay=2000|2000" \
                -filter_complex "amix=inputs=3:duration=first,volume=0.5,highpass=f=100,lowpass=f=5000" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$track_num.mp3" 2>/dev/null
            ;;
        3)
            # Rhythm pattern (like hip-hop/rock)
            local freq=$((base_freq + 50))
            ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$duration" \
                -f lavfi -i "anoisesrc=duration=$duration:color=white:seed=$track_num,volume=0.02" \
                -filter_complex "amix=inputs=2:duration=first,volume=0.7,treble=g=-2,bass=g=3" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$track_num.mp3" 2>/dev/null
            ;;
        4)
            # Harmonic progression (like classical/acoustic)
            local freq=$base_freq
            ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$duration,afade=t=in:ss=0:d=0.8" \
                -f lavfi -i "sine=frequency=$((freq*2)):duration=$duration,afade=t=in:ss=0.4:d=0.6" \
                -filter_complex "amix=inputs=2:duration=first,volume=0.65,highpass=f=80" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$track_num.mp3" 2>/dev/null
            ;;
        5)
            # Layered frequencies (like electronic/techno)
            local freq=$((200 + (track_num % 10) * 20))
            ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$duration" \
                -f lavfi -i "sine=frequency=$((freq*2)):duration=$duration,adelay=500|500" \
                -f lavfi -i "sine=frequency=$((freq/2)):duration=$duration,adelay=1000|1000" \
                -filter_complex "amix=inputs=3:duration=first:dropout_transition=2,volume=0.7,treble=g=2,bass=g=2" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$track_num.mp3" 2>/dev/null
            ;;
    esac
}

# Generate tracks 1-20 with more variety (longer tracks)
echo "Generating first 20 demo tracks (20-30 seconds each)..."
for i in {1..20}; do
    duration=$((20 + (i % 11)))  # 20-30 seconds
    echo -n "Generating track $i... "
    
    if [ ! -f "public/audio/track-$i.mp3" ]; then
        generate_musical_track $i $duration
        if [ $? -eq 0 ]; then
            echo "✓"
        else
            echo "⚠ (fallback)"
            # Fallback to simple two-tone mix if complex generation fails
            freq=$((220 + (i % 15) * 20))
            ffmpeg -f lavfi -i "sine=frequency=$freq:duration=$duration" \
                -f lavfi -i "sine=frequency=$((freq*2)):duration=$duration" \
                -filter_complex "amix=inputs=2:duration=first,volume=0.7" \
                -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
                "public/audio/track-$i.mp3" 2>/dev/null
        fi
    else
        echo "✓ (exists)"
    fi
done

# For remaining tracks (21-150), generate them with a simpler but still musical approach
echo ""
echo "Generating remaining tracks (21-150) with musical variations..."
for i in {21..150}; do
    duration=$((15 + (i % 15)))  # 15-29 seconds
    freq1=$((200 + (i % 20) * 15))
    freq2=$((freq1 * 3 / 2))
    
    if [ ! -f "public/audio/track-$i.mp3" ]; then
        # Create musical two-tone harmony with fade effects
        ffmpeg -f lavfi -i "sine=frequency=$freq1:duration=$duration,afade=t=in:ss=0:d=0.5,afade=t=out:st=$((duration-0.5)):d=0.5" \
            -f lavfi -i "sine=frequency=$freq2:duration=$duration,afade=t=in:ss=0.3:d=0.4,afade=t=out:st=$((duration-0.4)):d=0.4" \
            -filter_complex "amix=inputs=2:duration=first:dropout_transition=2,volume=0.65,highpass=f=100,lowpass=f=8000" \
            -acodec libmp3lame -b:a 192k -ar 44100 -ac 2 \
            "public/audio/track-$i.mp3" 2>/dev/null &
        
        # Limit concurrent processes
        if [ $(jobs -r | wc -l) -ge 4 ]; then
            wait
        fi
        
        if [ $((i % 10)) -eq 0 ]; then
            echo "Progress: $i/150..."
        fi
    fi
done

wait
echo ""
echo "✅ Audio generation complete!"

# Verify
count=$(ls -1 public/audio/track-*.mp3 2>/dev/null | wc -l | tr -d ' ')
echo "Total audio files: $count/150"
