<<<<<<< HEAD
"use client";

import { useState } from "react";
import { TrendingUp, Clock, Music, User, Award } from "lucide-react";
import { cn } from "@/lib/utils";
=======
'use client';

import { useState } from 'react';
import { TrendingUp, Clock, Music, User, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface PlaybackStatsProps {
  className?: string;
}

export default function PlaybackStats({ className }: PlaybackStatsProps) {
<<<<<<< HEAD
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month",
  );
=======
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

  // Mock stats data - in production, fetch from API
  const stats = {
    week: {
      listeningTime: 24.5, // hours
<<<<<<< HEAD
      topGenres: ["Electronic", "Hip Hop", "Pop"],
      topArtists: ["DJ Smooth", "Neon Waves", "Alex Johnson"],
      topTracks: ["Midnight Vibes", "Electric Dreams", "Sunset Drive"],
    },
    month: {
      listeningTime: 98.5,
      topGenres: ["Electronic", "Hip Hop", "Pop", "Rock", "Jazz"],
      topArtists: [
        "DJ Smooth",
        "Neon Waves",
        "Alex Johnson",
        "Sarah Chen",
        "Mike Davis",
      ],
      topTracks: [
        "Midnight Vibes",
        "Electric Dreams",
        "Sunset Drive",
        "Ocean Waves",
        "City Lights",
      ],
    },
    year: {
      listeningTime: 1245.8,
      topGenres: ["Electronic", "Hip Hop", "Pop", "Rock", "Jazz", "Classical"],
      topArtists: [
        "DJ Smooth",
        "Neon Waves",
        "Alex Johnson",
        "Sarah Chen",
        "Mike Davis",
      ],
      topTracks: [
        "Midnight Vibes",
        "Electric Dreams",
        "Sunset Drive",
        "Ocean Waves",
        "City Lights",
      ],
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    },
  };

  const currentStats = stats[timeRange];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Time Range Selector */}
      <div className="flex gap-2">
<<<<<<< HEAD
        {(["week", "month", "year"] as const).map((range) => (
=======
        {(['week', 'month', 'year'] as const).map((range) => (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize",
              timeRange === range
                ? "bg-white text-black"
<<<<<<< HEAD
                : "bg-spotify-light-gray text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/80",
=======
                : "bg-spotify-light-gray text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/80"
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
        <div className="text-4xl font-bold mb-2">
          {currentStats.listeningTime.toFixed(1)} hours
        </div>
        <p className="text-sm text-spotify-text-gray">
          {timeRange === "week" && "This week"}
          {timeRange === "month" && "This month"}
          {timeRange === "year" && "This year"}
=======
        <div className="text-4xl font-bold mb-2">{currentStats.listeningTime.toFixed(1)} hours</div>
        <p className="text-sm text-spotify-text-gray">
          {timeRange === 'week' && 'This week'}
          {timeRange === 'month' && 'This month'}
          {timeRange === 'year' && 'This year'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
                <span className="text-2xl font-bold text-spotify-text-gray w-8">
                  {index + 1}
                </span>
=======
                <span className="text-2xl font-bold text-spotify-text-gray w-8">{index + 1}</span>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
                <span className="text-2xl font-bold text-spotify-text-gray w-8">
                  {index + 1}
                </span>
=======
                <span className="text-2xl font-bold text-spotify-text-gray w-8">{index + 1}</span>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
                <span className="text-2xl font-bold text-spotify-text-gray w-8">
                  {index + 1}
                </span>
=======
                <span className="text-2xl font-bold text-spotify-text-gray w-8">{index + 1}</span>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                <span className="font-medium">{track}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
