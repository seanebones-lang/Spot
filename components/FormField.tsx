'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Input, { InputProps } from './Input';

/**
 * FormField Component - Composable form field wrapper
 * 
 * Provides a consistent layout for form fields with label, input, helper text, and error message.
 * Can be used with Input component or any custom input element.
 * 
 * @example
 * ```tsx
 * <FormField label="Email" required helperText="We'll never share your email">
 *   <Input type="email" placeholder="your@email.com" />
 * </FormField>
 * 
 * <FormField label="Password" error="Password is required">
 *   <Input type="password" />
 * </FormField>
 * ```
 */

export interface FormFieldProps {
  /**
   * Label text (shown above input)
   */
  label?: string;
  
  /**
   * Helper text (shown below input when no error)
   */
  helperText?: string;
  
  /**
   * Error message (shows error state)
   */
  error?: string;
  
  /**
   * Success message (shows success state)
   */
  success?: string;
  
  /**
   * Mark field as required (adds asterisk to label)
   */
  required?: boolean;
  
  /**
   * Disabled state (applied to label and helper text)
   */
  disabled?: boolean;
  
  /**
   * HTML id for label (auto-generated if not provided)
   */
  id?: string;
  
  /**
   * Container className
   */
  className?: string;
  
  /**
   * Form field content (Input component or custom element)
   */
  children: React.ReactNode;
}

/**
 * FormField - Wrapper component for consistent form field layout
 * 
 * Provides:
 * - Consistent spacing between label, input, and messages
 * - Proper label association (htmlFor/id)
 * - Error/success state styling
 * - Accessibility attributes
 */
export default function FormField({
  label,
  helperText,
  error,
  success,
  required,
  disabled,
  id,
  className,
  children,
}: FormFieldProps) {
  const fieldId = React.useId();
  const finalId = id || fieldId;

  return (
    <div className={cn('w-full', className)}>
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

      {/* Input/Field Content */}
      <div id={finalId}>
        {React.isValidElement(children) && React.cloneElement(children, {
          id: finalId,
          error,
          success,
          required,
          disabled,
          ...children.props,
        } as any)}
      </div>

      {/* Helper Text */}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-spotify-text-gray">
          {helperText}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p 
          className="mt-1.5 text-xs text-empulse-red flex items-center gap-1.5"
          role="alert"
        >
          <span>{error}</span>
        </p>
      )}

      {/* Success Message */}
      {success && !error && (
        <p className="mt-1.5 text-xs text-spotify-green">
          {success}
        </p>
      )}
    </div>
  );
}
