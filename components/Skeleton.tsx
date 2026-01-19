"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Skeleton Component - Loading placeholder with shimmer animation
 *
 * Design System Specifications:
 * - Shimmer animation matching Spotify's subtle gray shimmer
 * - Variants: text, circle, rectangle, card
 * - Sizes: sm, md, lg
 * - Accessibility: aria-busy, aria-live="polite"
 *
 * @example
 * ```tsx
 * <Skeleton variant="text" size="md" />
 * <Skeleton variant="circle" size="lg" />
 * <Skeleton variant="card" />
 * ```
 */

export type SkeletonVariant = "text" | "circle" | "rectangle" | "card";
export type SkeletonSize = "sm" | "md" | "lg";

export interface SkeletonProps {
  /**
   * Visual variant
   * @default 'text'
   */
  variant?: SkeletonVariant;

  /**
   * Size (affects dimensions)
   * @default 'md'
   */
  size?: SkeletonSize;

  /**
   * Custom width (overrides size)
   */
  width?: string | number;

  /**
   * Custom height (overrides size)
   */
  height?: string | number;

  /**
   * Number of skeleton items (for repeated skeletons)
   * @default 1
   */
  count?: number;

  /**
   * Container className
   */
  className?: string;

  /**
   * Show shimmer animation
   * @default true
   */
  animate?: boolean;
}

/**
 * Base Skeleton Element
 */
const SkeletonElement: React.FC<Omit<SkeletonProps, "count">> = ({
  variant = "text",
  size = "md",
  width,
  height,
  className,
  animate = true,
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
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
    },
  };

  const defaultDimensions = sizeConfig[size][variant];
  const finalWidth = width || defaultDimensions.width;
  const finalHeight = height || defaultDimensions.height;

  return (
    <div
      className={cn(
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
      }}
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      {/* Shimmer overlay */}
      {animate && (
        <div
          className={cn(
            "h-full w-full bg-gradient-to-r",
            "from-spotify-light-gray",
            "via-spotify-dark-gray/50",
            "to-spotify-light-gray",
            "animate-[shimmer_1.5s_ease-in-out_infinite]",
          )}
          style={{
            backgroundSize: "200% 100%",
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
  variant = "text",
  className,
  ...props
}) => {
  // For card variant, render structured card skeleton
  if (variant === "card" && count === 1) {
    return <SkeletonCard className={className} {...props} />;
  }

  // For multiple items, render in container
  if (count > 1) {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonElement key={index} variant={variant} {...props} />
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
export interface SkeletonCardProps extends Omit<
  SkeletonProps,
  "variant" | "count"
> {
  /**
   * Show image placeholder
   * @default true
   */
  showImage?: boolean;

  /**
   * Show title placeholder
   * @default true
   */
  showTitle?: boolean;

  /**
   * Show description placeholder
   * @default true
   */
  showDescription?: boolean;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  size = "md",
  showImage = true,
  showTitle = true,
  showDescription = true,
  className,
  animate = true,
}) => {
  const cardSizeConfig = {
    sm: { image: "w-16 h-16", titleWidth: "60%", descWidth: "80%" },
    md: { image: "w-32 h-32", titleWidth: "70%", descWidth: "90%" },
    lg: { image: "w-48 h-48", titleWidth: "80%", descWidth: "100%" },
  };

  const config = cardSizeConfig[size];

  return (
    <div
      className={cn(
        "bg-spotify-light-gray rounded-lg p-4",
        "flex flex-col gap-3",
        animate && "animate-pulse",
        className,
      )}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      {showImage && (
        <SkeletonElement
          variant="rectangle"
          width="100%"
          height={config.image.replace("w-", "").replace("h-", "")}
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
export interface SkeletonListProps extends Omit<SkeletonProps, "variant"> {
  /**
   * Number of list items
   * @default 5
   */
  count?: number;

  /**
   * Show avatar/circle icon
   * @default false
   */
  showAvatar?: boolean;
}

const SkeletonList: React.FC<SkeletonListProps> = ({
  count = 5,
  showAvatar = false,
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
Skeleton.displayName = "Skeleton";
SkeletonCard.displayName = "SkeletonCard";
SkeletonList.displayName = "SkeletonList";

export { SkeletonCard, SkeletonList };
export default Skeleton;
