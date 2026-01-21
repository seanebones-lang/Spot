<<<<<<< HEAD
"use client";

import React, { useState } from "react";
import { Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps {
  src: string;
=======
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Music } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src?: string; // Optional - shows fallback if undefined
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  fallbackIcon?: React.ReactNode;
<<<<<<< HEAD
=======
  width?: number;
  height?: number;
  priority?: boolean; // For LCP images
  sizes?: string; // Responsive image sizes
  fill?: boolean; // Fill parent container
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}

/**
 * ImageWithFallback Component - Handles image loading errors gracefully
<<<<<<< HEAD
 *
 * Replaces broken images with a placeholder instead of showing broken image icons.
 *
=======
 * 
 * Replaces broken images with a placeholder instead of showing broken image icons.
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
=======
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  fill = false,
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

<<<<<<< HEAD
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  if (hasError) {
    return (
      <div
        className={cn(
          "w-full aspect-square bg-spotify-light-gray flex items-center justify-center rounded",
          className,
        )}
        style={style}
        role="img"
        aria-label={alt || "Image unavailable"}
      >
        {fallbackIcon || <Music size={32} className="text-spotify-text-gray" />}
=======
  // Show fallback immediately if no src provided or error occurred
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      </div>
    );
  }

<<<<<<< HEAD
  return (
    <div className="relative" style={{ width: "100%", height: "100%" }}>
      {isLoading && (
        <div
          className={cn(
            "w-full h-full bg-spotify-light-gray animate-pulse rounded absolute inset-0",
            className,
=======
  // Use Next.js Image for optimization
  if (fill) {
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
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            className,
            'object-cover rounded',
            isLoading && 'opacity-0',
            !isLoading && 'opacity-100 transition-opacity duration-300'
          )}
          style={style}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          onLoad={() => {
            setIsLoading(false);
            setHasError(false);
          }}
        />
      </div>
    );
  }

  // Use explicit width/height for better performance
  const imageWidth = width || 200;
  const imageHeight = height || 200;

  return (
    <div className="relative" style={{ width: '100%', height: '100%' }}>
      {isLoading && (
        <div
          className={cn(
            'w-full h-full bg-spotify-light-gray animate-pulse rounded absolute inset-0',
            className
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          )}
          style={style}
          aria-hidden="true"
        />
      )}
<<<<<<< HEAD
      <img
        src={src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          className,
          isLoading && "opacity-0",
          !isLoading && "opacity-100 transition-opacity duration-300",
        )}
        style={style}
=======
      <Image
        src={src}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        priority={priority}
        sizes={sizes}
        className={cn(
          className,
          'object-cover rounded w-full h-full',
          isLoading && 'opacity-0',
          !isLoading && 'opacity-100 transition-opacity duration-300'
        )}
        style={style}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        onLoad={() => {
          setIsLoading(false);
          setHasError(false);
        }}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      />
    </div>
  );
}
