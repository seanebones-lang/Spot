'use client';

import { useEffect } from 'react';

/**
 * Global Error Handler Component
 * Catches unhandled errors and promise rejections to prevent app crashes
 * and provides better error logging
 */
export default function GlobalErrorHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      // Prevent default crash
      event.preventDefault();
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return <>{children}</>;
}
