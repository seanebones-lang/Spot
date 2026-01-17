'use client';

import { useEffect, useState } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import PlayButton from './PlayButton';
import { Shuffle, SkipBack, SkipForward, Repeat, X } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

export default function PictureInPicturePlayer() {
  const [pipWindow, setPipWindow] = useState<Window | null>(null);
  const { currentTrack, isPlaying, progress, volume, shuffle, repeat, setIsPlaying, playNext, playPrevious } = usePlayerStore();

  const openPiP = async () => {
    if (!('documentPictureInPicture' in window)) {
      alert('Picture-in-Picture API is not supported in this browser');
      return;
    }

    try {
      const pipWindow = await (window as any).documentPictureInPicture.requestWindow({
        width: 400,
        height: 200,
      });

      setPipWindow(pipWindow);

      // Copy styles
      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
          const style = document.createElement('style');
          style.textContent = cssRules;
          pipWindow.document.head.appendChild(style);
        } catch (e) {
          // Cross-origin stylesheets can't be accessed
        }
      });

      // Create player UI in PiP window
      pipWindow.document.body.innerHTML = `
        <div style="background: #121212; color: white; padding: 16px; height: 100%; display: flex; flex-direction: column; font-family: system-ui;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div style="font-weight: bold;">EmPulse Music</div>
            <button id="close-pip" style="background: transparent; border: none; color: white; cursor: pointer;">✕</button>
          </div>
          <div style="display: flex; gap: 12px; align-items: center; flex: 1;">
            <div style="width: 64px; height: 64px; background: #282828; border-radius: 4px; flex-shrink: 0;">
              ${currentTrack?.coverArt ? `<img src="${currentTrack.coverArt}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" />` : ''}
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-weight: 600; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${currentTrack?.name || 'No track playing'}</div>
              <div style="font-size: 12px; color: #b3b3b3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${currentTrack?.artist || ''}</div>
            </div>
          </div>
          <div style="display: flex; gap: 8px; justify-content: center; align-items: center; margin-top: 12px;">
            <button id="shuffle" style="background: transparent; border: none; color: ${shuffle ? '#1DB954' : '#b3b3b3'}; cursor: pointer; padding: 4px;">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.927 9.85A2.75 2.75 0 01.39 15.28H-.75a.75.75 0 000 1.5h1.14a2.75 2.75 0 002.873-1.94L8.9 5.787l1.735 2.464a.75.75 0 001.06-.106l3-4.5a.75.75 0 000-.812l-3-4.5a.75.75 0 00-1.06-.106L9.515 4.25l-1.735-2.464a.75.75 0 00-1.06.106L4.75 6.53l-2.776 3.943A2.75 2.75 0 001.14 14H3.22l1.06-1.06L2.75 11.69l1.06-1.06 1.47 1.47 1.06-1.06-1.47-1.47L7.22 9.22l1.47 1.47 1.06-1.06-1.47-1.47 1.47-1.47 1.06-1.06z"/></svg>
            </button>
            <button id="prev" style="background: transparent; border: none; color: #b3b3b3; cursor: pointer; padding: 4px;">⏮</button>
            <button id="play-pause" style="background: #1DB954; border: none; color: black; cursor: pointer; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">${isPlaying ? '⏸' : '▶'}</button>
            <button id="next" style="background: transparent; border: none; color: #b3b3b3; cursor: pointer; padding: 4px;">⏭</button>
            <button id="repeat" style="background: transparent; border: none; color: ${repeat !== 'off' ? '#1DB954' : '#b3b3b3'}; cursor: pointer; padding: 4px;">🔁</button>
          </div>
        </div>
      `;

      // Attach event listeners
      pipWindow.document.getElementById('close-pip')?.addEventListener('click', () => {
        pipWindow.close();
      });

      pipWindow.document.getElementById('play-pause')?.addEventListener('click', () => {
        setIsPlaying(!isPlaying);
      });

      pipWindow.document.getElementById('prev')?.addEventListener('click', () => {
        playPrevious();
      });

      pipWindow.document.getElementById('next')?.addEventListener('click', () => {
        playNext();
      });

      pipWindow.addEventListener('pagehide', () => {
        setPipWindow(null);
      });
    } catch (error) {
      console.error('Failed to open Picture-in-Picture:', error);
    }
  };

  if (!currentTrack) return null;

  return (
    <button
      onClick={openPiP}
      className="text-spotify-text-gray hover:text-white transition-colors p-2"
      title="Pop out player"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M3.75 3.75v2.5h-2.5V2h4.25a.75.75 0 010 1.5H3.75zm8.5 0V2.75a.75.75 0 011.5 0v4.25a.75.75 0 01-.75.75h-4.25a.75.75 0 010-1.5h2.5v-2.5zm-8.5 8.5h-2.5v-2.5h2.5v2.5zm8.5 0v-2.5h2.5v4.25a.75.75 0 01-.75.75h-4.25a.75.75 0 010-1.5h2.5z"/>
      </svg>
    </button>
  );
}
