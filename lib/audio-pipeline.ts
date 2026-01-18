/**
 * Audiophile-Grade Audio Pipeline
 * Professional Web Audio API processing chain for high-quality audio playback
 */

export interface AudioFormat {
  format: 'mp3' | 'wav' | 'flac' | 'm4a' | 'ogg' | 'opus';
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
  
  // Default 10-band EQ frequencies (ISO standard)
  private readonly eqFrequencies = [
    31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000
  ];
  
  // Visualization data buffers
  private frequencyData: Uint8Array | null = null;
  private timeDomainData: Uint8Array | null = null;
  
  /**
   * Initialize the audio pipeline
   * Must be called after user interaction (autoplay restrictions)
   */
  async initialize(audioElement: HTMLAudioElement): Promise<void> {
    if (this.audioContext && this.audioContext.state !== 'closed') {
      await this.cleanup();
    }
    
    this.audioElement = audioElement;
    
    // Create AudioContext with high sample rate for audiophile quality
    this.audioContext = new AudioContext({
      sampleRate: 96000, // High sample rate for quality
      latencyHint: 'interactive' // Low latency
    });
    
    // Resume if suspended (autoplay restrictions)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
    
    // Create source from audio element
    this.source = this.audioContext.createMediaElementSource(audioElement);
    
    // Create analyser node for visualization (2048 FFT for high resolution)
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.8; // Smooth visualizations
    
    // Initialize frequency data buffers
    const bufferLength = this.analyser.frequencyBinCount;
    this.frequencyData = new Uint8Array(bufferLength);
    this.timeDomainData = new Uint8Array(bufferLength);
    
    // Create 10-band equalizer
    this.createEQChain();
    
    // Create dynamics compressor for normalization
    this.compressor = this.audioContext.createDynamicsCompressor();
    this.compressor.threshold.value = -24;
    this.compressor.knee.value = 30;
    this.compressor.ratio.value = 12;
    this.compressor.attack.value = 0.003;
    this.compressor.release.value = 0.25;
    
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
  
  /**
   * Create 10-band parametric equalizer
   */
  private createEQChain(): void {
    if (!this.audioContext) return;
    
    this.eqNodes = this.eqFrequencies.map((freq, index) => {
      const filter = this.audioContext!.createBiquadFilter();
      filter.type = 'peaking'; // Parametric EQ
      filter.frequency.value = freq;
      filter.Q.value = 1.0; // Default Q factor
      filter.gain.value = 0; // No boost/cut by default
      return filter;
    });
  }
  
  /**
   * Connect the audio processing chain
   */
  private connectAudioGraph(): void {
    if (!this.source || !this.analyser || !this.gain || !this.compressor) return;
    
    // Chain: Source → EQ1 → EQ2 → ... → EQ10 → Compressor → Gain → Analyser → Destination
    let currentNode: AudioNode = this.source;
    
    // Connect through all EQ bands
    for (const eqNode of this.eqNodes) {
      currentNode.connect(eqNode);
      currentNode = eqNode;
    }
    
    // Connect to compressor
    currentNode.connect(this.compressor);
    
    // Connect to gain
    this.compressor.connect(this.gain);
    
    // Connect analyser for visualization (parallel to destination)
    this.gain.connect(this.analyser);
    
    // Connect to destination (speakers)
    this.gain.connect(this.audioContext!.destination);
  }
  
  /**
   * Set gain for a specific EQ band
   * @param band Index (0-9) or frequency in Hz
   * @param gain Gain in dB (-12 to +12)
   */
  setEQBand(band: number, gain: number): void {
    const index = typeof band === 'number' && band < 10 
      ? Math.floor(band) 
      : this.eqFrequencies.findIndex(f => Math.abs(f - band) < 5);
    
    if (index >= 0 && index < this.eqNodes.length) {
      const clampedGain = Math.max(-12, Math.min(12, gain));
      this.eqNodes[index].gain.value = clampedGain;
      console.log(`🎚️ EQ Band ${index} (${this.eqFrequencies[index]}Hz): ${clampedGain.toFixed(1)}dB`);
    }
  }
  
  /**
   * Set all EQ bands (10-band array)
   */
  setEQBands(gains: number[]): void {
    if (gains.length !== 10) {
      console.warn('⚠️ Expected 10 EQ bands, got', gains.length);
      return;
    }
    
    gains.forEach((gain, index) => {
      this.setEQBand(index, gain);
    });
  }
  
  /**
   * Get current EQ band gains
   */
  getEQBands(): number[] {
    return this.eqNodes.map(node => node.gain.value);
  }
  
  /**
   * Set master volume (0.0 to 1.0)
   */
  setVolume(volume: number): void {
    if (this.gain) {
      this.gain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }
  
  /**
   * Get real-time frequency data for visualization
   * Returns 1024 values (half of FFT size)
   */
  getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(0);
    }
    
    const bufferLength = this.analyser.frequencyBinCount;
    const buffer = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(buffer);
    
    // Cache for consistency
    this.frequencyData = buffer;
    return buffer;
  }
  
  /**
   * Get real-time time-domain (waveform) data for visualization
   * Returns 1024 values representing the waveform
   */
  getTimeDomainData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(0);
    }
    
    const bufferLength = this.analyser.frequencyBinCount;
    const buffer = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(buffer);
    
    // Cache for consistency
    this.timeDomainData = buffer;
    return buffer;
  }
  
  /**
   * Get audio context state
   */
  getState(): AudioContextState {
    return this.audioContext?.state || 'closed';
  }
  
  /**
   * Resume audio context (needed after user interaction)
   */
  async resume(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
      console.log('▶️ Audio context resumed');
    }
  }
  
  /**
   * Get analyser node (for direct access if needed)
   */
  getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }
  
  /**
   * Get audio context sample rate
   */
  getSampleRate(): number {
    return this.audioContext?.sampleRate || 44100;
  }
  
  /**
   * Cleanup and disconnect all nodes
   */
  async cleanup(): Promise<void> {
    if (this.source) {
      try {
        this.source.disconnect();
      } catch (e) {
        // Already disconnected
      }
    }
    
    // Disconnect EQ nodes
    this.eqNodes.forEach(node => {
      try {
        node.disconnect();
      } catch (e) {
        // Already disconnected
      }
    });
    
    if (this.compressor) {
      try {
        this.compressor.disconnect();
      } catch (e) {
        // Already disconnected
      }
    }
    
    if (this.gain) {
      try {
        this.gain.disconnect();
      } catch (e) {
        // Already disconnected
      }
    }
    
    if (this.audioContext && this.audioContext.state !== 'closed') {
      await this.audioContext.close();
    }
    
    this.audioContext = null;
    this.source = null;
    this.analyser = null;
    this.eqNodes = [];
    this.compressor = null;
    this.gain = null;
    this.audioElement = null;
    this.frequencyData = null;
    this.timeDomainData = null;
    
    console.log('🧹 Audio pipeline cleaned up');
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
