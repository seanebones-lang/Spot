'use client';

import { ReactNode, useCallback } from 'react';
import { cn } from '@/lib/utils';

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
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !active) {
      e.currentTarget.style.color = '#FFFFFF';
    }
  }, [disabled, active]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!active) {
      e.currentTarget.style.color = '#B3B3B3';
    }
  }, [active]);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      title={title || ariaLabel}
      className={cn(
        'bg-transparent border-none transition-colors duration-200 p-1',
        'flex items-center justify-center',
        'text-spotify-text-gray hover:text-white',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        active && 'text-spotify-green',
        className
      )}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        color: active ? '#1DB954' : '#B3B3B3',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
