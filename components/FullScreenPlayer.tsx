'use client';

import { useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import { formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface FullScreenPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullScreenPlayer({ isOpen, onClose }: FullScreenPlayerProps) {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    setIsPlaying,
    setProgress,
    setVolume,
  } = usePlayerStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !currentTrack) return null;

  const currentTime = (progress / 100) * currentTrack.duration;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-spotify-dark to-black z-[200] flex flex-col">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors z-10"
        aria-label="Close full screen"
      >
        <X size={24} />
      </button>

      {/* Album Art */}
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="w-full max-w-2xl aspect-square">
          {currentTrack.coverArt ? (
            <img
              src={currentTrack.coverArt}
              alt={currentTrack.name}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray rounded-lg flex items-center justify-center">
              <span className="text-9xl">🎵</span>
            </div>
          )}
        </div>
      </div>

      {/* Track Info */}
      <div className="px-12 pb-8 text-center">
        <h2 className="text-4xl font-bold mb-2">{currentTrack.name}</h2>
        <p className="text-xl text-spotify-text-gray mb-8">{currentTrack.artist}</p>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBar
            progress={progress}
            duration={currentTrack.duration * 1000}
            currentTime={currentTime * 1000}
            onSeek={(position) => {
              const seconds = position / 1000;
              setProgress((seconds / currentTrack.duration) * 100);
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-32">
            <VolumeControl
              volume={volume}
              onVolumeChange={setVolume}
            />
          </div>
          <PlayButton
            isPlaying={isPlaying}
            onClick={() => setIsPlaying(!isPlaying)}
            size="lg"
          />
        </div>
      </div>
    </div>
  );
}
