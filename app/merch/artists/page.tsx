'use client';

import Image from 'next/image';

export default function ArtistMerchPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Artist Merchandise</h1>
      <p className="text-spotify-text-gray mb-8">Official merchandise from your favorite artists</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {/* Merch items will be displayed here */}
      </div>
    </div>
  );
}
