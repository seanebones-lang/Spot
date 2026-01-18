'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Toast Component - Notification system with variants, auto-dismiss, and stacking
 * 
 * Design System Specifications:
 * - Variants: success (green), error (red), warning (orange), info (blue)
 * - Auto-dismiss with configurable duration (default: 4000ms)
 * - Stack multiple toasts vertically
 * - Slide-in animation from top-right
 * - Accessibility: ARIA live regions, keyboard dismiss
 * 
 * @example
 * ```tsx
 * const { showToast } = useToast();
 * 
 * showToast({
 *   message: 'Playlist created successfully!',
 *   variant: 'success'
 * });
 * ```
 */

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastContextValue {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
}

// Context
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * Toast Provider - Manages toast state and provides context
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: Toast = {
      id,
      variant: 'info',
      duration: 4000,
      ...toast,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, newToast.duration);
    }
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

/**
 * useToast Hook - Access toast functionality
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

/**
 * Toast Container - Renders all active toasts
 */
interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-md w-full"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

/**
 * Toast Item - Individual toast component
 */
interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);
  const variant = toast.variant || 'info';

  // Trigger animation on mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  // Variant configurations
  const variantConfig = {
    success: {
      bg: 'bg-spotify-green',
      text: 'text-black',
      border: 'border-spotify-green',
      icon: CheckCircle,
      iconColor: 'text-black',
    },
    error: {
      bg: 'bg-empulse-red',
      text: 'text-white',
      border: 'border-empulse-red',
      icon: AlertCircle,
      iconColor: 'text-white',
    },
    warning: {
      bg: 'bg-amber-500',
      text: 'text-black',
      border: 'border-amber-500',
      icon: AlertTriangle,
      iconColor: 'text-black',
    },
    info: {
      bg: 'bg-empulse-blue',
      text: 'text-white',
      border: 'border-empulse-blue',
      icon: Info,
      iconColor: 'text-white',
    },
  };

  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-lg shadow-lg',
        'bg-spotify-dark-gray border border-white/10',
        'transition-all duration-300 ease-in-out',
        isVisible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-full',
        'max-w-md w-full'
      )}
      role="alert"
      aria-live={variant === 'error' ? 'assertive' : 'polite' as 'assertive' | 'polite'}
    >
      {/* Icon */}
      <Icon
        size={20}
        className={cn('flex-shrink-0 mt-0.5', config.iconColor)}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-medium', config.text)}>
          {toast.message}
        </p>
        
        {/* Action Button */}
        {toast.action && (
          <button
            onClick={() => {
              toast.action?.onClick();
              onDismiss(toast.id);
            }}
            className={cn(
              'mt-2 px-3 py-1.5 rounded-full text-xs font-medium',
              'transition-colors duration-200',
              config.bg,
              config.text,
              'hover:opacity-90 active:opacity-80'
            )}
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Dismiss Button */}
      <button
        onClick={() => onDismiss(toast.id)}
        className={cn(
          'flex-shrink-0 p-1 rounded transition-colors',
          'text-spotify-text-gray hover:text-white',
          'focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark-gray',
          'ml-auto'
        )}
        aria-label="Dismiss notification"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
};

export default Toast;
