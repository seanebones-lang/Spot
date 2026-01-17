'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '@/lib/data';

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const tracks = mockData.getTracks();
  const playlists = mockData.getPlaylists();

  const categoryTitles: Record<string, string> = {
    mhz: 'MHz Sounds',
    withdrawal: 'Withdrawal Sounds',
    anxiety: 'Anxiety Relief',
    depression: 'Depression Support',
    ptsd: 'PTSD Healing',
    recovery: 'Addiction Recovery',
    grief: 'Grief Support',
    trauma: 'Trauma Healing',
  };

  const title = categoryTitles[category] || category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {playlists.slice(0, 12).map((playlist) => (
          <Link key={playlist.id} href={`/playlist/${playlist.id}`} className="group bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg p-4 transition-colors">
            <div className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray">
              {playlist.coverArt && <Image src={playlist.coverArt} alt={playlist.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />}
            </div>
            <h3 className="font-semibold text-sm text-white mb-1 truncate">{playlist.name}</h3>
            <p className="text-xs text-spotify-text-gray truncate">{playlist.owner}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
