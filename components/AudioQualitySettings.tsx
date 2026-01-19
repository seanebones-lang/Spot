'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { Settings, Info } from 'lucide-react';
import { audioPlayer } from '@/lib/player';
import { cn } from '@/lib/utils';

interface AudioQualitySettingsProps {
  className?: string;
  compact?: boolean;
}

/**
 * Audio Quality Settings Panel
 * Configure sample rate, bit depth, and audio processing for audiophile playback
 */
function AudioQualitySettings({ className, compact = false }: AudioQualitySettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sampleRate, setSampleRate] = useState<number>(44100);
  const [bitDepth, setBitDepth] = useState<number>(16);
  const [enableCompressor, setEnableCompressor] = useState(true);
  const [enableNormalization, setEnableNormalization] = useState(false);

  // Get current audio context info
  useEffect(() => {
    const pipeline = audioPlayer.getAudioPipeline();
    if (pipeline) {
      const currentSampleRate = pipeline.getSampleRate();
      setSampleRate(currentSampleRate);
    }
  }, []);

  const handleSampleRateChange = useCallback((rate: number) => {
    setSampleRate(rate);
    // Note: Sample rate change requires reinitializing audio context
    // This would need to be handled in the audio pipeline
    console.log('Sample rate change requested:', rate);
  }, []);

  const handleCompressorToggle = useCallback((enabled: boolean) => {
    setEnableCompressor(enabled);
    // Compressor can be enabled/disabled in real-time
    const pipeline = audioPlayer.getAudioPipeline();
    if (pipeline) {
      // This would need a method to toggle compressor
      console.log('Compressor toggle:', enabled);
    }
  }, []);

  if (compact && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "p-2 rounded-lg hover:bg-white/10 transition-colors",
          "text-spotify-text-gray hover:text-white",
          className
        )}
        aria-label="Audio quality settings"
        title="Audio Quality"
      >
        <Settings size={20} />
      </button>
    );
  }

  return (
    <div className={cn(
      "bg-[#181818] rounded-lg border border-[#282828]",
      compact ? "p-4" : "p-6",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Settings size={20} />
          Audio Quality Settings
        </h3>
        {compact && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded hover:bg-white/10 text-spotify-text-gray hover:text-white transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {/* Current Status */}
      <div className="mb-6 p-4 bg-[#282828] rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-spotify-text-gray">Current Sample Rate</span>
          <span className="text-sm font-bold text-spotify-green">{sampleRate} Hz</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-spotify-text-gray">Audio Format</span>
          <span className="text-sm font-bold text-white">FLAC Lossless</span>
        </div>
        <div className="mt-2 pt-2 border-t border-[#404040]">
          <div className="flex items-start gap-2 text-xs text-spotify-text-gray">
            <Info size={14} className="mt-0.5 flex-shrink-0" />
            <span>
              Higher sample rates provide better audio quality but require more processing power.
              FLAC files support up to 192kHz sample rate.
            </span>
          </div>
        </div>
      </div>

      {/* Sample Rate Selection */}
      <div className="mb-4">
        <label className="block text-sm text-spotify-text-gray mb-2">
          Preferred Sample Rate
        </label>
        <select
          value={sampleRate}
          onChange={(e) => handleSampleRateChange(Number(e.target.value))}
          className="w-full bg-[#282828] text-white rounded px-3 py-2 border border-[#404040] focus:outline-none focus:border-spotify-green"
        >
          <option value={44100}>44.1 kHz (CD Quality)</option>
          <option value={48000}>48 kHz (Professional)</option>
          <option value={96000}>96 kHz (High Resolution)</option>
          <option value={192000}>192 kHz (Ultra High Resolution)</option>
        </select>
        <p className="text-xs text-spotify-text-gray mt-1">
          Note: Actual rate depends on browser and hardware support
        </p>
      </div>

      {/* Audio Processing Options */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm text-white">Dynamics Compressor</label>
            <p className="text-xs text-spotify-text-gray">
              Subtle compression for consistent volume
            </p>
          </div>
          <button
            onClick={() => handleCompressorToggle(!enableCompressor)}
            className={cn(
              "relative w-12 h-6 rounded-full transition-colors",
              enableCompressor ? "bg-spotify-green" : "bg-[#404040]"
            )}
          >
            <div
              className={cn(
                "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform",
                enableCompressor ? "translate-x-6" : "translate-x-0"
              )}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm text-white">Normalization</label>
            <p className="text-xs text-spotify-text-gray">
              Normalize track volume (may affect dynamic range)
            </p>
          </div>
          <button
            onClick={() => setEnableNormalization(!enableNormalization)}
            className={cn(
              "relative w-12 h-6 rounded-full transition-colors",
              enableNormalization ? "bg-spotify-green" : "bg-[#404040]"
            )}
          >
            <div
              className={cn(
                "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform",
                enableNormalization ? "translate-x-6" : "translate-x-0"
              )}
            />
          </button>
        </div>
      </div>

      {/* Quality Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-spotify-green/10 to-spotify-blue/10 rounded-lg border border-spotify-green/20">
        <h4 className="text-sm font-bold text-white mb-2">Audiophile Features</h4>
        <ul className="text-xs text-spotify-text-gray space-y-1">
          <li>✓ FLAC Lossless Audio Support</li>
          <li>✓ High-Resolution Sample Rates (up to 192kHz)</li>
          <li>✓ 10-Band Parametric Equalizer</li>
          <li>✓ Real-Time Spectrum Analysis</li>
          <li>✓ Minimal Audio Processing (for pure sound)</li>
        </ul>
      </div>
    </div>
  );
}

export default memo(AudioQualitySettings);
