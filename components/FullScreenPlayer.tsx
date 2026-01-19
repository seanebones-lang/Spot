'use client';

import { useEffect, useState } from 'react';
import { X, Maximize2, Sliders, Music2 } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import { audioPlayer } from '@/lib/player';
import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import AudioVisualizer from './AudioVisualizer';
import AudiophileVisualizer from './AudiophileVisualizer';
import Equalizer from './Equalizer';
import AudioQualityBadge from './AudioQualityBadge';
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

  const [showEQ, setShowEQ] = useState(false);
  const [visualizerType, setVisualizerType] = useState<'spectrum' | 'waveform' | 'circular' | 'bars' | 'particles'>('spectrum');
  const [visualizerColorScheme, setVisualizerColorScheme] = useState<'spotify' | 'rainbow' | 'fire' | 'ocean' | 'neon' | 'monochrome'>('spotify');

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
  const audioPipeline = audioPlayer.getAudioPipeline();

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

      {/* Toolbar */}
      <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
        <AudioQualityBadge track={currentTrack} showSpecs={true} />
        <button
          onClick={() => setShowEQ(!showEQ)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            showEQ 
              ? "bg-spotify-green text-black" 
              : "bg-white/10 text-white hover:bg-white/20"
          )}
        >
          <Sliders size={16} className="inline mr-2" />
          EQ
        </button>
        <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
          {(['spectrum', 'waveform', 'circular', 'bars', 'particles'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setVisualizerType(mode)}
              className={cn(
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                visualizerType === mode
                  ? "bg-spotify-green text-black"
                  : "text-white hover:bg-white/20"
              )}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-12">
        {!showEQ && audioPipeline ? (
          // GLSL Shader Visualizer View (4K capable)
          <div className="w-full max-w-6xl h-full max-h-[600px]">
            <AudiophileVisualizer 
              type={visualizerType}
              colorScheme={visualizerColorScheme}
              width={1920}
              height={1080}
              pixelRatio={2} // 2x for 4K (3840×2160 effective)
              showControls={true}
              className="w-full h-full rounded-lg bg-black/30"
            />
          </div>
        ) : showEQ ? (
          // EQ View
          <div className="w-full max-w-4xl">
            <Equalizer />
          </div>
        ) : (
          // Album Art (fallback)
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
        )}
      </div>

      {/* Track Info */}
      <div className="px-12 pb-8 text-center min-h-[200px]">
        <h2 className="text-4xl font-bold mb-2">{currentTrack.name}</h2>
        <p className="text-xl text-spotify-text-gray mb-4">{currentTrack.artist}</p>

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
