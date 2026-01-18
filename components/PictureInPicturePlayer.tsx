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

      // Create player UI in PiP window using safe DOM API (prevents XSS)
      // Clear body first
      pipWindow.document.body.innerHTML = '';
      pipWindow.document.body.style.margin = '0';
      pipWindow.document.body.style.padding = '0';

      // Container
      const container = pipWindow.document.createElement('div');
      container.style.cssText = 'background: #121212; color: white; padding: 16px; height: 100%; display: flex; flex-direction: column; font-family: system-ui;';

      // Header
      const header = pipWindow.document.createElement('div');
      header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;';
      
      const title = pipWindow.document.createElement('div');
      title.style.cssText = 'font-weight: bold;';
      title.textContent = 'EmPulse Music';
      
      const closeBtn = pipWindow.document.createElement('button');
      closeBtn.id = 'close-pip';
      closeBtn.style.cssText = 'background: transparent; border: none; color: white; cursor: pointer; font-size: 18px;';
      closeBtn.textContent = '✕';
      closeBtn.setAttribute('aria-label', 'Close Picture-in-Picture player');
      
      header.appendChild(title);
      header.appendChild(closeBtn);

      // Track info section
      const trackSection = pipWindow.document.createElement('div');
      trackSection.style.cssText = 'display: flex; gap: 12px; align-items: center; flex: 1;';

      // Cover art container with fallback
      const coverContainer = pipWindow.document.createElement('div');
      coverContainer.style.cssText = 'width: 64px; height: 64px; background: #282828; border-radius: 4px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;';
      
      const imgEl = pipWindow.document.createElement('img');
      if (currentTrack?.coverArt) {
        imgEl.src = currentTrack.coverArt;
        imgEl.alt = currentTrack?.name || 'Album art';
        imgEl.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 4px;';
        
        // Image error handling (Issue-4)
        imgEl.onerror = () => {
          imgEl.style.display = 'none';
          const fallback = pipWindow.document.createElement('div');
          fallback.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #282828;';
          fallback.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13M9 18l12-2M9 18l6-12m6 12l-6-12m-12 0v13m12-13v13"/></svg>';
          coverContainer.appendChild(fallback);
        };
        coverContainer.appendChild(imgEl);
      }

      // Track info text (safe textContent prevents XSS)
      const trackInfo = pipWindow.document.createElement('div');
      trackInfo.style.cssText = 'flex: 1; min-width: 0;';
      
      const trackName = pipWindow.document.createElement('div');
      trackName.style.cssText = 'font-weight: 600; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
      trackName.textContent = currentTrack?.name || 'No track playing'; // textContent auto-escapes XSS
      
      const artistName = pipWindow.document.createElement('div');
      artistName.style.cssText = 'font-size: 12px; color: #b3b3b3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
      artistName.textContent = currentTrack?.artist || ''; // textContent auto-escapes XSS
      
      trackInfo.appendChild(trackName);
      trackInfo.appendChild(artistName);
      trackSection.appendChild(coverContainer);
      trackSection.appendChild(trackInfo);

      // Controls
      const controls = pipWindow.document.createElement('div');
      controls.style.cssText = 'display: flex; gap: 8px; justify-content: center; align-items: center; margin-top: 12px;';

      // Shuffle button
      const shuffleBtn = pipWindow.document.createElement('button');
      shuffleBtn.id = 'shuffle';
      shuffleBtn.style.cssText = `background: transparent; border: none; color: ${shuffle ? '#1DB954' : '#b3b3b3'}; cursor: pointer; padding: 4px;`;
      shuffleBtn.setAttribute('aria-label', shuffle ? 'Shuffle on' : 'Shuffle off');
      shuffleBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.927 9.85A2.75 2.75 0 01.39 15.28H-.75a.75.75 0 000 1.5h1.14a2.75 2.75 0 002.873-1.94L8.9 5.787l1.735 2.464a.75.75 0 001.06-.106l3-4.5a.75.75 0 000-.812l-3-4.5a.75.75 0 00-1.06-.106L9.515 4.25l-1.735-2.464a.75.75 0 00-1.06.106L4.75 6.53l-2.776 3.943A2.75 2.75 0 001.14 14H3.22l1.06-1.06L2.75 11.69l1.06-1.06 1.47 1.47 1.06-1.06-1.47-1.47L7.22 9.22l1.47 1.47 1.06-1.06-1.47-1.47 1.47-1.47 1.06-1.06z"/></svg>';

      // Previous button
      const prevBtn = pipWindow.document.createElement('button');
      prevBtn.id = 'prev';
      prevBtn.style.cssText = 'background: transparent; border: none; color: #b3b3b3; cursor: pointer; padding: 4px; font-size: 16px;';
      prevBtn.textContent = '⏮';
      prevBtn.setAttribute('aria-label', 'Previous track');

      // Play/Pause button
      const playPauseBtn = pipWindow.document.createElement('button');
      playPauseBtn.id = 'play-pause';
      playPauseBtn.style.cssText = 'background: #1DB954; border: none; color: black; cursor: pointer; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px;';
      playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
      playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');

      // Next button
      const nextBtn = pipWindow.document.createElement('button');
      nextBtn.id = 'next';
      nextBtn.style.cssText = 'background: transparent; border: none; color: #b3b3b3; cursor: pointer; padding: 4px; font-size: 16px;';
      nextBtn.textContent = '⏭';
      nextBtn.setAttribute('aria-label', 'Next track');

      // Repeat button
      const repeatBtn = pipWindow.document.createElement('button');
      repeatBtn.id = 'repeat';
      repeatBtn.style.cssText = `background: transparent; border: none; color: ${repeat !== 'off' ? '#1DB954' : '#b3b3b3'}; cursor: pointer; padding: 4px; font-size: 16px;`;
      repeatBtn.textContent = '🔁';
      repeatBtn.setAttribute('aria-label', `Repeat ${repeat}`);

      controls.appendChild(shuffleBtn);
      controls.appendChild(prevBtn);
      controls.appendChild(playPauseBtn);
      controls.appendChild(nextBtn);
      controls.appendChild(repeatBtn);

      container.appendChild(header);
      container.appendChild(trackSection);
      container.appendChild(controls);
      pipWindow.document.body.appendChild(container);

      // Attach event listeners
      closeBtn.addEventListener('click', () => {
        pipWindow.close();
        setPipWindow(null);
      });

      playPauseBtn.addEventListener('click', () => {
        setIsPlaying(!isPlaying);
        // Update button text
        playPauseBtn.textContent = !isPlaying ? '⏸' : '▶';
        playPauseBtn.setAttribute('aria-label', !isPlaying ? 'Pause' : 'Play');
      });

      prevBtn.addEventListener('click', () => {
        playPrevious();
      });

      nextBtn.addEventListener('click', () => {
        playNext();
      });

      // Proper cleanup on window close (Issue-7: memory leak fix)
      const cleanup = () => {
        // Remove all event listeners
        closeBtn.removeEventListener('click', cleanup);
        playPauseBtn.removeEventListener('click', cleanup);
        prevBtn.removeEventListener('click', cleanup);
        nextBtn.removeEventListener('click', cleanup);
        pipWindow.removeEventListener('pagehide', cleanup);
        
        setPipWindow(null);
        if (!pipWindow.closed) {
          pipWindow.close();
        }
      };

      pipWindow.addEventListener('pagehide', cleanup);
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
