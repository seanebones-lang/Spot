'use client';

import { useState } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import { cn } from '@/lib/utils';

export default function PlaybackSettingsPage() {
  const {
    crossfade,
    crossfadeDuration,
    gaplessPlayback,
    normalizeVolume,
    setCrossfade,
    setCrossfadeDuration,
    setGaplessPlayback,
    setNormalizeVolume,
  } = usePlayerStore();

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Playback</h1>
      <div className="max-w-2xl space-y-6">
        {/* Audio Quality */}
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Audio Quality</h2>
          <select className="w-full bg-spotify-dark-gray text-white px-4 py-2 rounded">
            <option>Normal (160 kbps)</option>
            <option>High (320 kbps)</option>
            <option>Very High (Lossless)</option>
          </select>
          <p className="text-sm text-spotify-text-gray mt-2">
            Higher quality uses more data. Lossless requires Premium subscription.
          </p>
        </div>

        {/* Crossfade */}
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Crossfade</h2>
              <p className="text-sm text-spotify-text-gray mt-1">
                Overlap the end of the current song with the beginning of the next one
              </p>
            </div>
            <button
              onClick={() => setCrossfade(!crossfade)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                crossfade ? "bg-spotify-green" : "bg-spotify-text-gray"
              )}
            >
              <div className={cn(
                "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform",
                crossfade ? "translate-x-6" : "translate-x-0.5"
              )} />
            </button>
          </div>
          {crossfade && (
            <div className="mt-4">
              <input
                type="range"
                min="0"
                max="12"
                value={crossfadeDuration}
                onChange={(e) => setCrossfadeDuration(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-spotify-text-gray mt-2">
                <span>0s</span>
                <span>{crossfadeDuration}s</span>
                <span>12s</span>
              </div>
            </div>
          )}
        </div>

        {/* Gapless Playback */}
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Gapless Playback</h2>
              <p className="text-sm text-spotify-text-gray mt-1">
                Automatically continue playing songs without gaps
              </p>
            </div>
            <button
              onClick={() => setGaplessPlayback(!gaplessPlayback)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                gaplessPlayback ? "bg-spotify-green" : "bg-spotify-text-gray"
              )}
            >
              <div className={cn(
                "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform",
                gaplessPlayback ? "translate-x-6" : "translate-x-0.5"
              )} />
            </button>
          </div>
        </div>

        {/* Normalize Volume */}
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Normalize Volume</h2>
              <p className="text-sm text-spotify-text-gray mt-1">
                Set the same volume level for all tracks
              </p>
            </div>
            <button
              onClick={() => setNormalizeVolume(!normalizeVolume)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                normalizeVolume ? "bg-spotify-green" : "bg-spotify-text-gray"
              )}
            >
              <div className={cn(
                "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform",
                normalizeVolume ? "translate-x-6" : "translate-x-0.5"
              )} />
            </button>
          </div>
        </div>

        {/* Explicit Content */}
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Allow Explicit Content</h2>
              <p className="text-sm text-spotify-text-gray mt-1">
                Play songs with explicit content warnings
              </p>
            </div>
            <button
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative bg-spotify-green"
              )}
            >
              <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 translate-x-6 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
