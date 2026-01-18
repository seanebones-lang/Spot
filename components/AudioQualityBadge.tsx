'use client';

import { Track } from '@/types/track';
import { detectAudioFormat, getQualityLabel, getTechnicalSpecs } from '@/lib/audio-format-detection';
import { useState, useEffect } from 'react';

interface AudioQualityBadgeProps {
  track: Track;
  className?: string;
  showSpecs?: boolean;
}

/**
 * Audio Quality Badge Component
 * Displays quality label (Lossless, HiFi, etc.) and technical specs
 */
export default function AudioQualityBadge({ 
  track, 
  className = '',
  showSpecs = false 
}: AudioQualityBadgeProps) {
  const [qualityInfo, setQualityInfo] = useState<{
    label: string;
    specs: string;
  } | null>(null);
  
  useEffect(() => {
    const loadQualityInfo = async () => {
      try {
        let formatInfo;
        
        // Use track format if available, otherwise detect from URL
        if (track.format) {
          const formatMap: Record<string, any> = {
            'MP3': { format: 'mp3' as const, mimeType: 'audio/mpeg', codec: 'MP3' },
            'WAV': { format: 'wav' as const, mimeType: 'audio/wav', codec: 'PCM' },
            'FLAC': { format: 'flac' as const, mimeType: 'audio/flac', codec: 'FLAC' },
            'M4A': { format: 'm4a' as const, mimeType: 'audio/mp4', codec: 'AAC' },
          };
          formatInfo = formatMap[track.format.toUpperCase()] || await detectAudioFormat(track.audioUrl);
        } else {
          formatInfo = await detectAudioFormat(track.audioUrl);
        }
        
        const label = getQualityLabel(formatInfo);
        const specs = getTechnicalSpecs(formatInfo);
        
        setQualityInfo({ label, specs });
      } catch (error) {
        console.error('Failed to detect audio format:', error);
        setQualityInfo({ label: 'Standard', specs: 'MP3' });
      }
    };
    
    if (track) {
      loadQualityInfo();
    }
  }, [track]);
  
  if (!qualityInfo) {
    return null;
  }
  
  const { label, specs } = qualityInfo;
  
  // Quality badge colors
  const qualityColors: Record<string, string> = {
    'Lossless': 'bg-purple-600 text-white',
    'Ultra HiFi': 'bg-purple-700 text-white',
    'HiFi': 'bg-blue-600 text-white',
    'High': 'bg-spotify-green text-white',
    'Standard': 'bg-spotify-text-gray text-white',
  };
  
  const colorClass = qualityColors[label] || qualityColors['Standard'];
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`px-2 py-0.5 rounded text-xs font-semibold ${colorClass}`}>
        {label === 'Lossless' || label === 'Ultra HiFi' ? '🎧 ' : ''}
        {label}
      </div>
      {showSpecs && (
        <div className="text-xs text-spotify-text-gray" title={specs}>
          {specs}
        </div>
      )}
    </div>
  );
}
