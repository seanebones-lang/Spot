'use client';

import { useState } from 'react';
import { useMoodStore } from '@/stores/moodStore';
import { usePlayerStore } from '@/stores/playerStore';
import { mockData } from '@/lib/data';
import MoodSelector from '@/components/mood/MoodSelector';
import FeelingChips from '@/components/mood/FeelingChips';
import VibeSlider from '@/components/mood/VibeSlider';
import GenreSelector from '@/components/mood/GenreSelector';
import PlayButton from '@/components/PlayButton';
import { MoodState } from '@/types/mood';

export default function MoodPage() {
  const {
    selectedMood,
    selectedFeelings,
    vibe,
    selectedGenres,
    setMood,
    setFeelings,
    setVibe,
    setGenres,
  } = useMoodStore();

  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying, addToQueue } = usePlayerStore();
  const tracks = mockData.getTracks();
  const playlists = mockData.getPlaylists();

  // Simple matching algorithm (client-side)
  const filteredPlaylists = playlists.filter((playlist) => {
    if (!playlist.moodTags) return false;
    
    let matchScore = 0;
    
    // Mood match (40%)
    if (selectedMood && playlist.moodTags.mood === selectedMood) {
      matchScore += 0.4;
    }
    
    // Feeling overlap (30%)
    if (selectedFeelings.length > 0 && playlist.moodTags.feelings) {
      const overlap = selectedFeelings.filter(f => playlist.moodTags?.feelings.includes(f)).length;
      const overlapScore = overlap / Math.max(selectedFeelings.length, playlist.moodTags.feelings.length);
      matchScore += overlapScore * 0.3;
    }
    
    // Vibe proximity (20%)
    if (playlist.moodTags.vibe !== undefined) {
      const vibeDiff = Math.abs(vibe - playlist.moodTags.vibe);
      const vibeScore = 1 - (vibeDiff / 100);
      matchScore += Math.max(0, vibeScore) * 0.2;
    }
    
    // Genre match (10%)
    if (selectedGenres.length > 0 && playlist.moodTags.genres) {
      const genreOverlap = selectedGenres.filter(g => playlist.moodTags?.genres.includes(g)).length;
      const genreScore = genreOverlap / Math.max(selectedGenres.length, playlist.moodTags.genres.length);
      matchScore += genreScore * 0.1;
    }
    
    return matchScore >= 0.3; // Show playlists with at least 30% match
  }).sort((a, b) => {
    // Sort by match score (simplified)
    return 0;
  });

  const handleToggleFeeling = (feeling: string) => {
    if (selectedFeelings.includes(feeling)) {
      setFeelings(selectedFeelings.filter(f => f !== feeling));
    } else {
      setFeelings([...selectedFeelings, feeling]);
    }
  };

  const handleToggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setGenres([...selectedGenres, genre]);
    }
  };

  const handlePlayPlaylist = (playlist: typeof playlists[0]) => {
    // Find first track in playlist and play it
    const firstTrackId = playlist.tracks[0]?.id;
    if (firstTrackId) {
      const track = tracks.find(t => t.id === firstTrackId);
      if (track) {
        // Add all playlist tracks to queue
        playlist.tracks.forEach(t => {
          const trackToAdd = tracks.find(tr => tr.id === t.id);
          if (trackToAdd) addToQueue(trackToAdd);
        });
        setCurrentTrack(track);
        setIsPlaying(true);
      }
    }
  };

  return (
    <div 
      className="p-8"
      style={{
        padding: '32px',
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: '#FFFFFF'
      }}
    >
      <h1 
        className="text-4xl font-bold mb-8"
        style={{
          fontSize: '32px',
          lineHeight: '36px',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '32px'
        }}
      >
        Discover Music by Mood
      </h1>
      <p 
        className="text-spotify-text-gray mb-8"
        style={{
          fontSize: '14px',
          lineHeight: '20px',
          color: '#B3B3B3',
          marginBottom: '32px'
        }}
      >
        Select your mood, feelings, vibe, and genres to find the perfect playlists
      </p>

      {/* Mood Selector */}
      <MoodSelector selectedMood={selectedMood} onSelect={setMood} />

      {/* Feeling Chips */}
      <FeelingChips
        selectedFeelings={selectedFeelings}
        onToggle={handleToggleFeeling}
      />

      {/* Vibe Slider */}
      <VibeSlider value={vibe} onChange={setVibe} />

      {/* Genre Selector */}
      <GenreSelector
        selectedGenres={selectedGenres}
        onToggle={handleToggleGenre}
      />

      {/* Results - Exact Spotify Style */}
      <div 
        className="mt-8"
        style={{ marginTop: '32px' }}
      >
        <div 
          className="flex items-center justify-between mb-4"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}
        >
          <h2 
            className="text-2xl font-bold"
            style={{
              fontSize: '24px',
              lineHeight: '28px',
              fontWeight: 700,
              color: '#FFFFFF'
            }}
          >
            {filteredPlaylists.length} Playlist{filteredPlaylists.length !== 1 ? 's' : ''} Match Your Mood
          </h2>
        </div>
        <div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
          style={{ gap: '16px' }}
        >
          {filteredPlaylists.map((playlist) => {
            const firstTrackId = playlist.tracks[0]?.id;
            const isPlaylistPlaying = currentTrack?.id === firstTrackId && isPlaying;
            return (
              <div
                key={playlist.id}
                className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-dark-gray transition-all duration-200 cursor-pointer group relative"
                style={{
                  backgroundColor: '#181818',
                  borderRadius: '8px',
                  padding: '16px',
                  transition: 'background-color 200ms ease-out',
                  cursor: 'pointer'
                }}
                onClick={() => handlePlayPlaylist(playlist)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#282828';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#181818';
                }}
              >
                <div 
                  className="relative mb-3"
                  style={{
                    marginBottom: '12px',
                    position: 'relative'
                  }}
                >
                  <img
                    src={playlist.coverArt}
                    alt={playlist.name}
                    className="w-full aspect-square object-cover rounded"
                    style={{
                      borderRadius: '4px',
                      aspectRatio: '1',
                      width: '100%'
                    }}
                  />
                  <div 
                    className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      bottom: '8px',
                      right: '8px',
                      transition: 'opacity 200ms ease-out'
                    }}
                  >
                    <PlayButton
                      isPlaying={isPlaylistPlaying}
                      onClick={(e) => {
                        e?.stopPropagation();
                        handlePlayPlaylist(playlist);
                      }}
                      size="sm"
                    />
                  </div>
                </div>
                <h3 
                  className="font-semibold text-sm truncate mb-1"
                  style={{
                    fontSize: '14px',
                    lineHeight: '20px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '4px'
                  }}
                >
                  {playlist.name}
                </h3>
                <p 
                  className="text-xs text-spotify-text-gray line-clamp-2"
                  style={{
                    fontSize: '13px',
                    lineHeight: '16px',
                    color: '#B3B3B3',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {playlist.description}
                </p>
                {playlist.moodTags && (
                  <div 
                    className="mt-2 flex flex-wrap gap-1"
                    style={{
                      marginTop: '8px',
                      gap: '4px'
                    }}
                  >
                    <span 
                      className="text-xs px-2 py-0.5 bg-empulse-purple/20 text-empulse-purple rounded"
                      style={{
                        fontSize: '11px',
                        lineHeight: '16px',
                        padding: '4px 8px',
                        backgroundColor: 'rgba(114, 9, 183, 0.2)',
                        color: '#7209B7',
                        borderRadius: '4px'
                      }}
                    >
                      {playlist.moodTags.mood}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {filteredPlaylists.length === 0 && (
          <div 
            className="text-center py-16"
            style={{
              textAlign: 'center',
              padding: '64px 16px'
            }}
          >
            <p 
              className="text-spotify-text-gray text-lg"
              style={{
                fontSize: '18px',
                lineHeight: '24px',
                color: '#B3B3B3',
                marginBottom: '8px'
              }}
            >
              No playlists match your current mood selection
            </p>
            <p 
              className="text-spotify-text-gray text-sm mt-2"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#B3B3B3',
                marginTop: '8px'
              }}
            >
              Try adjusting your mood, feelings, vibe, or genres
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
