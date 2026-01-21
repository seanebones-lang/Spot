<<<<<<< HEAD
"use client";

import { ReactNode, useCallback } from "react";
import { cn } from "@/lib/utils";
=======
'use client';

import { ReactNode, useCallback } from 'react';
import { cn } from '@/lib/utils';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface ControlButtonProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  ariaLabel: string;
  ariaPressed?: boolean;
  children: ReactNode;
  className?: string;
  title?: string;
}

/**
 * Reusable control button component for player controls
 * Provides consistent styling, hover states, and accessibility
 */
export default function ControlButton({
  onClick,
  disabled = false,
  active = false,
  ariaLabel,
  ariaPressed,
  children,
  className,
  title,
}: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      title={title || ariaLabel}
      className={cn(
<<<<<<< HEAD
        "bg-transparent border-none transition-colors duration-200 p-1",
        "flex items-center justify-center",
        "text-spotify-text-gray hover:text-white",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-black",
        active ? "text-spotify-green" : "text-spotify-text-gray",
        className,
=======
        'bg-transparent border-none transition-colors duration-200 p-1',
        'flex items-center justify-center',
        'text-spotify-text-gray hover:text-white',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-black',
        active ? 'text-spotify-green' : 'text-spotify-text-gray',
        className
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      )}
    >
      {children}
    </button>
  );
}
