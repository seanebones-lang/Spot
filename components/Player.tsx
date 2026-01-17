'use client';

import { useEffect, useState } from 'react';
import { Shuffle, SkipBack, SkipForward, Repeat, List } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import { audioPlayer } from '@/lib/player';
import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import MoodWidget from './mood/MoodWidget';
import PictureInPicturePlayer from './PictureInPicturePlayer';
import QualitySelector from './QualitySelector';
import QueuePanel from './QueuePanel';
import { formatDuration } from '@/lib/utils';
import type { Quality } from './QualitySelector';

export default function Player() {
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
  
  // Detect available formats from track
  const availableFormats = currentTrack?.format 
    ? [currentTrack.format.toLowerCase()]
    : ['mp3'];

  useEffect(() => {
    if (currentTrack) {
      audioPlayer.loadTrack(
        currentTrack.audioUrl,
        currentTrack.id,
        (prog) => setProgress(prog),
        () => {
          if (repeat === 'one') {
            audioPlayer.play();
          } else if (repeat === 'all') {
            playNext();
          } else {
            playNext();
          }
        }
      );
    }
  }, [currentTrack, repeat, playNext, setProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioPlayer.setVolume(volume);
  }, [volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (position: number) => {
    const seconds = position / 1000;
    audioPlayer.seek(seconds);
    const newProgress = position > 0 && currentTrack 
      ? (position / currentTrack.duration) * 100 
      : 0;
    setProgress(newProgress);
  };

  const currentTime = currentTrack 
    ? (progress / 100) * currentTrack.duration 
    : 0;

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-player-height bg-spotify-dark-gray border-t border-spotify-light-gray px-4 z-50">
      <div className="flex items-center justify-between h-full max-w-screen-2xl mx-auto">
        {/* Left - Now Playing */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-14 h-14 bg-spotify-light-gray rounded flex-shrink-0">
            {currentTrack.coverArt && (
              <img
                src={currentTrack.coverArt}
                alt={currentTrack.name}
                className="w-full h-full object-cover rounded"
              />
            )}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-white truncate">{currentTrack.name}</div>
            <div className="text-xs text-spotify-text-gray truncate">{currentTrack.artist}</div>
          </div>
          <MoodWidget track={currentTrack} />
        </div>

        {/* Center - Controls */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={`text-spotify-text-gray hover:text-white transition-colors ${
                shuffle ? 'text-spotify-green' : ''
              }`}
            >
              <Shuffle size={16} />
            </button>
            <button
              onClick={playPrevious}
              className="text-spotify-text-gray hover:text-white transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <PlayButton isPlaying={isPlaying} onClick={handlePlayPause} size="md" />
            <button
              onClick={playNext}
              className="text-spotify-text-gray hover:text-white transition-colors"
            >
              <SkipForward size={20} />
            </button>
            <button
              onClick={() => {
                const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
                const currentIndex = modes.indexOf(repeat);
                setRepeat(modes[(currentIndex + 1) % modes.length]);
              }}
              className={`text-spotify-text-gray hover:text-white transition-colors ${
                repeat !== 'off' ? 'text-spotify-green' : ''
              }`}
            >
              <Repeat size={16} />
            </button>
          </div>
          <ProgressBar
            progress={progress}
            duration={currentTrack.duration}
            currentTime={currentTime}
            onSeek={handleSeek}
          />
        </div>

        {/* Right - Volume & Extras */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          {currentTrack && (
            <QualitySelector
              currentQuality={quality}
              availableFormats={availableFormats}
              onQualityChange={setQuality}
            />
          )}
          <button
            onClick={() => setIsQueueOpen(true)}
            className="text-spotify-text-gray hover:text-white transition-colors"
            title="Queue"
          >
            <List size={20} />
          </button>
          <PictureInPicturePlayer />
          <VolumeControl volume={volume} onVolumeChange={setVolume} />
        </div>
      </div>
      
      <QueuePanel isOpen={isQueueOpen} onClose={() => setIsQueueOpen(false)} />
    </div>
  );
}
