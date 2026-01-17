'use client';

import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '@/lib/data';

export default function UndergroundPage() {
  const artists = mockData.getArtists();
  const albums = mockData.getAlbums();

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Underground</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Emerging Artists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {artists.slice(0, 12).map((artist) => (
            <Link key={artist.id} href={`/artist/${artist.id}`} className="text-center group">
              <div className="w-full aspect-square rounded-full overflow-hidden mb-3 bg-spotify-light-gray">
                {artist.image && <Image src={artist.image} alt={artist.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />}
              </div>
              <h3 className="font-semibold text-white group-hover:underline truncate">{artist.name}</h3>
              <p className="text-sm text-spotify-text-gray">Artist</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
