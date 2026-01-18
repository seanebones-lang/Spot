'use client';

import { useState, useEffect } from 'react';
import { audioPlayer } from '@/lib/player';

interface EQControlProps {
  className?: string;
  showPresets?: boolean;
}

/**
 * 10-Band Parametric EQ Control
 * Visual equalizer with adjustable sliders for each frequency band
 */
export default function EQControl({ className = '', showPresets = true }: EQControlProps) {
  // EQ frequencies (ISO standard)
  const frequencies = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
  const frequencyLabels = ['31', '62', '125', '250', '500', '1k', '2k', '4k', '8k', '16k'];
  
  const [eqGains, setEqGains] = useState<number[]>(new Array(10).fill(0));
  const [selectedPreset, setSelectedPreset] = useState<string>('flat');
  
  // EQ presets
  const presets = {
    flat: new Array(10).fill(0),
    bassBoost: [6, 5, 4, 3, 2, 0, 0, 0, 0, 0],
    trebleBoost: [0, 0, 0, 0, 0, 0, 2, 3, 4, 5],
    vocal: [-2, -1, 0, 2, 3, 4, 3, 2, 1, 0],
    jazz: [2, 1, 0, 0, 1, 2, 2, 1, 1, 0],
    rock: [4, 3, 2, 0, -1, 0, 2, 3, 3, 2],
    classical: [0, 0, 0, 1, 2, 2, 1, 0, 0, 0],
  };
  
  // Load current EQ settings
  useEffect(() => {
    const currentGains = audioPlayer.getEQBands();
    if (currentGains.length === 10) {
      setEqGains(currentGains);
    }
  }, []);
  
  const handleBandChange = (index: number, gain: number) => {
    const newGains = [...eqGains];
    newGains[index] = gain;
    setEqGains(newGains);
    
    // Apply to audio pipeline
    audioPlayer.setEQBand(index, gain);
    setSelectedPreset('custom');
  };
  
  const applyPreset = (presetName: string) => {
    const presetGains = presets[presetName as keyof typeof presets] || presets.flat;
    setEqGains(presetGains);
    audioPlayer.setEQBands(presetGains);
    setSelectedPreset(presetName);
  };
  
  const reset = () => {
    applyPreset('flat');
  };
  
  return (
    <div className={`bg-spotify-light-gray rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Equalizer</h3>
        {showPresets && (
          <div className="flex items-center gap-2">
            <select
              value={selectedPreset}
              onChange={(e) => applyPreset(e.target.value)}
              className="bg-spotify-dark-gray text-white text-sm px-3 py-1.5 rounded border border-spotify-text-gray/30 focus:outline-none focus:border-spotify-green"
            >
              <option value="flat">Flat</option>
              <option value="bassBoost">Bass Boost</option>
              <option value="trebleBoost">Treble Boost</option>
              <option value="vocal">Vocal</option>
              <option value="jazz">Jazz</option>
              <option value="rock">Rock</option>
              <option value="classical">Classical</option>
              <option value="custom">Custom</option>
            </select>
            <button
              onClick={reset}
              className="text-xs text-spotify-text-gray hover:text-white transition-colors px-2 py-1"
            >
              Reset
            </button>
          </div>
        )}
      </div>
      
      {/* EQ Bands */}
      <div className="flex items-end justify-between gap-3 h-64 px-2">
        {frequencies.map((freq, index) => {
          const gain = eqGains[index] || 0;
          const normalizedGain = gain + 12; // Convert from -12/+12 to 0/24 for display
          const percentage = (normalizedGain / 24) * 100;
          const isPositive = gain > 0;
          const isNegative = gain < 0;
          
          return (
            <div key={freq} className="flex-1 flex flex-col items-center gap-3 min-w-0">
              {/* EQ Slider Container */}
              <div className="relative w-full h-56 flex flex-col justify-center items-center">
                {/* Vertical scale labels */}
                <div className="absolute -left-8 h-full flex flex-col justify-between text-[10px] text-spotify-text-gray/60 pointer-events-none">
                  <span>+12</span>
                  <span>0</span>
                  <span>-12</span>
                </div>
                
                {/* Visual track background */}
                <div className="relative w-2 h-full bg-spotify-text-gray/20 rounded-full">
                  {/* Center line */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 transform -translate-y-1/2" />
                  
                  {/* Gain indicator bar */}
                  {gain !== 0 && (
                    <div
                      className={`absolute left-0 right-0 rounded-full transition-all duration-150 ${
                        gain > 0 
                          ? 'bg-spotify-green top-1/2' 
                          : 'bg-red-500/70 bottom-1/2'
                      }`}
                      style={{
                        height: `${Math.abs(gain / 12) * 50}%`,
                        transform: gain > 0 
                          ? 'translateY(-100%)' 
                          : 'translateY(0)',
                      }}
                    />
                  )}
                  
                  {/* Slider thumb position indicator */}
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-2 border-spotify-green shadow-lg z-10 transition-all duration-150 cursor-grab active:cursor-grabbing"
                    style={{
                      top: `${100 - percentage}%`,
                      marginTop: '-12px',
                    }}
                  />
                </div>
                
                {/* Interactive slider input (invisible overlay) */}
                <input
                  type="range"
                  min="-12"
                  max="12"
                  step="0.5"
                  value={gain}
                  onChange={(e) => handleBandChange(index, parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full cursor-pointer z-20 opacity-0"
                  style={{
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center',
                  }}
                  aria-label={`EQ band ${frequencyLabels[index]} Hz`}
                />
                
                {/* Current value display */}
                <div className="absolute -top-6 text-xs text-white font-medium pointer-events-none whitespace-nowrap">
                  {gain !== 0 ? (
                    <span className={gain > 0 ? 'text-spotify-green' : 'text-red-400'}>
                      {gain > 0 ? '+' : ''}{gain.toFixed(1)}dB
                    </span>
                  ) : (
                    <span className="text-spotify-text-gray">0dB</span>
                  )}
                </div>
              </div>
              
              {/* Frequency label */}
              <div className="text-xs text-spotify-text-gray font-medium">
                {frequencyLabels[index]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
