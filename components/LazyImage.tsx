'use client';

import React, { useState, useRef, useEffect, forwardRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * LazyImage Component - Optimized image with lazy loading and placeholder
 * 
 * Design System Specifications:
 * - Lazy loads images using Intersection Observer
 * - Shows placeholder/skeleton while loading
 * - Blur placeholder support
 * - Automatic Next.js Image optimization
 * - Fallback handling
 * 
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
  
  /**
   * Alt text (required for accessibility)
   */
  alt: string;
  
  /**
   * Image width
   */
  width: number;
  
  /**
   * Image height
   */
  height: number;
  
  /**
   * Placeholder strategy
   * @default 'empty'
   */
  placeholder?: 'empty' | 'blur' | 'skeleton';
  
  /**
   * Blur data URL (for placeholder="blur")
   */
  blurDataURL?: string;
  
  /**
   * Image className
   */
  className?: string;
  
  /**
   * Container className
   */
  containerClassName?: string;
  
  /**
   * Aspect ratio (e.g., "1:1", "16:9")
   */
  aspectRatio?: string;
  
  /**
   * Object fit behavior
   * @default 'cover'
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  
  /**
   * Fallback image source (if main image fails)
   */
  fallback?: string;
  
  /**
   * Priority loading (load immediately, don't lazy load)
   * @default false
   */
  priority?: boolean;
  
  /**
   * Image sizes for responsive loading
   */
  sizes?: string;
  
  /**
   * Loading callback
   */
  onLoad?: () => void;
  
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
  placeholder = 'empty',
  blurDataURL,
  className,
  containerClassName,
  aspectRatio,
  objectFit = 'cover',
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
  
  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsLoading(false);
      return;
    }
    
    const img = imgRef.current;
    if (!img) return;
    
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
        rootMargin: '50px', // Start loading 50px before visible
      }
    );
    
    observer.observe(img);
    
    return () => {
      observer.disconnect();
    };
  }, [priority]);
  
  const handleError = () => {
    if (fallback && imageSrc !== fallback) {
      setImageSrc(fallback);
      setHasError(false);
    } else {
      setHasError(true);
    }
    onError?.();
  };
  
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };
  
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
      )}
      style={{
        width,
        height,
        ...aspectRatioStyle,
      }}
    >
      {/* Placeholder/Skeleton */}
      {isLoading && placeholder === 'skeleton' && (
        <div className="absolute inset-0 bg-gradient-to-r from-spotify-light-gray via-spotify-dark-gray/50 to-spotify-light-gray animate-pulse" />
      )}
      
      {/* Image */}
      <Image
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          `object-${objectFit}`,
          hasError && 'opacity-50',
          className
        )}
        placeholder={placeholder === 'blur' && blurDataURL ? 'blur' : 'empty'}
        blurDataURL={placeholder === 'blur' ? blurDataURL : undefined}
        priority={priority}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? undefined : 'lazy'}
      />
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-spotify-light-gray">
          <span className="text-xs text-spotify-text-gray">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

LazyImage.displayName = 'LazyImage';

export default LazyImage;
