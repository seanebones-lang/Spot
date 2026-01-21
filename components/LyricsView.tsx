<<<<<<< HEAD
"use client";

import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/stores/playerStore";
import { cn } from "@/lib/utils";
=======
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import { cn } from '@/lib/utils';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface LyricsLine {
  time: number; // seconds
  text: string;
}

interface LyricsViewProps {
  className?: string;
}

// Mock lyrics data - in production, this would come from an API
const mockLyrics: Record<string, LyricsLine[]> = {
<<<<<<< HEAD
  default: [{ time: 0, text: "Lyrics not available for this track" }],
=======
  'default': [
    { time: 0, text: 'Lyrics not available for this track' },
  ],
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
};

export default function LyricsView({ className }: LyricsViewProps) {
  const { currentTrack, progress, isPlaying } = usePlayerStore();
  const [lyrics, setLyrics] = useState<LyricsLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const lyricsRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (currentTrack) {
      // In production, fetch lyrics from API
      // For now, use mock data or generate placeholder
<<<<<<< HEAD
      const trackLyrics = mockLyrics[currentTrack.id] || mockLyrics["default"];

      // If no lyrics, generate placeholder based on track name
      if (trackLyrics === mockLyrics["default"] && currentTrack.name) {
        setLyrics([
          { time: 0, text: currentTrack.name },
          { time: 5, text: "Lyrics will be available soon" },
          { time: 10, text: "Stay tuned for updates" },
=======
      const trackLyrics = mockLyrics[currentTrack.id] || mockLyrics['default'];
      
      // If no lyrics, generate placeholder based on track name
      if (trackLyrics === mockLyrics['default'] && currentTrack.name) {
        setLyrics([
          { time: 0, text: currentTrack.name },
          { time: 5, text: 'Lyrics will be available soon' },
          { time: 10, text: 'Stay tuned for updates' },
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        ]);
      } else {
        setLyrics(trackLyrics);
      }
      setCurrentLineIndex(0);
    }
  }, [currentTrack]);

  // Calculate current time in seconds from progress
<<<<<<< HEAD
  const currentTime = currentTrack
    ? (progress / 100) * currentTrack.duration
=======
  const currentTime = currentTrack 
    ? (progress / 100) * currentTrack.duration 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    : 0;

  // Find current line based on time
  useEffect(() => {
    if (!isPlaying || lyrics.length === 0) return;

    let newIndex = 0;
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        newIndex = i;
        break;
      }
    }

    if (newIndex !== currentLineIndex) {
      setCurrentLineIndex(newIndex);
<<<<<<< HEAD

=======
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Scroll to active line
      const activeElement = lineRefs.current[newIndex];
      if (activeElement && lyricsRef.current) {
        const container = lyricsRef.current;
        const elementTop = activeElement.offsetTop;
        const elementHeight = activeElement.offsetHeight;
        const containerHeight = container.clientHeight;
        const scrollTop = container.scrollTop;

        // Center the active line in view
<<<<<<< HEAD
        const targetScroll =
          elementTop - containerHeight / 2 + elementHeight / 2;
        container.scrollTo({
          top: targetScroll,
          behavior: "smooth",
=======
        const targetScroll = elementTop - (containerHeight / 2) + (elementHeight / 2);
        container.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        });
      }
    }
  }, [currentTime, isPlaying, lyrics, currentLineIndex]);

  if (!currentTrack) {
    return (
<<<<<<< HEAD
      <div
        className={cn(
          "flex items-center justify-center h-full text-spotify-text-gray",
          className,
        )}
      >
=======
      <div className={cn("flex items-center justify-center h-full text-spotify-text-gray", className)}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        <p>No track playing</p>
      </div>
    );
  }

  return (
    <div className={cn("h-full overflow-y-auto custom-scrollbar", className)}>
      <div ref={lyricsRef} className="px-6 py-8 space-y-4">
        {lyrics.map((line, index) => {
          const isActive = index === currentLineIndex;
          return (
            <div
              key={index}
<<<<<<< HEAD
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              className={cn(
                "transition-all duration-300",
                isActive
                  ? "text-white text-xl font-semibold"
                  : "text-spotify-text-gray text-lg",
              )}
              style={{
                transform: isActive ? "scale(1.05)" : "scale(1)",
=======
              ref={(el) => { lineRefs.current[index] = el; }}
              className={cn(
                "transition-all duration-300",
                isActive 
                  ? "text-white text-xl font-semibold" 
                  : "text-spotify-text-gray text-lg"
              )}
              style={{
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                opacity: isActive ? 1 : 0.6,
              }}
            >
              {line.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
