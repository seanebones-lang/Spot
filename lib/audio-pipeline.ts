/**
 * Audiophile-Grade Audio Pipeline
 * Professional Web Audio API processing chain for high-quality audio playback
 */

export interface AudioFormat {
<<<<<<< HEAD
  format: "mp3" | "wav" | "flac" | "m4a" | "ogg" | "opus";
=======
  format: 'mp3' | 'wav' | 'flac' | 'm4a' | 'ogg' | 'opus';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  mimeType: string;
  bitDepth?: number;
  sampleRate?: number;
  bitrate?: number;
}

export interface EQBand {
  frequency: number;
  gain: number; // -12 to +12 dB
  Q: number; // Quality factor (bandwidth)
}

/**
 * Enhanced Audio Pipeline with Web Audio API
 * Provides professional-grade audio processing, visualization, and effects
 */
export class AudiophileAudioPipeline {
  private audioContext: AudioContext | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private analyser: AnalyserNode | null = null;
  private eqNodes: BiquadFilterNode[] = [];
  private compressor: DynamicsCompressorNode | null = null;
  private gain: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
<<<<<<< HEAD

  // Default 10-band EQ frequencies (ISO standard)
  private readonly eqFrequencies = [
    31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000,
  ];

  // Visualization data buffers
  private frequencyData: Uint8Array | null = null;
  private timeDomainData: Uint8Array | null = null;

=======
  
  // Default 10-band EQ frequencies (ISO standard)
  private readonly eqFrequencies = [
    31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000
  ];
  
