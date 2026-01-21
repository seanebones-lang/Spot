<<<<<<< HEAD
"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";

/**
 * Modal Component - Standardized modal/dialog with overlay, header, body, and footer
 *
=======
'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

/**
 * Modal Component - Standardized modal/dialog with overlay, header, body, and footer
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Design System Specifications:
 * - Sizes: sm (400px), md (600px), lg (800px), xl (1000px), fullscreen
 * - Overlay: Dark backdrop with blur (rgba(0, 0, 0, 0.5))
 * - Border-radius: 12px (rounded-xl) for modal container
 * - Animation: Fade in + scale up on open
 * - Keyboard: ESC key closes modal
 * - Focus: Traps focus within modal, returns to trigger on close
 * - Accessibility: WCAG 2.2 AA compliant
<<<<<<< HEAD
 *
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
=======
 * 
 * @example
 * ```tsx
 * <Modal 
 *   isOpen={isOpen} 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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

<<<<<<< HEAD
export type ModalSize = "sm" | "md" | "lg" | "xl" | "fullscreen";
=======
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export interface ModalProps {
  /**
   * Whether modal is open
   */
  isOpen: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Callback when modal should close (ESC key, overlay click, or close button)
   */
  onClose: () => void;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Modal title (shown in header)
   */
  title?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Modal size
   * @default 'md'
   */
  size?: ModalSize;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Show close button in header
   * @default true
   */
  showCloseButton?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Close modal when clicking overlay/backdrop
   * @default true
   */
  closeOnOverlayClick?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Close modal when pressing ESC key
   * @default true
   */
  closeOnEscape?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Prevent body scroll when modal is open
   * @default true
   */
  preventBodyScroll?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Custom header content (overrides title)
   */
  header?: React.ReactNode;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Custom footer content
   */
  footer?: React.ReactNode;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Modal content (children)
   */
  children: React.ReactNode;
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
<<<<<<< HEAD
  size = "md",
=======
  size = 'md',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    fullscreen: "max-w-full max-h-full m-4",
=======
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    fullscreen: 'max-w-full max-h-full m-4',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen && preventBodyScroll) {
      // Save current scroll position
      const scrollY = window.scrollY;
<<<<<<< HEAD
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
=======
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen, preventBodyScroll]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
<<<<<<< HEAD
      if (e.key === "Escape") {
=======
      if (e.key === 'Escape') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        onClose();
      }
    };

<<<<<<< HEAD
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
=======
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
        "fixed inset-0 z-[100] flex items-center justify-center p-4",
        "bg-black/50 backdrop-blur-sm",
        "transition-opacity duration-200 ease-out",
        overlayClassName,
      )}
      style={{
        transition: "opacity 200ms cubic-bezier(0.3, 0, 0.1, 1)",
=======
        'fixed inset-0 z-[100] flex items-center justify-center p-4',
        'bg-black/50 backdrop-blur-sm',
        'transition-opacity duration-200 ease-out',
        overlayClassName
      )}
      style={{
        transition: 'opacity 200ms cubic-bezier(0.3, 0, 0.1, 1)'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
<<<<<<< HEAD
      aria-labelledby={title ? "modal-title" : undefined}
=======
      aria-labelledby={title ? 'modal-title' : undefined}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    >
      <div
        ref={modalRef}
        className={cn(
<<<<<<< HEAD
          "bg-spotify-dark-gray rounded-xl",
          "w-full max-h-[90vh]",
          "flex flex-col",
          "shadow-2xl",
          "transition-all duration-200 ease-out",
          sizeConfig[size],
          className,
        )}
        style={{
          transition:
            "transform 200ms cubic-bezier(0.3, 0, 0.1, 1), opacity 200ms cubic-bezier(0.3, 0, 0.1, 1)",
          transform: "scale(1)",
          opacity: 1,
=======
          'bg-spotify-dark-gray rounded-xl',
          'w-full max-h-[90vh]',
          'flex flex-col',
          'shadow-2xl',
          'transition-all duration-200 ease-out',
          sizeConfig[size],
          className
        )}
        style={{
          transition: 'transform 200ms cubic-bezier(0.3, 0, 0.1, 1), opacity 200ms cubic-bezier(0.3, 0, 0.1, 1)',
          transform: 'scale(1)',
          opacity: 1
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        }}
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
<<<<<<< HEAD
                  <h2
=======
                  <h2 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
=======
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

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
<<<<<<< HEAD
  return <div className={cn("", className)}>{children}</div>;
=======
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
    <div className={cn("flex items-center justify-end gap-3", className)}>
=======
    <div className={cn('flex items-center justify-end gap-3', className)}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
    <div className={cn("flex items-center justify-between", className)}>
=======
    <div className={cn('flex items-center justify-between', className)}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
