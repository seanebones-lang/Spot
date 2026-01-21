<<<<<<< HEAD
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Input, { InputProps } from "./Input";

/**
 * FormField Component - Composable form field wrapper
 *
 * Provides a consistent layout for form fields with label, input, helper text, and error message.
 * Can be used with Input component or any custom input element.
 *
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * @example
 * ```tsx
 * <FormField label="Email" required helperText="We'll never share your email">
 *   <Input type="email" placeholder="your@email.com" />
 * </FormField>
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Helper text (shown below input when no error)
   */
  helperText?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Error message (shows error state)
   */
  error?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Success message (shows success state)
   */
  success?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Mark field as required (adds asterisk to label)
   */
  required?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Disabled state (applied to label and helper text)
   */
  disabled?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * HTML id for label (auto-generated if not provided)
   */
  id?: string;
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
   * Form field content (Input component or custom element)
   */
  children: React.ReactNode;
}

/**
 * FormField - Wrapper component for consistent form field layout
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
    <div className={cn("w-full", className)}>
=======
    <div className={cn('w-full', className)}>
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

      {/* Input/Field Content */}
      <div id={finalId}>
<<<<<<< HEAD
        {React.isValidElement(children) &&
          React.cloneElement(children, {
            id: finalId,
            error,
            success,
            required,
            disabled,
            ...children.props,
          } as any)}
=======
        {React.isValidElement(children) && React.cloneElement(children, {
          id: finalId,
          error,
          success,
          required,
          disabled,
          ...children.props,
        } as any)}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      </div>

      {/* Helper Text */}
      {helperText && !error && (
<<<<<<< HEAD
        <p className="mt-1.5 text-xs text-spotify-text-gray">{helperText}</p>
=======
        <p className="mt-1.5 text-xs text-spotify-text-gray">
          {helperText}
        </p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      )}

      {/* Error Message */}
      {error && (
<<<<<<< HEAD
        <p
=======
        <p 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          className="mt-1.5 text-xs text-empulse-red flex items-center gap-1.5"
          role="alert"
        >
          <span>{error}</span>
        </p>
      )}

      {/* Success Message */}
      {success && !error && (
<<<<<<< HEAD
        <p className="mt-1.5 text-xs text-spotify-green">{success}</p>
=======
        <p className="mt-1.5 text-xs text-spotify-green">
          {success}
        </p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      )}
    </div>
  );
}
