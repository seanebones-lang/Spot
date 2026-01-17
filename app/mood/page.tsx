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
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Discover Music by Mood</h1>
      <p className="text-spotify-text-gray mb-8">
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

      {/* Results */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {filteredPlaylists.length} Playlist{filteredPlaylists.length !== 1 ? 's' : ''} Match Your Mood
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredPlaylists.map((playlist) => {
            const firstTrackId = playlist.tracks[0]?.id;
            const isPlaylistPlaying = currentTrack?.id === firstTrackId && isPlaying;
            return (
              <div
                key={playlist.id}
                className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80 transition-colors cursor-pointer group relative"
                onClick={() => handlePlayPlaylist(playlist)}
              >
                <div className="relative mb-3">
                  <img
                    src={playlist.coverArt}
                    alt={playlist.name}
                    className="w-full aspect-square object-cover rounded"
                  />
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayButton
                      isPlaying={isPlaylistPlaying}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPlaylist(playlist);
                      }}
                      size="sm"
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-sm truncate mb-1">{playlist.name}</h3>
                <p className="text-xs text-spotify-text-gray line-clamp-2">{playlist.description}</p>
                {playlist.moodTags && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="text-xs px-2 py-0.5 bg-empulse-purple/20 text-empulse-purple rounded">
                      {playlist.moodTags.mood}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {filteredPlaylists.length === 0 && (
          <div className="text-center py-16">
            <p className="text-spotify-text-gray text-lg">
              No playlists match your current mood selection
            </p>
            <p className="text-spotify-text-gray text-sm mt-2">
              Try adjusting your mood, feelings, vibe, or genres
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
