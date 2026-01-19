"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorToastProps {
  message: string;
  onRetry?: () => void;
  onDismiss: () => void;
  autoDismiss?: boolean;
  autoDismissDelay?: number;
}

export default function ErrorToast({
  message,
  onRetry,
  onDismiss,
  autoDismiss = true,
  autoDismissDelay = 5000,
}: ErrorToastProps) {
  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, autoDismissDelay);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, autoDismissDelay, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "fixed bottom-24 left-1/2 transform -translate-x-1/2",
        "bg-red-600 text-white px-6 py-3 rounded-lg shadow-2xl z-50",
        "flex items-center gap-4 max-w-md",
        "opacity-100 transition-opacity duration-300",
      )}
      style={{
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
          aria-label="Retry action"
        >
          Retry
        </button>
      )}
      <button
        onClick={onDismiss}
        className="flex-shrink-0 p-1 hover:bg-white/20 rounded-md transition-colors"
        aria-label="Dismiss error message"
      >
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
