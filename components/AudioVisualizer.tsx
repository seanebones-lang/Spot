'use client';

import { useEffect, useRef, useState } from 'react';
import { AudiophileAudioPipeline } from '@/lib/audio-pipeline';

interface AudioVisualizerProps {
  pipeline: AudiophileAudioPipeline | null;
  mode?: 'spectrum' | 'waveform' | 'circular' | 'particles';
  className?: string;
}

/**
 * Real-time Audio Visualizer
 * Displays spectrum analyzer and waveform visualizations using Web Audio API data
 */
export default function AudioVisualizer({ 
  pipeline, 
  mode = 'spectrum',
  className = ''
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    if (!pipeline || !canvasRef.current) {
      setIsActive(false);
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    setIsActive(true);
    
    const draw = () => {
      if (!pipeline || !ctx) return;
      
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(18, 18, 18, 0.3)';
      ctx.fillRect(0, 0, width, height);
      
      if (mode === 'spectrum') {
        drawSpectrum(ctx, pipeline, width, height);
      } else if (mode === 'waveform') {
        drawWaveform(ctx, pipeline, width, height);
      } else if (mode === 'circular') {
        drawCircularSpectrum(ctx, pipeline, width, height);
      } else if (mode === 'particles') {
        drawParticles(ctx, pipeline, width, height);
      }
      
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setIsActive(false);
    };
  }, [pipeline, mode]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}

/**
 * Draw spectrum analyzer (frequency bars)
 */
function drawSpectrum(
  ctx: CanvasRenderingContext2D,
  pipeline: AudiophileAudioPipeline,
  width: number,
  height: number
) {
  const data = pipeline.getFrequencyData();
  const barCount = Math.min(128, data.length);
  const barWidth = width / barCount;
  const barGap = barWidth * 0.1;
  const actualBarWidth = barWidth - barGap;
  
  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#1DB954'); // Spotify green
  gradient.addColorStop(0.5, '#1ED760');
  gradient.addColorStop(1, '#19E68C');
  
  for (let i = 0; i < barCount; i++) {
    const value = data[i] || 0;
    const barHeight = (value / 255) * height * 0.8;
    
    const x = i * barWidth + barGap / 2;
    const y = height - barHeight;
    
    // Draw bar with rounded top
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, actualBarWidth, barHeight);
    
    // Add glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#1DB954';
    ctx.fillRect(x, y, actualBarWidth, barHeight);
    ctx.shadowBlur = 0;
  }
}

/**
 * Draw waveform (time-domain)
 */
function drawWaveform(
  ctx: CanvasRenderingContext2D,
  pipeline: AudiophileAudioPipeline,
  width: number,
  height: number
) {
  const data = pipeline.getTimeDomainData();
  const sliceWidth = width / data.length;
  
  ctx.strokeStyle = '#1DB954';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  const centerY = height / 2;
  
  for (let i = 0; i < data.length; i++) {
    const value = (data[i] - 128) / 128;
    const x = i * sliceWidth;
    const y = centerY + value * (height * 0.3);
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  // Mirror the waveform
  for (let i = data.length - 1; i >= 0; i--) {
    const value = (data[i] - 128) / 128;
    const x = i * sliceWidth;
    const y = centerY - value * (height * 0.3);
    ctx.lineTo(x, y);
  }
  
  ctx.closePath();
  
  // Fill with gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(29, 185, 84, 0.8)');
  gradient.addColorStop(0.5, 'rgba(29, 185, 84, 0.3)');
  gradient.addColorStop(1, 'rgba(29, 185, 84, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.stroke();
}

/**
 * Draw circular spectrum analyzer
 */
function drawCircularSpectrum(
  ctx: CanvasRenderingContext2D,
  pipeline: AudiophileAudioPipeline,
  width: number,
  height: number
) {
  const data = pipeline.getFrequencyData();
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.35;
  const barCount = Math.min(64, data.length);
  const angleStep = (Math.PI * 2) / barCount;
  
  for (let i = 0; i < barCount; i++) {
    const value = data[i] || 0;
    const barLength = (value / 255) * radius * 0.6;
    
    const angle = i * angleStep - Math.PI / 2;
    const startX = centerX + Math.cos(angle) * radius;
    const startY = centerY + Math.sin(angle) * radius;
    const endX = centerX + Math.cos(angle) * (radius + barLength);
    const endY = centerY + Math.sin(angle) * (radius + barLength);
    
    // Create color based on frequency
    const hue = (i / barCount) * 360;
    ctx.strokeStyle = `hsl(${hue}, 70%, 60%)`;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
}

/**
 * Draw particle effects (simplified)
 */
function drawParticles(
  ctx: CanvasRenderingContext2D,
  pipeline: AudiophileAudioPipeline,
  width: number,
  height: number
) {
  const data = pipeline.getFrequencyData();
  const particleCount = Math.min(50, data.length);
  
  const centerY = height / 2;
  
  for (let i = 0; i < particleCount; i++) {
    const value = data[Math.floor((i / particleCount) * data.length)] || 0;
    const intensity = value / 255;
    
    const x = (i / particleCount) * width;
    const y = centerY + (Math.random() - 0.5) * height * 0.3 * intensity;
    
    const size = 2 + intensity * 8;
    
    ctx.fillStyle = `rgba(29, 185, 84, ${0.3 + intensity * 0.7})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
}
