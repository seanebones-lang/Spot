<<<<<<< HEAD
"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Skeleton Component - Loading placeholder with shimmer animation
 *
=======
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Skeleton Component - Loading placeholder with shimmer animation
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Design System Specifications:
 * - Shimmer animation matching Spotify's subtle gray shimmer
 * - Variants: text, circle, rectangle, card
 * - Sizes: sm, md, lg
 * - Accessibility: aria-busy, aria-live="polite"
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * @example
 * ```tsx
 * <Skeleton variant="text" size="md" />
 * <Skeleton variant="circle" size="lg" />
 * <Skeleton variant="card" />
 * ```
 */

<<<<<<< HEAD
export type SkeletonVariant = "text" | "circle" | "rectangle" | "card";
export type SkeletonSize = "sm" | "md" | "lg";
=======
export type SkeletonVariant = 'text' | 'circle' | 'rectangle' | 'card';
export type SkeletonSize = 'sm' | 'md' | 'lg';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export interface SkeletonProps {
  /**
   * Visual variant
   * @default 'text'
   */
  variant?: SkeletonVariant;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Size (affects dimensions)
   * @default 'md'
   */
  size?: SkeletonSize;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Custom width (overrides size)
   */
  width?: string | number;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Custom height (overrides size)
   */
  height?: string | number;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Number of skeleton items (for repeated skeletons)
   * @default 1
   */
  count?: number;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Container className
   */
  className?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Show shimmer animation
   * @default true
   */
  animate?: boolean;
}

/**
 * Base Skeleton Element
 */
<<<<<<< HEAD
const SkeletonElement: React.FC<Omit<SkeletonProps, "count">> = ({
  variant = "text",
  size = "md",
=======
const SkeletonElement: React.FC<Omit<SkeletonProps, 'count'>> = ({
  variant = 'text',
  size = 'md',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  width,
  height,
  className,
  animate = true,
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
<<<<<<< HEAD
      text: { width: "60%", height: "12px" },
      circle: { width: "32px", height: "32px" },
      rectangle: { width: "100%", height: "80px" },
      card: { width: "100%", height: "200px" },
    },
    md: {
      text: { width: "80%", height: "16px" },
      circle: { width: "48px", height: "48px" },
      rectangle: { width: "100%", height: "120px" },
      card: { width: "100%", height: "240px" },
    },
    lg: {
      text: { width: "100%", height: "20px" },
      circle: { width: "64px", height: "64px" },
      rectangle: { width: "100%", height: "160px" },
      card: { width: "100%", height: "320px" },
=======
      text: { width: '60%', height: '12px' },
      circle: { width: '32px', height: '32px' },
      rectangle: { width: '100%', height: '80px' },
      card: { width: '100%', height: '200px' },
    },
    md: {
      text: { width: '80%', height: '16px' },
      circle: { width: '48px', height: '48px' },
      rectangle: { width: '100%', height: '120px' },
      card: { width: '100%', height: '240px' },
    },
    lg: {
      text: { width: '100%', height: '20px' },
      circle: { width: '64px', height: '64px' },
      rectangle: { width: '100%', height: '160px' },
      card: { width: '100%', height: '320px' },
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    },
  };

  const defaultDimensions = sizeConfig[size][variant];
  const finalWidth = width || defaultDimensions.width;
  const finalHeight = height || defaultDimensions.height;

  return (
    <div
      className={cn(
<<<<<<< HEAD
        "bg-spotify-light-gray rounded",
        // Variant-specific styles
        variant === "circle" && "rounded-full",
        variant === "card" && "rounded-lg",
        variant === "rectangle" && "rounded-lg",
        variant === "text" && "rounded",
        // Animation
        animate && "animate-pulse",
        className,
      )}
      style={{
        width: typeof finalWidth === "number" ? `${finalWidth}px` : finalWidth,
        height:
          typeof finalHeight === "number" ? `${finalHeight}px` : finalHeight,
=======
        'bg-spotify-light-gray rounded',
        // Variant-specific styles
        variant === 'circle' && 'rounded-full',
        variant === 'card' && 'rounded-lg',
        variant === 'rectangle' && 'rounded-lg',
        variant === 'text' && 'rounded',
        // Animation
        animate && 'animate-pulse',
        className
      )}
      style={{
        width: typeof finalWidth === 'number' ? `${finalWidth}px` : finalWidth,
        height: typeof finalHeight === 'number' ? `${finalHeight}px` : finalHeight,
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      }}
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      {/* Shimmer overlay */}
      {animate && (
        <div
          className={cn(
<<<<<<< HEAD
            "h-full w-full bg-gradient-to-r",
            "from-spotify-light-gray",
            "via-spotify-dark-gray/50",
            "to-spotify-light-gray",
            "animate-[shimmer_1.5s_ease-in-out_infinite]",
          )}
          style={{
            backgroundSize: "200% 100%",
=======
            'h-full w-full bg-gradient-to-r',
            'from-spotify-light-gray',
            'via-spotify-dark-gray/50',
            'to-spotify-light-gray',
            'animate-[shimmer_1.5s_ease-in-out_infinite]'
          )}
          style={{
            backgroundSize: '200% 100%',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        />
      )}
    </div>
  );
};

/**
 * Main Skeleton Component
 */
const Skeleton: React.FC<SkeletonProps> = ({
  count = 1,
<<<<<<< HEAD
  variant = "text",
=======
  variant = 'text',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  className,
  ...props
}) => {
  // For card variant, render structured card skeleton
<<<<<<< HEAD
  if (variant === "card" && count === 1) {
=======
  if (variant === 'card' && count === 1) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return <SkeletonCard className={className} {...props} />;
  }

  // For multiple items, render in container
  if (count > 1) {
    return (
<<<<<<< HEAD
      <div className={cn("flex flex-col gap-2", className)}>
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonElement key={index} variant={variant} {...props} />
=======
      <div className={cn('flex flex-col gap-2', className)}>
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonElement
            key={index}
            variant={variant}
            {...props}
          />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        ))}
      </div>
    );
  }

  // Single item
  return <SkeletonElement variant={variant} className={className} {...props} />;
};

