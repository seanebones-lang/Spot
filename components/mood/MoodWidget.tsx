'use client';

import { useState } from 'react';
import { Track } from '@/types/track';
import { Heart } from 'lucide-react';
import Tooltip from '@/components/Tooltip';

interface MoodWidgetProps {
  track: Track;
}

export default function MoodWidget({ track }: MoodWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!track.moodTags) return null;

  return (
    <Tooltip
      text="Click to see mood details and find similar tracks"
      position="top"
      showOnHover={true}
    >
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-spotify-light-gray/50 hover:bg-spotify-light-gray rounded-full text-xs transition-colors"
          aria-label="View mood details and find similar tracks"
        >
          <Heart size={14} className="text-empulse-purple" />
          <span className="text-white/80">Mood: {track.moodTags.mood}</span>
        </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full right-0 mb-2 w-80 bg-spotify-dark-gray rounded-lg p-4 shadow-2xl z-50 border border-spotify-light-gray">
            <h3 className="font-bold mb-3 text-sm">Current Track Mood</h3>
            
            {/* Mood Breakdown */}
            <div className="space-y-2 mb-4">
              <div>
                <div className="text-xs text-spotify-text-gray mb-1">Mood</div>
                <span className="px-2 py-1 bg-empulse-purple/20 text-empulse-purple rounded text-xs">
                  {track.moodTags.mood}
                </span>
              </div>
              
              {track.moodTags.feelings && track.moodTags.feelings.length > 0 && (
                <div>
                  <div className="text-xs text-spotify-text-gray mb-1">Feelings</div>
                  <div className="flex flex-wrap gap-1">
                    {track.moodTags.feelings.map((feeling) => (
                      <span key={feeling} className="px-2 py-1 bg-empulse-blue/20 text-empulse-blue rounded text-xs">
                        {feeling}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <div className="text-xs text-spotify-text-gray mb-1">Vibe</div>
                <div className="text-xs text-white">{track.moodTags.vibe}% Energetic</div>
              </div>
              
              {track.moodTags.genres && track.moodTags.genres.length > 0 && (
                <div>
                  <div className="text-xs text-spotify-text-gray mb-1">Genres</div>
                  <div className="flex flex-wrap gap-1">
                    {track.moodTags.genres.map((genre) => (
                      <span key={genre} className="px-2 py-1 bg-spotify-green/20 text-spotify-green rounded text-xs">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button className="w-full bg-spotify-green text-black py-2 rounded-full text-sm font-medium hover:bg-spotify-green/80">
              Find Similar Tracks
            </button>
          </div>
        </>
      )}
      </div>
    </Tooltip>
  );
}
