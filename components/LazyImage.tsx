<<<<<<< HEAD
"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * LazyImage Component - Optimized image with lazy loading and placeholder
 *
=======
'use client';

import React, { useState, useRef, useEffect, forwardRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * LazyImage Component - Optimized image with lazy loading and placeholder
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Design System Specifications:
 * - Lazy loads images using Intersection Observer
 * - Shows placeholder/skeleton while loading
 * - Blur placeholder support
 * - Automatic Next.js Image optimization
 * - Fallback handling
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * @example
 * ```tsx
 * <LazyImage
 *   src="/album.jpg"
 *   alt="Album cover"
 *   width={300}
 *   height={300}
 *   placeholder="blur"
 *   blurDataURL={blurDataUrl}
 * />
 * ```
 */

export interface LazyImageProps {
  /**
   * Image source URL
   */
  src: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Alt text (required for accessibility)
   */
  alt: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Image width
   */
  width: number;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Image height
   */
  height: number;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Placeholder strategy
   * @default 'empty'
   */
<<<<<<< HEAD
  placeholder?: "empty" | "blur" | "skeleton";

=======
  placeholder?: 'empty' | 'blur' | 'skeleton';
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Blur data URL (for placeholder="blur")
   */
  blurDataURL?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Image className
   */
  className?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Container className
   */
  containerClassName?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Aspect ratio (e.g., "1:1", "16:9")
   */
  aspectRatio?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Object fit behavior
   * @default 'cover'
   */
<<<<<<< HEAD
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";

=======
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Fallback image source (if main image fails)
   */
  fallback?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Priority loading (load immediately, don't lazy load)
   * @default false
   */
  priority?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Image sizes for responsive loading
   */
  sizes?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Loading callback
   */
  onLoad?: () => void;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Error callback
   */
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
<<<<<<< HEAD
  placeholder = "empty",
=======
  placeholder = 'empty',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  blurDataURL,
  className,
  containerClassName,
  aspectRatio,
<<<<<<< HEAD
  objectFit = "cover",
=======
  objectFit = 'cover',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  fallback,
  priority = false,
  sizes,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsLoading(false);
      return;
    }
<<<<<<< HEAD

    const img = imgRef.current;
    if (!img) return;

=======
    
    const img = imgRef.current;
    if (!img) return;
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoading(false);
            observer.disconnect();
          }
        });
      },
      {
<<<<<<< HEAD
        rootMargin: "50px", // Start loading 50px before visible
      },
    );

    observer.observe(img);

=======
        rootMargin: '50px', // Start loading 50px before visible
      }
    );
    
    observer.observe(img);
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return () => {
      observer.disconnect();
    };
  }, [priority]);
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const handleError = () => {
    if (fallback && imageSrc !== fallback) {
      setImageSrc(fallback);
      setHasError(false);
    } else {
      setHasError(true);
    }
    onError?.();
  };
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };
<<<<<<< HEAD

  // Aspect ratio calculation
  const aspectRatioStyle = aspectRatio
    ? {
        aspectRatio: aspectRatio.replace(":", "/"),
      }
    : {};

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        containerClassName,
        isLoading &&
          placeholder === "skeleton" &&
          "bg-spotify-light-gray animate-pulse",
=======
  
  // Aspect ratio calculation
  const aspectRatioStyle = aspectRatio
    ? {
        aspectRatio: aspectRatio.replace(':', '/'),
      }
    : {};
  
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        containerClassName,
        isLoading && placeholder === 'skeleton' && 'bg-spotify-light-gray animate-pulse'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      )}
      style={{
        width,
        height,
        ...aspectRatioStyle,
      }}
    >
      {/* Placeholder/Skeleton */}
<<<<<<< HEAD
      {isLoading && placeholder === "skeleton" && (
        <div className="absolute inset-0 bg-gradient-to-r from-spotify-light-gray via-spotify-dark-gray/50 to-spotify-light-gray animate-pulse" />
      )}

=======
      {isLoading && placeholder === 'skeleton' && (
        <div className="absolute inset-0 bg-gradient-to-r from-spotify-light-gray via-spotify-dark-gray/50 to-spotify-light-gray animate-pulse" />
      )}
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      {/* Image */}
      <Image
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
<<<<<<< HEAD
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          `object-${objectFit}`,
          hasError && "opacity-50",
          className,
        )}
        placeholder={placeholder === "blur" && blurDataURL ? "blur" : "empty"}
        blurDataURL={placeholder === "blur" ? blurDataURL : undefined}
=======
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          `object-${objectFit}`,
          hasError && 'opacity-50',
          className
        )}
        placeholder={placeholder === 'blur' && blurDataURL ? 'blur' : 'empty'}
        blurDataURL={placeholder === 'blur' ? blurDataURL : undefined}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        priority={priority}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
<<<<<<< HEAD
        loading={priority ? undefined : "lazy"}
      />

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-spotify-light-gray">
          <span className="text-xs text-spotify-text-gray">
            Image unavailable
          </span>
=======
        loading={priority ? undefined : 'lazy'}
      />
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-spotify-light-gray">
          <span className="text-xs text-spotify-text-gray">Image unavailable</span>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
LazyImage.displayName = "LazyImage";
=======
LazyImage.displayName = 'LazyImage';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default LazyImage;
