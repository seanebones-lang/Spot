'use client';

import Image from 'next/image';
import PlayButton from '@/components/PlayButton';
import { mockData } from '@/lib/data';
import { usePlayerStore } from '@/stores/playerStore';
import { cn } from '@/lib/utils';

export default function HistoryPage() {
  const tracks = mockData.getTracks();
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = usePlayerStore();

  // Mock playback history
  const history = tracks.slice(0, 50).map((track, index) => ({
    ...track,
    playedAt: new Date(Date.now() - index * 60000 * 15), // Mock timestamps
  }));

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Recently Played</h1>

      <div className="space-y-2">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg group"
          >
            <div className="w-14 h-14 bg-spotify-dark-gray rounded flex-shrink-0 relative">
              {item.coverArt && (
                <Image
                  src={item.coverArt}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white truncate">{item.name}</div>
              <div className="text-sm text-spotify-text-gray truncate">{item.artist}</div>
            </div>
            <div className="text-sm text-spotify-text-gray whitespace-nowrap">
              {item.playedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayButton
                isPlaying={currentTrack?.id === item.id && isPlaying}
                onClick={() => {
                  setCurrentTrack(item);
                  setIsPlaying(true);
                }}
                size="sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}