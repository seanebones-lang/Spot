# 🎨 GLSL Shader Visualizer - 4K Audiophile Quality

## Overview

The `AudiophileVisualizer` component uses **GLSL shaders** and **WebGL** for GPU-accelerated, high-resolution audio visualization. This provides true 4K rendering capabilities with smooth 60fps performance.

---

## 🚀 Features

### GPU-Accelerated Rendering
- **WebGL/Three.js**: Hardware-accelerated graphics
- **GLSL Shaders**: Custom vertex and fragment shaders
- **4K Support**: Up to 3840×2160 effective resolution
- **60 FPS**: Smooth, real-time visualization
- **High Precision**: Float32 texture data for accuracy

### Visualization Types

1. **Spectrum Analyzer** (128 bars)
   - High-resolution frequency bars
   - Smooth gradients and glow effects
   - HSV color mapping for rainbow effects

2. **Waveform** (1024 samples)
   - Time-domain visualization
   - Smooth line rendering with glow
   - Amplitude-based coloring

3. **Circular** (128 radial bars)
   - 360-degree frequency display
   - Radial glow effects
   - Dynamic color gradients

4. **Vertical Bars** (64 bars)
   - Clean vertical bar display
   - Gradient coloring
   - Smooth edges

5. **Particle System** (100 particles)
   - Dynamic particle visualization
   - Position-based audio mapping
   - Smooth particle rendering

### Shader Features

- **Real-time Audio Data**: Float32 texture for high precision
- **Smooth Interpolation**: Custom smoothstep functions
- **HSV Color Space**: Rainbow color generation
- **Glow Effects**: Exponential falloff for visual depth
- **Gamma Correction**: Accurate color rendering
- **High Precision**: `highp float` precision for quality

---

## 📊 Technical Specifications

### Resolution Support
- **Base Resolution**: 1920×1080 (Full HD)
- **Pixel Ratio**: 2x (configurable)
- **Effective Resolution**: 3840×2160 (4K UHD)
- **Scalable**: Supports any resolution

### Performance
- **Frame Rate**: 60 FPS (requestAnimationFrame)
- **GPU Acceleration**: Hardware-accelerated WebGL
- **Memory**: Efficient Float32 texture usage
- **Latency**: <16ms per frame

### Audio Data
- **Sample Rate**: Up to 1024 frequency bins
- **Precision**: Float32 (32-bit floating point)
- **Update Rate**: 60 Hz (every frame)
- **Format**: LuminanceFormat (single channel)

---

## 🎨 Color Schemes

All color schemes are defined in RGB (0-1 range) for shader compatibility:

- **Spotify**: Green/white theme
- **Rainbow**: Full spectrum HSV
- **Fire**: Orange/red/yellow
- **Ocean**: Blue/cyan gradient
- **Neon**: Cyan/magenta/yellow
- **Monochrome**: White/gray scale

---

## 💻 Usage

```tsx
import AudiophileVisualizer from '@/components/AudiophileVisualizer';

<AudiophileVisualizer
  type="spectrum"
  colorScheme="spotify"
  sensitivity={0.7}
  width={1920}
  height={1080}
  pixelRatio={2} // For 4K
  showControls={true}
/>
```

### Props

- `type`: `'spectrum' | 'waveform' | 'circular' | 'bars' | 'particles'`
- `colorScheme`: `'spotify' | 'rainbow' | 'fire' | 'ocean' | 'neon' | 'monochrome'`
- `sensitivity`: `number` (0-1) - Visualization responsiveness
- `width`: `number` - Base width (default: 1920)
- `height`: `number` - Base height (default: 1080)
- `pixelRatio`: `number` - Device pixel ratio (default: 2 for 4K)
- `showControls`: `boolean` - Show settings panel
- `className`: `string` - Additional CSS classes

---

## 🔧 Shader Details

### Vertex Shader
- Handles geometry transformation
- Passes UV coordinates to fragment shader
- Standard Three.js projection

### Fragment Shader
- Main visualization logic
- Real-time audio processing
- Color generation and effects
- Multiple visualization modes

### Key Shader Functions

1. **`smoothstep()`**: Smooth interpolation
2. **`hsv2rgb()`**: HSV to RGB conversion
3. **`renderSpectrum()`**: Spectrum bar rendering
4. **`renderWaveform()`**: Waveform line rendering
5. **`renderCircular()`**: Circular bar rendering
6. **`renderBars()`**: Vertical bar rendering
7. **`renderParticles()`**: Particle system rendering

---

## 🎯 Performance Optimization

### GPU Optimization
- **Single Pass Rendering**: All effects in one shader
- **Efficient Textures**: LuminanceFormat for memory
- **Float32 Precision**: High-quality audio data
- **Minimal Overhead**: Direct GPU processing

### CPU Optimization
- **RequestAnimationFrame**: Smooth frame timing
- **Efficient Updates**: Only update changed data
- **Texture Caching**: Reuse texture objects
- **Minimal React Re-renders**: Memoized component

---

## 🌟 Advantages Over Canvas

1. **Performance**: GPU acceleration vs CPU rendering
2. **Resolution**: True 4K support vs canvas limitations
3. **Effects**: Advanced shader effects (glow, gradients)
4. **Smoothness**: 60 FPS guaranteed with GPU
5. **Scalability**: Handles any resolution efficiently
6. **Quality**: Float32 precision vs Uint8 canvas data

---

## 🔍 Browser Compatibility

- **Chrome/Edge**: ✅ Full support (WebGL 2.0)
- **Firefox**: ✅ Full support (WebGL 2.0)
- **Safari**: ✅ Full support (WebGL 2.0)
- **Mobile**: ✅ Supported (with performance considerations)

### Requirements
- WebGL 2.0 support
- Float texture support
- Hardware acceleration recommended

---

## 📝 Notes

- Shaders compile at runtime (first render may be slower)
- Texture updates happen every frame for real-time audio
- Color schemes use RGB values (0-1 range) for shader compatibility
- Pixel ratio of 2 provides 4K on standard displays
- Higher pixel ratios require more GPU power

---

## 🚀 Future Enhancements

Potential additions:
- **3D Visualizations**: Depth-based effects
- **Post-Processing**: Bloom, blur, distortion
- **Custom Shaders**: User-defined shader code
- **Multi-Pass Rendering**: Advanced effects pipeline
- **Compute Shaders**: GPU-based audio processing
- **VR Support**: Immersive 3D visualization

---

**Status**: ✅ Fully implemented with GLSL shaders and 4K support!
