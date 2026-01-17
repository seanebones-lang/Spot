'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Play, Mic2 } from 'lucide-react';

const interviews = [
  { id: '1', artist: 'NextEleven Label Showcase', title: 'The Journey of Metal', duration: '45:30', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop&q=80' },
];

export default function InterviewsPage() {
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Artist Interviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map((interview) => (
          <div key={interview.id} className="bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg overflow-hidden transition-colors group">
            <div className="relative w-full h-48 bg-spotify-dark-gray">
              {interview.image && <Image src={interview.image} alt={interview.title} fill className="object-cover" />}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mic2 className="w-4 h-4 text-spotify-green" />
                <span className="text-xs text-spotify-text-gray">Interview</span>
              </div>
              <h3 className="font-bold text-lg mb-1">{interview.title}</h3>
              <p className="text-sm text-spotify-text-gray mb-2">{interview.artist}</p>
              <p className="text-xs text-spotify-text-gray">{interview.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
