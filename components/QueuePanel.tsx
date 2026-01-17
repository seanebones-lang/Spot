'use client';

import { X } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import PlayButton from './PlayButton';
import { formatDuration } from '@/lib/utils';

interface QueuePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QueuePanel({ isOpen, onClose }: QueuePanelProps) {
  const { queue, currentTrack, setCurrentTrack, setIsPlaying } = usePlayerStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-spotify-dark-gray w-full max-w-md h-[60vh] rounded-t-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold">Queue</h2>
          <button
            onClick={onClose}
            className="text-spotify-text-gray hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {currentTrack && (
            <div className="p-3 bg-spotify-light-gray rounded-lg mb-4">
              <div className="text-xs text-spotify-text-gray mb-2">Now Playing</div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-spotify-dark-gray rounded">
                  {currentTrack.coverArt && (
                    <img src={currentTrack.coverArt} alt={currentTrack.name} className="w-full h-full object-cover rounded" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate text-white">{currentTrack.name}</div>
                  <div className="text-sm text-spotify-text-gray truncate">{currentTrack.artist}</div>
                </div>
                <span className="text-xs text-spotify-text-gray">{formatDuration(currentTrack.duration)}</span>
              </div>
            </div>
          )}
          {queue.length === 0 && (
            <div className="text-center py-16 text-spotify-text-gray">
              <p>Your queue is empty</p>
            </div>
          )}
          {queue.map((track) => (
            <div
              key={track.id}
              onClick={() => {
                setCurrentTrack(track);
                setIsPlaying(true);
              }}
              className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer group"
            >
              <div className="w-12 h-12 bg-spotify-light-gray rounded">
                {track.coverArt && (
                  <img src={track.coverArt} alt={track.name} className="w-full h-full object-cover rounded" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate text-white">{track.name}</div>
                <div className="text-sm text-spotify-text-gray truncate">{track.artist}</div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayButton
                  isPlaying={false}
                  onClick={() => {
                    setCurrentTrack(track);
                    setIsPlaying(true);
                  }}
                  size="sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
