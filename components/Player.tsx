'use client';

import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import dynamic from 'next/dynamic';
import { Shuffle, SkipBack, SkipForward, Repeat, List, Maximize2, Music, Settings } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import { audioPlayer } from '@/lib/player';
import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import MoodWidget from './mood/MoodWidget';
import PictureInPicturePlayer from './PictureInPicturePlayer';
import QualitySelector from './QualitySelector';
import AudioQualityBadge from './AudioQualityBadge';
import ControlButton from './ControlButton';
import { formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Quality } from './QualitySelector';

// Lazy load heavy components for better initial bundle size using Next.js dynamic import
const QueuePanel = dynamic(() => import('./QueuePanel'), { ssr: false });
const FullScreenPlayer = dynamic(() => import('./FullScreenPlayer'), { ssr: false });
const Equalizer = dynamic(() => import('./Equalizer'), { ssr: false });

/**
 * Main audio player component with Spotify-style UI
 * 
 * Features:
 * - Playback controls (play, pause, skip, shuffle, repeat)
 * - Progress tracking and seeking
 * - Volume control
 * - Queue management
 * - Full-screen player
 * - Picture-in-picture mode
 * - Quality selection
 * - Mood widget integration
 * 
 * @component
 */
function Player() {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    shuffle,
    repeat,
    setIsPlaying,
    setProgress,
    setVolume,
    setShuffle,
    setRepeat,
    playNext,
    playPrevious,
  } = usePlayerStore();

  const [quality, setQuality] = useState<Quality>('high');
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEQ, setShowEQ] = useState(false);
  
  // Detect available formats from track
  const availableFormats = useMemo(() => {
    return currentTrack?.format 
      ? [currentTrack.format.toLowerCase()]
      : ['mp3'];
  }, [currentTrack?.format]);

  // Calculate current time in seconds
  const currentTime = useMemo(() => {
    return currentTrack 
      ? (progress / 100) * currentTrack.duration 
      : 0;
  }, [currentTrack, progress]);

  // Handle track loading with error handling
  useEffect(() => {
    if (!currentTrack) {
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const wasPlaying = isPlaying;
    
    // Set up load callback to auto-play if was playing
    audioPlayer.setOnLoadCallback(() => {
      setIsLoading(false);
      if (wasPlaying) {
        audioPlayer.play();
        setIsPlaying(true);
      }
    });
    
    try {
      audioPlayer.loadTrack(
        currentTrack.audioUrl,
        currentTrack.id,
        (prog) => setProgress(prog),
        () => {
          // Handle track end
          if (repeat === 'one') {
            audioPlayer.play();
          } else if (repeat === 'all') {
            playNext();
          } else {
            playNext();
          }
        }
      );
      
      // Reset progress when loading new track
      setProgress(0);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load track';
      setError(errorMessage);
      setIsLoading(false);
      console.error('Error loading track:', err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.id, repeat]); // Only depend on track ID to avoid re-loading

  // Handle play/pause state changes
  useEffect(() => {
    if (!currentTrack || isLoading) return;
    
    if (isPlaying) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }, [isPlaying, currentTrack, isLoading]);

  // Handle volume changes
  useEffect(() => {
    audioPlayer.setVolume(volume);
  }, [volume]);

  const handlePlayPause = useCallback(() => {
    if (!currentTrack || isLoading) return;
    setIsPlaying(!isPlaying);
  }, [currentTrack, isPlaying, isLoading, setIsPlaying]);

  const handleSeek = useCallback((position: number) => {
    if (!currentTrack) return;
    const seconds = position / 1000;
    audioPlayer.seek(seconds);
    const newProgress = position > 0 
      ? (position / currentTrack.duration) * 100 
      : 0;
    setProgress(newProgress);
  }, [currentTrack, setProgress]);

  const handleShuffleToggle = useCallback(() => {
    if (!currentTrack) return;
    setShuffle(!shuffle);
  }, [currentTrack, shuffle, setShuffle]);

  const handleRepeatToggle = useCallback(() => {
    if (!currentTrack) return;
    const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeat);
    setRepeat(modes[(currentIndex + 1) % modes.length]);
  }, [currentTrack, repeat, setRepeat]);

  const handlePrevious = useCallback(() => {
    if (!currentTrack) return;
    playPrevious();
  }, [currentTrack, playPrevious]);

  const handleNext = useCallback(() => {
    if (!currentTrack) return;
    playNext();
  }, [currentTrack, playNext]);

  const handleQueueToggle = useCallback(() => {
    if (!currentTrack) return;
    setIsQueueOpen(true);
  }, [currentTrack]);

  const handleFullScreenToggle = useCallback(() => {
    if (!currentTrack) return;
    setIsFullScreen(true);
  }, [currentTrack]);

  // Repeat button label
  const repeatLabel = useMemo(() => {
    switch (repeat) {
      case 'off':
        return 'Repeat off';
      case 'all':
        return 'Repeat all';
      case 'one':
        return 'Repeat one';
    }
  }, [repeat]);

  // Keyboard shortcuts (moved after callbacks to fix dependency warning)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          if (currentTrack) {
            handlePlayPause();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (currentTrack && e.shiftKey) {
            playPrevious();
          } else if (currentTrack) {
            handleSeek(Math.max(0, currentTime - 10) * 1000);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (currentTrack && e.shiftKey) {
            playNext();
          } else if (currentTrack) {
            handleSeek(Math.min(currentTrack.duration, currentTime + 10) * 1000);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(100, volume + 5));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(0, volume - 5));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentTrack, currentTime, volume, setVolume, handlePlayPause, handleSeek, playNext, playPrevious]);

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-[90px] bg-[#181818] border-t border-[#282828] px-4 z-50"
      role="region"
      aria-label="Audio player"
    >
      <div 
        className="flex items-center justify-between h-full max-w-screen-2xl mx-auto gap-4"
      >
        {/* Left - Now Playing - Exact Spotify: flex-basis 30% */}
        <div className="flex items-center gap-4 flex-[1_1_30%] min-w-0">
          <div 
            className="w-14 h-14 bg-[#282828] rounded flex-shrink-0"
            role="img"
            aria-label={currentTrack ? `${currentTrack.name} cover art` : 'No track'}
          >
            {currentTrack?.coverArt ? (
              <img
                src={currentTrack.coverArt}
                alt={`${currentTrack.name} by ${currentTrack.artist}`}
                className="w-full h-full object-cover rounded"
                loading="lazy"
                onError={(e) => {
                  // Fallback to placeholder on image load error
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music size={24} className="text-spotify-text-gray" />
              </div>
            )}
          </div>
          
          {currentTrack ? (
            <>
              <div className="min-w-0 flex-1">
                <div className="text-sm leading-5 font-normal text-white truncate">
                  {currentTrack.name}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-[13px] leading-4 text-spotify-text-gray truncate">
                    {currentTrack.artist}
                  </div>
                  <AudioQualityBadge track={currentTrack} className="flex-shrink-0" />
                </div>
                {error && (
                  <div className="text-xs text-red-400 mt-1" role="alert">
                    {error}
                  </div>
                )}
                {isLoading && (
                  <div className="text-xs text-spotify-text-gray mt-1" aria-live="polite">
                    Loading...
                  </div>
                )}
              </div>
              <MoodWidget track={currentTrack} />
            </>
          ) : (
            <div className="text-sm leading-5 text-spotify-text-gray">
              No track selected
            </div>
          )}
        </div>

        {/* Center - Controls - Exact Spotify: flex-basis 40%, max-width 722px */}
        <div className="flex flex-col items-center gap-2 flex-[1_1_40%] max-w-[722px]">
          <div 
            className="flex items-center gap-4"
          >
            <ControlButton
              onClick={handleShuffleToggle}
              disabled={!currentTrack || isLoading}
              active={shuffle}
              ariaLabel={shuffle ? 'Shuffle on' : 'Shuffle off'}
              ariaPressed={shuffle}
            >
              <Shuffle size={16} />
            </ControlButton>
            
            <ControlButton
              onClick={handlePrevious}
              disabled={!currentTrack || isLoading}
              ariaLabel="Previous track"
            >
              <SkipBack size={20} />
            </ControlButton>
            
            <PlayButton 
              isPlaying={isPlaying} 
              onClick={handlePlayPause} 
              size="md"
              disabled={!currentTrack || isLoading}
            />
            
            <ControlButton
              onClick={handleNext}
              disabled={!currentTrack || isLoading}
              ariaLabel="Next track"
            >
              <SkipForward size={20} />
            </ControlButton>
            
            <ControlButton
              onClick={handleRepeatToggle}
              disabled={!currentTrack || isLoading}
              active={repeat !== 'off'}
              ariaLabel={repeatLabel}
              ariaPressed={repeat !== 'off'}
            >
              <Repeat size={16} />
            </ControlButton>
          </div>
          
          {currentTrack && (
            <ProgressBar
              progress={progress}
              duration={currentTrack.duration * 1000}
              currentTime={currentTime * 1000}
              onSeek={handleSeek}
            />
          )}
        </div>

        {/* Right - Volume & Extras - Exact Spotify: flex-basis 30% */}
        <div className="flex items-center gap-4 flex-[1_1_30%] justify-end">
          {currentTrack && (
            <QualitySelector
              currentQuality={quality}
              availableFormats={availableFormats}
              onQualityChange={setQuality}
            />
          )}
          
          {currentTrack && (
            <button
              onClick={() => setShowEQ(!showEQ)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                showEQ
                  ? "bg-spotify-green text-black"
                  : "hover:bg-white/10 text-spotify-text-gray hover:text-white"
              )}
              aria-label="Toggle equalizer"
              title="Equalizer"
            >
              <Settings size={20} />
            </button>
          )}
          
          <ControlButton
            onClick={handleQueueToggle}
            disabled={!currentTrack}
            ariaLabel="Open queue"
            title="Queue"
          >
            <List size={20} />
          </ControlButton>
          
          {currentTrack && (
            <>
              <ControlButton
                onClick={handleFullScreenToggle}
                ariaLabel="Open full screen player"
                title="Full screen"
              >
                <Maximize2 size={20} />
              </ControlButton>
              <PictureInPicturePlayer />
            </>
          )}
          
          <VolumeControl volume={volume} onVolumeChange={setVolume} />
        </div>
      </div>
      
      {/* EQ Panel (slides up from bottom) */}
      {showEQ && currentTrack && (
        <div className="absolute bottom-[90px] left-0 right-0 bg-[#181818] border-t border-[#282828] p-4 max-h-[400px] overflow-y-auto">
          <Equalizer compact={false} />
        </div>
      )}
      
      {isQueueOpen && (
        <QueuePanel isOpen={isQueueOpen} onClose={() => setIsQueueOpen(false)} />
      )}
      {isFullScreen && (
        <FullScreenPlayer isOpen={isFullScreen} onClose={() => setIsFullScreen(false)} />
      )}
    </div>
  );
}

export default memo(Player);
