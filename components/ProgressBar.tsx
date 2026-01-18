'use client';

import { useState, useRef, useEffect } from 'react';
import { formatDuration } from '@/lib/utils';

interface ProgressBarProps {
  progress: number; // 0-100
  duration: number; // milliseconds
  currentTime: number; // milliseconds
  onSeek: (position: number) => void;
}

export default function ProgressBar({ progress, duration, currentTime, onSeek }: ProgressBarProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    handleSeek(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const progressPercent = (x / rect.width) * 100;
      setHoverProgress(progressPercent);
    }
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setHoverProgress(null);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const progressPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const newPosition = (progressPercent / 100) * duration;
      onSeek(newPosition);
    }
  };

  // Handle document-level mouse events for smooth dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (barRef.current) {
        const rect = barRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const progressPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        const newPosition = (progressPercent / 100) * duration;
        onSeek(newPosition);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, duration, onSeek]);

  return (
    <div className="flex items-center gap-2 w-full group">
      <span className="text-xs text-spotify-text-gray w-10 text-right">
        {formatDuration(currentTime)}
      </span>
      <div
        ref={barRef}
        className="flex-1 h-1 bg-spotify-text-gray/30 rounded-full cursor-pointer relative group"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseLeave}
      >
        <div
          className="h-full bg-white rounded-full transition-all group-hover:bg-spotify-green"
          style={{ width: `${progress}%` }}
        />
        {hoverProgress !== null && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `calc(${hoverProgress}% - 6px)` }}
          />
        )}
      </div>
      <span className="text-xs text-spotify-text-gray w-10">
        {formatDuration(duration)}
      </span>
    </div>
  );
}
