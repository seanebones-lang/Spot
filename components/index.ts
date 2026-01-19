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

export { default as Skeleton, SkeletonCard, SkeletonList } from './Skeleton';
export type { SkeletonProps, SkeletonVariant, SkeletonSize, SkeletonCardProps, SkeletonListProps } from './Skeleton';

export { ToastProvider, useToast } from './Toast';
export type { ToastVariant, Toast as ToastType, ToastContextValue } from './Toast';

export { default as Select } from './Select';
export type { SelectProps, SelectOption, SelectSize, SelectVariant } from './Select';

export { default as Tabs } from './Tabs';
export type { TabsProps, TabsOrientation, Tab, TabsListProps, TabsTriggerProps, TabsContentProps } from './Tabs';

export { default as SkipLinks } from './SkipLinks';
export type { SkipLinksProps, SkipLink } from './SkipLinks';

export { default as LazyImage } from './LazyImage';
export type { LazyImageProps } from './LazyImage';

export { default as ImageWithFallback } from './ImageWithFallback';

// Re-export subcomponents
export { Modal as ModalComponent } from './Modal';
export type { 
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps
} from './Modal';

// Audio Components
export { default as Equalizer } from './Equalizer';
export { default as AudioVisualizer } from './AudioVisualizer';
export { default as AudiophileVisualizer } from './AudiophileVisualizer';
export type { VisualizerType, VisualizerColorScheme } from './AudioVisualizer';
