'use client';

import React, { useState } from 'react';
import { Music } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src?: string; // Optional - shows fallback if undefined
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackIcon?: React.ReactNode;
}

/**
 * ImageWithFallback Component - Handles image loading errors gracefully
 * 
 * Replaces broken images with a placeholder instead of showing broken image icons.
 * 
 * @example
 * ```tsx
 * <ImageWithFallback
 *   src={track.coverArt}
 *   alt={track.name}
 *   className="w-full aspect-square object-cover rounded"
 * />
 * ```
 */
export default function ImageWithFallback({
  src,
  alt,
  className,
  style,
  fallbackIcon,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Show fallback immediately if no src provided
  if (!src || hasError) {
    return (
      <div
        className={cn(
          'w-full aspect-square bg-spotify-light-gray flex items-center justify-center rounded',
          className
        )}
        style={style}
        role="img"
        aria-label={alt || 'Image unavailable'}
      >
        {fallbackIcon || (
          <Music size={32} className="text-spotify-text-gray" />
        )}
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: '100%', height: '100%' }}>
      {isLoading && (
        <div
          className={cn(
            'w-full h-full bg-spotify-light-gray animate-pulse rounded absolute inset-0',
            className
          )}
          style={style}
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          className,
          isLoading && 'opacity-0',
          !isLoading && 'opacity-100 transition-opacity duration-300'
        )}
        style={style}
      />
    </div>
  );
}
