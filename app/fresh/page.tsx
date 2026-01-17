'use client';

import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '@/lib/data';

export default function FreshFindsPage() {
  const albums = mockData.getAlbums();
  const playlists = mockData.getPlaylists();

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Fresh Finds</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">New Releases</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {albums.slice(0, 12).map((album) => (
            <Link key={album.id} href={`/album/${album.id}`} className="group bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg p-4 transition-colors">
              <div className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray">
                {album.coverArt && <Image src={album.coverArt} alt={album.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />}
              </div>
              <h3 className="font-semibold text-sm text-white mb-1 truncate">{album.name}</h3>
              <p className="text-xs text-spotify-text-gray truncate">{album.artist.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
