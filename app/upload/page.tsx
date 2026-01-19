'use client';

import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-spotify-black">
      <div className="max-w-md w-full bg-spotify-dark-gray rounded-lg p-8 text-center">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-spotify-text-gray" />
        <h1 className="text-2xl font-bold text-white mb-4">Upload Disabled</h1>
        <p className="text-spotify-text-gray mb-6">
          Audio and image uploads are currently disabled. This is a UI-only demo mode.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-spotify-green text-black font-semibold rounded-full hover:bg-opacity-90 transition-all"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
