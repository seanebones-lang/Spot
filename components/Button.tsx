<<<<<<< HEAD
"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Button Component - Standardized UI button with multiple variants, sizes, and states
 *
=======
'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Button Component - Standardized UI button with multiple variants, sizes, and states
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Design System Specifications:
 * - Variants: primary (Spotify Green), secondary (outlined), tertiary (muted), ghost (transparent), danger (EmPulse Red)
 * - Sizes: sm (32px height), md (40px height), lg (48px height)
 * - States: default, hover, active, disabled, loading
 * - Accessibility: WCAG 2.2 AA compliant (4.5:1 contrast ratio minimum)
 * - Border-radius: rounded-full (pill shape) matching Spotify style
 * - Transitions: 200ms ease-in-out for smooth interactions
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Get Started
 * </Button>
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * <Button variant="secondary" size="lg" loading={isSubmitting}>
 *   Submit
 * </Button>
 * ```
 */

<<<<<<< HEAD
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";
=======
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   * @default 'primary'
   */
  variant?: ButtonVariant;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Button size
   * @default 'md'
   */
  size?: ButtonSize;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Show loading spinner and disable interaction
   * @default false
   */
  loading?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Display button at full width of container
   * @default false
   */
  fullWidth?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Icon to display before text (from lucide-react)
   */
  icon?: React.ComponentType<any>;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Icon to display after text (from lucide-react)
   */
  iconRight?: React.ComponentType<any>;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Button content (children)
   */
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
<<<<<<< HEAD
      variant = "primary",
      size = "md",
=======
      variant = 'primary',
      size = 'md',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      loading = false,
      fullWidth = false,
      icon: Icon,
      iconRight: IconRight,
      children,
      className,
      disabled,
      ...props
    },
<<<<<<< HEAD
    ref,
=======
    ref
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ) => {
    // Size configurations (height, padding, font-size, icon-size)
    const sizeConfig = {
      sm: {
<<<<<<< HEAD
        height: "h-8",
        paddingX: "px-4",
        paddingY: "py-1.5",
        textSize: "text-sm",
        fontWeight: "font-medium",
        iconSize: 16,
      },
      md: {
        height: "h-10",
        paddingX: "px-6",
        paddingY: "py-2",
        textSize: "text-sm",
        fontWeight: "font-bold",
        iconSize: 20,
      },
      lg: {
        height: "h-12",
        paddingX: "px-8",
        paddingY: "py-3",
        textSize: "text-base",
        fontWeight: "font-bold",
=======
        height: 'h-8',
        paddingX: 'px-4',
        paddingY: 'py-1.5',
        textSize: 'text-sm',
        fontWeight: 'font-medium',
        iconSize: 16,
      },
      md: {
        height: 'h-10',
        paddingX: 'px-6',
        paddingY: 'py-2',
        textSize: 'text-sm',
        fontWeight: 'font-bold',
        iconSize: 20,
      },
      lg: {
        height: 'h-12',
        paddingX: 'px-8',
        paddingY: 'py-3',
        textSize: 'text-base',
        fontWeight: 'font-bold',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        iconSize: 24,
      },
    };

    const currentSize = sizeConfig[size];

    // Variant styles with all states
    const variantStyles = {
      primary: {
<<<<<<< HEAD
        base: "bg-spotify-green text-black",
        hover: "hover:bg-[#1ed760] hover:scale-[1.02]",
        active: "active:bg-[#1aa34a] active:scale-[0.98]",
        disabled:
          "disabled:bg-spotify-green/50 disabled:text-black/50 disabled:cursor-not-allowed disabled:hover:scale-100",
        focus:
          "focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark",
      },
      secondary: {
        base: "bg-transparent border-2 border-spotify-green text-spotify-green",
        hover:
          "hover:bg-spotify-green/10 hover:shadow-[0_0_20px_rgba(29,185,84,0.3)]",
        active:
          "active:bg-spotify-green/20 active:shadow-[0_0_10px_rgba(29,185,84,0.2)]",
        disabled:
          "disabled:border-spotify-green/30 disabled:text-spotify-green/30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none",
        focus:
          "focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark",
      },
      tertiary: {
        base: "bg-spotify-light-gray text-white border border-white/20",
        hover: "hover:bg-spotify-dark-gray hover:border-white/30",
        active: "active:bg-spotify-dark-gray active:border-white/40",
        disabled:
          "disabled:bg-spotify-light-gray/30 disabled:text-white/30 disabled:border-white/10 disabled:cursor-not-allowed",
        focus:
          "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-spotify-dark",
      },
      ghost: {
        base: "bg-transparent text-white",
        hover: "hover:bg-white/10",
        active: "active:bg-white/20",
        disabled:
          "disabled:text-white/30 disabled:cursor-not-allowed disabled:hover:bg-transparent",
        focus:
          "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-spotify-dark",
      },
      danger: {
        base: "bg-empulse-red text-white",
        hover: "hover:bg-[#d63031] hover:scale-[1.02]",
        active: "active:bg-[#c62828] active:scale-[0.98]",
        disabled:
          "disabled:bg-empulse-red/50 disabled:text-white/50 disabled:cursor-not-allowed disabled:hover:scale-100",
        focus:
          "focus:outline-none focus:ring-2 focus:ring-empulse-red focus:ring-offset-2 focus:ring-offset-spotify-dark",
=======
        base: 'bg-spotify-green text-black',
        hover: 'hover:bg-[#8a1dd0] hover:scale-[1.02]',
        active: 'active:bg-[#5a0789] active:scale-[0.98]',
        disabled: 'disabled:bg-spotify-green/50 disabled:text-black/50 disabled:cursor-not-allowed disabled:hover:scale-100',
        focus: 'focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark',
      },
      secondary: {
        base: 'bg-transparent border-2 border-spotify-green text-spotify-green',
        hover: 'hover:bg-spotify-green/10 hover:shadow-[0_0_20px_rgba(29,185,84,0.3)]',
        active: 'active:bg-spotify-green/20 active:shadow-[0_0_10px_rgba(29,185,84,0.2)]',
        disabled: 'disabled:border-spotify-green/30 disabled:text-spotify-green/30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:shadow-none',
        focus: 'focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark',
      },
      tertiary: {
        base: 'bg-spotify-light-gray text-white border border-white/20',
        hover: 'hover:bg-spotify-dark-gray hover:border-white/30',
        active: 'active:bg-spotify-dark-gray active:border-white/40',
        disabled: 'disabled:bg-spotify-light-gray/30 disabled:text-white/30 disabled:border-white/10 disabled:cursor-not-allowed',
        focus: 'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-spotify-dark',
      },
      ghost: {
        base: 'bg-transparent text-white',
        hover: 'hover:bg-white/10',
        active: 'active:bg-white/20',
        disabled: 'disabled:text-white/30 disabled:cursor-not-allowed disabled:hover:bg-transparent',
        focus: 'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-spotify-dark',
      },
      danger: {
        base: 'bg-empulse-red text-white',
        hover: 'hover:bg-[#d63031] hover:scale-[1.02]',
        active: 'active:bg-[#c62828] active:scale-[0.98]',
        disabled: 'disabled:bg-empulse-red/50 disabled:text-white/50 disabled:cursor-not-allowed disabled:hover:scale-100',
        focus: 'focus:outline-none focus:ring-2 focus:ring-empulse-red focus:ring-offset-2 focus:ring-offset-spotify-dark',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      },
    };

    const currentVariant = variantStyles[variant];
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base styles
<<<<<<< HEAD
          "inline-flex items-center justify-center gap-2",
          "rounded-full font-circular",
          "transition-all duration-200 ease-in-out",
          "disabled:pointer-events-none",

=======
          'inline-flex items-center justify-center gap-2',
          'rounded-full font-circular',
          'transition-all duration-200 ease-in-out',
          'disabled:pointer-events-none',
          
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          // Size styles
          currentSize.height,
          currentSize.paddingX,
          currentSize.paddingY,
          currentSize.textSize,
          currentSize.fontWeight,
<<<<<<< HEAD

=======
          
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          // Variant styles
          currentVariant.base,
          !isDisabled && currentVariant.hover,
          !isDisabled && currentVariant.active,
          isDisabled && currentVariant.disabled,
          currentVariant.focus,
<<<<<<< HEAD

          // Full width
          fullWidth && "w-full",

          // Custom className
          className,
=======
          
          // Full width
          fullWidth && 'w-full',
          
          // Custom className
          className
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        )}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner (replaces left icon when loading) */}
        {loading && (
<<<<<<< HEAD
          <Loader2
            size={currentSize.iconSize}
            className="animate-spin"
            aria-hidden="true"
          />
        )}

        {/* Left icon (hidden when loading) */}
        {!loading && Icon && (
          <Icon
            size={currentSize.iconSize}
            className="flex-shrink-0"
            aria-hidden="true"
          />
        )}

        {/* Button text */}
        <span className={cn(loading && "opacity-70")}>{children}</span>

        {/* Right icon */}
        {!loading && IconRight && (
          <IconRight
            size={currentSize.iconSize}
            className="flex-shrink-0"
=======
          <Loader2 
            size={currentSize.iconSize} 
            className="animate-spin" 
            aria-hidden="true"
          />
        )}
        
        {/* Left icon (hidden when loading) */}
        {!loading && Icon && (
          <Icon 
            size={currentSize.iconSize} 
            className="flex-shrink-0" 
            aria-hidden="true"
          />
        )}
        
        {/* Button text */}
        <span className={cn(loading && 'opacity-70')}>
          {children}
        </span>
        
        {/* Right icon */}
        {!loading && IconRight && (
          <IconRight 
            size={currentSize.iconSize} 
            className="flex-shrink-0" 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            aria-hidden="true"
          />
        )}
      </button>
    );
<<<<<<< HEAD
  },
);

Button.displayName = "Button";
=======
  }
);

Button.displayName = 'Button';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default Button;
