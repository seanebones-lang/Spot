<<<<<<< HEAD
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { mockData } from "@/lib/data";
import PlayButton from "@/components/PlayButton";
import { usePlayerStore } from "@/stores/playerStore";
import { cn } from "@/lib/utils";

export default function ChartsPage() {
  const [timeRange, setTimeRange] = useState<
    "today" | "week" | "month" | "year"
  >("today");
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } =
    usePlayerStore();
=======
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '@/lib/data';
import PlayButton from '@/components/PlayButton';
import { usePlayerStore } from '@/stores/playerStore';
import { cn } from '@/lib/utils';

export default function ChartsPage() {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('today');
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = usePlayerStore();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const tracks = mockData.getTracks();

  // Mock chart data - in production, this would come from API
  const chartTracks = tracks.slice(0, 50).map((track, index) => ({
    ...track,
    position: index + 1,
<<<<<<< HEAD
    change: index % 3 === 0 ? "up" : index % 3 === 1 ? "down" : "same",
    streams: Math.floor(Math.random() * 10000000),
  }));

  return (
    <div
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: "32px",
        color: "#FFFFFF",
      }}
    >
      <div className="mb-8" style={{ marginBottom: "32px" }}>
        <h1
          className="text-4xl font-bold mb-2"
          style={{
            fontSize: "32px",
            lineHeight: "36px",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "8px",
=======
    change: index % 3 === 0 ? 'up' : index % 3 === 1 ? 'down' : 'same',
    streams: Math.floor(Math.random() * 10000000)
  }));

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
      <div 
        className="mb-8"
        style={{ marginBottom: '32px' }}
      >
        <h1 
          className="text-4xl font-bold mb-2"
          style={{
            fontSize: '32px',
            lineHeight: '36px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '8px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Top Charts
        </h1>
<<<<<<< HEAD
        <div
          className="flex items-center gap-2 mt-4"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "16px",
          }}
        >
          {(["today", "week", "month", "year"] as const).map((range) => (
=======
        <div 
          className="flex items-center gap-2 mt-4"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '16px'
          }}
        >
          {(['today', 'week', 'month', 'year'] as const).map((range) => (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "rounded-full font-medium transition-colors capitalize",
                timeRange === range
<<<<<<< HEAD
                  ? "bg-white text-black hover:bg-[#f5f5f5]"
                  : "bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10",
              )}
              style={{
                padding: "6px 16px",
                borderRadius: "500px",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                transition: "all 200ms ease-out",
                backgroundColor:
                  timeRange === range ? "#FFFFFF" : "transparent",
                color: timeRange === range ? "#000000" : "#B3B3B3",
                border: "none",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
              onMouseEnter={(e) => {
                if (timeRange !== range) {
                  e.currentTarget.style.color = "#FFFFFF";
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.1)";
                } else {
                  e.currentTarget.style.backgroundColor = "#f5f5f5";
=======
                  ? 'bg-white text-black hover:bg-[#f5f5f5]'
                  : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
              )}
              style={{
                padding: '6px 16px',
                borderRadius: '500px',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                transition: 'all 200ms ease-out',
                backgroundColor: timeRange === range ? '#FFFFFF' : 'transparent',
                color: timeRange === range ? '#000000' : '#B3B3B3',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
              onMouseEnter={(e) => {
                if (timeRange !== range) {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }
              }}
              onMouseLeave={(e) => {
                if (timeRange !== range) {
<<<<<<< HEAD
                  e.currentTarget.style.color = "#B3B3B3";
                  e.currentTarget.style.backgroundColor = "transparent";
                } else {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
=======
                  e.currentTarget.style.color = '#B3B3B3';
                  e.currentTarget.style.backgroundColor = 'transparent';
                } else {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

<<<<<<< HEAD
      <div
        className="bg-spotify-light-gray rounded-lg overflow-hidden"
        style={{
          backgroundColor: "#181818",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          className="grid grid-cols-[40px_1fr_200px_100px] gap-4 px-6 py-3 border-b border-white/10 text-sm font-medium text-spotify-text-gray"
          style={{
            display: "grid",
            gridTemplateColumns: "40px 1fr 200px 100px",
            gap: "16px",
            padding: "12px 24px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "11px",
            lineHeight: "16px",
            fontWeight: 400,
            color: "#B3B3B3",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
=======
      <div 
        className="bg-spotify-light-gray rounded-lg overflow-hidden"
        style={{
          backgroundColor: '#181818',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <div 
          className="grid grid-cols-[40px_1fr_200px_100px] gap-4 px-6 py-3 border-b border-white/10 text-sm font-medium text-spotify-text-gray"
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 200px 100px',
            gap: '16px',
            padding: '12px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '11px',
            lineHeight: '16px',
            fontWeight: 400,
            color: '#B3B3B3',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          <div>#</div>
          <div>Title</div>
          <div>Streams</div>
          <div>Change</div>
        </div>

<<<<<<< HEAD
        <div
          className="divide-y divide-white/10"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
=======
        <div 
          className="divide-y divide-white/10"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          {chartTracks.map((track) => (
            <div
              key={track.id}
              className="grid grid-cols-[40px_1fr_200px_100px] gap-4 px-6 py-3 hover:bg-white/5 group items-center"
              style={{
<<<<<<< HEAD
                display: "grid",
                gridTemplateColumns: "40px 1fr 200px 100px",
                gap: "16px",
                padding: "12px 24px",
                transition: "background-color 200ms ease-out",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div
                className="text-spotify-text-gray font-medium"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "#B3B3B3",
=======
                display: 'grid',
                gridTemplateColumns: '40px 1fr 200px 100px',
                gap: '16px',
                padding: '12px 24px',
                transition: 'background-color 200ms ease-out',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <div 
                className="text-spotify-text-gray font-medium"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 400,
                  color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                {track.position}
              </div>
<<<<<<< HEAD

              <div
                className="flex items-center gap-4 min-w-0"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  minWidth: 0,
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
              
              <div 
                className="flex items-center gap-4 min-w-0"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  minWidth: 0
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
                  {track.coverArt && (
                    <Image
                      src={track.coverArt}
                      alt={track.name}
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
                    {track.name}
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
                    {track.artist}
                  </div>
                </div>
<<<<<<< HEAD
                <div
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    transition: "opacity 200ms ease-out",
=======
                <div 
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    transition: 'opacity 200ms ease-out'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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

<<<<<<< HEAD
              <div
                className="text-spotify-text-gray text-sm"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#B3B3B3",
=======
              <div 
                className="text-spotify-text-gray text-sm"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#B3B3B3'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }}
              >
                {track.streams.toLocaleString()}
              </div>

<<<<<<< HEAD
              <div
                className="text-sm"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                }}
              >
                {track.change === "up" && (
                  <span
                    className="text-spotify-green"
                    style={{ color: "#1DB954" }}
=======
              <div 
                className="text-sm"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px'
                }}
              >
                {track.change === 'up' && (
                  <span 
                    className="text-spotify-green"
                    style={{ color: '#7209B7' }}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  >
                    ↑
                  </span>
                )}
<<<<<<< HEAD
                {track.change === "down" && (
                  <span className="text-red-400" style={{ color: "#EF4444" }}>
                    ↓
                  </span>
                )}
                {track.change === "same" && (
                  <span
                    className="text-spotify-text-gray"
                    style={{ color: "#B3B3B3" }}
=======
                {track.change === 'down' && (
                  <span 
                    className="text-red-400"
                    style={{ color: '#EF4444' }}
                  >
                    ↓
                  </span>
                )}
                {track.change === 'same' && (
                  <span 
                    className="text-spotify-text-gray"
                    style={{ color: '#B3B3B3' }}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  >
                    -
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
