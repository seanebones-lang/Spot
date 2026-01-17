'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Radio, Play } from 'lucide-react';

const broadcasts = [
  { id: '1', title: 'Live Metal Radio', host: 'NextEleven DJ', listeners: 1234, image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80' },
  { id: '2', title: 'Wellness Soundscape', host: 'Mindful Music', listeners: 856, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&q=80' },
];

export default function BroadcastsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Live Broadcasts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {broadcasts.map((broadcast) => (
          <div key={broadcast.id} className="bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg overflow-hidden transition-colors group">
            <div className="relative w-full h-48 bg-spotify-dark-gray">
              {broadcast.image && <Image src={broadcast.image} alt={broadcast.title} fill className="object-cover" />}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-16 h-16 bg-spotify-green rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-black ml-1" fill="black" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{broadcast.title}</h3>
              <p className="text-sm text-spotify-text-gray mb-2">{broadcast.host}</p>
              <div className="flex items-center gap-2 text-xs text-spotify-text-gray">
                <Radio className="w-4 h-4" />
                <span>{broadcast.listeners} listeners</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
