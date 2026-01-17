#!/usr/bin/env python3
"""
Generate comprehensive seed data for EmPulse Music
Creates tracks, artists, albums, playlists with diverse mood combinations
"""

import json
import random
from typing import List, Dict

# Mood configurations
MOODS = ['Melancholic', 'Nostalgic', 'Reflective', 'Content', 'Joyful', 'Euphoric']
NEGATIVE_FEELINGS = ['Anxious', 'Overwhelmed', 'Stressed', 'Frustrated', 'Tired', 'Lonely', 'Insecure']
POSITIVE_FEELINGS = ['Great', 'Confident', 'Relaxed', 'Excited', 'Proud', 'Grateful', 'Optimistic']
ALL_FEELINGS = NEGATIVE_FEELINGS + POSITIVE_FEELINGS
GENRES = ['Pop', 'Rock', 'Electronic', 'Hip-Hop', 'Jazz', 'Classical', 'Ambient', 'R&B', 'Country', 'Indie', 'Metal', 'Punk', 'Blues', 'Folk', 'Reggae', 'Soul', 'Funk', 'Disco', 'House', 'Techno', 'Trap', 'Afrobeats', 'World', 'Latin', 'K-Pop']

# Unsplash image IDs for royalty-free artwork (abstract/music themed)
COVER_ART_IMAGES = [
    "photo-1493225457124-a3eb161ffa5f",  # Abstract
    "photo-1459749411175-04bf5292ceea",  # Music
    "photo-1470229722913-7c0e2dbbafd3",  # Concert
    "photo-1484704849700-f032a568e944",  # Vinyl
    "photo-1511671782779-c97d3d27a1d4",  # Jazz
    "photo-1508700115892-45ecd05ae2ad",  # World music
    "photo-1461784180009-21121b2f2044",  # Indie
    "photo-1514525253161-7a46d19cd819",  # Pop
    "photo-1540747913346-19e32dc3e97e",  # Hip-hop
    "photo-1571260899304-425eee4c7efc",  # Electronic
    "photo-1464207687429-7505649dae38",  # Country
    "photo-1492562080023-ab3db95bfbce",  # Portrait
    "photo-1528607929212-2636ec44253e",  # Mental health
    "photo-1506126613408-eca07ce68773",  # Wellness
    "photo-1454165804606-c3d57bc86b40",  # Mindful
    "photo-1541781774459-bb2af2f05b55",  # Calm
    "photo-1534438327276-14e5300c3a48",  # Energy
    "photo-1441974231531-c6227db76b6e",  # Nature
    "photo-1488646953014-85cb44e25828",  # Travel
    "photo-1506905925346-21bda4d32df4",  # Focus
]

ARTIST_IMAGES = [
    "photo-1493225457124-a3eb161ffa5f",
    "photo-1511671782779-c97d3d27a1d4",
    "photo-1470229722913-7c0e2dbbafd3",
    "photo-1528607929212-2636ec44253e",
    "photo-1506126613408-eca07ce68773",
    "photo-1492562080023-ab3db95bfbce",
]

