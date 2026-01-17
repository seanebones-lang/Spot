'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-spotify-dark text-center p-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-spotify-text-gray mb-6">{error.message || 'An unexpected error occurred'}</p>
        <button
          onClick={() => reset()}
          className="btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
