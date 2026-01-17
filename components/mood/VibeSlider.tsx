'use client';

import { useState, useRef } from 'react';

interface VibeSliderProps {
  value: number; // 0-100
  onChange: (value: number) => void;
}

export default function VibeSlider({ value, onChange }: VibeSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleMove(e);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      onChange(percent);
    }
  };

  const getGradient = () => {
    // Gradient from dark blue (calm) to bright yellow (energetic)
    const percent = value / 100;
    if (percent < 0.5) {
      // Calm side: dark blue to light blue
      return `linear-gradient(to right, #1e3a8a, #3b82f6)`;
    } else {
      // Energetic side: yellow to orange
      return `linear-gradient(to right, #fbbf24, #f97316)`;
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">3. VIBE</h3>
      <div className="relative">
        <div
          ref={sliderRef}
          className="h-12 rounded-full cursor-pointer relative"
          style={{ background: getGradient() }}
          onMouseDown={handleMouseDown}
          onMouseMove={isDragging ? handleMove : undefined}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing"
            style={{ left: `calc(${value}% - 12px)` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-spotify-text-gray">
          <span>Calm</span>
          <span className="font-medium">{Math.round(value)}% Energetic</span>
          <span>Energetic</span>
        </div>
      </div>
    </div>
  );
}
