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
  const [dragProgress, setDragProgress] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    handleSeek(e);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleSeekTouch(e.touches[0]);
    }
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

  const handleSeekTouch = (touch: Touch) => {
    if (barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const progressPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const newPosition = (progressPercent / 100) * duration;
      onSeek(newPosition);
    }
  };

  // Handle document-level mouse and touch events for smooth dragging
  useEffect(() => {
    if (!isDragging) {
      setDragProgress(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (barRef.current) {
        const rect = barRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const progressPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setDragProgress(progressPercent);
        const newPosition = (progressPercent / 100) * duration;
        onSeek(newPosition);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (barRef.current && e.touches.length > 0) {
        const rect = barRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const progressPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setDragProgress(progressPercent);
        const newPosition = (progressPercent / 100) * duration;
        onSeek(newPosition);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragProgress(null);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      setDragProgress(null);
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
  }, [isDragging, duration, onSeek]);

  return (
    <div className="flex items-center gap-2 w-full group">
      <span className="text-xs text-spotify-text-gray w-10 text-right">
        {formatDuration(currentTime)}
      </span>
      <div
        ref={barRef}
        className="flex-1 h-1 bg-spotify-text-gray/30 rounded-full cursor-pointer relative group touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseLeave}
        onTouchStart={handleTouchStart}
        style={{ touchAction: 'none' }}
      >
        <div
          className="h-full bg-white rounded-full transition-all group-hover:bg-spotify-green"
          style={{ 
            width: `${isDragging && dragProgress !== null ? dragProgress : progress}%`,
            transition: isDragging ? 'none' : 'width 100ms ease-out, background-color 200ms ease-out',
            willChange: isDragging ? 'width' : 'auto'
          }}
        />
        {((hoverProgress !== null && !isDragging) || (dragProgress !== null && isDragging)) && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
            style={{ 
              left: `clamp(0px, calc(${(dragProgress !== null ? dragProgress : hoverProgress || 0)}% - 6px), calc(100% - 12px))`,
              opacity: isDragging ? 1 : 0.8,
              transform: isDragging ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)',
              transition: isDragging ? 'left 0ms, opacity 0ms, transform 150ms cubic-bezier(0.3, 0, 0.1, 1)' : 'left 50ms ease-out, opacity 200ms ease-out, transform 200ms cubic-bezier(0.3, 0, 0.1, 1)',
              willChange: isDragging ? 'left, transform' : 'opacity, transform'
            }}
            onMouseEnter={(e) => {
              if (!isDragging) {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isDragging) {
                e.currentTarget.style.opacity = '0.8';
                e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
              }
            }}
          />
        )}
      </div>
      <span className="text-xs text-spotify-text-gray w-10">
        {formatDuration(duration)}
      </span>
    </div>
  );
}
