/**
 * UI Component System - Centralized Exports
 * 
 * This file provides a single import point for all standardized UI components.
 * Use this for cleaner imports throughout the application.
 * 
 * @example
 * ```tsx
 * import { Button, Input, Card, Modal, FormField } from '@/components';
 * ```
 */

// Button Component
export { default as Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

// Input Component
export { default as Input } from './Input';

// FormField Component
export { default as FormField } from './FormField';
export type { FormFieldProps } from './FormField';

// Card Component
export { default as Card } from './Card';
export type { CardProps, CardVariant, CardSize } from './Card';

// Modal Component
export { default as Modal } from './Modal';
export type { ModalProps, ModalSize } from './Modal';

// Re-export subcomponents
export { Modal as ModalComponent } from './Modal';
export type { 
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps
} from './Modal';
