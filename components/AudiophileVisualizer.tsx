"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ShaderMaterial,
  Vector2,
  DataTexture,
  RedFormat,
  FloatType,
} from "three";
import { audioPlayer } from "@/lib/player";
import { cn } from "@/lib/utils";
import { Settings, Palette, Zap } from "lucide-react";

// Vertex Shader - Handles geometry and UV coordinates
const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader - Main visualization logic
const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uAudioData;
uniform float uSensitivity;
uniform vec3 uColorPrimary;
uniform vec3 uColorSecondary;
uniform vec3 uColorAccent;
uniform float uVisualizerType; // 0=spectrum, 1=waveform, 2=circular, 3=bars, 4=particles

varying vec2 vUv;
varying vec3 vPosition;

// Smooth interpolation
float smoothstep(float edge0, float edge1, float x) {
  float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

// HSV to RGB conversion for rainbow effects
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// Spectrum Analyzer Visualization
vec3 renderSpectrum(vec2 uv) {
  float x = uv.x;
  float barIndex = floor(x * 128.0); // 128 bars for high resolution
  float barPos = fract(x * 128.0);
  
  // Sample audio data
  float audioValue = texture2D(uAudioData, vec2(barIndex / 128.0, 0.5)).r;
  audioValue *= uSensitivity;
  
  // Calculate bar height
  float barHeight = audioValue * 0.9;
  float distFromCenter = abs(uv.y - 0.5);
  float barTop = 0.5 + barHeight * 0.5;
  float barBottom = 0.5 - barHeight * 0.5;
  
  // Create bar with smooth edges
  float barMask = smoothstep(0.02, 0.0, abs(uv.y - barTop)) * 
                  smoothstep(0.02, 0.0, abs(uv.y - barBottom));
  barMask *= smoothstep(0.05, 0.0, abs(barPos - 0.5));
  
  // Color gradient based on frequency
  float hue = barIndex / 128.0;
  vec3 color = hsv2rgb(vec3(hue * 0.7 + 0.3, 0.8, audioValue));
  
  // Add glow effect
  float glow = exp(-distFromCenter * 20.0) * audioValue;
  color += uColorAccent * glow * 0.5;
  
  return color * barMask;
}

// Waveform Visualization - Enhanced for 4K with smooth interpolation
vec3 renderWaveform(vec2 uv) {
  float x = uv.x;
  
  // Use high-resolution sampling for 4K displays (2048 samples for better detail)
  float sampleCount = 2048.0;
  float sampleIndex = x * sampleCount;
  
  // Bilinear interpolation for smooth waveform at any resolution
  float samplePos = sampleIndex / sampleCount;
  float samplePos1 = floor(sampleIndex) / sampleCount;
  float samplePos2 = (floor(sampleIndex) + 1.0) / sampleCount;
  
  // Sample adjacent points for smooth interpolation
  float audioValue1 = texture2D(uAudioData, vec2(samplePos1, 0.5)).r;
  float audioValue2 = texture2D(uAudioData, vec2(samplePos2, 0.5)).r;
  
  // Smooth interpolation between samples
  float t = fract(sampleIndex);
  float audioValue = mix(audioValue1, audioValue2, smoothstep(0.0, 1.0, t));
  
  // Center around 0 (-1 to 1 range)
  audioValue = (audioValue - 0.5) * 2.0;
  audioValue *= uSensitivity;
  
  // Calculate waveform position with center symmetry
  float waveY = 0.5 + audioValue * 0.45;
  float dist = abs(uv.y - waveY);
  
  // High-resolution line rendering for 4K (sharper falloff)
  float lineWidth = 0.003; // Thinner line for 4K clarity
  float line = exp(-dist / lineWidth);
  
  // Multi-layer glow for depth
  float innerGlow = exp(-dist * 200.0) * 0.8;
  float outerGlow = exp(-dist * 50.0) * 0.4;
  float distantGlow = exp(-dist * 15.0) * 0.2;
  
  // Color gradient based on amplitude and position
  float amplitude = abs(audioValue);
  vec3 color = mix(uColorPrimary, uColorSecondary, amplitude);
  color = mix(color, uColorAccent, amplitude * 0.5);
  
  // Add vibrant glow layers
  color += uColorAccent * innerGlow;
  color += uColorSecondary * outerGlow;
  color += uColorPrimary * distantGlow;
  
  // Add mirror effect for stereo visualization
  float mirrorY = 1.0 - waveY;
  float mirrorDist = abs(uv.y - mirrorY);
  float mirrorLine = exp(-mirrorDist / lineWidth) * 0.3;
  color += uColorSecondary * mirrorLine * (1.0 - amplitude * 0.5);
  
  return color * clamp(line + innerGlow + outerGlow, 0.0, 1.5);
}

// Circular Visualization
vec3 renderCircular(vec2 uv) {
  vec2 center = vec2(0.5, 0.5);
  vec2 pos = uv - center;
  float angle = atan(pos.y, pos.x);
  float radius = length(pos);
  
  // Map angle to audio data (0 to 2π)
  float normalizedAngle = (angle + 3.14159) / (2.0 * 3.14159);
  float barIndex = floor(normalizedAngle * 128.0);
  float audioValue = texture2D(uAudioData, vec2(barIndex / 128.0, 0.5)).r;
  audioValue *= uSensitivity;
  
  // Inner and outer radius
  float innerRadius = 0.2;
  float outerRadius = innerRadius + audioValue * 0.3;
  
  // Create bar
  float barMask = smoothstep(0.01, 0.0, abs(radius - outerRadius));
  barMask *= step(innerRadius, radius);
  
  // Color gradient
  float hue = normalizedAngle;
  vec3 color = hsv2rgb(vec3(hue * 0.7 + 0.3, 0.9, audioValue + 0.3));
  
  // Add radial glow
  float glow = exp(-abs(radius - outerRadius) * 30.0) * audioValue;
  color += uColorAccent * glow * 0.5;
  
  return color * barMask;
}

// Vertical Bars
vec3 renderBars(vec2 uv) {
  float x = uv.x;
  float barIndex = floor(x * 64.0);
  float barPos = fract(x * 64.0);
  
  float audioValue = texture2D(uAudioData, vec2(barIndex / 64.0, 0.5)).r;
  audioValue *= uSensitivity;
  
  float barHeight = audioValue * 0.8;
  float barTop = 0.5 + barHeight * 0.5;
  float barBottom = 0.5 - barHeight * 0.5;
  
  float barMask = smoothstep(0.02, 0.0, abs(uv.y - barTop)) * 
                  smoothstep(0.02, 0.0, abs(uv.y - barBottom));
  barMask *= step(barBottom, uv.y) * step(uv.y, barTop);
  barMask *= smoothstep(0.1, 0.0, abs(barPos - 0.5));
  
  // Vertical gradient
  float gradientPos = (uv.y - barBottom) / (barTop - barBottom);
  vec3 color = mix(uColorPrimary, uColorAccent, gradientPos);
  color = mix(color, uColorSecondary, audioValue);
  
  return color * barMask;
}

// Particle System
vec3 renderParticles(vec2 uv) {
  vec3 color = vec3(0.0);
  
  // Sample multiple points for particles
  for (float i = 0.0; i < 100.0; i += 1.0) {
    float particleX = mod(i * 7.13, 1.0); // Pseudo-random distribution
    float particleY = mod(i * 3.17, 1.0);
    
    float audioValue = texture2D(uAudioData, vec2(i / 100.0, 0.5)).r;
    audioValue *= uSensitivity;
    
    vec2 particlePos = vec2(particleX, particleY);
    float dist = distance(uv, particlePos);
    
    float size = audioValue * 0.02 + 0.005;
    float particle = exp(-dist / size) * audioValue;
    
    // Color based on audio value
    float hue = i / 100.0;
    vec3 particleColor = hsv2rgb(vec3(hue * 0.7 + 0.3, 0.8, audioValue + 0.2));
    
    color += particleColor * particle;
  }
  
  return color;
}

void main() {
  vec2 uv = vUv;
  vec3 color = vec3(0.0);
  
  // Select visualization type
  if (uVisualizerType < 0.5) {
    // Spectrum
    color = renderSpectrum(uv);
  } else if (uVisualizerType < 1.5) {
    // Waveform
    color = renderWaveform(uv);
  } else if (uVisualizerType < 2.5) {
    // Circular
    color = renderCircular(uv);
  } else if (uVisualizerType < 3.5) {
    // Bars
    color = renderBars(uv);
  } else {
    // Particles
    color = renderParticles(uv);
  }
  
  // Add subtle background
  float background = 0.05;
  color = mix(vec3(background), color, length(color));
  
  // Gamma correction for better color accuracy
  color = pow(color, vec3(1.0 / 2.2));
  
  gl_FragColor = vec4(color, 1.0);
}
`;

// Shader Material Component
function VisualizerMaterial({
  audioData,
  sensitivity,
  colorPrimary,
  colorSecondary,
  colorAccent,
  visualizerType,
}: {
  audioData: Float32Array;
  sensitivity: number;
  colorPrimary: [number, number, number];
  colorSecondary: [number, number, number];
  colorAccent: [number, number, number];
  visualizerType: number;
}) {
  const materialRef = useRef<ShaderMaterial>(null);
  const textureRef = useRef<DataTexture | null>(null);
  const timeRef = useRef(0);

  // Create audio data texture
  useEffect(() => {
    if (audioData.length > 0 && materialRef.current) {
      // Create texture with audio data
      // Use RedFormat (single channel) with FloatType for high precision
      const texture = new DataTexture(
        audioData,
        audioData.length,
        1,
        RedFormat,
        FloatType,
      );
      texture.needsUpdate = true;
      textureRef.current = texture;

      // Update material uniform
      if (materialRef.current.uniforms) {
        materialRef.current.uniforms.uAudioData.value = texture;
      }
    }
  }, [audioData]);

  // Update shader uniforms
  useFrame((state) => {
    if (materialRef.current) {
      timeRef.current += state.clock.getDelta();

      if (materialRef.current.uniforms) {
        materialRef.current.uniforms.uTime.value = timeRef.current;
        materialRef.current.uniforms.uResolution.value = new Vector2(
          state.size.width,
          state.size.height,
        );
        if (textureRef.current) {
          materialRef.current.uniforms.uAudioData.value = textureRef.current;
          textureRef.current.needsUpdate = true;
        }
        materialRef.current.uniforms.uSensitivity.value = sensitivity;
        materialRef.current.uniforms.uColorPrimary.value = colorPrimary;
        materialRef.current.uniforms.uColorSecondary.value = colorSecondary;
        materialRef.current.uniforms.uColorAccent.value = colorAccent;
        materialRef.current.uniforms.uVisualizerType.value = visualizerType;
      }
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        uTime: { value: 0 },
        uResolution: { value: new Vector2(1920, 1080) },
        uAudioData: { value: null },
        uSensitivity: { value: sensitivity },
        uColorPrimary: { value: colorPrimary },
        uColorSecondary: { value: colorSecondary },
        uColorAccent: { value: colorAccent },
        uVisualizerType: { value: visualizerType },
      }}
    />
  );
}

// Plane geometry for full-screen quad
function VisualizerPlane(props: any) {
  return (
    <mesh {...props}>
      <planeGeometry args={[2, 2]} />
      {props.children}
    </mesh>
  );
}

export type VisualizerType =
  | "spectrum"
  | "waveform"
  | "circular"
  | "bars"
  | "particles";
export type VisualizerColorScheme =
  | "spotify"
  | "rainbow"
  | "fire"
  | "ocean"
  | "neon"
  | "monochrome";

interface ColorScheme {
  primary: [number, number, number];
  secondary: [number, number, number];
  accent: [number, number, number];
}

const COLOR_SCHEMES: Record<VisualizerColorScheme, ColorScheme> = {
  spotify: {
    primary: [0.11, 0.71, 0.33], // #1DB954
    secondary: [0.12, 0.84, 0.38], // #1ed760
    accent: [1.0, 1.0, 1.0], // white
  },
  rainbow: {
    primary: [1.0, 0.0, 0.0], // red
    secondary: [1.0, 0.5, 0.0], // orange
    accent: [1.0, 1.0, 0.0], // yellow
  },
  fire: {
    primary: [1.0, 0.27, 0.0], // #ff4500
    secondary: [1.0, 0.39, 0.28], // #ff6347
    accent: [1.0, 0.84, 0.0], // #ffd700
  },
  ocean: {
    primary: [0.0, 0.75, 1.0], // #00bfff
    secondary: [0.12, 0.56, 1.0], // #1e90ff
    accent: [0.53, 0.81, 0.92], // #87ceeb
  },
  neon: {
    primary: [0.0, 1.0, 1.0], // cyan
    secondary: [1.0, 0.0, 1.0], // magenta
    accent: [1.0, 1.0, 0.0], // yellow
  },
  monochrome: {
    primary: [1.0, 1.0, 1.0], // white
    secondary: [0.8, 0.8, 0.8], // light gray
    accent: [0.5, 0.5, 0.5], // gray
  },
};

interface AudiophileVisualizerProps {
  type?: VisualizerType;
  colorScheme?: VisualizerColorScheme;
  sensitivity?: number;
  className?: string;
  width?: number;
  height?: number;
  showControls?: boolean;
  pixelRatio?: number; // For 4K rendering
}

/**
 * Audiophile-Grade GLSL Shader Visualizer
 * 4K-capable, GPU-accelerated audio visualization
 */
function AudiophileVisualizer({
  type = "spectrum",
  colorScheme = "spotify",
  sensitivity = 0.7,
  className,
  width = 1920,
  height = 1080,
  showControls = false,
  pixelRatio = 2, // 2x for retina/4K
}: AudiophileVisualizerProps) {
  const [currentType, setCurrentType] = useState<VisualizerType>(type);
  const [currentColorScheme, setCurrentColorScheme] =
    useState<VisualizerColorScheme>(colorScheme);
  const [currentSensitivity, setCurrentSensitivity] = useState(sensitivity);
  const [showSettings, setShowSettings] = useState(false);
  const [audioData, setAudioData] = useState<Float32Array>(
    new Float32Array(2048),
  );
  const animationFrameRef = useRef<number | null>(null);

  const colors = COLOR_SCHEMES[currentColorScheme];
  const visualizerTypeIndex = [
    "spectrum",
    "waveform",
    "circular",
    "bars",
    "particles",
  ].indexOf(currentType);

  // Get audio data and update texture - Enhanced for 4K with more samples
  const updateAudioData = useCallback(() => {
    const pipeline = audioPlayer.getAudioPipeline();
    if (!pipeline) {
      setAudioData(new Float32Array(2048));
      return;
    }

    // Get both frequency and time-domain data for comprehensive visualization
    const frequencyData = pipeline.getFrequencyData();
    const timeDomainData = pipeline.getTimeDomainData();

    if (frequencyData.length > 0 || timeDomainData.length > 0) {
      // Use up to 2048 samples for 4K resolution
      // Prefer time-domain data for waveform, frequency data for spectrum
      const sourceData =
        currentType === "waveform" ? timeDomainData : frequencyData;
      const maxSamples = 2048;
      const sampleCount = Math.min(sourceData.length, maxSamples);

      const floatData = new Float32Array(maxSamples);

      // Convert and normalize to 0-1 range
      for (let i = 0; i < sampleCount; i++) {
        floatData[i] = sourceData[i] / 255.0;
      }

      // Interpolate/extend data if we have fewer samples than needed
      if (sampleCount < maxSamples && sampleCount > 0) {
        const step = sampleCount / maxSamples;
        for (let i = sampleCount; i < maxSamples; i++) {
          const sourceIndex = Math.floor(i * step);
          floatData[i] = floatData[sourceIndex];
        }
      }

      setAudioData(floatData);
    }
  }, [currentType]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      updateAudioData();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateAudioData]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={pixelRatio} // Device pixel ratio for 4K
        style={{ width: "100%", height: "100%" }}
      >
        <VisualizerPlane>
          <VisualizerMaterial
            audioData={audioData}
            sensitivity={currentSensitivity}
            colorPrimary={colors.primary}
            colorSecondary={colors.secondary}
            colorAccent={colors.accent}
            visualizerType={visualizerTypeIndex}
          />
        </VisualizerPlane>
      </Canvas>

      {showControls && (
        <>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute top-2 right-2 p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
            aria-label="Visualizer settings"
          >
            <Settings size={16} />
          </button>

          {showSettings && (
            <div className="absolute top-12 right-2 bg-[#181818] border border-[#282828] rounded-lg p-4 min-w-[200px] z-10">
              <div className="mb-4">
                <label
                  htmlFor="visualizer-type"
                  className="block text-sm text-spotify-text-gray mb-2"
                >
                  Type
                </label>
                <select
                  id="visualizer-type"
                  aria-label="Visualizer type"
                  value={currentType}
                  onChange={(e) =>
                    setCurrentType(e.target.value as VisualizerType)
                  }
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
                <label
                  htmlFor="visualizer-color-scheme"
                  className="block text-sm text-spotify-text-gray mb-2"
                >
                  Color Scheme
                </label>
                <select
                  id="visualizer-color-scheme"
                  aria-label="Color scheme"
                  value={currentColorScheme}
                  onChange={(e) =>
                    setCurrentColorScheme(
                      e.target.value as VisualizerColorScheme,
                    )
                  }
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
                <label
                  htmlFor="visualizer-sensitivity"
                  className="block text-sm text-spotify-text-gray mb-2"
                >
                  Sensitivity: {Math.round(currentSensitivity * 100)}%
                </label>
                <input
                  id="visualizer-sensitivity"
                  type="range"
                  aria-label={`Sensitivity: ${Math.round(currentSensitivity * 100)}%`}
                  min="0"
                  max="1"
                  step="0.01"
                  value={currentSensitivity}
                  onChange={(e) =>
                    setCurrentSensitivity(parseFloat(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-[#404040]">
                <div className="text-xs text-spotify-text-gray">
                  <div>
                    Resolution: {width}×{height}
                  </div>
                  <div>Pixel Ratio: {pixelRatio}x</div>
                  <div>
                    Effective: {width * pixelRatio}×{height * pixelRatio}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default memo(AudiophileVisualizer);
