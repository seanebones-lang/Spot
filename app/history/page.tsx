<<<<<<< HEAD
"use client";

import Image from "next/image";
import PlayButton from "@/components/PlayButton";
import { mockData } from "@/lib/data";
import { usePlayerStore } from "@/stores/playerStore";
import { cn } from "@/lib/utils";

export default function HistoryPage() {
  const tracks = mockData.getTracks();
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } =
    usePlayerStore();
=======
'use client';

import Image from 'next/image';
import PlayButton from '@/components/PlayButton';
import { mockData } from '@/lib/data';
import { usePlayerStore } from '@/stores/playerStore';
import { cn } from '@/lib/utils';

export default function HistoryPage() {
  const tracks = mockData.getTracks();
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = usePlayerStore();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

  // Mock playback history
  const history = tracks.slice(0, 50).map((track, index) => ({
    ...track,
    playedAt: new Date(Date.now() - index * 60000 * 15), // Mock timestamps
  }));

  return (
<<<<<<< HEAD
    <div
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: "32px",
        color: "#FFFFFF",
      }}
    >
      <h1
        className="text-4xl font-bold mb-8"
        style={{
          fontSize: "32px",
          lineHeight: "36px",
          fontWeight: 700,
          color: "#FFFFFF",
          marginBottom: "32px",
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        }}
      >
        Recently Played
      </h1>

<<<<<<< HEAD
      <div className="space-y-2" style={{ gap: "8px" }}>
=======
      <div 
        className="space-y-2"
        style={{ gap: '8px' }}
      >
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg group"
            style={{
<<<<<<< HEAD
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "12px 16px",
              borderRadius: "4px",
              transition: "background-color 200ms ease-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <div
              className="w-14 h-14 bg-spotify-dark-gray rounded flex-shrink-0 relative"
              style={{
                width: "56px",
                height: "56px",
                backgroundColor: "#282828",
                borderRadius: "4px",
                flexShrink: 0,
                position: "relative",
=======
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
              className="w-14 h-14 bg-spotify-dark-gray rounded flex-shrink-0 relative"
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#282828',
                borderRadius: '4px',
                flexShrink: 0,
                position: 'relative'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              {item.coverArt && (
                <Image
                  src={item.coverArt}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
<<<<<<< HEAD
                  style={{ borderRadius: "4px" }}
                />
              )}
            </div>
            <div
              className="flex-1 min-w-0"
              style={{
                flex: "1 1 0%",
                minWidth: 0,
              }}
            >
              <div
                className="font-medium text-white truncate"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#FFFFFF",
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                {item.name}
              </div>
<<<<<<< HEAD
              <div
                className="text-sm text-spotify-text-gray truncate"
                style={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
=======
              <div 
                className="text-sm text-spotify-text-gray truncate"
                style={{
                  fontSize: '13px',
                  lineHeight: '16px',
                  color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                {item.artist}
              </div>
            </div>
<<<<<<< HEAD
            <div
              className="text-sm text-spotify-text-gray whitespace-nowrap"
              style={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#B3B3B3",
                whiteSpace: "nowrap",
              }}
            >
              {item.playedAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                transition: "opacity 200ms ease-out",
=======
            <div 
              className="text-sm text-spotify-text-gray whitespace-nowrap"
              style={{
                fontSize: '14px',
                lineHeight: '20px',
                color: '#B3B3B3',
                whiteSpace: 'nowrap'
              }}
            >
              {item.playedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div 
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                transition: 'opacity 200ms ease-out'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            >
              <PlayButton
                isPlaying={currentTrack?.id === item.id && isPlaying}
                onClick={() => {
                  setCurrentTrack(item);
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
