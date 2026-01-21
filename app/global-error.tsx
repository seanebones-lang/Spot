<<<<<<< HEAD
"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";
=======
'use client';

import { useEffect } from 'react';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
<<<<<<< HEAD
    logger.error("Global error boundary caught error", error, {
      digest: error.digest,
      stack: error.stack,
    });
=======
    console.error('Global error:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen bg-spotify-dark text-center p-8">
          <div>
<<<<<<< HEAD
            <h2 className="text-2xl font-bold mb-4 text-white">
              Something went wrong!
            </h2>
            <p className="text-spotify-text-gray mb-6">
              {error.message ||
                "An unexpected error occurred. Please refresh the page."}
=======
            <h2 className="text-2xl font-bold mb-4 text-white">Something went wrong!</h2>
            <p className="text-spotify-text-gray mb-6">
              {error.message || 'An unexpected error occurred. Please refresh the page.'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-transparent border-2 border-spotify-green text-spotify-green hover:shadow-[0_0_20px_rgba(29,185,84,0.6)] rounded-full font-semibold transition-all duration-300"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
