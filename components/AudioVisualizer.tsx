'use client';

import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { Settings, Palette, Zap } from 'lucide-react';
import { audioPlayer } from '@/lib/player';
import { cn } from '@/lib/utils';

export type VisualizerType = 'spectrum' | 'waveform' | 'circular' | 'bars' | 'particles';
export type VisualizerColorScheme = 'spotify' | 'rainbow' | 'fire' | 'ocean' | 'neon' | 'monochrome';

interface VisualizerColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

const COLOR_SCHEMES: Record<VisualizerColorScheme, VisualizerColors> = {
  spotify: {
    primary: '#1DB954',
    secondary: '#1ed760',
    accent: '#ffffff',
    background: 'transparent'
  },
  rainbow: {
    primary: '#ff0000',
    secondary: '#ff7f00',
    accent: '#ffff00',
    background: 'transparent'
  },
  fire: {
    primary: '#ff4500',
    secondary: '#ff6347',
    accent: '#ffd700',
    background: 'transparent'
  },
  ocean: {
    primary: '#00bfff',
    secondary: '#1e90ff',
    accent: '#87ceeb',
    background: 'transparent'
  },
  neon: {
    primary: '#00ffff',
    secondary: '#ff00ff',
    accent: '#ffff00',
    background: 'transparent'
  },
  monochrome: {
    primary: '#ffffff',
    secondary: '#cccccc',
    accent: '#888888',
    background: 'transparent'
  }
};

interface AudioVisualizerProps {
  type?: VisualizerType;
  colorScheme?: VisualizerColorScheme;
  sensitivity?: number; // 0-1
  className?: string;
  width?: number;
  height?: number;
  showControls?: boolean;
}

/**
 * Professional Audio Visualizer
 * Real-time spectrum analyzer and waveform display
 */
