#!/usr/bin/env python3
"""
Generate mood-matched audio tracks based on track metadata
Each track's audio will reflect its mood tags (Melancholic, Joyful, etc.)
"""

import json
import subprocess
import os
from pathlib import Path

# Mood to audio parameters mapping
MOOD_AUDIO_CONFIG = {
    'Melancholic': {
        'base_freq': 150,  # Lower, somber
        'tempo': 'slow',
        'frequencies': [150, 200, 300],  # Lower harmonics
        'volume': 0.5,
        'fade_in': 2.0,
        'fade_out': 3.0,
        'treble': -3,
        'bass': 2
    },
    'Nostalgic': {
        'base_freq': 180,
        'tempo': 'moderate',
        'frequencies': [180, 270, 360],
        'volume': 0.55,
        'fade_in': 1.5,
        'fade_out': 2.5,
        'treble': -1,
        'bass': 1
    },
    'Reflective': {
        'base_freq': 200,
        'tempo': 'slow',
        'frequencies': [200, 300, 400],
        'volume': 0.5,
        'fade_in': 2.0,
        'fade_out': 3.0,
        'treble': 0,
        'bass': 0
    },
    'Content': {
        'base_freq': 220,
        'tempo': 'moderate',
        'frequencies': [220, 330, 440],
        'volume': 0.6,
        'fade_in': 1.0,
        'fade_out': 2.0,
        'treble': 1,
        'bass': 1
    },
    'Joyful': {
        'base_freq': 260,
        'tempo': 'fast',
        'frequencies': [260, 390, 520],
        'volume': 0.7,
        'fade_in': 0.5,
        'fade_out': 1.0,
        'treble': 3,
        'bass': 2
    },
    'Euphoric': {
        'base_freq': 300,
        'tempo': 'very_fast',
        'frequencies': [300, 450, 600],
        'volume': 0.75,
        'fade_in': 0.3,
        'fade_out': 0.8,
        'treble': 4,
        'bass': 3
    }
}

# Feeling adjustments (modify base mood)
FEELING_ADJUSTMENTS = {
    'Anxious': {'freq_shift': -20, 'volume': 0.1, 'treble_adj': 2},
    'Overwhelmed': {'freq_shift': -30, 'volume': 0.15, 'treble_adj': 1},
    'Stressed': {'freq_shift': -15, 'volume': 0.1, 'bass_adj': 1},
    'Great': {'freq_shift': 30, 'volume': 0.1, 'treble_adj': 1},
    'Confident': {'freq_shift': 25, 'volume': 0.1, 'bass_adj': 1},
    'Excited': {'freq_shift': 40, 'volume': 0.15, 'treble_adj': 2},
    'Relaxed': {'freq_shift': -10, 'volume': -0.1, 'bass_adj': 1},
    'Calm': {'freq_shift': -15, 'volume': -0.15, 'treble_adj': -1},
}

