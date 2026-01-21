"use client";

import { cn } from "@/lib/utils";

interface FeelingChipsProps {
  selectedFeelings: string[];
  onToggle: (feeling: string) => void;
}

const negativeFeelings = [
  "Anxious",
  "Overwhelmed",
  "Stressed",
  "Frustrated",
  "Tired",
  "Lonely",
  "Insecure",
];
const positiveFeelings = [
  "Great",
  "Confident",
  "Relaxed",
  "Excited",
  "Proud",
  "Grateful",
  "Optimistic",
];

export default function FeelingChips({
  selectedFeelings,
  onToggle,
}: FeelingChipsProps) {
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
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                "bg-transparent border-2",
                selectedFeelings.includes(feeling)
                  ? "border-red-600 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                  : "border-red-600/50 text-red-400 hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.6)]",
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
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                "bg-transparent border-2",
                selectedFeelings.includes(feeling)
                  ? "border-green-600 text-green-400 shadow-[0_0_15px_rgba(22,163,74,0.5)]"
                  : "border-green-600/50 text-green-400 hover:border-green-600 hover:shadow-[0_0_20px_rgba(22,163,74,0.6)]",
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