  // Visualization data buffers
  private frequencyData: Uint8Array | null = null;
  private timeDomainData: Uint8Array | null = null;
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Initialize the audio pipeline
   * Must be called after user interaction (autoplay restrictions)
   */
  async initialize(audioElement: HTMLAudioElement): Promise<void> {
    // Check if this is the same element we're already using
    if (this.audioElement === audioElement && this.source) {
<<<<<<< HEAD
      console.log(
        "⚠️ Audio element already initialized, skipping re-initialization",
      );
      return;
    }

    // If we have a different element or need to reinitialize, cleanup first
    if (this.audioContext && this.audioContext.state !== "closed") {
      await this.cleanup();
    }

    // Check if the audio element is already connected to a MediaElementSourceNode
    // This can happen if Howler reuses elements or if we're reinitializing
    if ((audioElement as any)._mediaElementSourceNode) {
      console.warn(
        "⚠️ Audio element already has a MediaElementSourceNode, cleaning up first",
      );
      // Try to disconnect the existing source if possible
      try {
        const existingSource = (audioElement as any)._mediaElementSourceNode;
        if (existingSource && typeof existingSource.disconnect === "function") {
          existingSource.disconnect();
        }
        // Also close the audio context if it exists
        if (this.audioContext && this.audioContext.state !== "closed") {
          await this.audioContext.close();
        }
      } catch (e) {
        console.warn("Error during cleanup:", e);
=======
      console.log('⚠️ Audio element already initialized, skipping re-initialization');
      return;
    }
    
    // If we have a different element or need to reinitialize, cleanup first
    if (this.audioContext && this.audioContext.state !== 'closed') {
      await this.cleanup();
    }
    
    // Check if the audio element is already connected to a MediaElementSourceNode
    // This can happen if Howler reuses elements or if we're reinitializing
    if ((audioElement as any)._mediaElementSourceNode) {
      console.warn('⚠️ Audio element already has a MediaElementSourceNode, cleaning up first');
      // Try to disconnect the existing source if possible
      try {
        const existingSource = (audioElement as any)._mediaElementSourceNode;
        if (existingSource && typeof existingSource.disconnect === 'function') {
          existingSource.disconnect();
        }
        // Also close the audio context if it exists
        if (this.audioContext && this.audioContext.state !== 'closed') {
          await this.audioContext.close();
        }
      } catch (e) {
        console.warn('Error during cleanup:', e);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      }
      delete (audioElement as any)._mediaElementSourceNode;
      // Reset audio context
      this.audioContext = null;
    }
<<<<<<< HEAD

    this.audioElement = audioElement;

=======
    
    this.audioElement = audioElement;
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Create AudioContext with optimal sample rate for audiophile quality
    // Use the highest supported sample rate (up to 192kHz for true audiophile)
    // Fallback to 96kHz, then 48kHz, then browser default
    const preferredSampleRates = [192000, 96000, 48000];
    let sampleRate = 44100; // Default
<<<<<<< HEAD

    // Try to use highest supported rate
    for (const rate of preferredSampleRates) {
      try {
        const testContext = new (
          window.AudioContext || (window as any).webkitAudioContext
        )({
          sampleRate: rate,
=======
    
    // Try to use highest supported rate
    for (const rate of preferredSampleRates) {
      try {
        const testContext = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: rate
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        });
        sampleRate = rate;
        testContext.close();
        break;
      } catch (e) {
        // Rate not supported, try next
        continue;
      }
    }
<<<<<<< HEAD

    this.audioContext = new AudioContext({
      sampleRate: sampleRate, // Optimal sample rate for FLAC lossless
      latencyHint: "interactive", // Low latency for responsive playback
    });

    // Resume if suspended (autoplay restrictions)
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

=======
    
    this.audioContext = new AudioContext({
      sampleRate: sampleRate, // Optimal sample rate for FLAC lossless
      latencyHint: 'interactive' // Low latency for responsive playback
    });
    
    // Resume if suspended (autoplay restrictions)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Create source from audio element
    try {
      this.source = this.audioContext.createMediaElementSource(audioElement);
      // Store reference to prevent duplicate connections
      (audioElement as any)._mediaElementSourceNode = this.source;
    } catch (error) {
<<<<<<< HEAD
      console.error("❌ Failed to create MediaElementSource:", error);
=======
      console.error('❌ Failed to create MediaElementSource:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // If the element is already connected, we can't use the pipeline
      // Fall back to direct playback without pipeline
      this.source = null;
      this.audioElement = audioElement;
      return;
    }
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Create analyser node for visualization (4096 FFT for maximum resolution)
    // Higher FFT = better frequency resolution for audiophile analysis
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 4096; // Maximum resolution for spectrum analysis
    this.analyser.smoothingTimeConstant = 0.8; // Smooth visualizations
    this.analyser.minDecibels = -90; // Extended dynamic range
    this.analyser.maxDecibels = -10; // Prevent clipping in visualization
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Initialize frequency data buffers
    const bufferLength = this.analyser.frequencyBinCount;
    this.frequencyData = new Uint8Array(bufferLength);
    this.timeDomainData = new Uint8Array(bufferLength);
<<<<<<< HEAD

    // Create 10-band equalizer
    this.createEQChain();

=======
    
    // Create 10-band equalizer
    this.createEQChain();
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Create dynamics compressor for normalization (optional, can be disabled for pure audiophile mode)
    // For lossless FLAC, we want minimal processing - compressor is subtle
    this.compressor = this.audioContext.createDynamicsCompressor();
    this.compressor.threshold.value = -30; // Lower threshold for subtle compression
    this.compressor.knee.value = 10; // Narrower knee for more transparent compression
    this.compressor.ratio.value = 4; // Lower ratio for less aggressive compression
    this.compressor.attack.value = 0.001; // Faster attack for transparency
    this.compressor.release.value = 0.1; // Faster release for natural sound
<<<<<<< HEAD

    // Create master gain node
    this.gain = this.audioContext.createGain();
    this.gain.gain.value = 1.0;

    // Connect audio graph: Source → EQ → Compressor → Gain → Analyser → Destination
    this.connectAudioGraph();

    console.log("✅ Audio pipeline initialized:", {
      sampleRate: this.audioContext.sampleRate,
      fftSize: this.analyser.fftSize,
      eqBands: this.eqNodes.length,
    });
  }

=======
    
    // Create master gain node
    this.gain = this.audioContext.createGain();
    this.gain.gain.value = 1.0;
    
    // Connect audio graph: Source → EQ → Compressor → Gain → Analyser → Destination
    this.connectAudioGraph();
    
    console.log('✅ Audio pipeline initialized:', {
      sampleRate: this.audioContext.sampleRate,
      fftSize: this.analyser.fftSize,
      eqBands: this.eqNodes.length
    });
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Create 10-band parametric equalizer
   */
  private createEQChain(): void {
    if (!this.audioContext) return;
<<<<<<< HEAD

    this.eqNodes = this.eqFrequencies.map((freq, index) => {
      const filter = this.audioContext!.createBiquadFilter();
      filter.type = "peaking"; // Parametric EQ
=======
    
    this.eqNodes = this.eqFrequencies.map((freq, index) => {
      const filter = this.audioContext!.createBiquadFilter();
      filter.type = 'peaking'; // Parametric EQ
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      filter.frequency.value = freq;
      filter.Q.value = 1.0; // Default Q factor
      filter.gain.value = 0; // No boost/cut by default
      return filter;
    });
  }
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Connect the audio processing chain
   */
  private connectAudioGraph(): void {
<<<<<<< HEAD
    if (!this.source || !this.analyser || !this.gain || !this.compressor)
      return;

    // Chain: Source → EQ1 → EQ2 → ... → EQ10 → Compressor → Gain → Analyser → Destination
    let currentNode: AudioNode = this.source;

=======
    if (!this.source || !this.analyser || !this.gain || !this.compressor) return;
    
    // Chain: Source → EQ1 → EQ2 → ... → EQ10 → Compressor → Gain → Analyser → Destination
    let currentNode: AudioNode = this.source;
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Connect through all EQ bands
    for (const eqNode of this.eqNodes) {
      currentNode.connect(eqNode);
      currentNode = eqNode;
    }
<<<<<<< HEAD

    // Connect to compressor
    currentNode.connect(this.compressor);

    // Connect to gain
    this.compressor.connect(this.gain);

    // Connect analyser for visualization (parallel to destination)
    this.gain.connect(this.analyser);

    // Connect to destination (speakers)
    this.gain.connect(this.audioContext!.destination);
  }

=======
    
    // Connect to compressor
    currentNode.connect(this.compressor);
    
    // Connect to gain
    this.compressor.connect(this.gain);
    
    // Connect analyser for visualization (parallel to destination)
    this.gain.connect(this.analyser);
    
    // Connect to destination (speakers)
    this.gain.connect(this.audioContext!.destination);
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Set gain for a specific EQ band
   * @param band Index (0-9) or frequency in Hz
   * @param gain Gain in dB (-12 to +12)
   */
  setEQBand(band: number, gain: number): void {
<<<<<<< HEAD
    const index =
      typeof band === "number" && band < 10
        ? Math.floor(band)
        : this.eqFrequencies.findIndex((f) => Math.abs(f - band) < 5);

    if (index >= 0 && index < this.eqNodes.length) {
      const clampedGain = Math.max(-12, Math.min(12, gain));
      this.eqNodes[index].gain.value = clampedGain;
      console.log(
        `🎚️ EQ Band ${index} (${this.eqFrequencies[index]}Hz): ${clampedGain.toFixed(1)}dB`,
      );
    }
  }

=======
    const index = typeof band === 'number' && band < 10 
      ? Math.floor(band) 
      : this.eqFrequencies.findIndex(f => Math.abs(f - band) < 5);
    
    if (index >= 0 && index < this.eqNodes.length) {
      const clampedGain = Math.max(-12, Math.min(12, gain));
      this.eqNodes[index].gain.value = clampedGain;
      console.log(`🎚️ EQ Band ${index} (${this.eqFrequencies[index]}Hz): ${clampedGain.toFixed(1)}dB`);
    }
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Set all EQ bands (10-band array)
   */
  setEQBands(gains: number[]): void {
    if (gains.length !== 10) {
<<<<<<< HEAD
      console.warn("⚠️ Expected 10 EQ bands, got", gains.length);
      return;
    }

=======
      console.warn('⚠️ Expected 10 EQ bands, got', gains.length);
      return;
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    gains.forEach((gain, index) => {
      this.setEQBand(index, gain);
    });
  }
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Get current EQ band gains
   */
  getEQBands(): number[] {
<<<<<<< HEAD
    return this.eqNodes.map((node) => node.gain.value);
  }

=======
    return this.eqNodes.map(node => node.gain.value);
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Set master volume (0.0 to 1.0)
   */
  setVolume(volume: number): void {
    if (this.gain) {
      this.gain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Get real-time frequency data for visualization
   * Returns 1024 values (half of FFT size)
   */
  getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(0);
    }
<<<<<<< HEAD

    const bufferLength = this.analyser.frequencyBinCount;
    const buffer = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(buffer);

=======
    
    const bufferLength = this.analyser.frequencyBinCount;
    const buffer = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(buffer);
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Cache for consistency
    this.frequencyData = buffer;
    return buffer;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Get real-time time-domain (waveform) data for visualization
   * Returns 1024 values representing the waveform
   */
  getTimeDomainData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(0);
    }
<<<<<<< HEAD

    const bufferLength = this.analyser.frequencyBinCount;
    const buffer = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(buffer);

=======
    
    const bufferLength = this.analyser.frequencyBinCount;
    const buffer = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(buffer);
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Cache for consistency
    this.timeDomainData = buffer;
    return buffer;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Get audio context state
   */
  getState(): AudioContextState {
<<<<<<< HEAD
    return this.audioContext?.state || "closed";
  }

=======
    return this.audioContext?.state || 'closed';
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Resume audio context (needed after user interaction)
   */
  async resume(): Promise<void> {
<<<<<<< HEAD
    if (this.audioContext && this.audioContext.state === "suspended") {
      await this.audioContext.resume();
      console.log("▶️ Audio context resumed");
    }
  }

=======
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
      console.log('▶️ Audio context resumed');
    }
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Get analyser node (for direct access if needed)
   */
  getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Get audio context sample rate
   */
  getSampleRate(): number {
    return this.audioContext?.sampleRate || 44100;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Cleanup and disconnect all nodes
   */
  async cleanup(): Promise<void> {
    // Disconnect source if it exists
    if (this.source) {
      try {
        this.source.disconnect();
      } catch (e) {
        // Ignore disconnect errors
      }
      this.source = null;
    }
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Remove reference from audio element
    if (this.audioElement) {
      delete (this.audioElement as any)._mediaElementSourceNode;
    }
<<<<<<< HEAD

    // Close audio context
    if (this.audioContext && this.audioContext.state !== "closed") {
      try {
        await this.audioContext.close();
      } catch (e) {
        console.warn("Error closing audio context:", e);
      }
    }

    this.audioContext = null;
    this.audioElement = null;

    // Disconnect EQ nodes
    this.eqNodes.forEach((node) => {
=======
    
    // Close audio context
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        await this.audioContext.close();
      } catch (e) {
        console.warn('Error closing audio context:', e);
      }
    }
    
    this.audioContext = null;
    this.audioElement = null;
    
    // Disconnect EQ nodes
    this.eqNodes.forEach(node => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      try {
        node.disconnect();
      } catch (e) {
        // Already disconnected
      }
    });
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    if (this.compressor) {
      try {
        this.compressor.disconnect();
      } catch (e) {
        // Already disconnected
      }
    }
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    if (this.gain) {
      try {
        this.gain.disconnect();
      } catch (e) {
        // Already disconnected
      }
    }
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    this.source = null;
    this.analyser = null;
    this.eqNodes = [];
    this.compressor = null;
    this.gain = null;
    this.audioElement = null;
    this.frequencyData = null;
    this.timeDomainData = null;
<<<<<<< HEAD

    console.log("🧹 Audio pipeline cleaned up");
=======
    
    console.log('🧹 Audio pipeline cleaned up');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }
}

// Singleton instance
let pipelineInstance: AudiophileAudioPipeline | null = null;

/**
 * Get or create the audio pipeline instance
 */
export function getAudioPipeline(): AudiophileAudioPipeline {
  if (!pipelineInstance) {
    pipelineInstance = new AudiophileAudioPipeline();
  }
  return pipelineInstance;
}