# Track titles (inspired by royalty-free music)
TRACK_TITLES = [
    "Midnight Dreams", "Electric Soul", "Ocean Breeze", "Urban Nights", "Mountain View",
    "Desert Highway", "City Lights", "Forest Path", "Starlight", "Golden Hour",
    "Morning Dew", "Evening Glow", "Neon Signs", "Silent Streets", "Thunderstorm",
    "Afternoon Rain", "Sunset Drive", "Winter Chill", "Spring Bloom", "Summer Heat",
    "Autumn Leaves", "Storm Clouds", "Clear Skies", "Deep Blue", "Purple Haze",
    "Green Fields", "Red Dawn", "Yellow Sun", "Orange Sunset", "Pink Clouds",
    "Distant Echoes", "Close Encounters", "Inner Thoughts", "Outer Space", "Deep Dive",
    "High Rise", "Low Tide", "Fast Lane", "Slow Motion", "Hard Rock",
    "Soft Jazz", "Bright Pop", "Dark Ambient", "Light Folk", "Heavy Metal",
    "Smooth R&B", "Rough Punk", "Calm Classical", "Chaos Electronic", "Order Indie",
    "Warm Soul", "Cool Funk", "Hot Disco", "Cold Blues", "Neutral Jazz",
    "Fire Dance", "Water Flow", "Earth Ground", "Air Lift", "Spirit Rise",
    "Mind Bender", "Heart Opener", "Soul Keeper", "Body Mover", "Energy Shifter",
    "Mood Swings", "Feeling Free", "Thought Clear", "Action Bold", "Reaction Swift",
    "Creative Flow", "Analytic Mode", "Intuitive Leap", "Logical Step", "Emotional Wave",
    "Peaceful Place", "Chaotic Zone", "Balanced State", "Unstable Ground", "Solid Rock",
    "Liquid Dreams", "Gaseous Thoughts", "Plasma Energy", "Quantum Leap", "Classic Style",
    "Modern Beat", "Retro Vibe", "Future Sound", "Past Memory", "Present Moment",
    "Timeless Tune", "Seasonal Shift", "Circadian Rhythm", "Lunar Cycle", "Solar Power",
    "Wind Chimes", "Rain Drops", "Snow Flakes", "Ice Crystals", "Steam Rising",
    "Flame Burning", "Smoke Clearing", "Mist Lifting", "Fog Rolling", "Haze Settling",
    "Breeze Blowing", "Gust Striking", "Hurricane Force", "Tornado Twist", "Cyclone Spin",
    "Calm Before", "Storm During", "Peace After", "Chaos Within", "Order Without",
    "Harmony Found", "Discord Resolved", "Rhythm Locked", "Beat Dropped", "Melody Soared",
    "Bass Thumped", "Treble Sparkled", "Mid Range", "Full Spectrum", "Pure Tone"
]

ARTIST_NAMES = [
    "Luna Shadows", "Echo River", "Solar Flare", "Neon Nights", "Crystal Sound",
    "Mystic Waves", "Electric Dreams", "Cosmic Harmony", "Urban Pulse", "Wild Sky",
    "Deep Ocean", "High Mountain", "Dark Forest", "Bright City", "Quiet Valley",
    "Loud Canyon", "Soft Breeze", "Hard Rain", "Gentle Wind", "Strong Current",
    "Smooth Operator", "Rough Diamond", "Pure Gold", "Silver Lining", "Bronze Age",
    "Iron Will", "Steel Mind", "Copper Wire", "Tin Can", "Lead Weight",
    "Mercury Rising", "Venus Fly", "Mars Walk", "Jupiter Jump", "Saturn Ring",
    "Uranus Spin", "Neptune Dive", "Pluto Orbit", "Star Light", "Moon Beam",
    "Sun Ray", "Comet Tail", "Meteor Shower", "Asteroid Belt", "Galaxy Far",
    "Nebula Near", "Black Hole", "White Dwarf", "Red Giant", "Blue Supergiant"
]

def get_mood_config(mood: str) -> Dict:
    """Get typical vibe and feelings for each mood"""
    configs = {
        'Melancholic': {'vibe_range': (10, 35), 'feelings': NEGATIVE_FEELINGS + ['Reflective', 'Nostalgic']},
        'Nostalgic': {'vibe_range': (15, 40), 'feelings': ['Nostalgic', 'Reflective', 'Grateful', 'Content']},
        'Reflective': {'vibe_range': (20, 45), 'feelings': ['Reflective', 'Relaxed', 'Content', 'Thoughtful']},
        'Content': {'vibe_range': (45, 65), 'feelings': POSITIVE_FEELINGS[:5]},
        'Joyful': {'vibe_range': (65, 85), 'feelings': POSITIVE_FEELINGS},
        'Euphoric': {'vibe_range': (85, 100), 'feelings': ['Excited', 'Great', 'Proud', 'Optimistic']}
    }
    return configs.get(mood, configs['Content'])