def generate_mood_audio(track_id, mood, feelings, vibe, duration_ms):
    """Generate audio file that matches the track's mood"""
    
    duration_sec = duration_ms / 1000.0
    if duration_sec > 30:
        duration_sec = 30  # Cap at 30 seconds for demos
    elif duration_sec < 10:
        duration_sec = 10  # Min 10 seconds
    
    # Get base config for mood
    config = MOOD_AUDIO_CONFIG.get(mood, MOOD_AUDIO_CONFIG['Content']).copy()
    
    # Apply feeling adjustments
    if feelings:
        for feeling in feelings:
            if feeling in FEELING_ADJUSTMENTS:
                adj = FEELING_ADJUSTMENTS[feeling]
                config['base_freq'] += adj.get('freq_shift', 0)
                config['volume'] += adj.get('volume', 0)
                config['treble'] += adj.get('treble_adj', 0)
                config['bass'] += adj.get('bass_adj', 0)
    
    # Adjust for vibe (0-100 scale, where 0 = calm, 100 = energetic)
    # Higher vibe = higher frequencies and faster
    vibe_shift = (vibe - 50) * 0.5  # Scale vibe to frequency shift
    config['base_freq'] += int(vibe_shift)
    
    # Ensure frequencies stay in range
    config['base_freq'] = max(100, min(600, config['base_freq']))
    config['volume'] = max(0.3, min(0.8, config['volume']))
    
    # Adjust frequencies based on vibe
    freq1 = config['base_freq']
    freq2 = int(freq1 * 1.5)
    freq3 = int(freq1 * 2)
    
    # Build ffmpeg command based on mood tempo
    audio_dir = Path(__file__).parent.parent / 'public' / 'audio'
    output_file = audio_dir / f'track-{track_id}.mp3'
    
    if mood in ['Joyful', 'Euphoric']:
        # Upbeat: multiple harmonics, faster fades
        fade_in1 = max(0.1, min(config["fade_in"], duration_sec * 0.1))
        fade_in2 = max(0.1, min(config["fade_in"] - 0.2, duration_sec * 0.08))
        fade_in3 = max(0.1, min(config["fade_in"] - 0.4, duration_sec * 0.06))
        cmd = [
            'ffmpeg', '-y', '-f', 'lavfi',
            '-i', f'sine=frequency={freq1}:duration={duration_sec},afade=t=in:ss=0:d={fade_in1}',
            '-f', 'lavfi', '-i', f'sine=frequency={freq2}:duration={duration_sec},afade=t=in:ss=0.2:d={fade_in2}',
            '-f', 'lavfi', '-i', f'sine=frequency={freq3}:duration={duration_sec},afade=t=in:ss=0.4:d={fade_in3}',
            '-filter_complex', f'amix=inputs=3:duration=first:dropout_transition=1,volume={config["volume"]},treble=g={config["treble"]},bass=g={config["bass"]}',
            '-acodec', 'libmp3lame', '-b:a', '192k', '-ar', '44100', '-ac', '2',
            str(output_file)
        ]
    elif mood in ['Melancholic', 'Reflective']:
        # Slow, somber: single or two tones, long fades
        cmd = [
            'ffmpeg', '-y', '-f', 'lavfi',
            '-i', f'sine=frequency={freq1}:duration={duration_sec},afade=t=in:ss=0:d={config["fade_in"]},afade=t=out:st={duration_sec-config["fade_out"]}:d={config["fade_out"]}',
            '-f', 'lavfi', '-i', f'sine=frequency={freq2}:duration={duration_sec},afade=t=in:ss={config["fade_in"]}:d=1,afade=t=out:st={duration_sec-config["fade_out"]}:d={config["fade_out"]}',
            '-filter_complex', f'amix=inputs=2:duration=first:dropout_transition=3,volume={config["volume"]},treble=g={config["treble"]},bass=g={config["bass"]},lowpass=f=3000',
            '-acodec', 'libmp3lame', '-b:a', '192k', '-ar', '44100', '-ac', '2',
            str(output_file)
        ]
    else:  # Nostalgic, Content
        # Moderate: balanced mix
        cmd = [
            'ffmpeg', '-y', '-f', 'lavfi',
            '-i', f'sine=frequency={freq1}:duration={duration_sec},afade=t=in:ss=0:d={config["fade_in"]},afade=t=out:st={duration_sec-config["fade_out"]}:d={config["fade_out"]}',
            '-f', 'lavfi', '-i', f'sine=frequency={freq2}:duration={duration_sec},afade=t=in:ss={config["fade_in"]*0.7}:d={config["fade_in"]*0.3},afade=t=out:st={duration_sec-config["fade_out"]}:d={config["fade_out"]}',
            '-filter_complex', f'amix=inputs=2:duration=first:dropout_transition=2,volume={config["volume"]},treble=g={config["treble"]},bass=g={config["bass"]},highpass=f=100,lowpass=f=6000',
            '-acodec', 'libmp3lame', '-b:a', '192k', '-ar', '44100', '-ac', '2',
            str(output_file)
        ]
    
    # Run ffmpeg
    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error generating track {track_id}: {e}")
        return False

def main():
    # Load tracks data
    tracks_file = Path(__file__).parent.parent / 'data' / 'mock' / 'tracks.json'
    
    with open(tracks_file, 'r') as f:
        tracks = json.load(f)
    
    audio_dir = Path(__file__).parent.parent / 'public' / 'audio'
    audio_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"🎵 Generating mood-matched audio for {len(tracks)} tracks...")
    print("Each track's audio will reflect its mood tags (Melancholic, Joyful, etc.)\n")
    
    generated = 0
    failed = 0
    
    for track in tracks:
        track_id = int(track['id'].split('-')[1])
        mood = track['moodTags']['mood']
        feelings = track['moodTags'].get('feelings', [])
        vibe = track['moodTags'].get('vibe', 50)
        duration = track['duration']
        
        print(f"Generating track-{track_id}... [{mood}] {feelings[:2] if feelings else []} (vibe: {vibe})")
        
        if generate_mood_audio(track_id, mood, feelings, vibe, duration):
            generated += 1
        else:
            failed += 1
    
    print(f"\n✅ Generated {generated} tracks successfully")
    if failed > 0:
        print(f"⚠️  Failed to generate {failed} tracks")
    
    print(f"\nTotal audio files: {len(list(audio_dir.glob('track-*.mp3')))}/{len(tracks)}")

if __name__ == '__main__':
    main()
