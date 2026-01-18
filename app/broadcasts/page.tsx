'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Radio, Play } from 'lucide-react';

const broadcasts = [
  { id: '1', title: 'Live Metal Radio', host: 'NextEleven DJ', listeners: 1234, image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80' },
  { id: '2', title: 'Wellness Soundscape', host: 'Mindful Music', listeners: 856, image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop&q=80' },
];

export default function BroadcastsPage() {
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
        Live Broadcasts
      </h1>
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}
      >
        {broadcasts.map((broadcast) => (
          <div 
            key={broadcast.id} 
            className="bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg overflow-hidden transition-colors group"
            style={{
              backgroundColor: '#181818',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'background-color 200ms ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#282828';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#181818';
            }}
          >
            <div 
              className="relative w-full h-48 bg-spotify-dark-gray"
              style={{
                width: '100%',
                height: '192px',
                backgroundColor: '#282828',
                position: 'relative'
              }}
            >
              {broadcast.image && (
                <Image 
                  src={broadcast.image} 
                  alt={broadcast.title} 
                  fill 
                  className="object-cover"
                  style={{ objectFit: 'cover' }}
                />
              )}
              <div 
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 200ms ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              >
                <button 
                  className="w-16 h-16 bg-spotify-green rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#7209B7',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 200ms ease-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Play 
                    className="w-8 h-8 text-black ml-1"
                    fill="black"
                    style={{
                      width: '32px',
                      height: '32px',
                      color: '#000000',
                      marginLeft: '4px'
                    }}
                  />
                </button>
              </div>
            </div>
            <div 
              className="p-4"
              style={{ padding: '16px' }}
            >
              <h3 
                className="font-bold text-lg mb-1"
                style={{
                  fontSize: '18px',
                  lineHeight: '24px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '4px'
                }}
              >
                {broadcast.title}
              </h3>
              <p 
                className="text-sm text-spotify-text-gray mb-2"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#B3B3B3',
                  marginBottom: '8px'
                }}
              >
                {broadcast.host}
              </p>
              <div 
                className="flex items-center gap-2 text-xs text-spotify-text-gray"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: '#B3B3B3'
                }}
              >
                <Radio 
                  className="w-4 h-4"
                  style={{
                    width: '16px',
                    height: '16px',
                    flexShrink: 0
                  }}
                />
                <span>{broadcast.listeners} listeners</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
