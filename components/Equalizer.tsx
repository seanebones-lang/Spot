"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { Settings, RotateCcw, Save, Download, Upload } from "lucide-react";
import { audioPlayer } from "@/lib/player";
import { cn } from "@/lib/utils";

export type EQPreset =
  | "flat"
  | "bass-boost"
  | "treble-boost"
  | "vocal-boost"
  | "rock"
  | "jazz"
  | "classical"
  | "electronic"
  | "custom";

interface EQPresetData {
  name: string;
  gains: number[];
}

const EQ_PRESETS: Record<EQPreset, EQPresetData> = {
  flat: {
    name: "Flat",
    gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  "bass-boost": {
    name: "Bass Boost",
    gains: [6, 5, 4, 2, 1, 0, 0, 0, 0, 0],
  },
  "treble-boost": {
    name: "Treble Boost",
    gains: [0, 0, 0, 0, 0, 0, 1, 2, 4, 5],
  },
  "vocal-boost": {
    name: "Vocal Boost",
    gains: [-2, -1, 0, 2, 4, 4, 3, 1, 0, 0],
  },
  rock: {
    name: "Rock",
    gains: [4, 3, 2, 1, 0, 0, 1, 2, 3, 2],
  },
  jazz: {
    name: "Jazz",
    gains: [2, 1, 0, 0, 0, 1, 2, 3, 2, 1],
  },
  classical: {
    name: "Classical",
    gains: [0, 0, 0, 0, 0, 0, 1, 2, 3, 2],
  },
  electronic: {
    name: "Electronic",
    gains: [5, 4, 3, 1, 0, 0, 1, 2, 3, 4],
  },
  custom: {
    name: "Custom",
    gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
};

// ISO standard 10-band EQ frequencies
const EQ_FREQUENCIES = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const EQ_LABELS = [
  "31",
  "62",
  "125",
  "250",
  "500",
  "1k",
  "2k",
  "4k",
  "8k",
  "16k",
];

interface EqualizerProps {
  className?: string;
  compact?: boolean;
}

/**
 * Professional 10-Band Parametric Equalizer
 * Audiophile-grade EQ with presets and custom settings
 */
function Equalizer({ className, compact = false }: EqualizerProps) {
  const [currentPreset, setCurrentPreset] = useState<EQPreset>("flat");
  const [eqGains, setEqGains] = useState<number[]>(EQ_PRESETS.flat.gains);
  const [isOpen, setIsOpen] = useState(!compact);
  const [isDragging, setIsDragging] = useState<number | null>(null);

  // Load EQ state from audio player
  useEffect(() => {
    const pipeline = audioPlayer.getAudioPipeline();
    if (pipeline) {
      const currentGains = pipeline.getEQBands();
      setEqGains(currentGains);

      // Detect preset
      const matchingPreset = Object.entries(EQ_PRESETS).find(([_, preset]) => {
        return preset.gains.every(
          (gain, i) => Math.abs(gain - currentGains[i]) < 0.5,
        );
      });

      if (matchingPreset) {
        setCurrentPreset(matchingPreset[0] as EQPreset);
      } else {
        setCurrentPreset("custom");
      }
    }
  }, []);

  // Apply EQ gains to audio pipeline
  const applyEQ = useCallback((gains: number[]) => {
    const pipeline = audioPlayer.getAudioPipeline();
    if (pipeline) {
      pipeline.setEQBands(gains);
    }
  }, []);

  // Handle preset change
  const handlePresetChange = useCallback(
    (preset: EQPreset) => {
      const presetData = EQ_PRESETS[preset];
      setEqGains([...presetData.gains]);
      setCurrentPreset(preset);
      applyEQ(presetData.gains);
    },
    [applyEQ],
  );

  // Handle individual band change
  const handleBandChange = useCallback(
    (index: number, gain: number) => {
      const newGains = [...eqGains];
      newGains[index] = Math.max(-12, Math.min(12, gain));
      setEqGains(newGains);
      setCurrentPreset("custom");

      // Apply immediately
      const pipeline = audioPlayer.getAudioPipeline();
      if (pipeline) {
        pipeline.setEQBand(index, newGains[index]);
      }
    },
    [eqGains],
  );

  // Handle mouse drag for EQ sliders
  const handleMouseDown = useCallback(
    (index: number, e: React.MouseEvent) => {
      setIsDragging(index);
      const startY = e.clientY;
      const startGain = eqGains[index];

      const handleMouseMove = (e: MouseEvent) => {
        const deltaY = startY - e.clientY;
        const sensitivity = 0.1;
        const newGain = startGain + deltaY * sensitivity;
        handleBandChange(index, newGain);
      };

      const handleMouseUp = () => {
        setIsDragging(null);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [eqGains, handleBandChange],
  );

  // Reset to flat
  const handleReset = useCallback(() => {
    handlePresetChange("flat");
  }, [handlePresetChange]);

  // Save custom preset to localStorage
  const handleSave = useCallback(() => {
    localStorage.setItem("empulse-eq-custom", JSON.stringify(eqGains));
    // Update custom preset
    EQ_PRESETS.custom.gains = [...eqGains];
  }, [eqGains]);

  // Load custom preset from localStorage
  const handleLoad = useCallback(() => {
    const saved = localStorage.getItem("empulse-eq-custom");
    if (saved) {
      try {
        const gains = JSON.parse(saved);
        if (Array.isArray(gains) && gains.length === 10) {
          setEqGains(gains);
          applyEQ(gains);
          setCurrentPreset("custom");
        }
      } catch (e) {
        console.error("Failed to load EQ preset:", e);
      }
    }
  }, [applyEQ]);

  // Auto-apply when gains change (if not dragging)
  useEffect(() => {
    if (!isDragging) {
      applyEQ(eqGains);
    }
  }, [eqGains, isDragging, applyEQ]);

  if (compact && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "p-2 rounded-lg hover:bg-white/10 transition-colors",
          "text-spotify-text-gray hover:text-white",
          className,
        )}
        aria-label="Open equalizer"
        title="Equalizer"
      >
        <Settings size={20} />
      </button>
    );
  }

  return (
    <div
      className={cn(
        "bg-[#181818] rounded-lg border border-[#282828]",
        compact ? "p-4" : "p-6",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">Equalizer</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-1.5 rounded hover:bg-white/10 text-spotify-text-gray hover:text-white transition-colors"
            aria-label="Reset to flat"
            title="Reset"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={handleSave}
            className="p-1.5 rounded hover:bg-white/10 text-spotify-text-gray hover:text-white transition-colors"
            aria-label="Save custom preset"
            title="Save"
          >
            <Save size={16} />
          </button>
          <button
            onClick={handleLoad}
            className="p-1.5 rounded hover:bg-white/10 text-spotify-text-gray hover:text-white transition-colors"
            aria-label="Load custom preset"
            title="Load"
          >
            <Upload size={16} />
          </button>
          {compact && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded hover:bg-white/10 text-spotify-text-gray hover:text-white transition-colors"
              aria-label="Close equalizer"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Preset Selector */}
      <div className="mb-6">
        <label className="block text-sm text-spotify-text-gray mb-2">
          Preset
        </label>
        <select
          value={currentPreset}
          onChange={(e) => handlePresetChange(e.target.value as EQPreset)}
          className="w-full bg-[#282828] text-white rounded px-3 py-2 border border-[#404040] focus:outline-none focus:border-spotify-green"
        >
          {Object.entries(EQ_PRESETS).map(([key, preset]) => (
            <option key={key} value={key}>
              {preset.name}
            </option>
          ))}
        </select>
      </div>

      {/* EQ Bands */}
      <div className="flex items-end justify-center gap-2 mb-4">
        {EQ_FREQUENCIES.map((freq, index) => {
          const gain = eqGains[index];
          const height = Math.max(0, Math.min(200, 100 + gain * 8)); // Visual height

          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2 flex-1"
            >
              {/* Frequency Label */}
              <span className="text-xs text-spotify-text-gray">
                {EQ_LABELS[index]}
              </span>

              {/* Gain Display */}
              <span
                className={cn(
                  "text-xs font-medium",
                  gain > 0
                    ? "text-spotify-green"
                    : gain < 0
                      ? "text-red-400"
                      : "text-spotify-text-gray",
                )}
              >
                {gain > 0 ? "+" : ""}
                {gain.toFixed(1)}dB
              </span>

              {/* Slider Container */}
              <div
                className="relative w-full flex items-end justify-center cursor-pointer"
                style={{ height: "200px" }}
                onMouseDown={(e) => handleMouseDown(index, e)}
              >
                {/* Background Track */}
                <div
                  className="absolute bottom-0 w-8 bg-[#282828] rounded-t"
                  style={{ height: "200px" }}
                />

                {/* Center Line */}
                <div className="absolute bottom-1/2 w-8 border-t border-[#404040]" />

                {/* Gain Bar */}
                <div
                  className={cn(
                    "absolute bottom-0 w-8 rounded-t transition-all duration-100",
                    gain > 0
                      ? "bg-spotify-green"
                      : gain < 0
                        ? "bg-red-400"
                        : "bg-[#404040]",
                  )}
                  style={{
                    height: `${height}px`,
                    transition: isDragging === index ? "none" : "height 100ms",
                  }}
                />

                {/* Handle */}
                <div
                  className={cn(
                    "absolute w-10 h-4 rounded bg-white cursor-grab active:cursor-grabbing",
                    "hover:bg-spotify-green transition-colors",
                  )}
                  style={{
                    bottom: `${height - 8}px`,
                    left: "-4px",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <p className="text-xs text-spotify-text-gray text-center">
        Drag sliders to adjust. Range: -12dB to +12dB
      </p>
    </div>
  );
}

export default memo(Equalizer);
