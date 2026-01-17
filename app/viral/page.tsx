'use client';

import Image from 'next/image';
import PlayButton from '@/components/PlayButton';
import { mockData } from '@/lib/data';
import { usePlayerStore } from '@/stores/playerStore';

export default function ViralPage() {
  const tracks = mockData.getTracks();
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = usePlayerStore();

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Viral Hits</h1>
      <div className="space-y-2">
        {tracks.slice(0, 50).map((track) => (
          <div key={track.id} className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg group">
            <div className="w-14 h-14 bg-spotify-dark-gray rounded relative">
              {track.coverArt && <Image src={track.coverArt} alt={track.name} fill className="object-cover rounded" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white truncate">{track.name}</div>
              <div className="text-sm text-spotify-text-gray truncate">{track.artist}</div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayButton isPlaying={currentTrack?.id === track.id && isPlaying} onClick={() => { setCurrentTrack(track); setIsPlaying(true); }} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
