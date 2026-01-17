'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '@/lib/data';
import PlayButton from '@/components/PlayButton';
import { usePlayerStore } from '@/stores/playerStore';
import { cn } from '@/lib/utils';

export default function ChartsPage() {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('today');
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = usePlayerStore();
  const tracks = mockData.getTracks();

  // Mock chart data - in production, this would come from API
  const chartTracks = tracks.slice(0, 50).map((track, index) => ({
    ...track,
    position: index + 1,
    change: index % 3 === 0 ? 'up' : index % 3 === 1 ? 'down' : 'same',
    streams: Math.floor(Math.random() * 10000000)
  }));

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Top Charts</h1>
        <div className="flex items-center gap-2 mt-4">
          {(['today', 'week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize",
                timeRange === range
                  ? 'bg-white text-black hover:bg-[#f5f5f5]'
                  : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-spotify-light-gray rounded-lg overflow-hidden">
        <div className="grid grid-cols-[40px_1fr_200px_100px] gap-4 px-6 py-3 border-b border-white/10 text-sm font-medium text-spotify-text-gray">
          <div>#</div>
          <div>Title</div>
          <div>Streams</div>
          <div>Change</div>
        </div>

        <div className="divide-y divide-white/10">
          {chartTracks.map((track) => (
            <div
              key={track.id}
              className="grid grid-cols-[40px_1fr_200px_100px] gap-4 px-6 py-3 hover:bg-white/5 group items-center"
            >
              <div className="text-spotify-text-gray font-medium">{track.position}</div>
              
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 bg-spotify-dark-gray rounded flex-shrink-0 relative">
                  {track.coverArt && (
                    <Image
                      src={track.coverArt}
                      alt={track.name}
                      fill
                      className="object-cover rounded"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white truncate">{track.name}</div>
                  <div className="text-sm text-spotify-text-gray truncate">{track.artist}</div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayButton
                    isPlaying={currentTrack?.id === track.id && isPlaying}
                    onClick={() => {
                      setCurrentTrack(track);
                      setIsPlaying(true);
                    }}
                    size="sm"
                  />
                </div>
              </div>

              <div className="text-spotify-text-gray text-sm">
                {track.streams.toLocaleString()}
              </div>

              <div className="text-sm">
                {track.change === 'up' && <span className="text-spotify-green">↑</span>}
                {track.change === 'down' && <span className="text-red-400">↓</span>}
                {track.change === 'same' && <span className="text-spotify-text-gray">-</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}