"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * Card Component - Standardized card container with variants, sizes, and interactive states
 *
 * Design System Specifications:
 * - Variants: default (dark gray), elevated (lighter gray), outline (border only), gradient (colored gradient)
 * - Sizes: sm (compact), md (default), lg (large)
 * - States: default, hover, active
 * - Types: static (no interaction), clickable (onClick), link (Next.js Link)
 * - Border-radius: 8px (rounded-lg) matching Spotify cards
 * - Padding: responsive based on size
 * - Accessibility: WCAG 2.2 AA compliant
 *
 * @example
 * ```tsx
 * <Card variant="default" size="md">
 *   <Card.Header>Album Title</Card.Header>
 *   <Card.Body>Artist Name</Card.Body>
 * </Card>
 *
 * <Card
 *   as="link"
 *   href="/album/123"
 *   variant="default"
 *   hover
 * >
 *   <Card.Image src="/album.jpg" alt="Album" />
 *   <Card.Body>
 *     <Card.Title>Album Name</Card.Title>
 *     <Card.Description>Artist Name</Card.Description>
 *   </Card.Body>
 * </Card>
 * ```
 */

export type CardVariant = "default" | "elevated" | "outline" | "gradient";
export type CardSize = "sm" | "md" | "lg";

export interface CardProps {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Card size (affects padding)
   * @default 'md'
   */
  size?: CardSize;

  /**
   * Enable hover effect (background color change)
   * @default false
   */
  hover?: boolean;

  /**
   * Make card clickable (adds cursor-pointer and onClick)
   */
  onClick?: () => void;

  /**
   * Render as Next.js Link (requires href)
   */
  as?: "div" | "link" | "button";

  /**
   * Link href (required when as="link")
   */
  href?: string;

  /**
   * Card content (children)
   */
  children: React.ReactNode;

  /**
   * Container className
   */
  className?: string;

  /**
   * Image URL (for Card.Image component)
   */
  image?: string;

  /**
   * Image alt text (for Card.Image component)
   */
  imageAlt?: string;
}

/**
 * Card Component - Main container
 */
const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      size = "md",
      hover = false,
      onClick,
      as = "div",
      href,
      children,
      className,
      image,
      imageAlt,
      ...props
    },
    ref,
  ) => {
    // Size configurations (padding)
    const sizeConfig = {
      sm: {
        padding: "p-3",
        paddingX: "px-3",
        paddingY: "py-3",
      },
      md: {
        padding: "p-4",
        paddingX: "px-4",
        paddingY: "py-4",
      },
      lg: {
        padding: "p-6",
        paddingX: "px-6",
        paddingY: "py-6",
      },
    };

    const currentSize = sizeConfig[size];

    // Variant styles
    const variantStyles = {
      default: {
        base: "bg-spotify-light-gray",
        hover: hover && "hover:bg-spotify-light-gray/80",
      },
      elevated: {
        base: "bg-spotify-dark-gray",
        hover: hover && "hover:bg-spotify-dark-gray/80",
      },
      outline: {
        base: "bg-transparent border border-white/10",
        hover: hover && "hover:border-white/20 hover:bg-white/5",
      },
      gradient: {
        base: "bg-gradient-to-r from-empulse-purple/20 to-empulse-blue/20 border border-empulse-purple/30",
        hover: hover && "hover:from-empulse-purple/30 hover:to-empulse-blue/30",
      },
    };

    const currentVariant = variantStyles[variant];

    const isInteractive = onClick || as === "link" || as === "button";
    const baseClasses = cn(
      // Base styles
      "rounded-lg font-circular",
      "transition-all duration-200 ease-in-out",

      // Size styles
      currentSize.padding,

      // Variant styles
      currentVariant.base,
      currentVariant.hover,

      // Interactive styles
      isInteractive && "cursor-pointer",
      onClick && "active:scale-[0.98]",

      // Custom className
      className,
    );

    // Render as Link
    if (as === "link" && href) {
      return (
        <Link href={href} className={baseClasses} {...(props as any)}>
          {image && <CardImage src={image} alt={imageAlt || ""} />}
          {children}
        </Link>
      );
    }

    // Render as Button
    if (as === "button") {
      return (
        <button
          onClick={onClick}
          className={baseClasses}
          type="button"
          {...(props as any)}
        >
          {image && <CardImage src={image} alt={imageAlt || ""} />}
          {children}
        </button>
      );
    }

    // Render as Div
    return (
      <div ref={ref} onClick={onClick} className={baseClasses} {...props}>
        {image && <CardImage src={image} alt={imageAlt || ""} />}
        {children}
      </div>
    );
  },
);

CardRoot.displayName = "Card";

/**
 * Card.Image - Image component for cards
 */
export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "full";
  aspectRatio?: "square" | "landscape" | "auto";
}

const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className,
  size = "full",
  aspectRatio = "square",
}) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    full: "w-full",
  };

  const aspectClasses = {
    square: "aspect-square",
    landscape: "aspect-video",
    auto: "",
  };

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "object-cover rounded-lg mb-3",
        sizeClasses[size],
        aspectClasses[aspectRatio],
        className,
      )}
    />
  );
};

/**
 * Card.Header - Header section
 */
export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return <div className={cn("mb-2", className)}>{children}</div>;
};

/**
 * Card.Title - Title text (bold, large)
 */
export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}

const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
  as: Component = "div",
}) => {
  return (
    <Component className={cn("text-white font-bold text-base mb-1", className)}>
      {children}
    </Component>
  );
};

/**
 * Card.Description - Description/subtitle text
 */
export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn("text-spotify-text-gray text-sm", className)}>
      {children}
    </p>
  );
};

/**
 * Card.Body - Main content section
 */
export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  return <div className={cn("flex-1", className)}>{children}</div>;
};

/**
 * Card.Footer - Footer section
 */
export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={cn("mt-4 pt-4 border-t border-white/10", className)}>
      {children}
    </div>
  );
};

/**
 * Card Actions - Action buttons/links section
 */
export interface CardActionsProps {
  children: React.ReactNode;
  className?: string;
}

const CardActions: React.FC<CardActionsProps> = ({ children, className }) => {
  return (
    <div className={cn("flex items-center gap-2 mt-4", className)}>
      {children}
    </div>
  );
};

// Export Card component with subcomponents
export const Card = Object.assign(CardRoot, {
  Image: CardImage,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
  Actions: CardActions,
});

export default Card;
