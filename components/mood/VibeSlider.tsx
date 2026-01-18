'use client';

import { useState, useRef, useEffect } from 'react';

interface VibeSliderProps {
  value: number; // 0-100
  onChange: (value: number) => void;
}

export default function VibeSlider({ value, onChange }: VibeSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);

  // Convert value (0-100) to angle (-135 to 225 degrees for a 270-degree arc starting from top-left)
  const valueToAngle = (val: number) => {
    // Map 0-100 to -135 to 225 degrees (270 degree arc starting from top-left going clockwise)
    return -135 + (val / 100) * 270;
  };

  // Convert angle to value
  const angleToValue = (angle: number) => {
    // Normalize angle to -135 to 225 range
    let normalizedAngle = angle;
    if (normalizedAngle < -135) normalizedAngle = -135;
    if (normalizedAngle > 225) normalizedAngle = 225;
    return ((normalizedAngle + 135) / 270) * 100;
  };

  // Get coordinates of point on circle
  const getCoordinates = (angle: number, radius: number) => {
    const radians = (angle * Math.PI) / 180;
    const x = Math.cos(radians) * radius;
    const y = Math.sin(radians) * radius;
    return { x, y };
  };

  // Calculate angle from center point
  const getAngleFromCenter = (clientX: number, clientY: number, centerX: number, centerY: number) => {
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    let angle = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
    return angle;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!dialRef.current) return;
    
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    const angle = getAngleFromCenter(clientX, clientY, centerX, centerY);
    const newValue = angleToValue(angle);
    onChange(Math.max(0, Math.min(100, newValue)));
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleMove(e);
      const handleMouseUp = () => setIsDragging(false);
      
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const angle = valueToAngle(value);
  const radius = 80; // Radius of the dial track
  const knobCoords = getCoordinates(angle, radius);

  // Get color based on value
  const getTrackColor = () => {
    const percent = value / 100;
    if (percent < 0.5) {
      // Calm side: dark blue to light blue
      const intensity = percent * 2;
      return `rgb(${30 + intensity * 37}, ${58 + intensity * 126}, ${138 + intensity * 118})`;
    } else {
      // Energetic side: yellow to orange
      const intensity = (percent - 0.5) * 2;
      return `rgb(${251 - intensity * 35}, ${191 - intensity * 51}, ${36 + intensity * 180})`;
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">3. VIBE</h3>
      <div className="flex flex-col items-center">
        <div
          ref={dialRef}
          className="relative w-64 h-64 cursor-pointer select-none"
          onMouseDown={handleMouseDown}
        >
          {/* SVG Track */}
          <svg className="absolute inset-0 w-full h-full transform rotate-[-135deg]" viewBox="0 0 200 200">
            {/* Outer track ring */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Active track arc */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={getTrackColor()}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(value / 100) * 424.1} 424.1`}
              className="transition-all duration-300"
              style={{
                filter: isDragging ? `drop-shadow(0 0 15px ${getTrackColor()})` : 'none',
              }}
            />
          </svg>

          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-spotify-dark-gray rounded-full border-2 border-white/10 flex items-center justify-center">
            <span className="text-2xl font-bold" style={{ color: getTrackColor() }}>
              {Math.round(value)}
            </span>
          </div>

          {/* Knob */}
          <div
            className="absolute top-1/2 left-1/2 w-6 h-6 bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing transition-all duration-100 border-2"
            style={{
              transform: `translate(calc(-50% + ${knobCoords.x}px), calc(-50% + ${knobCoords.y}px))`,
              borderColor: getTrackColor(),
              boxShadow: isDragging 
                ? `0 0 20px ${getTrackColor()}, 0 0 30px ${getTrackColor()}` 
                : '0 2px 8px rgba(0,0,0,0.3)',
            }}
          />
        </div>
        
        {/* Labels */}
        <div className="flex justify-between w-64 mt-4 text-sm text-spotify-text-gray">
          <span>Calm</span>
          <span className="font-medium text-white">{Math.round(value)}% Energetic</span>
          <span>Energetic</span>
        </div>
      </div>
    </div>
  );
}
