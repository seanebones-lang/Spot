<<<<<<< HEAD
"use client";

import { useEffect } from "react";
=======
'use client';

import { useEffect } from 'react';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Global Error Handler Component
 * Catches unhandled errors and promise rejections to prevent app crashes
 * and provides better error logging
 */
<<<<<<< HEAD
export default function GlobalErrorHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Global error:", event.error);
=======
export default function GlobalErrorHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Prevent default crash
      event.preventDefault();
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
<<<<<<< HEAD
      console.error("Unhandled promise rejection:", event.reason);
      event.preventDefault();
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
=======
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    };
  }, []);

  return <>{children}</>;
}