def generate_track(track_id: int, mood: str, genres: List[str]) -> Dict:
    """Generate a single track with mood tags"""
    config = get_mood_config(mood)
    vibe = random.randint(*config['vibe_range'])
    num_feelings = random.randint(1, 3)
    feelings = random.sample(config['feelings'], min(num_feelings, len(config['feelings'])))
    track_genres = random.sample(genres, random.randint(1, 2))
    
    artist_id = f"artist-{(track_id % 50) + 1}"
    album_id = f"album-{(track_id % 30) + 1}"
    
    cover_img = random.choice(COVER_ART_IMAGES)
    
    return {
        "id": f"track-{track_id}",
        "name": random.choice(TRACK_TITLES),
        "artist": random.choice(ARTIST_NAMES),
        "artistId": artist_id,
        "album": f"{random.choice(TRACK_TITLES[:20])} Album",
        "albumId": album_id,
        "duration": random.randint(150000, 300000),
        "audioUrl": f"/audio/track-{track_id}.mp3",
        "coverArt": f"https://images.unsplash.com/{cover_img}?w=400&h=400&fit=crop&q=80",
        "moodTags": {
            "mood": mood,
            "feelings": feelings,
            "vibe": vibe,
            "genres": track_genres
        },
        "format": random.choice(["MP3", "WAV", "FLAC"]),
        "quality": random.choice(["lossless", "high", "standard"]),
        "releaseDate": f"2024-{random.randint(1,12):02d}-{random.randint(1,28):02d}"
    }

