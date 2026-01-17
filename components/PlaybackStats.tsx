'use client';

import { useState } from 'react';
import { TrendingUp, Clock, Music, User, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlaybackStatsProps {
  className?: string;
}

export default function PlaybackStats({ className }: PlaybackStatsProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Mock stats data - in production, fetch from API
  const stats = {
    week: {
      listeningTime: 24.5, // hours
      topGenres: ['Electronic', 'Hip Hop', 'Pop'],
      topArtists: ['DJ Smooth', 'Neon Waves', 'Alex Johnson'],
      topTracks: ['Midnight Vibes', 'Electric Dreams', 'Sunset Drive'],
    },
    month: {
      listeningTime: 98.5,
      topGenres: ['Electronic', 'Hip Hop', 'Pop', 'Rock', 'Jazz'],
      topArtists: ['DJ Smooth', 'Neon Waves', 'Alex Johnson', 'Sarah Chen', 'Mike Davis'],
      topTracks: ['Midnight Vibes', 'Electric Dreams', 'Sunset Drive', 'Ocean Waves', 'City Lights'],
    },
    year: {
      listeningTime: 1245.8,
      topGenres: ['Electronic', 'Hip Hop', 'Pop', 'Rock', 'Jazz', 'Classical'],
      topArtists: ['DJ Smooth', 'Neon Waves', 'Alex Johnson', 'Sarah Chen', 'Mike Davis'],
      topTracks: ['Midnight Vibes', 'Electric Dreams', 'Sunset Drive', 'Ocean Waves', 'City Lights'],
    },
  };

  const currentStats = stats[timeRange];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Time Range Selector */}
      <div className="flex gap-2">
        {(['week', 'month', 'year'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize",
              timeRange === range
                ? "bg-white text-black"
                : "bg-spotify-light-gray text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/80"
            )}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Listening Time */}
      <div className="bg-spotify-light-gray rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-spotify-green" />
          <h3 className="text-xl font-bold">Listening Time</h3>
        </div>
        <div className="text-4xl font-bold mb-2">{currentStats.listeningTime.toFixed(1)} hours</div>
        <p className="text-sm text-spotify-text-gray">
          {timeRange === 'week' && 'This week'}
          {timeRange === 'month' && 'This month'}
          {timeRange === 'year' && 'This year'}
        </p>
      </div>

      {/* Top Genres */}
      <div className="bg-spotify-light-gray rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-spotify-green" />
          <h3 className="text-xl font-bold">Top Genres</h3>
        </div>
        <div className="space-y-3">
          {currentStats.topGenres.map((genre, index) => (
            <div key={genre} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-spotify-text-gray w-8">{index + 1}</span>
                <span className="font-medium">{genre}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Artists */}
      <div className="bg-spotify-light-gray rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-6 h-6 text-spotify-green" />
          <h3 className="text-xl font-bold">Top Artists</h3>
        </div>
        <div className="space-y-3">
          {currentStats.topArtists.map((artist, index) => (
            <div key={artist} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-spotify-text-gray w-8">{index + 1}</span>
                <span className="font-medium">{artist}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tracks */}
      <div className="bg-spotify-light-gray rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Music className="w-6 h-6 text-spotify-green" />
          <h3 className="text-xl font-bold">Top Tracks</h3>
        </div>
        <div className="space-y-3">
          {currentStats.topTracks.map((track, index) => (
            <div key={track} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-spotify-text-gray w-8">{index + 1}</span>
                <span className="font-medium">{track}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
