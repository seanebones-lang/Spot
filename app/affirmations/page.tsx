'use client';

import { useState } from 'react';
import { useAffirmationsStore } from '@/stores/affirmationsStore';
import { Heart, Play, Clock } from 'lucide-react';

const categories: { value: string; label: string; color: string }[] = [
  { value: 'morning', label: 'Morning', color: 'from-yellow-500 to-orange-500' },
  { value: 'calm', label: 'Calm', color: 'from-blue-500 to-cyan-500' },
  { value: 'confidence', label: 'Confidence', color: 'from-purple-500 to-pink-500' },
  { value: 'empowerment', label: 'Empowerment', color: 'from-green-500 to-emerald-500' },
];

export default function AffirmationsPage() {
  const { affirmations, favorites, addFavorite, removeFavorite, dailyReminder, setDailyReminder } = useAffirmationsStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredAffirmations = selectedCategory
    ? affirmations.filter(a => a.category === selectedCategory)
    : affirmations;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Affirmations</h1>

      {/* Daily Reminder Setting */}
      <div className="bg-spotify-light-gray rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Clock size={20} />
              Daily Reminder
            </h3>
            <p className="text-sm text-spotify-text-gray">
              Get a daily affirmation notification
            </p>
          </div>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={dailyReminder}
              onChange={(e) => setDailyReminder(e.target.checked)}
              className="w-12 h-6 rounded-full appearance-none bg-spotify-dark-gray checked:bg-spotify-green transition-colors relative cursor-pointer"
              style={{
                background: dailyReminder ? '#1DB954' : '#282828',
              }}
            />
          </label>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedCategory === null
                ? 'bg-spotify-green text-black'
                : 'bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === cat.value
                  ? `bg-gradient-to-r ${cat.color} text-white`
                  : 'bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Affirmations List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAffirmations.map((affirmation) => {
          const isFavorite = favorites.includes(affirmation.id);
          return (
            <div
              key={affirmation.id}
              className="bg-spotify-light-gray rounded-lg p-6 hover:bg-spotify-light-gray/80 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-empulse-purple/20 text-empulse-purple rounded-full text-xs font-medium">
                  {categories.find(c => c.value === affirmation.category)?.label}
                </span>
                <button
                  onClick={() => isFavorite ? removeFavorite(affirmation.id) : addFavorite(affirmation.id)}
                  className="text-spotify-text-gray hover:text-red-500 transition-colors"
                >
                  <Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />
                </button>
              </div>
              <p className="text-white mb-4 text-lg leading-relaxed">{affirmation.text}</p>
              <div className="flex items-center gap-2">
                {affirmation.audioUrl && (
                  <button className="flex items-center gap-2 text-spotify-green hover:underline text-sm">
                    <Play size={16} />
                    Play Audio
                  </button>
                )}
                {affirmation.voice === 'artist' && affirmation.artistId && (
                  <span className="text-xs text-spotify-text-gray">Artist voice</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
