'use client';

import { MoodState } from '@/types/mood';
import { cn } from '@/lib/utils';

interface MoodSelectorProps {
  selectedMood: MoodState | null;
  onSelect: (mood: MoodState) => void;
}

const moods: { value: MoodState; label: string; color: string }[] = [
  { value: 'Melancholic', label: 'Melancholic', color: 'from-blue-600 to-blue-800' },
  { value: 'Nostalgic', label: 'Nostalgic', color: 'from-purple-600 to-purple-800' },
  { value: 'Reflective', label: 'Reflective', color: 'from-indigo-600 to-indigo-800' },
  { value: 'Content', label: 'Content', color: 'from-green-600 to-green-800' },
  { value: 'Joyful', label: 'Joyful', color: 'from-yellow-500 to-orange-500' },
  { value: 'Euphoric', label: 'Euphoric', color: 'from-pink-500 to-red-500' },
];

export default function MoodSelector({ selectedMood, onSelect }: MoodSelectorProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">1. MOOD</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onSelect(mood.value)}
            className={cn(
              "p-6 rounded-lg text-white font-semibold transition-transform hover:scale-105",
              `bg-gradient-to-br ${mood.color}`,
              selectedMood === mood.value && "ring-4 ring-spotify-green ring-offset-2 ring-offset-spotify-dark"
            )}
          >
            {mood.label}
          </button>
        ))}
      </div>
    </div>
  );
}
