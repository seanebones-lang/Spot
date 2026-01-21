<<<<<<< HEAD
"use client";

import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
=======
'use client';

import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: (e?: React.MouseEvent) => void;
<<<<<<< HEAD
  size?: "sm" | "md" | "lg";
=======
  size?: 'sm' | 'md' | 'lg';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  className?: string;
  disabled?: boolean;
}

<<<<<<< HEAD
export default function PlayButton({
  isPlaying,
  onClick,
  size = "md",
  className,
  disabled = false,
}: PlayButtonProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
=======
export default function PlayButton({ isPlaying, onClick, size = 'md', className, disabled = false }: PlayButtonProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
<<<<<<< HEAD
      aria-label={isPlaying ? "Pause" : "Play"}
=======
      aria-label={isPlaying ? 'Pause' : 'Play'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      aria-pressed={isPlaying}
      className={cn(
        "bg-spotify-green hover:scale-105 rounded-full flex items-center justify-center transition-transform shadow-lg gpu-accelerated",
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
<<<<<<< HEAD
        className,
      )}
      style={{
        transition: "transform 150ms cubic-bezier(0.3, 0, 0.1, 1)",
        willChange: "transform",
      }}
    >
      {isPlaying ? (
        <Pause
          size={size === "sm" ? 16 : size === "md" ? 24 : 32}
          className="text-black ml-0.5"
        />
      ) : (
        <Play
          size={size === "sm" ? 16 : size === "md" ? 24 : 32}
          className="text-black ml-1"
        />
=======
        className
      )}
      style={{
        transition: 'transform 150ms cubic-bezier(0.3, 0, 0.1, 1)',
        willChange: 'transform'
      }}
    >
      {isPlaying ? (
        <Pause size={size === 'sm' ? 16 : size === 'md' ? 24 : 32} className="text-black ml-0.5" />
      ) : (
        <Play size={size === 'sm' ? 16 : size === 'md' ? 24 : 32} className="text-black ml-1" />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      )}
    </button>
  );
}
