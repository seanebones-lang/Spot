'use client';

import Image from 'next/image';
import PlayButton from '@/components/PlayButton';
import { mockData } from '@/lib/data';
import { usePlayerStore } from '@/stores/playerStore';

export default function ViralPage() {
  const tracks = mockData.getTracks();
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = usePlayerStore();

  return (
    <div 
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        padding: '32px',
        color: '#FFFFFF'
      }}
    >
      <h1 
        className="text-4xl font-bold mb-8"
        style={{
          fontSize: '32px',
          lineHeight: '36px',
          fontWeight: 700,
          color: '#FFFFFF',
          marginBottom: '32px'
        }}
      >
        Viral Hits
      </h1>
      <div 
        className="space-y-2"
        style={{ gap: '8px' }}
      >
        {tracks.slice(0, 50).map((track) => (
          <div 
            key={track.id} 
            className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg group"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px 16px',
              borderRadius: '4px',
              transition: 'background-color 200ms ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div 
              className="w-14 h-14 bg-spotify-dark-gray rounded relative"
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#282828',
                borderRadius: '4px',
                position: 'relative',
                flexShrink: 0
              }}
            >
              {track.coverArt && (
                <Image 
                  src={track.coverArt} 
                  alt={track.name} 
                  fill 
                  className="object-cover rounded"
                  style={{ borderRadius: '4px' }}
                />
              )}
            </div>
            <div 
              className="flex-1 min-w-0"
              style={{
                flex: '1 1 0%',
                minWidth: 0
              }}
            >
              <div 
                className="font-medium text-white truncate"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 400,
                  color: '#FFFFFF'
                }}
              >
                {track.name}
              </div>
              <div 
                className="text-sm text-spotify-text-gray truncate"
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: '#B3B3B3'
                }}
              >
                {track.artist}
              </div>
            </div>
            <div 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                transition: 'opacity 200ms ease-out'
              }}
            >
              <PlayButton 
                isPlaying={currentTrack?.id === track.id && isPlaying} 
                onClick={() => { 
                  setCurrentTrack(track); 
                  setIsPlaying(true); 
                }} 
                size="sm" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
