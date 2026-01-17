'use client';

import { cn } from '@/lib/utils';

interface FeelingChipsProps {
  selectedFeelings: string[];
  onToggle: (feeling: string) => void;
}

const negativeFeelings = ['Anxious', 'Overwhelmed', 'Stressed', 'Frustrated', 'Tired', 'Lonely', 'Insecure'];
const positiveFeelings = ['Great', 'Confident', 'Relaxed', 'Excited', 'Proud', 'Grateful', 'Optimistic'];

export default function FeelingChips({ selectedFeelings, onToggle }: FeelingChipsProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">2. FEELING</h3>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-red-400 mb-2">Negative</h4>
        <div className="flex flex-wrap gap-2">
          {negativeFeelings.map((feeling) => (
            <button
              key={feeling}
              onClick={() => onToggle(feeling)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedFeelings.includes(feeling)
                  ? "bg-red-600 text-white"
                  : "bg-red-600/20 text-red-400 hover:bg-red-600/40"
              )}
            >
              {feeling}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-green-400 mb-2">Positive</h4>
        <div className="flex flex-wrap gap-2">
          {positiveFeelings.map((feeling) => (
            <button
              key={feeling}
              onClick={() => onToggle(feeling)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedFeelings.includes(feeling)
                  ? "bg-green-600 text-white"
                  : "bg-green-600/20 text-green-400 hover:bg-green-600/40"
              )}
            >
              {feeling}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
