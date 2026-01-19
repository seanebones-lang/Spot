'use client';

import React from 'react';
import { AlertCircle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Input Component - Standardized form input with variants, sizes, and validation states
 * 
 * Design System Specifications:
 * - Variants: default (dark background), ghost (transparent)
 * - Sizes: sm (36px height), md (40px height), lg (48px height)
 * - States: default, focus, error, success, disabled
 * - Types: text, email, password, number, tel, url, search, textarea
 * - Accessibility: WCAG 2.2 AA compliant (4.5:1 contrast ratio minimum)
 * - Border-radius: 4px (rounded-lg) matching Spotify inputs
 * - Focus ring: 2px Spotify Green ring
 * 
 * @example
 * ```tsx
 * <Input 
 *   type="email" 
 *   label="Email" 
 *   placeholder="your@email.com"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * 
 * <Input 
 *   type="password"
 *   label="Password"
 *   error="Password must be at least 8 characters"
 *   required
 * />
 * ```
 */

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'ghost';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: InputVariant;
  
  /**
   * Input size
   * @default 'md'
   */
  size?: InputSize;
  
  /**
   * Label text (automatically creates label element with proper htmlFor)
   */
  label?: string;
  
  /**
   * Helper text shown below input
   */
  helperText?: string;
  
  /**
   * Error message (shows error state with red border and icon)
   */
  error?: string;
  
  /**
   * Success message (shows success state with green border and check icon)
   */
  success?: string;
  
  /**
   * Left icon (appears inside input on the left)
   */
  iconLeft?: React.ComponentType<any>;
  
  /**
   * Right icon (appears inside input on the right)
   */
  iconRight?: React.ComponentType<any>;
  
  /**
   * Click handler for right icon
   */
  onIconRightClick?: () => void;
  
  /**
   * Show success checkmark icon when value is valid
   * @default false
   */
  showSuccessIcon?: boolean;
  
  /**
   * Input container className
   */
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
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
    ref
  ) => {
    // Generate unique ID if not provided (for label association)
    const inputId = React.useId();
    const finalId = id || inputId;
    
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
        iconSize: 22,
      },
    };

    const currentSize = sizeConfig[size];

    // Variant styles
    const variantStyles = {
      default: {
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
      },
    };

    const currentVariant = variantStyles[variant];
    
    // Determine validation state
    const hasError = !!error;
    const hasSuccess = !!success || (showSuccessIcon && !hasError && props.value && props.value.toString().length > 0);
    const showRightIcon = hasError || hasSuccess || IconRight;

    return (
      <div className={cn('w-full', containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={finalId}
            className={cn(
              'block text-sm font-medium mb-2',
              disabled ? 'text-white/50' : 'text-white',
              required && "after:content-['*'] after:ml-1 after:text-spotify-green"
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
              <IconLeft 
                size={currentSize.iconSize} 
                className={cn(
                  'text-spotify-text-gray',
                  disabled && 'opacity-50'
                )} 
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
              
              // Size styles
              currentSize.height,
              IconLeft ? currentSize.paddingXWithIcon : currentSize.paddingX,
              currentSize.paddingY,
              currentSize.textSize,
              
              // Variant styles
              currentVariant.base,
              !disabled && currentVariant.hover,
              !disabled && currentVariant.focus,
              disabled && currentVariant.disabled,
              
              // Icon padding adjustments
              IconLeft && 'pl-9',
              showRightIcon && 'pr-10',
              
              // Validation states
              hasError && 'border-empulse-red focus:border-empulse-red focus:ring-empulse-red/20',
              hasSuccess && !hasError && 'border-spotify-green focus:border-spotify-green',
              
              // Custom className
              className
            )}
            {...props}
          />

          {/* Right Icon (Error, Success, or Custom) */}
          {showRightIcon && (
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
                    'text-spotify-text-gray hover:text-white transition-colors',
                    disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  aria-label="Toggle visibility"
                  tabIndex={-1}
                >
                  <IconRight 
                    size={currentSize.iconSize}
                    aria-hidden="true"
                  />
                </button>
              ) : null}
            </div>
          )}
        </div>

        {/* Helper Text */}
        {helperText && !error && (
          <p 
            id={`${finalId}-helper`}
            className="mt-1.5 text-xs text-spotify-text-gray"
          >
            {helperText}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p 
            id={`${finalId}-error`}
            className="mt-1.5 text-xs text-empulse-red flex items-center gap-1.5"
            role="alert"
          >
            <AlertCircle size={14} className="flex-shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}

        {/* Success Message */}
        {success && !error && (
          <p 
            className="mt-1.5 text-xs text-spotify-green flex items-center gap-1.5"
          >
            <Check size={14} className="flex-shrink-0" aria-hidden="true" />
            <span>{success}</span>
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
