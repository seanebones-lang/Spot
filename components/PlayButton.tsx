'use client';

import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: (e?: React.MouseEvent) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function PlayButton({ isPlaying, onClick, size = 'md', className }: PlayButtonProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-spotify-green hover:scale-105 rounded-full flex items-center justify-center transition-transform shadow-lg",
        sizes[size],
        className
      )}
    >
      {isPlaying ? (
        <Pause size={size === 'sm' ? 16 : size === 'md' ? 24 : 32} className="text-black ml-0.5" />
      ) : (
        <Play size={size === 'sm' ? 16 : size === 'md' ? 24 : 32} className="text-black ml-1" />
      )}
    </button>
  );
}
