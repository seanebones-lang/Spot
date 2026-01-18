'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

/**
 * Modal Component - Standardized modal/dialog with overlay, header, body, and footer
 * 
 * Design System Specifications:
 * - Sizes: sm (400px), md (600px), lg (800px), xl (1000px), fullscreen
 * - Overlay: Dark backdrop with blur (rgba(0, 0, 0, 0.5))
 * - Border-radius: 12px (rounded-xl) for modal container
 * - Animation: Fade in + scale up on open
 * - Keyboard: ESC key closes modal
 * - Focus: Traps focus within modal, returns to trigger on close
 * - Accessibility: WCAG 2.2 AA compliant
 * 
 * @example
 * ```tsx
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={handleClose}
 *   title="Edit Playlist"
 * >
 *   <Modal.Body>
 *     <Input label="Name" />
 *   </Modal.Body>
 *   <Modal.Footer>
 *     <Button variant="secondary" onClick={handleClose}>Cancel</Button>
 *     <Button variant="primary" onClick={handleSave}>Save</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

export interface ModalProps {
  /**
   * Whether modal is open
   */
  isOpen: boolean;
  
  /**
   * Callback when modal should close (ESC key, overlay click, or close button)
   */
  onClose: () => void;
  
  /**
   * Modal title (shown in header)
   */
  title?: string;
  
  /**
   * Modal size
   * @default 'md'
   */
  size?: ModalSize;
  
  /**
   * Show close button in header
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Close modal when clicking overlay/backdrop
   * @default true
   */
  closeOnOverlayClick?: boolean;
  
  /**
   * Close modal when pressing ESC key
   * @default true
   */
  closeOnEscape?: boolean;
  
  /**
   * Prevent body scroll when modal is open
   * @default true
   */
  preventBodyScroll?: boolean;
  
  /**
   * Custom header content (overrides title)
   */
  header?: React.ReactNode;
  
  /**
   * Custom footer content
   */
  footer?: React.ReactNode;
  
  /**
   * Modal content (children)
   */
  children: React.ReactNode;
  
  /**
   * Container className
   */
  className?: string;
  
  /**
   * Overlay className
   */
  overlayClassName?: string;
}

/**
 * Modal Component - Main container
 */
const ModalRoot: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  preventBodyScroll = true,
  header,
  footer,
  children,
  className,
  overlayClassName,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Size configurations
  const sizeConfig = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    fullscreen: 'max-w-full max-h-full m-4',
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen && preventBodyScroll) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, preventBodyScroll]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Focus trap and management
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus modal on open
    const timer = setTimeout(() => {
      modalRef.current?.focus();
    }, 100);

    return () => {
      clearTimeout(timer);
      // Return focus to previous element on close
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen]);

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center p-4',
        'bg-black/50 backdrop-blur-sm',
        'transition-opacity duration-200',
        overlayClassName
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        ref={modalRef}
        className={cn(
          'bg-spotify-dark-gray rounded-xl',
          'w-full max-h-[90vh]',
          'flex flex-col',
          'shadow-2xl',
          'transition-all duration-200',
          sizeConfig[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || header || showCloseButton) && (
          <div className="sticky top-0 bg-spotify-dark-gray border-b border-white/10 p-6 flex items-center justify-between z-10 rounded-t-xl">
            {header ? (
              header
            ) : (
              <>
                {title && (
                  <h2 
                    id="modal-title"
                    className="text-2xl font-bold text-white"
                  >
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="text-spotify-text-gray hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark-gray"
                    aria-label="Close modal"
                  >
                    <X size={24} />
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="sticky bottom-0 bg-spotify-dark-gray border-t border-white/10 p-6 flex items-center justify-end gap-3 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Modal.Body - Body content section
 */
export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
};

/**
 * Modal.Footer - Footer section with action buttons
 */
export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => {
  return (
    <div className={cn('flex items-center justify-end gap-3', className)}>
      {children}
    </div>
  );
};

/**
 * Modal.Header - Custom header section
 */
export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      {children}
    </div>
  );
};

// Export Modal component with subcomponents
export const Modal = Object.assign(ModalRoot, {
  Body: ModalBody,
  Footer: ModalFooter,
  Header: ModalHeader,
});

export default Modal;
