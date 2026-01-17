'use client';

import { useState } from 'react';
import { useCheckInStore } from '@/stores/checkInStore';
import { usePointsStore } from '@/stores/pointsStore';
import { useRouter } from 'next/navigation';

export default function CheckInPage() {
  const router = useRouter();
  const { checkIn, getStreak } = useCheckInStore();
  const { addPoints } = usePointsStore();
  
  const [tiredEnergetic, setTiredEnergetic] = useState(50);
  const [lonelyConnected, setLonelyConnected] = useState(50);
  const [stressedRelaxed, setStressedRelaxed] = useState(50);
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [journalEntry, setJournalEntry] = useState('');

  const feelings = ['Anxious', 'Overwhelmed', 'Stressed', 'Tired', 'Lonely', 'Great', 'Confident', 'Relaxed', 'Excited', 'Grateful'];

  const handleComplete = () => {
    const moodData = {
      tired: 100 - tiredEnergetic,
      energetic: tiredEnergetic,
      lonely: 100 - lonelyConnected,
      connected: lonelyConnected,
      stressed: 100 - stressedRelaxed,
      relaxed: stressedRelaxed,
    };

    checkIn(moodData, selectedFeelings, journalEntry || undefined);
    
    // Calculate points (10 base + 5 if journal entry)
    const points = 10 + (journalEntry ? 5 : 0);
    addPoints(points, 'daily-check-in');

    router.push('/');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Daily Mood Check-in</h1>
      <p className="text-spotify-text-gray mb-8">
        Track how you&apos;re feeling today and earn points. Current streak: 🔥 {getStreak()} days
      </p>

      {/* Mood Sliders */}
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">
            Tired ↔ Energetic: {tiredEnergetic}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={tiredEnergetic}
            onChange={(e) => setTiredEnergetic(Number(e.target.value))}
            className="w-full h-2 bg-spotify-light-gray rounded-lg appearance-none cursor-pointer accent-spotify-green"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Lonely ↔ Connected: {lonelyConnected}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={lonelyConnected}
            onChange={(e) => setLonelyConnected(Number(e.target.value))}
            className="w-full h-2 bg-spotify-light-gray rounded-lg appearance-none cursor-pointer accent-spotify-green"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Stressed ↔ Relaxed: {stressedRelaxed}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={stressedRelaxed}
            onChange={(e) => setStressedRelaxed(Number(e.target.value))}
            className="w-full h-2 bg-spotify-light-gray rounded-lg appearance-none cursor-pointer accent-spotify-green"
          />
        </div>
      </div>

      {/* Feeling Chips */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">How are you feeling?</h3>
        <div className="flex flex-wrap gap-2">
          {feelings.map((feeling) => (
            <button
              key={feeling}
              onClick={() => {
                if (selectedFeelings.includes(feeling)) {
                  setSelectedFeelings(selectedFeelings.filter(f => f !== feeling));
                } else {
                  setSelectedFeelings([...selectedFeelings, feeling]);
                }
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFeelings.includes(feeling)
                  ? 'bg-spotify-green text-black'
                  : 'bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80'
              }`}
            >
              {feeling}
            </button>
          ))}
        </div>
      </div>

      {/* Journal Entry */}
      <div className="mb-8">
        <label className="block text-lg font-bold mb-2">Quick Journal Entry (Optional)</label>
        <textarea
          value={journalEntry}
          onChange={(e) => setJournalEntry(e.target.value)}
          placeholder="How are you feeling today? What's on your mind?"
          className="w-full bg-spotify-light-gray rounded-lg p-4 text-white placeholder:text-spotify-text-gray focus:outline-none focus:ring-2 focus:ring-spotify-green min-h-32"
        />
        <p className="text-xs text-spotify-text-gray mt-2">+5 bonus points for journaling</p>
      </div>

      {/* Points Preview */}
      <div className="bg-gradient-to-r from-empulse-purple to-empulse-blue rounded-lg p-4 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-80">Points you&apos;ll earn:</div>
            <div className="text-2xl font-bold">{10 + (journalEntry ? 5 : 0)} points</div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">Your streak:</div>
            <div className="text-2xl font-bold">🔥 {getStreak()} days</div>
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <button
        onClick={handleComplete}
        className="w-full bg-spotify-green hover:bg-spotify-green/80 text-black font-bold py-4 rounded-full text-lg transition-colors"
      >
        Complete Check-in
      </button>
    </div>
  );
}
