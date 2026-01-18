#!/usr/bin/env python3
"""
Download royalty-free music from Pixabay for mood-matched demo tracks
Pixabay Music: https://pixabay.com/music/
- Free to use, no attribution required for most tracks
- API available for automation
- Searchable by genre/mood
"""

import json
import requests
import os
import subprocess
from pathlib import Path
from typing import List, Dict

# Pixabay API (you can get a free key at https://pixabay.com/api/docs/)
# For demo purposes, we'll use a public approach or provide instructions
PIXABAY_API_KEY = ""  # Get from https://pixabay.com/service/terms/

# Alternative: Use direct download links from known royalty-free sources
ROYALTY_FREE_SOURCES = {
    'melancholic': [
        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        # Add more melancholic track URLs
    ],
    'joyful': [
        # Add joyful track URLs
    ],
    'reflective': [
        # Add reflective track URLs
    ],
    # ... etc
}

def download_track(url: str, output_path: Path) -> bool:
    """Download a track from URL"""
    try:
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()
        
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        # Verify it's a valid audio file
        result = subprocess.run(
            ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', str(output_path)],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            return True
        else:
            output_path.unlink()  # Delete invalid file
            return False
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        if output_path.exists():
            output_path.unlink()
        return False

def get_pixabay_tracks(mood: str, count: int = 5) -> List[Dict]:
    """Search Pixabay for tracks matching mood"""
    if not PIXABAY_API_KEY:
        print("⚠️  Pixabay API key not set. Using fallback method.")
        return []
    
    # Map moods to Pixabay search terms
    search_terms = {
        'melancholic': 'sad emotional instrumental',
        'nostalgic': 'nostalgic retro vintage',
        'reflective': 'calm peaceful ambient',
        'content': 'happy peaceful acoustic',
        'joyful': 'happy upbeat cheerful',
        'euphoric': 'energetic exciting uplifting'
    }
    
    search = search_terms.get(mood.lower(), 'music')
    
    try:
        url = f"https://pixabay.com/api/audio/"
        params = {
            'key': PIXABAY_API_KEY,
            'q': search,
            'category': 'music',
            'per_page': count,
            'safesearch': 'true'
        }
        
        response = requests.get(url, params=params, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        return data.get('hits', [])
    except Exception as e:
        print(f"Error querying Pixabay: {e}")
        return []

def main():
    print("🎵 Royalty-Free Music Downloader")
    print("=" * 50)
    print("")
    print("This script helps download royalty-free music for demo tracks.")
    print("")
    print("OPTIONS:")
    print("1. Use Pixabay API (requires free API key from pixabay.com)")
    print("2. Use manual download links (edit script with URLs)")
    print("3. Use local music files you already have")
    print("")
    print("For now, please:")
    print("- Visit pixabay.com/music/ and search for mood-matched tracks")
    print("- Or use any royalty-free music source (Freesound, Incompetech, etc.)")
    print("- Manually download tracks and place in public/audio/")
    print("")
    print("Alternatively, set PIXABAY_API_KEY in this script for automation.")
    print("=" * 50)

if __name__ == '__main__':
    main()
