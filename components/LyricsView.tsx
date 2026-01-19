"use client";

import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/stores/playerStore";
import { cn } from "@/lib/utils";

interface LyricsLine {
  time: number; // seconds
  text: string;
}

interface LyricsViewProps {
  className?: string;
}

// Mock lyrics data - in production, this would come from an API
const mockLyrics: Record<string, LyricsLine[]> = {
  default: [{ time: 0, text: "Lyrics not available for this track" }],
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
      const trackLyrics = mockLyrics[currentTrack.id] || mockLyrics["default"];

      // If no lyrics, generate placeholder based on track name
      if (trackLyrics === mockLyrics["default"] && currentTrack.name) {
        setLyrics([
          { time: 0, text: currentTrack.name },
          { time: 5, text: "Lyrics will be available soon" },
          { time: 10, text: "Stay tuned for updates" },
        ]);
      } else {
        setLyrics(trackLyrics);
      }
      setCurrentLineIndex(0);
    }
  }, [currentTrack]);

  // Calculate current time in seconds from progress
  const currentTime = currentTrack
    ? (progress / 100) * currentTrack.duration
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

      // Scroll to active line
      const activeElement = lineRefs.current[newIndex];
      if (activeElement && lyricsRef.current) {
        const container = lyricsRef.current;
        const elementTop = activeElement.offsetTop;
        const elementHeight = activeElement.offsetHeight;
        const containerHeight = container.clientHeight;
        const scrollTop = container.scrollTop;

        // Center the active line in view
        const targetScroll =
          elementTop - containerHeight / 2 + elementHeight / 2;
        container.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      }
    }
  }, [currentTime, isPlaying, lyrics, currentLineIndex]);

  if (!currentTrack) {
    return (
      <div
        className={cn(
          "flex items-center justify-center h-full text-spotify-text-gray",
          className,
        )}
      >
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