function AudioVisualizer({
  type = 'spectrum',
  colorScheme = 'spotify',
  sensitivity = 0.7,
  className,
  width = 800,
  height = 200,
  showControls = false
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentType, setCurrentType] = useState<VisualizerType>(type);
  const [currentColorScheme, setCurrentColorScheme] = useState<VisualizerColorScheme>(colorScheme);
  const [currentSensitivity, setCurrentSensitivity] = useState(sensitivity);
  const [showSettings, setShowSettings] = useState(false);

  const colors = COLOR_SCHEMES[currentColorScheme];

  // Get audio data and render
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pipeline = audioPlayer.getAudioPipeline();
    if (!pipeline) {
      // Clear canvas if no audio
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      return;
    }

    // Get frequency data
    const frequencyData = pipeline.getFrequencyData();
    const timeDomainData = pipeline.getTimeDomainData();

    if (frequencyData.length === 0) return;

    // Clear canvas
    ctx.fillStyle = colors.background || '#000000';
    ctx.fillRect(0, 0, width, height);

    // Apply sensitivity
    const sens = currentSensitivity;

    switch (currentType) {
      case 'spectrum':
        renderSpectrum(ctx, frequencyData, width, height, colors, sens);
        break;
      case 'waveform':
        renderWaveform(ctx, timeDomainData, width, height, colors, sens);
        break;
      case 'circular':
        renderCircular(ctx, frequencyData, width, height, colors, sens);
        break;
      case 'bars':
        renderBars(ctx, frequencyData, width, height, colors, sens);
        break;
      case 'particles':
        renderParticles(ctx, frequencyData, width, height, colors, sens);
        break;
    }

    animationFrameRef.current = requestAnimationFrame(render);
  }, [width, height, colors, currentType, currentSensitivity]);

  // Spectrum analyzer (bars)
  const renderSpectrum = (
    ctx: CanvasRenderingContext2D,
    data: Uint8Array,
    w: number,
    h: number,
    cols: VisualizerColors,
    sens: number
  ) => {
    const barCount = 64; // Number of bars
    const barWidth = w / barCount;
    const step = Math.floor(data.length / barCount);

    for (let i = 0; i < barCount; i++) {
      const dataIndex = i * step;
      const value = (data[dataIndex] / 255) * sens;
      const barHeight = value * h * 0.9;

      // Gradient color based on frequency
      const hue = (i / barCount) * 360;
      const gradient = ctx.createLinearGradient(0, h, 0, h - barHeight);
      
      if (currentColorScheme === 'rainbow') {
        gradient.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
        gradient.addColorStop(1, `hsl(${hue + 30}, 100%, 70%)`);
      } else {
        gradient.addColorStop(0, cols.primary);
        gradient.addColorStop(0.5, cols.secondary);
        gradient.addColorStop(1, cols.accent);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(i * barWidth, h - barHeight, barWidth - 2, barHeight);
    }
  };

  // Waveform (time domain)
  const renderWaveform = (
    ctx: CanvasRenderingContext2D,
    data: Uint8Array,
    w: number,
    h: number,
    cols: VisualizerColors,
    sens: number
  ) => {
    ctx.strokeStyle = cols.primary;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const sliceWidth = w / data.length;
    let x = 0;

    for (let i = 0; i < data.length; i++) {
      const v = (data[i] / 128.0) * sens;
      const y = (v * h) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.stroke();
  };

  // Circular visualizer
  const renderCircular = (
    ctx: CanvasRenderingContext2D,
    data: Uint8Array,
    w: number,
    h: number,
    cols: VisualizerColors,
    sens: number
  ) => {
    const centerX = w / 2;
    const centerY = h / 2;
    const radius = Math.min(w, h) * 0.3;
    const barCount = 64;
    const angleStep = (Math.PI * 2) / barCount;
    const step = Math.floor(data.length / barCount);

    for (let i = 0; i < barCount; i++) {
      const dataIndex = i * step;
      const value = (data[dataIndex] / 255) * sens;
      const barLength = value * radius * 0.8;
      const angle = i * angleStep - Math.PI / 2;

      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barLength);
      const y2 = centerY + Math.sin(angle) * (radius + barLength);

      // Gradient
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, cols.primary);
      gradient.addColorStop(1, cols.accent);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  };

  // Vertical bars
  const renderBars = (
    ctx: CanvasRenderingContext2D,
    data: Uint8Array,
    w: number,
    h: number,
    cols: VisualizerColors,
    sens: number
  ) => {
    const barCount = 32;
    const barWidth = w / barCount;
    const step = Math.floor(data.length / barCount);

    for (let i = 0; i < barCount; i++) {
      const dataIndex = i * step;
      const value = (data[dataIndex] / 255) * sens;
      const barHeight = value * h * 0.8;

      const x = i * barWidth;
      const y = (h - barHeight) / 2;

      // Gradient
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, cols.accent);
      gradient.addColorStop(0.5, cols.secondary);
      gradient.addColorStop(1, cols.primary);

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 2, barHeight);
    }
  };

  // Particle system
  const renderParticles = (
    ctx: CanvasRenderingContext2D,
    data: Uint8Array,
    w: number,
    h: number,
    cols: VisualizerColors,
    sens: number
  ) => {
    const particleCount = 100;
    const step = Math.floor(data.length / particleCount);

    for (let i = 0; i < particleCount; i++) {
      const dataIndex = i * step;
      const value = (data[dataIndex] / 255) * sens;
      const size = value * 5 + 1;
      const x = (i / particleCount) * w;
      const y = h / 2 + (Math.random() - 0.5) * value * 50;

      ctx.fillStyle = cols.primary;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Start animation loop
  useEffect(() => {
    const pipeline = audioPlayer.getAudioPipeline();
    if (pipeline) {
      setIsPlaying(true);
      render();
    } else {
      setIsPlaying(false);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render]);

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full"
      />
      
      {showControls && (
        <>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute top-2 right-2 p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors"
            aria-label="Visualizer settings"
          >
            <Settings size={16} />
          </button>

          {showSettings && (
            <div className="absolute top-12 right-2 bg-[#181818] border border-[#282828] rounded-lg p-4 min-w-[200px] z-10">
              <div className="mb-4">
                <label className="block text-sm text-spotify-text-gray mb-2">Type</label>
                <select
                  value={currentType}
                  onChange={(e) => setCurrentType(e.target.value as VisualizerType)}
                  className="w-full bg-[#282828] text-white rounded px-3 py-2 border border-[#404040] focus:outline-none focus:border-spotify-green"
                >
                  <option value="spectrum">Spectrum</option>
                  <option value="waveform">Waveform</option>
                  <option value="circular">Circular</option>
                  <option value="bars">Bars</option>
                  <option value="particles">Particles</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-spotify-text-gray mb-2">Color Scheme</label>
                <select
                  value={currentColorScheme}
                  onChange={(e) => setCurrentColorScheme(e.target.value as VisualizerColorScheme)}
                  className="w-full bg-[#282828] text-white rounded px-3 py-2 border border-[#404040] focus:outline-none focus:border-spotify-green"
                >
                  {Object.keys(COLOR_SCHEMES).map((scheme) => (
                    <option key={scheme} value={scheme}>
                      {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-spotify-text-gray mb-2">
                  Sensitivity: {Math.round(currentSensitivity * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={currentSensitivity}
                  onChange={(e) => setCurrentSensitivity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default memo(AudioVisualizer);