def generate_seed_data():
    """Generate comprehensive seed data"""
    print("Generating seed data...")
    
    # Generate 150 tracks - covering all mood combinations
    tracks = []
    track_id = 1
    
    # Ensure we have examples of each mood
    for mood in MOODS:
        for _ in range(20):  # 20 tracks per mood
            genres_for_mood = random.sample(GENRES, 5)
            tracks.append(generate_track(track_id, mood, genres_for_mood))
            track_id += 1
    
    # Add 30 more tracks with random mood combinations
    for _ in range(30):
        mood = random.choice(MOODS)
        tracks.append(generate_track(track_id, mood, GENRES))
        track_id += 1
    
    # Generate 50 artists
    artists = []
    for i in range(50):
        artist_img = random.choice(ARTIST_IMAGES)
        artist_genres = random.sample(GENRES, random.randint(1, 3))
        artists.append({
            "id": f"artist-{i+1}",
            "name": ARTIST_NAMES[i % len(ARTIST_NAMES)],
            "image": f"https://images.unsplash.com/{artist_img}?w=400&h=400&fit=crop&q=80",
            "followers": random.randint(10000, 50000000),
            "verified": random.choice([True, True, True, False]),  # 75% verified
            "bio": f"Award-winning artist specializing in {', '.join(artist_genres[:2])}",
            "genre": artist_genres
        })
    
    # Generate 30 albums
    albums = []
    for i in range(30):
        album_img = random.choice(COVER_ART_IMAGES)
        artist_id = f"artist-{(i % 50) + 1}"
        artist_name = ARTIST_NAMES[i % len(ARTIST_NAMES)]
        
        # Get tracks for this album
        album_tracks = [t for t in tracks if t['albumId'] == f"album-{i+1}"]
        if not album_tracks:
            album_tracks = [tracks[i % len(tracks)]]
        
        track_list = [{"id": t['id'], "name": t['name'], "duration": t['duration']} for t in album_tracks[:12]]
        total_duration = sum(t['duration'] for t in album_tracks[:12])
        
        albums.append({
            "id": f"album-{i+1}",
            "name": f"{random.choice(TRACK_TITLES[:20])} Album",
            "artist": {
                "id": artist_id,
                "name": artist_name,
                "image": f"https://images.unsplash.com/{random.choice(ARTIST_IMAGES)}?w=400&h=400&fit=crop&q=80",
                "followers": random.randint(10000, 50000000),
                "verified": True
            },
            "coverArt": f"https://images.unsplash.com/{album_img}?w=400&h=400&fit=crop&q=80",
            "tracks": track_list,
            "releaseDate": f"2024-{random.randint(1,12):02d}-{random.randint(1,28):02d}",
            "label": random.choice(["EmPulse Records", "NextEleven Label", "Independent", "Universal", "Sony Music"]),
            "copyright": f"© 2024 {random.choice(['EmPulse Records', 'NextEleven Label'])}",
            "totalDuration": total_duration
        })
    
    # Generate 50 playlists with diverse mood combinations
    playlists = []
    playlist_names = [
        "Melancholic Reflections", "Nostalgic Memories", "Deep Thoughts", "Content Moments",
        "Joyful Anthems", "Euphoric Beats", "Anxious Relief", "Stress-Free Zone",
        "Confidence Boost", "Relaxed Vibes", "Excited Energy", "Grateful Heart",
        "Optimistic Outlook", "Chill Electronic", "Energetic Rock", "Mellow Jazz",
        "Uplifting Pop", "Calm Ambient", "High Energy Hip-Hop", "Smooth R&B",
        "Mental Health Focus", "Wellness Soundtrack", "Therapy Playlist", "Healing Tunes",
        "Morning Motivation", "Evening Wind Down", "Workout Mix", "Study Focus",
        "Sleep Sounds", "Wake Up Call", "Road Trip Tunes", "Party Starters",
        "Rainy Day Vibes", "Sunny Day Energy", "Winter Warmth", "Summer Cool",
        "Spring Fresh", "Autumn Cozy", "Dark Mood", "Light Heart",
        "Mixed Emotions", "Pure Joy", "Deep Sadness", "Neutral State",
        "Genre Mix 2024", "New Releases", "Throwback Hits", "Underground Gems",
        "Indie Discoveries", "World Music Journey"
    ]
    
    for i in range(50):
        playlist_name = playlist_names[i] if i < len(playlist_names) else f"Playlist {i+1}"
        
        # Select mood for playlist
        mood = random.choice(MOODS)
        config = get_mood_config(mood)
        vibe = random.randint(*config['vibe_range'])
        feelings = random.sample(config['feelings'], random.randint(1, 3))
        playlist_genres = random.sample(GENRES, random.randint(2, 4))
        
        # Find matching tracks
        matching_tracks = [
            t for t in tracks 
            if t['moodTags']['mood'] == mood or 
               any(f in t['moodTags']['feelings'] for f in feelings) or
               any(g in t['moodTags']['genres'] for g in playlist_genres)
        ][:20]  # Limit to 20 tracks per playlist
        
        if not matching_tracks:
            matching_tracks = tracks[i*3:(i+1)*3]
        
        track_list = [{"id": t['id'], "name": t['name'], "duration": t['duration']} for t in matching_tracks]
        total_duration = sum(t['duration'] for t in matching_tracks)
        
        playlists.append({
            "id": f"playlist-{i+1}",
            "name": playlist_name,
            "description": f"A curated collection of {mood.lower()} tracks for {', '.join(feelings).lower()} moments",
            "coverArt": f"https://images.unsplash.com/{random.choice(COVER_ART_IMAGES)}?w=400&h=400&fit=crop&q=80",
            "owner": random.choice(["EmPulse Music", "NextEleven", "System", ARTIST_NAMES[i % len(ARTIST_NAMES)]]),
            "ownerId": "system",
            "tracks": track_list,
            "moodTags": {
                "mood": mood,
                "feelings": feelings,
                "vibe": vibe,
                "genres": playlist_genres
            },
            "totalDuration": total_duration,
            "createdAt": f"2024-{random.randint(1,12):02d}-{random.randint(1,28):02d}T{random.randint(0,23):02d}:00:00Z",
            "updatedAt": f"2024-{random.randint(1,12):02d}-{random.randint(1,28):02d}T{random.randint(0,23):02d}:00:00Z"
        })
    
    # Write files
    with open('data/mock/tracks.json', 'w') as f:
        json.dump(tracks, f, indent=2)
    print(f"✓ Generated {len(tracks)} tracks")
    
    with open('data/mock/artists.json', 'w') as f:
        json.dump(artists, f, indent=2)
    print(f"✓ Generated {len(artists)} artists")
    
    with open('data/mock/albums.json', 'w') as f:
        json.dump(albums, f, indent=2)
    print(f"✓ Generated {len(albums)} albums")
    
    with open('data/mock/playlists.json', 'w') as f:
        json.dump(playlists, f, indent=2)
    print(f"✓ Generated {len(playlists)} playlists")
    
    print("\n✅ Seed data generation complete!")

if __name__ == '__main__':
    generate_seed_data()
