'use client';

import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number; // 0-100
  onVolumeChange: (volume: number) => void;
}

export default function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  const [isDragging, setIsDragging] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (barRef.current) {
      const rect = barRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const volumePercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      onVolumeChange(volumePercent);
    }
  };

  const handleMute = () => {
    onVolumeChange(volume > 0 ? 0 : 50);
  };

  return (
    <div className="flex items-center gap-2 w-32">
      <button
        onClick={handleMute}
        className="text-spotify-text-gray hover:text-white transition-colors"
      >
        {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <div
        ref={barRef}
        className="flex-1 h-1 bg-spotify-text-gray/30 rounded-full cursor-pointer relative group"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleSeek(e);
        }}
        onMouseMove={(e) => isDragging && handleSeek(e)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <div
          className="h-full bg-white rounded-full transition-all group-hover:bg-spotify-green"
          style={{ width: `${volume}%` }}
        />
      </div>
    </div>
  );
}
