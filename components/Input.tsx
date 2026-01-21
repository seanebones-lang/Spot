<<<<<<< HEAD
"use client";

import React from "react";
import { AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Input Component - Standardized form input with variants, sizes, and validation states
 *
=======
'use client';

import React from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Input Component - Standardized form input with variants, sizes, and validation states
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Design System Specifications:
 * - Variants: default (dark background), ghost (transparent)
 * - Sizes: sm (36px height), md (40px height), lg (48px height)
 * - States: default, focus, error, success, disabled
 * - Types: text, email, password, number, tel, url, search, textarea
 * - Accessibility: WCAG 2.2 AA compliant (4.5:1 contrast ratio minimum)
 * - Border-radius: 4px (rounded-lg) matching Spotify inputs
 * - Focus ring: 2px Spotify Green ring
<<<<<<< HEAD
 *
 * @example
 * ```tsx
 * <Input
 *   type="email"
 *   label="Email"
=======
 * 
 * @example
 * ```tsx
 * <Input 
 *   type="email" 
 *   label="Email" 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 *   placeholder="your@email.com"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
<<<<<<< HEAD
 *
 * <Input
=======
 * 
 * <Input 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 *   type="password"
 *   label="Password"
 *   error="Password must be at least 8 characters"
 *   required
 * />
 * ```
 */

<<<<<<< HEAD
export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "ghost";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
=======
export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'ghost';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: InputVariant;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Input size
   * @default 'md'
   */
  size?: InputSize;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Label text (automatically creates label element with proper htmlFor)
   */
  label?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Helper text shown below input
   */
  helperText?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Error message (shows error state with red border and icon)
   */
  error?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Success message (shows success state with green border and check icon)
   */
  success?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Left icon (appears inside input on the left)
   */
  iconLeft?: React.ComponentType<any>;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Right icon (appears inside input on the right)
   */
  iconRight?: React.ComponentType<any>;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Click handler for right icon
   */
  onIconRightClick?: () => void;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Show success checkmark icon when value is valid
   * @default false
   */
  showSuccessIcon?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Input container className
   */
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
<<<<<<< HEAD
      variant = "default",
      size = "md",
=======
      variant = 'default',
      size = 'md',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      label,
      helperText,
      error,
      success,
      iconLeft: IconLeft,
      iconRight: IconRight,
      onIconRightClick,
      showSuccessIcon = false,
      containerClassName,
      className,
      disabled,
      id,
      required,
      ...props
    },
<<<<<<< HEAD
    ref,
=======
    ref
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ) => {
    // Generate unique ID if not provided (for label association)
    const inputId = React.useId();
    const finalId = id || inputId;
<<<<<<< HEAD

    // Size configurations (height, padding, font-size, icon-size)
    const sizeConfig = {
      sm: {
        height: "h-9",
        paddingX: "px-3",
        paddingY: "py-2",
        paddingXWithIcon: "px-9",
        textSize: "text-sm",
        iconSize: 18,
      },
      md: {
        height: "h-10",
        paddingX: "px-4",
        paddingY: "py-2",
        paddingXWithIcon: "px-10",
        textSize: "text-sm",
        iconSize: 20,
      },
      lg: {
        height: "h-12",
        paddingX: "px-4",
        paddingY: "py-3",
        paddingXWithIcon: "px-12",
        textSize: "text-base",
=======
    
    // Size configurations (height, padding, font-size, icon-size)
    const sizeConfig = {
      sm: {
        height: 'h-9',
        paddingX: 'px-3',
        paddingY: 'py-2',
        paddingXWithIcon: 'px-9',
        textSize: 'text-sm',
        iconSize: 18,
      },
      md: {
        height: 'h-10',
        paddingX: 'px-4',
        paddingY: 'py-2',
        paddingXWithIcon: 'px-10',
        textSize: 'text-sm',
        iconSize: 20,
      },
      lg: {
        height: 'h-12',
        paddingX: 'px-4',
        paddingY: 'py-3',
        paddingXWithIcon: 'px-12',
        textSize: 'text-base',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        iconSize: 22,
      },
    };

    const currentSize = sizeConfig[size];

    // Variant styles
    const variantStyles = {
      default: {
<<<<<<< HEAD
        base: "bg-spotify-dark-gray text-white border border-white/10",
        hover: "hover:border-white/20",
        focus:
          "focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20",
        disabled:
          "disabled:bg-spotify-dark-gray/50 disabled:text-white/50 disabled:cursor-not-allowed disabled:border-white/5",
      },
      ghost: {
        base: "bg-transparent text-white border border-white/10",
        hover: "hover:border-white/20",
        focus:
          "focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20",
        disabled:
          "disabled:bg-transparent disabled:text-white/50 disabled:cursor-not-allowed disabled:border-white/5",
=======
        base: 'bg-spotify-dark-gray text-white border border-white/10',
        hover: 'hover:border-white/20',
        focus: 'focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20',
        disabled: 'disabled:bg-spotify-dark-gray/50 disabled:text-white/50 disabled:cursor-not-allowed disabled:border-white/5',
      },
      ghost: {
        base: 'bg-transparent text-white border border-white/10',
        hover: 'hover:border-white/20',
        focus: 'focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20',
        disabled: 'disabled:bg-transparent disabled:text-white/50 disabled:cursor-not-allowed disabled:border-white/5',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      },
    };

    const currentVariant = variantStyles[variant];
<<<<<<< HEAD

    // Determine validation state
    const hasError = !!error;
    const hasSuccess =
      !!success ||
      (showSuccessIcon &&
        !hasError &&
        props.value &&
        props.value.toString().length > 0);
    const showRightIcon = hasError || hasSuccess || IconRight;

    return (
      <div className={cn("w-full", containerClassName)}>
=======
    
    // Determine validation state
    const hasError = !!error;
    const hasSuccess = !!success || (showSuccessIcon && !hasError && props.value && props.value.toString().length > 0);
    const showRightIcon = hasError || hasSuccess || IconRight;

    return (
      <div className={cn('w-full', containerClassName)}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        {/* Label */}
        {label && (
          <label
            htmlFor={finalId}
            className={cn(
<<<<<<< HEAD
              "block text-sm font-medium mb-2",
              disabled ? "text-white/50" : "text-white",
              required &&
                "after:content-['*'] after:ml-1 after:text-spotify-green",
=======
              'block text-sm font-medium mb-2',
              disabled ? 'text-white/50' : 'text-white',
              required && "after:content-['*'] after:ml-1 after:text-spotify-green"
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            )}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {IconLeft && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
<<<<<<< HEAD
              <IconLeft
                size={currentSize.iconSize}
                className={cn(
                  "text-spotify-text-gray",
                  disabled && "opacity-50",
                )}
=======
              <IconLeft 
                size={currentSize.iconSize} 
                className={cn(
                  'text-spotify-text-gray',
                  disabled && 'opacity-50'
                )} 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                aria-hidden="true"
              />
            </div>
          )}

          {/* Input Element */}
          <input
            ref={ref}
            id={finalId}
            disabled={disabled}
            required={required}
<<<<<<< HEAD
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={
              hasError
                ? `${finalId}-error`
                : helperText
                  ? `${finalId}-helper`
                  : undefined
            }
            className={cn(
              // Base styles
              "w-full rounded-lg font-circular",
              "transition-all duration-200 ease-in-out",
              "placeholder:text-spotify-text-gray placeholder:opacity-60",
              "disabled:pointer-events-none",
              "outline-none",

=======
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={
              hasError ? `${finalId}-error` : 
              helperText ? `${finalId}-helper` : 
              undefined
            }
            className={cn(
              // Base styles
              'w-full rounded-lg font-circular',
              'transition-all duration-200 ease-in-out',
              'placeholder:text-spotify-text-gray placeholder:opacity-60',
              'disabled:pointer-events-none',
              'outline-none',
              
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              // Size styles
              currentSize.height,
              IconLeft ? currentSize.paddingXWithIcon : currentSize.paddingX,
              currentSize.paddingY,
              currentSize.textSize,
<<<<<<< HEAD

=======
              
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              // Variant styles
              currentVariant.base,
              !disabled && currentVariant.hover,
              !disabled && currentVariant.focus,
              disabled && currentVariant.disabled,
<<<<<<< HEAD

              // Icon padding adjustments
              IconLeft && "pl-9",
              showRightIcon && "pr-10",

              // Validation states
              hasError &&
                "border-empulse-red focus:border-empulse-red focus:ring-empulse-red/20",
              hasSuccess &&
                !hasError &&
                "border-spotify-green focus:border-spotify-green",

              // Custom className
              className,
=======
              
              // Icon padding adjustments
              IconLeft && 'pl-9',
              showRightIcon && 'pr-10',
              
              // Validation states
              hasError && 'border-empulse-red focus:border-empulse-red focus:ring-empulse-red/20',
              hasSuccess && !hasError && 'border-spotify-green focus:border-spotify-green',
              
              // Custom className
              className
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            )}
            {...props}
          />

          {/* Right Icon (Error, Success, or Custom) */}
          {showRightIcon && (
<<<<<<< HEAD
            <div
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                hasError || hasSuccess
                  ? "pointer-events-none"
                  : "pointer-events-auto",
              )}
            >
              {hasError ? (
                <AlertCircle
                  size={currentSize.iconSize}
                  className="text-empulse-red"
                  aria-hidden="true"
                />
              ) : hasSuccess ? (
                <Check
                  size={currentSize.iconSize}
                  className="text-spotify-green"
=======
            <div className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2',
              hasError || hasSuccess ? 'pointer-events-none' : 'pointer-events-auto'
            )}>
              {hasError ? (
                <AlertCircle 
                  size={currentSize.iconSize} 
                  className="text-empulse-red" 
                  aria-hidden="true"
                />
              ) : hasSuccess ? (
                <Check 
                  size={currentSize.iconSize} 
                  className="text-spotify-green" 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  aria-hidden="true"
                />
              ) : IconRight ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (onIconRightClick && !disabled) {
                      onIconRightClick();
                    }
                  }}
                  disabled={disabled}
                  className={cn(
<<<<<<< HEAD
                    "text-spotify-text-gray hover:text-white transition-colors",
                    disabled && "opacity-50 cursor-not-allowed",
=======
                    'text-spotify-text-gray hover:text-white transition-colors',
                    disabled && 'opacity-50 cursor-not-allowed'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  )}
                  aria-label="Toggle visibility"
                  tabIndex={-1}
                >
<<<<<<< HEAD
                  <IconRight size={currentSize.iconSize} aria-hidden="true" />
=======
                  <IconRight 
                    size={currentSize.iconSize}
                    aria-hidden="true"
                  />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                </button>
              ) : null}
            </div>
          )}
        </div>

        {/* Helper Text */}
        {helperText && !error && (
<<<<<<< HEAD
          <p
=======
          <p 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            id={`${finalId}-helper`}
            className="mt-1.5 text-xs text-spotify-text-gray"
          >
            {helperText}
          </p>
        )}

        {/* Error Message */}
        {error && (
<<<<<<< HEAD
          <p
=======
          <p 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            id={`${finalId}-error`}
            className="mt-1.5 text-xs text-empulse-red flex items-center gap-1.5"
            role="alert"
          >
<<<<<<< HEAD
            <AlertCircle
              size={14}
              className="flex-shrink-0"
              aria-hidden="true"
            />
=======
            <AlertCircle size={14} className="flex-shrink-0" aria-hidden="true" />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            <span>{error}</span>
          </p>
        )}

        {/* Success Message */}
        {success && !error && (
<<<<<<< HEAD
          <p className="mt-1.5 text-xs text-spotify-green flex items-center gap-1.5">
=======
          <p 
            className="mt-1.5 text-xs text-spotify-green flex items-center gap-1.5"
          >
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            <Check size={14} className="flex-shrink-0" aria-hidden="true" />
            <span>{success}</span>
          </p>
        )}
      </div>
    );
<<<<<<< HEAD
  },
);

Input.displayName = "Input";
=======
  }
);

Input.displayName = 'Input';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default Input;
