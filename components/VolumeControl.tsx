'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number; // 0-100
  onVolumeChange: (volume: number) => void;
}

export default function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  const [isDragging, setIsDragging] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const volumePercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      onVolumeChange(volumePercent);
    }
  };

  const handleSeekTouch = (touch: React.Touch) => {
    if (barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const volumePercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      onVolumeChange(volumePercent);
    }
  };

  const handleMute = () => {
    onVolumeChange(volume > 0 ? 0 : 50);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleSeekTouch(e.touches[0]);
    }
  };

  // Handle document-level mouse and touch events for smooth dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (barRef.current) {
        const rect = barRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const volumePercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        onVolumeChange(volumePercent);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (barRef.current && e.touches.length > 0) {
        const rect = barRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const volumePercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        onVolumeChange(volumePercent);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [isDragging, onVolumeChange]);

  return (
    <div className="flex items-center gap-2 w-32">
      <button
        onClick={handleMute}
        aria-label={volume === 0 ? 'Unmute' : 'Mute'}
        aria-pressed={volume === 0}
        className="text-spotify-text-gray hover:text-white transition-colors"
      >
        {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <div
        ref={barRef}
        role="slider"
        aria-label="Volume"
        aria-valuenow={volume}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-orientation="horizontal"
        className="flex-1 h-1 bg-spotify-text-gray/30 rounded-full cursor-pointer relative group touch-none"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleSeek(e);
        }}
        onTouchStart={handleTouchStart}
        style={{ touchAction: 'none' }}
      >
        <div
          className="h-full bg-white rounded-full transition-all group-hover:bg-spotify-green"
          style={{ width: `${volume}%` }}
        />
      </div>
    </div>
  );
}
