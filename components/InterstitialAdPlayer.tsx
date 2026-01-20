"use client";

import { useState, useEffect, useRef } from "react";
import { X, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/stores/playerStore";

interface InterstitialAdPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip?: () => void;
  adContent?: {
    title: string;
    description: string;
    image?: string;
    cta: string;
    duration?: number; // in seconds
    skipable?: boolean;
    skipAfter?: number; // seconds before skip becomes available
  };
  onAdClick?: () => void;
}

export default function InterstitialAdPlayer({
  isOpen,
  onClose,
  onSkip,
  adContent,
  onAdClick,
}: InterstitialAdPlayerProps) {
  const [timeRemaining, setTimeRemaining] = useState(adContent?.duration || 15);
  const [canSkip, setCanSkip] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const skipTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Default ad content if none provided
  const defaultAd: NonNullable<typeof adContent> = {
    title: "Upgrade to Premium",
    description: "Enjoy ad-free listening and lossless audio quality.",
    cta: "Upgrade Now",
    duration: 15,
    skipable: true,
    skipAfter: 5,
  };

  const ad = adContent || defaultAd;

  useEffect(() => {
    if (!isOpen) {
      setTimeRemaining(ad.duration || 15);
      setCanSkip(false);
      return;
    }

    // Start countdown
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Enable skip after delay
    if (ad.skipable && ad.skipAfter) {
      skipTimerRef.current = setTimeout(() => {
        setCanSkip(true);
      }, ad.skipAfter * 1000);
    } else if (ad.skipable) {
      setCanSkip(true);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (skipTimerRef.current) {
        clearTimeout(skipTimerRef.current);
      }
    };
  }, [isOpen, ad.duration, ad.skipable, ad.skipAfter, onClose]);

  if (!isOpen) return null;

  const handleSkip = () => {
    if (canSkip && onSkip) {
      onSkip();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Close/Mute Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        {/* Mute Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-spotify-text-gray hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          aria-label={isMuted ? "Unmute ad" : "Mute ad"}
        >
          {isMuted ? (
            <VolumeX size={20} style={{ width: "20px", height: "20px" }} />
          ) : (
            <Volume2 size={20} style={{ width: "20px", height: "20px" }} />
          )}
        </button>

        {/* Close/Skip Button */}
        {canSkip ? (
          <button
            onClick={handleSkip}
            className="text-spotify-text-gray hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/10 text-sm font-medium"
          >
            Skip Ad
          </button>
        ) : (
          <button
            onClick={onClose}
            className="text-spotify-text-gray hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Close ad"
          >
            <X size={20} style={{ width: "20px", height: "20px" }} />
          </button>
        )}
      </div>

      {/* Ad Content */}
      <div
        className="bg-spotify-dark-gray rounded-lg max-w-2xl w-full mx-4 overflow-hidden"
        style={{
          borderRadius: "8px",
          backgroundColor: "#181818",
        }}
      >
        {/* Progress Bar */}
        <div
          className="h-1 bg-spotify-light-gray"
          style={{ backgroundColor: "#282828" }}
        >
          <div
            className="h-full bg-spotify-green transition-all duration-1000"
            style={{
              width: `${(((ad.duration || 15) - timeRemaining) / (ad.duration || 15)) * 100}%`,
              backgroundColor: "#1DB954",
            }}
          />
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Image */}
            {ad.image && (
              <div className="w-full md:w-64 h-64 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div
                className="text-xs font-bold text-spotify-text-gray mb-2 uppercase tracking-wider"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "#B3B3B3",
                }}
              >
                Advertisement
              </div>
              <h3
                className="text-2xl font-bold text-white mb-3"
                style={{
                  fontSize: "24px",
                  lineHeight: "28px",
                  fontWeight: 700,
                }}
              >
                {ad.title}
              </h3>
              <p
                className="text-spotify-text-gray mb-6"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  color: "#B3B3B3",
                }}
              >
                {ad.description}
              </p>
              <button
                onClick={onAdClick || onClose}
                className="bg-spotify-green hover:bg-[#1ED760] text-black px-8 py-3 rounded-full font-semibold transition-colors"
                style={{
                  borderRadius: "500px",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                {ad.cta}
              </button>
            </div>
          </div>

          {/* Time Remaining */}
          {!canSkip && (
            <div className="mt-6 text-center">
              <span
                className="text-xs text-spotify-text-gray"
                style={{ fontSize: "11px", color: "#B3B3B3" }}
              >
                Ad will continue in {timeRemaining}s
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
