<<<<<<< HEAD
"use client";

import { useState } from "react";
import { Check, Music } from "lucide-react";

export type Quality = "lossless" | "high" | "standard" | "data-saver";
=======
'use client';

import { useState } from 'react';
import { Check, Music } from 'lucide-react';

export type Quality = 'lossless' | 'high' | 'standard' | 'data-saver';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface QualitySelectorProps {
  currentQuality: Quality;
  availableFormats: string[];
  onQualityChange: (quality: Quality) => void;
}

<<<<<<< HEAD
export default function QualitySelector({
  currentQuality,
  availableFormats,
  onQualityChange,
}: QualitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasLossless = availableFormats.some((f) =>
    ["wav", "flac", "m4a"].includes(f.toLowerCase()),
  );

  const qualities: { value: Quality; label: string; description: string }[] = [
    {
      value: "lossless",
      label: "Lossless",
      description: "WAV, FLAC (Best quality)",
    },
    { value: "high", label: "High", description: "320kbps MP3, M4A" },
    { value: "standard", label: "Standard", description: "192kbps MP3" },
    { value: "data-saver", label: "Data Saver", description: "128kbps MP3" },
=======
export default function QualitySelector({ currentQuality, availableFormats, onQualityChange }: QualitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasLossless = availableFormats.some(f => ['wav', 'flac', 'm4a'].includes(f.toLowerCase()));

  const qualities: { value: Quality; label: string; description: string }[] = [
    { value: 'lossless', label: 'Lossless', description: 'WAV, FLAC (Best quality)' },
    { value: 'high', label: 'High', description: '320kbps MP3, M4A' },
    { value: 'standard', label: 'Standard', description: '192kbps MP3' },
    { value: 'data-saver', label: 'Data Saver', description: '128kbps MP3' },
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-spotify-light-gray/50 hover:bg-spotify-light-gray rounded-full text-xs transition-colors"
      >
<<<<<<< HEAD
        {currentQuality === "lossless" && hasLossless && (
          <span className="px-1.5 py-0.5 bg-spotify-green text-black rounded text-[10px] font-bold">
            HD
          </span>
        )}
        <Music size={14} className="text-spotify-text-gray" />
        <span className="text-white/80 capitalize">
          {currentQuality.replace("-", " ")}
        </span>
=======
        {currentQuality === 'lossless' && hasLossless && (
          <span className="px-1.5 py-0.5 bg-spotify-green text-black rounded text-[10px] font-bold">HD</span>
        )}
        <Music size={14} className="text-spotify-text-gray" />
        <span className="text-white/80 capitalize">{currentQuality.replace('-', ' ')}</span>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full right-0 mb-2 w-64 bg-spotify-dark-gray rounded-lg p-2 shadow-2xl z-50 border border-spotify-light-gray">
<<<<<<< HEAD
            <div className="text-xs text-spotify-text-gray px-3 py-2 mb-1">
              Quality Settings
            </div>
            {qualities.map((quality) => {
              const isAvailable = quality.value !== "lossless" || hasLossless;
              const isSelected = currentQuality === quality.value;

=======
            <div className="text-xs text-spotify-text-gray px-3 py-2 mb-1">Quality Settings</div>
            {qualities.map((quality) => {
              const isAvailable = quality.value !== 'lossless' || hasLossless;
              const isSelected = currentQuality === quality.value;
              
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              return (
                <button
                  key={quality.value}
                  onClick={() => {
                    if (isAvailable) {
                      onQualityChange(quality.value);
                      setIsOpen(false);
                    }
                  }}
                  disabled={!isAvailable}
                  className={`w-full flex items-start justify-between px-3 py-2 rounded hover:bg-spotify-light-gray transition-colors text-left ${
<<<<<<< HEAD
                    !isAvailable ? "opacity-50 cursor-not-allowed" : ""
=======
                    !isAvailable ? 'opacity-50 cursor-not-allowed' : ''
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
<<<<<<< HEAD
                      <span className="text-sm font-medium text-white">
                        {quality.label}
                      </span>
                      {quality.value === "lossless" && hasLossless && (
                        <span className="px-1.5 py-0.5 bg-spotify-green text-black rounded text-[10px] font-bold">
                          HD
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-spotify-text-gray mt-0.5">
                      {quality.description}
                    </div>
                  </div>
                  {isSelected && isAvailable && (
                    <Check
                      size={16}
                      className="text-spotify-green flex-shrink-0"
                    />
=======
                      <span className="text-sm font-medium text-white">{quality.label}</span>
                      {quality.value === 'lossless' && hasLossless && (
                        <span className="px-1.5 py-0.5 bg-spotify-green text-black rounded text-[10px] font-bold">HD</span>
                      )}
                    </div>
                    <div className="text-xs text-spotify-text-gray mt-0.5">{quality.description}</div>
                  </div>
                  {isSelected && isAvailable && (
                    <Check size={16} className="text-spotify-green flex-shrink-0" />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
