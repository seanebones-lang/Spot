'use client';

import { useState } from 'react';
import { Search, Award, Flame } from 'lucide-react';
import { usePointsStore } from '@/stores/pointsStore';
import { useCheckInStore } from '@/stores/checkInStore';

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { totalPoints } = usePointsStore();
  const { getStreak } = useCheckInStore();
  const streak = getStreak();

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-spotify-dark/80 backdrop-blur-md z-40 flex items-center justify-between px-8">
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-spotify-text-gray" size={20} />
        <input
          type="text"
          placeholder="What do you want to play?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white rounded-full px-10 py-2 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      {/* Right Side - Points, Streak, Affirmations */}
      <div className="flex items-center gap-6">
        {/* Points Counter */}
        <div className="flex items-center gap-2 text-white">
          <Award size={20} className="text-empulse-blue" />
          <span className="text-sm font-medium">{totalPoints}</span>
        </div>

        {/* Streak Badge */}
        {streak > 0 && (
          <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full">
            <Flame size={16} className="text-orange-500" />
            <span className="text-xs font-medium">{streak} day streak</span>
          </div>
        )}

        {/* Daily Affirmation Button */}
        <button className="bg-empulse-purple hover:bg-empulse-purple/80 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
          Affirmations
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-spotify-light-gray/50 rounded-full p-1 pr-3 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full"></div>
          <span className="text-sm font-medium">User</span>
        </div>
      </div>
    </div>
  );
}
