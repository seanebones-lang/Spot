'use client';

import { Radio as RadioIcon, Mic } from 'lucide-react';
import PlayButton from '@/components/PlayButton';

const radioStations = [
  { id: '1', name: 'Pop Radio', genre: 'Pop' },
  { id: '2', name: 'Rock Radio', genre: 'Rock' },
  { id: '3', name: 'Electronic Radio', genre: 'Electronic' },
  { id: '4', name: 'Hip-Hop Radio', genre: 'Hip-Hop' },
  { id: '5', name: 'Jazz Radio', genre: 'Jazz' },
  { id: '6', name: 'Classical Radio', genre: 'Classical' },
  { id: '7', name: 'Mental Health Podcasts', genre: 'Podcasts', icon: Mic },
];

export default function RadioPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Radio Stations</h1>

      {/* Featured Stations */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Stations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {radioStations.map((station) => {
            const Icon = station.icon || RadioIcon;
            return (
              <div
                key={station.id}
                className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80 transition-colors group cursor-pointer"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-lg mb-3 flex items-center justify-center">
                  <Icon size={32} className="text-white opacity-50" />
                </div>
                <h3 className="font-semibold text-sm truncate mb-1">{station.name}</h3>
                <p className="text-xs text-spotify-text-gray">{station.genre}</p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                  <PlayButton isPlaying={false} onClick={() => {}} size="sm" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mental Health Podcasts Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Mental Health Podcasts</h2>
        <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-lg p-6 border border-green-600/30">
          <div className="flex items-start gap-4">
            <Mic size={48} className="text-green-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Wellness & Recovery Podcasts</h3>
              <p className="text-spotify-text-gray mb-4">
                Stories of resilience, expert advice, and community support for mental health and recovery journeys.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Recovery Stories', 'Mindfulness', 'Therapy Talk', 'Community Support', 'Coping Strategies'].map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 bg-green-600/30 text-green-400 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Custom Station */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Create Custom Station</h2>
        <div className="bg-spotify-light-gray rounded-lg p-6">
          <p className="text-spotify-text-gray mb-4">
            Build your own radio station based on mood, genre, or artist preferences
          </p>
          <button className="btn-primary">
            Create Station
          </button>
        </div>
      </section>
    </div>
  );
}
