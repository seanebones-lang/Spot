<<<<<<< HEAD
"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";
=======
'use client';

import { useEffect } from 'react';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
<<<<<<< HEAD
    logger.error("Error page caught error", error, {
      digest: error.digest,
      stack: error.stack,
    });
=======
    console.error(error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-spotify-dark text-white text-center p-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
<<<<<<< HEAD
        <p className="text-spotify-text-gray mb-6">
          {error.message || "An unexpected error occurred"}
        </p>
=======
        <p className="text-spotify-text-gray mb-6">{error.message || 'An unexpected error occurred'}</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-transparent border-2 border-spotify-green text-spotify-green hover:shadow-[0_0_20px_rgba(29,185,84,0.6)] rounded-full font-semibold transition-all duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