/**
 * Skeleton Card - Structured card placeholder
 */
<<<<<<< HEAD
export interface SkeletonCardProps extends Omit<
  SkeletonProps,
  "variant" | "count"
> {
=======
export interface SkeletonCardProps extends Omit<SkeletonProps, 'variant' | 'count'> {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Show image placeholder
   * @default true
   */
  showImage?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Show title placeholder
   * @default true
   */
  showTitle?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Show description placeholder
   * @default true
   */
  showDescription?: boolean;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
<<<<<<< HEAD
  size = "md",
=======
  size = 'md',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  showImage = true,
  showTitle = true,
  showDescription = true,
  className,
  animate = true,
}) => {
  const cardSizeConfig = {
<<<<<<< HEAD
    sm: { image: "w-16 h-16", titleWidth: "60%", descWidth: "80%" },
    md: { image: "w-32 h-32", titleWidth: "70%", descWidth: "90%" },
    lg: { image: "w-48 h-48", titleWidth: "80%", descWidth: "100%" },
=======
    sm: { image: 'w-16 h-16', titleWidth: '60%', descWidth: '80%' },
    md: { image: 'w-32 h-32', titleWidth: '70%', descWidth: '90%' },
    lg: { image: 'w-48 h-48', titleWidth: '80%', descWidth: '100%' },
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  };

  const config = cardSizeConfig[size];

  return (
    <div
      className={cn(
<<<<<<< HEAD
        "bg-spotify-light-gray rounded-lg p-4",
        "flex flex-col gap-3",
        animate && "animate-pulse",
        className,
=======
        'bg-spotify-light-gray rounded-lg p-4',
        'flex flex-col gap-3',
        animate && 'animate-pulse',
        className
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      )}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      {showImage && (
        <SkeletonElement
          variant="rectangle"
          width="100%"
<<<<<<< HEAD
          height={config.image.replace("w-", "").replace("h-", "")}
=======
          height={config.image.replace('w-', '').replace('h-', '')}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          className="rounded-lg"
          animate={animate}
        />
      )}
      {showTitle && (
        <SkeletonElement
          variant="text"
          width={config.titleWidth}
          height="16px"
          animate={animate}
        />
      )}
      {showDescription && (
        <SkeletonElement
          variant="text"
          width={config.descWidth}
          height="12px"
          animate={animate}
        />
      )}
    </div>
  );
};

/**
 * Skeleton List - For list items
 */
<<<<<<< HEAD
export interface SkeletonListProps extends Omit<SkeletonProps, "variant"> {
=======
export interface SkeletonListProps extends Omit<SkeletonProps, 'variant'> {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Number of list items
   * @default 5
   */
  count?: number;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Show avatar/circle icon
   * @default false
   */
  showAvatar?: boolean;
}

const SkeletonList: React.FC<SkeletonListProps> = ({
  count = 5,
  showAvatar = false,
<<<<<<< HEAD
  size = "md",
  className,
}) => {
  return (
    <div
      className={cn("flex flex-col gap-3", className)}
      role="status"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          {showAvatar && <SkeletonElement variant="circle" size={size} />}
=======
  size = 'md',
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-3', className)} role="status" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          {showAvatar && (
            <SkeletonElement
              variant="circle"
              size={size}
            />
          )}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          <div className="flex-1 flex flex-col gap-2">
            <SkeletonElement variant="text" width="60%" size={size} />
            <SkeletonElement variant="text" width="40%" size="sm" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Shimmer animation is defined in globals.css

// Export components
<<<<<<< HEAD
Skeleton.displayName = "Skeleton";
SkeletonCard.displayName = "SkeletonCard";
SkeletonList.displayName = "SkeletonList";
=======
Skeleton.displayName = 'Skeleton';
SkeletonCard.displayName = 'SkeletonCard';
SkeletonList.displayName = 'SkeletonList';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export { SkeletonCard, SkeletonList };
export default Skeleton;
