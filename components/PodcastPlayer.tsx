<<<<<<< HEAD
"use client";

import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Timer } from "lucide-react";
import { usePlayerStore } from "@/stores/playerStore";
import PlayButton from "./PlayButton";
// import ProgressBar from './ProgressBar'; // Using inline progress bar for now
import { formatDuration, cn } from "@/lib/utils";
=======
'use client';

import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Timer } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import PlayButton from './PlayButton';
// import ProgressBar from './ProgressBar'; // Using inline progress bar for now
import { formatDuration, cn } from '@/lib/utils';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface PodcastPlayerProps {
  episode: {
    id: string;
    title: string;
    description?: string;
    duration: number;
    coverArt?: string;
  };
  playbackSpeed?: number;
  onSpeedChange?: (speed: number) => void;
  onSkipSilence?: (skip: boolean) => void;
  skipSilence?: boolean;
  sleepTimer?: number;
  onSleepTimerChange?: (minutes: number) => void;
}

export default function PodcastPlayer({
  episode,
  playbackSpeed = 1,
  onSpeedChange,
  onSkipSilence,
  skipSilence = false,
  sleepTimer,
  onSleepTimerChange,
}: PodcastPlayerProps) {
  const { isPlaying, setIsPlaying, progress } = usePlayerStore();
  const [showSleepTimer, setShowSleepTimer] = useState(false);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const timerOptions = [5, 10, 15, 30, 60];

  return (
    <div className="bg-spotify-light-gray rounded-lg p-6 space-y-4">
      {/* Episode Info */}
      <div className="flex items-start gap-4">
        {episode.coverArt && (
<<<<<<< HEAD
          <img
            src={episode.coverArt}
            alt={episode.title}
            className="w-32 h-32 rounded-lg object-cover"
          />
=======
          <img src={episode.coverArt} alt={episode.title} className="w-32 h-32 rounded-lg object-cover" />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">{episode.title}</h3>
          {episode.description && (
<<<<<<< HEAD
            <p className="text-sm text-spotify-text-gray line-clamp-3">
              {episode.description}
            </p>
=======
            <p className="text-sm text-spotify-text-gray line-clamp-3">{episode.description}</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          )}
        </div>
      </div>

      {/* Playback Controls */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 w-full mb-2">
          <span className="text-xs text-spotify-text-gray w-10 text-right">
            {formatDuration((progress / 100) * episode.duration * 1000)}
          </span>
          <div className="flex-1 h-1 bg-spotify-text-gray/30 rounded-full cursor-pointer relative">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-spotify-text-gray w-10">
            {formatDuration(episode.duration * 1000)}
          </span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="text-spotify-text-gray hover:text-white transition-colors">
            <SkipBack size={20} />
          </button>
          <PlayButton
            isPlaying={isPlaying}
            onClick={() => setIsPlaying(!isPlaying)}
            size="md"
          />
          <button className="text-spotify-text-gray hover:text-white transition-colors">
            <SkipForward size={20} />
          </button>
        </div>

        {/* Podcast-specific Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {/* Playback Speed */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-spotify-text-gray">Speed:</span>
            <div className="flex gap-1">
              {speedOptions.map((speed) => (
                <button
                  key={speed}
                  onClick={() => onSpeedChange?.(speed)}
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium transition-colors",
                    playbackSpeed === speed
                      ? "bg-white text-black"
<<<<<<< HEAD
                      : "bg-spotify-dark-gray text-spotify-text-gray hover:text-white",
=======
                      : "bg-spotify-dark-gray text-spotify-text-gray hover:text-white"
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  )}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>

          {/* Skip Silence */}
          {onSkipSilence && (
            <button
              onClick={() => onSkipSilence(!skipSilence)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                skipSilence
                  ? "bg-white text-black"
<<<<<<< HEAD
                  : "bg-spotify-dark-gray text-spotify-text-gray hover:text-white",
=======
                  : "bg-spotify-dark-gray text-spotify-text-gray hover:text-white"
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              )}
            >
              Skip Silence
            </button>
          )}

          {/* Sleep Timer */}
          <div className="relative">
            <button
              onClick={() => setShowSleepTimer(!showSleepTimer)}
              className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-spotify-dark-gray text-spotify-text-gray hover:text-white transition-colors"
            >
              <Timer size={14} />
<<<<<<< HEAD
              {sleepTimer ? `${sleepTimer}m` : "Sleep"}
=======
              {sleepTimer ? `${sleepTimer}m` : 'Sleep'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            </button>
            {showSleepTimer && (
              <div className="absolute right-0 bottom-full mb-2 bg-spotify-dark-gray rounded-lg shadow-lg p-2 min-w-32">
                {timerOptions.map((minutes) => (
                  <button
                    key={minutes}
                    onClick={() => {
                      onSleepTimerChange?.(minutes);
                      setShowSleepTimer(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded transition-colors"
                  >
                    {minutes} minutes
                  </button>
                ))}
                {sleepTimer && (
                  <button
                    onClick={() => {
                      onSleepTimerChange?.(0);
                      setShowSleepTimer(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded transition-colors text-red-400"
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
