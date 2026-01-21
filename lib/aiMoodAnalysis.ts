/**
 * RAG-Enhanced AI Mood Analysis Pipeline
<<<<<<< HEAD
 *
 * This module implements a Retrieval-Augmented Generation (RAG) system for mood tag pre-population
 * on track uploads. It combines audio feature extraction, semantic embeddings, and similarity
 * matching with a vector database to achieve >90% accuracy in mood classification.
 *
=======
 * 
 * This module implements a Retrieval-Augmented Generation (RAG) system for mood tag pre-population
 * on track uploads. It combines audio feature extraction, semantic embeddings, and similarity
 * matching with a vector database to achieve >90% accuracy in mood classification.
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Architecture:
 * - Audio Feature Extraction (Librosa-style features via Web Audio API)
 * - Embedding Generation (BERT-based audio-text embeddings)
 * - Vector Database Integration (Pinecone/FAISS for semantic search)
 * - Mood Classification Model (Fine-tuned in-house model)
 * - Similarity Matching Algorithm (Cosine similarity with weighted features)
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Performance Targets:
 * - Inference latency: <200ms
 * - Semantic search accuracy: >90% (recall/precision)
 * - Mood state prediction confidence: >0.85
 */

<<<<<<< HEAD
import { MoodState, MoodTags, AIMoodSuggestion } from "@/types/mood";
import { DEFAULT_LIMITS, PERFORMANCE_TARGETS } from "./pipelineConfig";
=======
import { MoodState, MoodTags, AIMoodSuggestion } from '@/types/mood';
import { DEFAULT_LIMITS, PERFORMANCE_TARGETS } from './pipelineConfig';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Audio Feature Extractor
 * Extracts musical features from audio files using Web Audio API
 * Similar to Librosa feature extraction but browser-compatible
 */
export class AudioFeatureExtractor {
  private audioContext: AudioContext | null = null;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Initialize audio context for feature extraction
   */
  async initialize(): Promise<void> {
    this.audioContext = new AudioContext({ sampleRate: 44100 });
  }

  /**
   * Extract features from audio file
   * Returns feature vector for embedding generation
   */
  async extractFeatures(audioFile: File): Promise<AudioFeatures> {
    if (!this.audioContext) {
      await this.initialize();
    }

    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Extract multi-dimensional features
    const features: AudioFeatures = {
      // Temporal features
      tempo: this.calculateTempo(audioBuffer),
      duration: audioBuffer.duration,
      beatStrength: this.calculateBeatStrength(audioBuffer),
<<<<<<< HEAD

=======
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Spectral features
      spectralCentroid: this.calculateSpectralCentroid(audioBuffer),
      spectralRolloff: this.calculateSpectralRolloff(audioBuffer),
      spectralFlux: this.calculateSpectralFlux(audioBuffer),
      zeroCrossingRate: this.calculateZeroCrossingRate(audioBuffer),
<<<<<<< HEAD

      // MFCC (Mel-frequency cepstral coefficients) - first 13 coefficients
      mfcc: this.calculateMFCC(audioBuffer, 13),

      // Energy features
      rmsEnergy: this.calculateRMSEnergy(audioBuffer),
      energyEntropy: this.calculateEnergyEntropy(audioBuffer),

      // Harmonic features
      harmony: this.calculateHarmony(audioBuffer),
      inharmonicity: this.calculateInharmonicity(audioBuffer),

=======
      
      // MFCC (Mel-frequency cepstral coefficients) - first 13 coefficients
      mfcc: this.calculateMFCC(audioBuffer, 13),
      
      // Energy features
      rmsEnergy: this.calculateRMSEnergy(audioBuffer),
      energyEntropy: this.calculateEnergyEntropy(audioBuffer),
      
      // Harmonic features
      harmony: this.calculateHarmony(audioBuffer),
      inharmonicity: this.calculateInharmonicity(audioBuffer),
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Timbre features
      brightness: this.calculateBrightness(audioBuffer),
      roughness: this.calculateRoughness(audioBuffer),
    };

    return features;
  }

  /**
   * Calculate tempo (BPM) using autocorrelation
   */
  private calculateTempo(audioBuffer: AudioBuffer): number {
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    const frameSize = 2048;
    const hopSize = 512;
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Simplified tempo detection using energy-based autocorrelation
    const energies: number[] = [];
    for (let i = 0; i < channelData.length - frameSize; i += hopSize) {
      let energy = 0;
      for (let j = 0; j < frameSize; j++) {
        energy += Math.abs(channelData[i + j]);
      }
      energies.push(energy / frameSize);
    }

    // Find peak in autocorrelation (simplified)
    let maxCorr = 0;
    let tempo = 120; // Default
<<<<<<< HEAD

    for (
      let lag = Math.floor(energies.length * 0.1);
      lag < Math.floor(energies.length * 0.8);
      lag++
    ) {
=======
    
    for (let lag = Math.floor(energies.length * 0.1); lag < Math.floor(energies.length * 0.8); lag++) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      let corr = 0;
      for (let i = 0; i < energies.length - lag; i++) {
        corr += energies[i] * energies[i + lag];
      }
      if (corr > maxCorr) {
        maxCorr = corr;
        const lagInSeconds = (lag * hopSize) / sampleRate;
        tempo = Math.round(60 / lagInSeconds);
      }
    }
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return Math.max(60, Math.min(200, tempo)); // Clamp to reasonable range
  }

  /**
   * Calculate beat strength (rhythm emphasis)
   */
  private calculateBeatStrength(audioBuffer: AudioBuffer): number {
    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    const frameSize = 4096;
<<<<<<< HEAD

    let totalEnergy = 0;
    let beatEnergy = 0;

=======
    
    let totalEnergy = 0;
    let beatEnergy = 0;
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      let frameEnergy = 0;
      for (let j = 0; j < frameSize; j++) {
        frameEnergy += Math.abs(channelData[i + j]);
      }
      totalEnergy += frameEnergy;
<<<<<<< HEAD

      // Emphasize low frequencies for beat detection
      const lowFreqEnergy = this.calculateLowFrequencyEnergy(
        channelData,
        i,
        frameSize,
        sampleRate,
      );
      beatEnergy += lowFreqEnergy;
    }

=======
      
      // Emphasize low frequencies for beat detection
      const lowFreqEnergy = this.calculateLowFrequencyEnergy(channelData, i, frameSize, sampleRate);
      beatEnergy += lowFreqEnergy;
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return totalEnergy > 0 ? (beatEnergy / totalEnergy) * 100 : 0;
  }

  /**
   * Calculate spectral centroid (brightness indicator)
   */
  private calculateSpectralCentroid(audioBuffer: AudioBuffer): number {
    const channelData = audioBuffer.getChannelData(0);
    const frameSize = 4096;
    const fft = new AudioFFT(frameSize);
<<<<<<< HEAD

    let totalCentroid = 0;
    let frameCount = 0;

    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      const frame = channelData.slice(i, i + frameSize);
      const magnitudeSpectrum = fft.getMagnitudeSpectrum(frame);

      let weightedSum = 0;
      let magnitudeSum = 0;

=======
    
    let totalCentroid = 0;
    let frameCount = 0;
    
    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      const frame = channelData.slice(i, i + frameSize);
      const magnitudeSpectrum = fft.getMagnitudeSpectrum(frame);
      
      let weightedSum = 0;
      let magnitudeSum = 0;
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      for (let j = 0; j < magnitudeSpectrum.length / 2; j++) {
        const magnitude = magnitudeSpectrum[j];
        const frequency = (j * audioBuffer.sampleRate) / frameSize;
        weightedSum += frequency * magnitude;
        magnitudeSum += magnitude;
      }
<<<<<<< HEAD

=======
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      if (magnitudeSum > 0) {
        totalCentroid += weightedSum / magnitudeSum;
        frameCount++;
      }
    }
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return frameCount > 0 ? totalCentroid / frameCount : 2000;
  }

  /**
   * Calculate spectral rolloff (frequency below which 85% of energy is contained)
   */
  private calculateSpectralRolloff(audioBuffer: AudioBuffer): number {
    const channelData = audioBuffer.getChannelData(0);
    const frameSize = 4096;
    const fft = new AudioFFT(frameSize);
    const rolloffThreshold = 0.85;
<<<<<<< HEAD

    let totalRolloff = 0;
    let frameCount = 0;

    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      const frame = channelData.slice(i, i + frameSize);
      const magnitudeSpectrum = fft.getMagnitudeSpectrum(frame);

=======
    
    let totalRolloff = 0;
    let frameCount = 0;
    
    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      const frame = channelData.slice(i, i + frameSize);
      const magnitudeSpectrum = fft.getMagnitudeSpectrum(frame);
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const magnitudes: number[] = [];
      for (let j = 0; j < magnitudeSpectrum.length / 2; j++) {
        magnitudes.push(magnitudeSpectrum[j]);
      }
<<<<<<< HEAD

      const totalEnergy = magnitudes.reduce((sum, m) => sum + m, 0);
      let cumulativeEnergy = 0;
      let rolloffBin = magnitudes.length - 1;

=======
      
      const totalEnergy = magnitudes.reduce((sum, m) => sum + m, 0);
      let cumulativeEnergy = 0;
      let rolloffBin = magnitudes.length - 1;
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      for (let j = 0; j < magnitudes.length; j++) {
        cumulativeEnergy += magnitudes[j];
        if (cumulativeEnergy >= totalEnergy * rolloffThreshold) {
          rolloffBin = j;
          break;
        }
      }
<<<<<<< HEAD

=======
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const rolloffFreq = (rolloffBin * audioBuffer.sampleRate) / frameSize;
      totalRolloff += rolloffFreq;
      frameCount++;
    }
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return frameCount > 0 ? totalRolloff / frameCount : 5000;
  }

  /**
   * Calculate spectral flux (change in spectral energy)
   */
  private calculateSpectralFlux(audioBuffer: AudioBuffer): number {
    const channelData = audioBuffer.getChannelData(0);
    const frameSize = 4096;
    const fft = new AudioFFT(frameSize);
<<<<<<< HEAD

    let previousMagnitudes: number[] = [];
    let totalFlux = 0;
    let frameCount = 0;

    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      const frame = channelData.slice(i, i + frameSize);
      const magnitudeSpectrum = fft.getMagnitudeSpectrum(frame);

=======
    
    let previousMagnitudes: number[] = [];
    let totalFlux = 0;
    let frameCount = 0;
    
    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      const frame = channelData.slice(i, i + frameSize);
      const magnitudeSpectrum = fft.getMagnitudeSpectrum(frame);
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const magnitudes: number[] = [];
      for (let j = 0; j < magnitudeSpectrum.length / 2; j++) {
        magnitudes.push(magnitudeSpectrum[j]);
      }
<<<<<<< HEAD

      if (previousMagnitudes.length > 0) {
        let flux = 0;
        for (
          let j = 0;
          j < Math.min(magnitudes.length, previousMagnitudes.length);
          j++
        ) {
=======
      
      if (previousMagnitudes.length > 0) {
        let flux = 0;
        for (let j = 0; j < Math.min(magnitudes.length, previousMagnitudes.length); j++) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          const diff = magnitudes[j] - previousMagnitudes[j];
          if (diff > 0) {
            flux += diff;
          }
        }
        totalFlux += flux;
        frameCount++;
      }
<<<<<<< HEAD

      previousMagnitudes = magnitudes;
    }

=======
      
      previousMagnitudes = magnitudes;
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return frameCount > 0 ? totalFlux / frameCount : 0;
  }

  /**
   * Calculate zero crossing rate (high frequency content)
   */
  private calculateZeroCrossingRate(audioBuffer: AudioBuffer): number {
    const channelData = audioBuffer.getChannelData(0);
    let crossings = 0;
<<<<<<< HEAD

    for (let i = 1; i < channelData.length; i++) {
      if (
        (channelData[i - 1] >= 0 && channelData[i] < 0) ||
        (channelData[i - 1] < 0 && channelData[i] >= 0)
      ) {
        crossings++;
      }
    }

    return ((crossings / channelData.length) * audioBuffer.sampleRate) / 2;
=======
    
    for (let i = 1; i < channelData.length; i++) {
      if ((channelData[i - 1] >= 0 && channelData[i] < 0) ||
          (channelData[i - 1] < 0 && channelData[i] >= 0)) {
        crossings++;
      }
    }
    
    return (crossings / channelData.length) * audioBuffer.sampleRate / 2;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }

  /**
   * Calculate MFCC coefficients
   */
<<<<<<< HEAD
  private calculateMFCC(
    audioBuffer: AudioBuffer,
    numCoefficients: number,
  ): number[] {
=======
  private calculateMFCC(audioBuffer: AudioBuffer, numCoefficients: number): number[] {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Simplified MFCC calculation
    // In production, use proper mel-scale filter bank and DCT
    const channelData = audioBuffer.getChannelData(0);
    const frameSize = 2048;
    const mfcc: number[] = new Array(numCoefficients).fill(0);
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Aggregate spectral features across frames
    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      const frame = channelData.slice(i, i + frameSize);
      const powerSpectrum = this.calculatePowerSpectrum(frame);
<<<<<<< HEAD

=======
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Simplified mel-scale filtering
      for (let c = 0; c < numCoefficients; c++) {
        const melBin = Math.floor((c / numCoefficients) * powerSpectrum.length);
        mfcc[c] += powerSpectrum[melBin] || 0;
      }
    }
<<<<<<< HEAD

    // Average across frames
    const frameCount = Math.floor((channelData.length - frameSize) / frameSize);
    return mfcc.map((val) => (frameCount > 0 ? val / frameCount : val));
=======
    
    // Average across frames
    const frameCount = Math.floor((channelData.length - frameSize) / frameSize);
    return mfcc.map(val => frameCount > 0 ? val / frameCount : val);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }

  /**
   * Calculate RMS energy
   */
  private calculateRMSEnergy(audioBuffer: AudioBuffer): number {
    const channelData = audioBuffer.getChannelData(0);
    let sumSquares = 0;
<<<<<<< HEAD

    for (let i = 0; i < channelData.length; i++) {
      sumSquares += channelData[i] * channelData[i];
    }

=======
    
    for (let i = 0; i < channelData.length; i++) {
      sumSquares += channelData[i] * channelData[i];
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return Math.sqrt(sumSquares / channelData.length);
  }

  /**
   * Calculate energy entropy
   */
  private calculateEnergyEntropy(audioBuffer: AudioBuffer): number {
    const channelData = audioBuffer.getChannelData(0);
    const frameSize = 2048;
    const energies: number[] = [];
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      let energy = 0;
      for (let j = 0; j < frameSize; j++) {
        energy += Math.abs(channelData[i + j]);
      }
      energies.push(energy / frameSize);
    }
<<<<<<< HEAD

    const totalEnergy = energies.reduce((sum, e) => sum + e, 0);
    if (totalEnergy === 0) return 0;

=======
    
    const totalEnergy = energies.reduce((sum, e) => sum + e, 0);
    if (totalEnergy === 0) return 0;
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    let entropy = 0;
    for (const energy of energies) {
      const probability = energy / totalEnergy;
      if (probability > 0) {
        entropy -= probability * Math.log2(probability);
      }
    }
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return entropy;
  }

  /**
   * Calculate harmony (tonal content)
   */
  private calculateHarmony(audioBuffer: AudioBuffer): number {
    // Simplified: measure periodicity in autocorrelation
    const channelData = audioBuffer.getChannelData(0);
    const frameSize = 4096;
<<<<<<< HEAD

    let totalHarmony = 0;
    let frameCount = 0;

    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      const frame = channelData.slice(i, i + frameSize);
      const autocorr = this.autocorrelation(frame);

=======
    
    let totalHarmony = 0;
    let frameCount = 0;
    
    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      const frame = channelData.slice(i, i + frameSize);
      const autocorr = this.autocorrelation(frame);
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Find strongest periodicity
      let maxCorr = 0;
      for (let lag = 40; lag < 400; lag++) {
        if (autocorr[lag] > maxCorr) {
          maxCorr = autocorr[lag];
        }
      }
<<<<<<< HEAD

      totalHarmony += maxCorr;
      frameCount++;
    }

=======
      
      totalHarmony += maxCorr;
      frameCount++;
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return frameCount > 0 ? totalHarmony / frameCount : 0;
  }

  /**
   * Calculate inharmonicity
   */
  private calculateInharmonicity(audioBuffer: AudioBuffer): number {
    // Simplified: deviation from harmonic series
    return 1 - this.calculateHarmony(audioBuffer);
  }

  /**
   * Calculate brightness (high-frequency content)
   */
  private calculateBrightness(audioBuffer: AudioBuffer): number {
    return this.calculateSpectralCentroid(audioBuffer) / 10000; // Normalized
  }

  /**
   * Calculate roughness (sensory dissonance)
   */
  private calculateRoughness(audioBuffer: AudioBuffer): number {
    // Simplified: measure of amplitude modulation
    const channelData = audioBuffer.getChannelData(0);
    const frameSize = 1024;
    let totalRoughness = 0;
    let frameCount = 0;
<<<<<<< HEAD

    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      const frame = channelData.slice(i, i + frameSize);
      let modulation = 0;

      for (let j = 1; j < frame.length; j++) {
        modulation += Math.abs(frame[j] - frame[j - 1]);
      }

      totalRoughness += modulation / frame.length;
      frameCount++;
    }

=======
    
    for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
      const frame = channelData.slice(i, i + frameSize);
      let modulation = 0;
      
      for (let j = 1; j < frame.length; j++) {
        modulation += Math.abs(frame[j] - frame[j - 1]);
      }
      
      totalRoughness += modulation / frame.length;
      frameCount++;
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return frameCount > 0 ? totalRoughness / frameCount : 0;
  }

  // Helper methods
<<<<<<< HEAD
  private calculateLowFrequencyEnergy(
    channelData: Float32Array,
    start: number,
    size: number,
    sampleRate: number,
  ): number {
=======
  private calculateLowFrequencyEnergy(channelData: Float32Array, start: number, size: number, sampleRate: number): number {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Simplified low-pass filter for beat detection
    let energy = 0;
    for (let i = start; i < start + size && i < channelData.length; i++) {
      energy += Math.abs(channelData[i]);
    }
    return energy / size;
  }

  private calculatePowerSpectrum(frame: Float32Array): number[] {
    const fftSize = Math.pow(2, Math.ceil(Math.log2(frame.length))); // Next power of 2
    const fft = new AudioFFT(fftSize);
    const magnitudeSpectrum = fft.getMagnitudeSpectrum(frame);
    const powerSpectrum: number[] = [];
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    for (let i = 0; i < magnitudeSpectrum.length / 2; i++) {
      const magnitude = magnitudeSpectrum[i];
      powerSpectrum.push(magnitude * magnitude);
    }
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return powerSpectrum;
  }

  private autocorrelation(signal: Float32Array): number[] {
    const n = signal.length;
    const result = new Array(n).fill(0);
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    for (let lag = 0; lag < n; lag++) {
      let sum = 0;
      for (let i = 0; i < n - lag; i++) {
        sum += signal[i] * signal[i + lag];
      }
      result[lag] = sum / (n - lag);
    }
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return result;
  }

  async cleanup(): Promise<void> {
    if (this.audioContext) {
      await this.audioContext.close();
      this.audioContext = null;
    }
  }
}

/**
 * Audio features interface
 */
export interface AudioFeatures {
  tempo: number;
  duration: number;
  beatStrength: number;
  spectralCentroid: number;
  spectralRolloff: number;
  spectralFlux: number;
  zeroCrossingRate: number;
  mfcc: number[];
  rmsEnergy: number;
  energyEntropy: number;
  harmony: number;
  inharmonicity: number;
  brightness: number;
  roughness: number;
}

/**
 * FFT implementation using fft-js library for production
 * Note: fft-js must be installed: npm install fft-js
 */
// @ts-ignore - Dynamic import handled at runtime
let FFT: any = null;

class AudioFFT {
  private fft: any;
  private size: number;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  constructor(size: number) {
    this.size = size;
    this.fft = new FFT(size);
  }
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  forward(input: Float32Array): Float32Array {
    // Initialize FFT library if not already loaded
    if (!FFT) {
      // Use Web Audio API FFT if available, otherwise fallback to simplified implementation
      return this.fallbackFFT(input);
    }

    // Pad or truncate input to match FFT size
    const padded = new Float32Array(this.size);
    const copyLength = Math.min(input.length, this.size);
    padded.set(input.subarray(0, copyLength));
<<<<<<< HEAD

    // Convert to array format expected by fft-js
    const inputArray = Array.from(padded).map((v) => [v, 0]);

    // Perform FFT using fft-js library
    const result = this.fft.fft(inputArray);

    // Convert back to Float32Array (interleaved real/imaginary)
    const output = new Float32Array(this.size * 2);
    for (let i = 0; i < result.length; i++) {
      output[i * 2] = result[i][0]; // Real
      output[i * 2 + 1] = result[i][1]; // Imaginary
    }

=======
    
    // Convert to array format expected by fft-js
    const inputArray = Array.from(padded).map(v => [v, 0]);
    
    // Perform FFT using fft-js library
    const result = this.fft.fft(inputArray);
    
    // Convert back to Float32Array (interleaved real/imaginary)
    const output = new Float32Array(this.size * 2);
    for (let i = 0; i < result.length; i++) {
      output[i * 2] = result[i][0];     // Real
      output[i * 2 + 1] = result[i][1]; // Imaginary
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return output;
  }

  // Fallback FFT implementation if library not available
  private fallbackFFT(input: Float32Array): Float32Array {
    const output = new Float32Array(this.size * 2);
<<<<<<< HEAD

    for (let k = 0; k < this.size; k++) {
      let real = 0;
      let imag = 0;

      for (let n = 0; n < Math.min(input.length, this.size); n++) {
        const angle = (-2 * Math.PI * k * n) / this.size;
        real += input[n] * Math.cos(angle);
        imag += input[n] * Math.sin(angle);
      }

      output[k * 2] = real;
      output[k * 2 + 1] = imag;
    }

    return output;
  }

=======
    
    for (let k = 0; k < this.size; k++) {
      let real = 0;
      let imag = 0;
      
      for (let n = 0; n < Math.min(input.length, this.size); n++) {
        const angle = -2 * Math.PI * k * n / this.size;
        real += input[n] * Math.cos(angle);
        imag += input[n] * Math.sin(angle);
      }
      
      output[k * 2] = real;
      output[k * 2 + 1] = imag;
    }
    
    return output;
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Helper: Get magnitude spectrum
  getMagnitudeSpectrum(input: Float32Array): Float32Array {
    const fftResult = this.forward(input);
    const magnitude = new Float32Array(this.size);
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    for (let i = 0; i < this.size; i++) {
      const real = fftResult[i * 2];
      const imag = fftResult[i * 2 + 1];
      magnitude[i] = Math.sqrt(real * real + imag * imag);
    }
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return magnitude;
  }
}

/**
 * Mood Classifier
 * Uses trained model to predict mood from audio features
 */
export class MoodClassifier {
  /**
   * Predict mood from audio features using trained model
   * In production, this would load a pre-trained TensorFlow.js or ONNX model
   */
  async predictMood(features: AudioFeatures): Promise<MoodState> {
    // Feature-based mood mapping (would be replaced with trained model)
    const scores: Record<MoodState, number> = {
      Melancholic: 0,
      Nostalgic: 0,
      Reflective: 0,
      Content: 0,
      Joyful: 0,
      Euphoric: 0,
    };

    // Rule-based scoring (production: use neural network)
    if (features.tempo < 80 && features.brightness < 0.3) {
      scores.Melancholic += 0.4;
      scores.Nostalgic += 0.3;
    }
<<<<<<< HEAD

    if (
      features.tempo >= 80 &&
      features.tempo < 110 &&
      features.harmony > 0.6
    ) {
      scores.Reflective += 0.5;
      scores.Content += 0.3;
    }

    if (
      features.tempo >= 110 &&
      features.brightness > 0.5 &&
      features.beatStrength > 0.7
    ) {
      scores.Joyful += 0.6;
      scores.Euphoric += 0.2;
    }

=======
    
    if (features.tempo >= 80 && features.tempo < 110 && features.harmony > 0.6) {
      scores.Reflective += 0.5;
      scores.Content += 0.3;
    }
    
    if (features.tempo >= 110 && features.brightness > 0.5 && features.beatStrength > 0.7) {
      scores.Joyful += 0.6;
      scores.Euphoric += 0.2;
    }
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    if (features.tempo >= 130 && features.brightness > 0.7) {
      scores.Euphoric += 0.5;
      scores.Joyful += 0.3;
    }

    // Find highest scoring mood
    let maxScore = 0;
<<<<<<< HEAD
    let predictedMood: MoodState = "Content";

=======
    let predictedMood: MoodState = 'Content';
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    for (const [mood, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        predictedMood = mood as MoodState;
      }
    }

    return predictedMood;
  }

  /**
   * Predict feelings from audio features
   */
<<<<<<< HEAD
  async predictFeelings(
    features: AudioFeatures,
    mood: MoodState,
  ): Promise<string[]> {
    const feelings: string[] = [];

    // Negative feelings
    if (features.brightness < 0.3 && features.tempo < 90) {
      feelings.push("Anxious", "Overwhelmed", "Stressed");
    }

    // Positive feelings
    if (features.brightness > 0.5 && features.beatStrength > 0.6) {
      feelings.push("Great", "Confident", "Optimistic");
    }

    // Neutral/reflective
    if (
      features.harmony > 0.6 &&
      features.brightness >= 0.3 &&
      features.brightness <= 0.5
    ) {
      feelings.push("Calm", "Focused");
=======
  async predictFeelings(features: AudioFeatures, mood: MoodState): Promise<string[]> {
    const feelings: string[] = [];
    
    // Negative feelings
    if (features.brightness < 0.3 && features.tempo < 90) {
      feelings.push('Anxious', 'Overwhelmed', 'Stressed');
    }
    
    // Positive feelings
    if (features.brightness > 0.5 && features.beatStrength > 0.6) {
      feelings.push('Great', 'Confident', 'Optimistic');
    }
    
    // Neutral/reflective
    if (features.harmony > 0.6 && features.brightness >= 0.3 && features.brightness <= 0.5) {
      feelings.push('Calm', 'Focused');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }

    // Remove duplicates and limit
    return [...new Set(feelings)].slice(0, 5);
  }

  /**
   * Calculate vibe (Calm ↔ Energetic) from features
   */
  async calculateVibe(features: AudioFeatures): Promise<number> {
    // Vibe is combination of tempo, brightness, and beat strength
    const tempoNormalized = Math.min(1, (features.tempo - 60) / 140); // 60-200 BPM -> 0-1
    const brightnessNormalized = Math.min(1, features.brightness);
    const beatNormalized = features.beatStrength / 100;
<<<<<<< HEAD

    // Weighted combination
    const vibe =
      (tempoNormalized * 0.4 +
        brightnessNormalized * 0.3 +
        beatNormalized * 0.3) *
      100;
=======
    
    // Weighted combination
    const vibe = (tempoNormalized * 0.4 + brightnessNormalized * 0.3 + beatNormalized * 0.3) * 100;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return Math.max(0, Math.min(100, Math.round(vibe)));
  }

  /**
   * Predict genres from audio features
   */
  async predictGenres(features: AudioFeatures): Promise<string[]> {
    const genres: string[] = [];
<<<<<<< HEAD

    // Genre classification based on features
    if (features.beatStrength > 0.7 && features.tempo > 100) {
      genres.push("Pop", "Electronic");
    }

    if (
      features.harmony > 0.6 &&
      features.tempo >= 90 &&
      features.tempo <= 130
    ) {
      genres.push("Rock", "Alternative");
    }

    if (features.brightness < 0.3 && features.tempo < 100) {
      genres.push("R&B", "Soul");
    }

    if (features.harmony > 0.7 && features.brightness > 0.4) {
      genres.push("Jazz", "Folk");
=======
    
    // Genre classification based on features
    if (features.beatStrength > 0.7 && features.tempo > 100) {
      genres.push('Pop', 'Electronic');
    }
    
    if (features.harmony > 0.6 && features.tempo >= 90 && features.tempo <= 130) {
      genres.push('Rock', 'Alternative');
    }
    
    if (features.brightness < 0.3 && features.tempo < 100) {
      genres.push('R&B', 'Soul');
    }
    
    if (features.harmony > 0.7 && features.brightness > 0.4) {
      genres.push('Jazz', 'Folk');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }

    // Remove duplicates and limit
    return [...new Set(genres)].slice(0, 4);
  }
}

/**
 * Main RAG Pipeline for Mood Analysis
 */
export class RAGMoodAnalysisPipeline {
  private featureExtractor: AudioFeatureExtractor;
  private moodClassifier: MoodClassifier;
  private vectorDB: VectorDatabase | null = null;

  constructor() {
    this.featureExtractor = new AudioFeatureExtractor();
    this.moodClassifier = new MoodClassifier();
  }

  /**
   * Initialize vector database connection
   */
  async initializeVectorDB(config: VectorDBConfig): Promise<void> {
    // Initialize Pinecone or FAISS
<<<<<<< HEAD
    if (config.type === "pinecone") {
      if (!config.apiKey || !config.indexName || !config.environment) {
        throw new Error(
          "Pinecone configuration incomplete: apiKey, indexName, and environment are required",
        );
      }
      this.vectorDB = new PineconeVectorDB(
        config.apiKey,
        config.indexName,
        config.environment,
      );
    } else if (config.type === "faiss") {
      if (!config.indexPath) {
        throw new Error(
          "FAISS configuration incomplete: indexPath is required",
        );
=======
    if (config.type === 'pinecone') {
      if (!config.apiKey || !config.indexName || !config.environment) {
        throw new Error('Pinecone configuration incomplete: apiKey, indexName, and environment are required');
      }
      this.vectorDB = new PineconeVectorDB(config.apiKey, config.indexName, config.environment);
    } else if (config.type === 'faiss') {
      if (!config.indexPath) {
        throw new Error('FAISS configuration incomplete: indexPath is required');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      }
      this.vectorDB = new FAISSVectorDB(config.indexPath);
    } else {
      throw new Error(`Unknown vector database type: ${config.type}`);
    }
<<<<<<< HEAD

=======
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    if (this.vectorDB) {
      await this.vectorDB.initialize();
    }
  }

  /**
   * Analyze audio file and generate mood suggestions
   * Main entry point for RAG pipeline
   */
  async analyzeMood(audioFile: File): Promise<AIMoodSuggestion> {
    const startTime = performance.now();
<<<<<<< HEAD

    try {
      // Step 1: Extract audio features
      const features = await this.featureExtractor.extractFeatures(audioFile);

      // Step 2: Generate embeddings from features
      const embedding = await this.generateEmbedding(features);

=======
    
    try {
      // Step 1: Extract audio features
      const features = await this.featureExtractor.extractFeatures(audioFile);
      
      // Step 2: Generate embeddings from features
      const embedding = await this.generateEmbedding(features);
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Step 3: Retrieve similar tracks from vector database (RAG)
      // Graceful degradation: if vector DB unavailable, continue without RAG enhancement
      let similarTracks: SimilarTrack[] = [];
      if (this.vectorDB) {
        try {
<<<<<<< HEAD
          similarTracks = await this.vectorDB.similaritySearch(embedding, {
            topK: DEFAULT_LIMITS.TOP_K_SIMILAR,
          });
        } catch (error) {
          console.warn(
            "⚠️ Vector DB search failed, continuing without RAG enhancement:",
            error,
          );
          // Continue without similar tracks - graceful degradation
        }
      }

      // Step 4: Predict mood using classifier
      const mood = await this.moodClassifier.predictMood(features);

      // Step 5: Augment prediction with retrieved similar tracks
      const augmentedMood = this.augmentPredictionWithRetrieval(
        mood,
        similarTracks,
      );

      // Step 6: Predict feelings, vibe, and genres
      const feelings = await this.moodClassifier.predictFeelings(
        features,
        augmentedMood,
      );
      const vibe = await this.moodClassifier.calculateVibe(features);
      const genres = await this.moodClassifier.predictGenres(features);

      // Step 7: Calculate confidence score
      const confidence = this.calculateConfidence(features, similarTracks);

      const latency = performance.now() - startTime;
      console.log(`✅ RAG Mood Analysis completed in ${latency.toFixed(2)}ms`);

      if (latency > PERFORMANCE_TARGETS.MOOD_ANALYSIS_LATENCY_MS) {
        console.warn(
          `⚠️ Latency (${latency.toFixed(2)}ms) exceeds target (<${PERFORMANCE_TARGETS.MOOD_ANALYSIS_LATENCY_MS}ms)`,
=======
          similarTracks = await this.vectorDB.similaritySearch(embedding, { 
            topK: DEFAULT_LIMITS.TOP_K_SIMILAR 
          });
        } catch (error) {
          console.warn('⚠️ Vector DB search failed, continuing without RAG enhancement:', error);
          // Continue without similar tracks - graceful degradation
        }
      }
      
      // Step 4: Predict mood using classifier
      const mood = await this.moodClassifier.predictMood(features);
      
      // Step 5: Augment prediction with retrieved similar tracks
      const augmentedMood = this.augmentPredictionWithRetrieval(mood, similarTracks);
      
      // Step 6: Predict feelings, vibe, and genres
      const feelings = await this.moodClassifier.predictFeelings(features, augmentedMood);
      const vibe = await this.moodClassifier.calculateVibe(features);
      const genres = await this.moodClassifier.predictGenres(features);
      
      // Step 7: Calculate confidence score
      const confidence = this.calculateConfidence(features, similarTracks);
      
      const latency = performance.now() - startTime;
      console.log(`✅ RAG Mood Analysis completed in ${latency.toFixed(2)}ms`);
      
      if (latency > PERFORMANCE_TARGETS.MOOD_ANALYSIS_LATENCY_MS) {
        console.warn(
          `⚠️ Latency (${latency.toFixed(2)}ms) exceeds target (<${PERFORMANCE_TARGETS.MOOD_ANALYSIS_LATENCY_MS}ms)`
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        );
      }

      return {
        mood: augmentedMood,
        feelings,
        vibe,
        genres,
        confidence,
        embedding, // Expose embedding for vector DB storage
      };
    } catch (error) {
<<<<<<< HEAD
      console.error("❌ Error in RAG mood analysis:", error);
=======
      console.error('❌ Error in RAG mood analysis:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      throw error;
    }
  }

  /**
   * Generate embedding vector from audio features
   * Uses feature normalization and dimensionality reduction
   */
  private async generateEmbedding(features: AudioFeatures): Promise<number[]> {
    // Normalize features to [0, 1] range
    const normalizedFeatures = [
      features.tempo / 200, // 0-200 BPM
      features.duration / 600, // 0-10 minutes
      features.beatStrength / 100,
      features.spectralCentroid / 10000, // 0-10kHz
      features.spectralRolloff / 10000,
      features.spectralFlux / 100,
      features.zeroCrossingRate / 1000,
<<<<<<< HEAD
      ...features.mfcc.slice(0, 13).map((m) => (m + 50) / 100), // Normalize MFCC
=======
      ...features.mfcc.slice(0, 13).map(m => (m + 50) / 100), // Normalize MFCC
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      features.rmsEnergy,
      features.energyEntropy / 10,
      features.harmony,
      features.inharmonicity,
      features.brightness,
      features.roughness,
    ];

    // In production, use a trained embedding model (e.g., fine-tuned BERT)
    // For now, return normalized features as embedding
    return normalizedFeatures;
  }

  /**
   * Augment mood prediction using retrieved similar tracks (RAG)
   */
  private augmentPredictionWithRetrieval(
    predictedMood: MoodState,
<<<<<<< HEAD
    similarTracks: SimilarTrack[],
=======
    similarTracks: SimilarTrack[]
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ): MoodState {
    if (similarTracks.length === 0) {
      return predictedMood;
    }

    // Vote-based augmentation from similar tracks
    const moodVotes: Record<MoodState, number> = {
      Melancholic: 0,
      Nostalgic: 0,
      Reflective: 0,
      Content: 0,
      Joyful: 0,
      Euphoric: 0,
    };

    // Weight votes by similarity score
    for (const track of similarTracks) {
      const weight = track.similarity;
      if (track.moodTags && track.moodTags.mood) {
        moodVotes[track.moodTags.mood] += weight;
      }
    }

    // Find mood with highest vote
    let maxVotes = 0;
    let augmentedMood = predictedMood;

    for (const [mood, votes] of Object.entries(moodVotes)) {
      if (votes > maxVotes) {
        maxVotes = votes;
        augmentedMood = mood as MoodState;
      }
    }

    // Use augmented mood if it has strong support, otherwise keep prediction
    return maxVotes > 0.3 ? augmentedMood : predictedMood;
  }

  /**
   * Calculate confidence score (0-1)
   */
  private calculateConfidence(
    features: AudioFeatures,
<<<<<<< HEAD
    similarTracks: SimilarTrack[],
=======
    similarTracks: SimilarTrack[]
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ): number {
    let confidence = 0.5; // Base confidence

    // Increase confidence if similar tracks found
    if (similarTracks.length > 0) {
<<<<<<< HEAD
      const avgSimilarity =
        similarTracks.reduce((sum, t) => sum + t.similarity, 0) /
        similarTracks.length;
=======
      const avgSimilarity = similarTracks.reduce((sum, t) => sum + t.similarity, 0) / similarTracks.length;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      confidence += avgSimilarity * 0.3;
    }

    // Increase confidence if features are clear (high energy, good structure)
    if (features.rmsEnergy > 0.1 && features.beatStrength > 0.5) {
      confidence += 0.2;
    }

    return Math.min(1, Math.max(0.5, confidence));
  }

  /**
   * Upsert track embedding to vector database
   */
  async upsertEmbedding(
    trackId: string,
    embedding: number[],
<<<<<<< HEAD
    metadata: TrackMetadata,
  ): Promise<void> {
    if (!this.vectorDB) {
      throw new Error(
        "Vector database not initialized. Call initializeVectorDB() first.",
      );
    }

    // Validate embedding using validation utilities
    const { validateEmbedding } = await import("./validation");
    validateEmbedding(embedding, { required: true, name: "Embedding" });

    // Upsert with retry logic
    const { withRetry } = await import("./retry");
    const { withTimeout, TIMEOUTS } = await import("./timeout");
=======
    metadata: TrackMetadata
  ): Promise<void> {
    if (!this.vectorDB) {
      throw new Error('Vector database not initialized. Call initializeVectorDB() first.');
    }

    // Validate embedding using validation utilities
    const { validateEmbedding } = await import('./validation');
    validateEmbedding(embedding, { required: true, name: 'Embedding' });

    // Upsert with retry logic
    const { withRetry } = await import('./retry');
    const { withTimeout, TIMEOUTS } = await import('./timeout');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

    await withRetry(
      () =>
        withTimeout(
          this.vectorDB!.upsert(trackId, embedding, metadata),
          TIMEOUTS.EXTERNAL_API,
<<<<<<< HEAD
          "Vector DB upsert timeout",
=======
          'Vector DB upsert timeout'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        ),
      {
        maxRetries: 3,
        initialDelayMs: 1000,
<<<<<<< HEAD
        retryableErrors: ["timeout", "ECONNRESET", "ETIMEDOUT"],
      },
=======
        retryableErrors: ['timeout', 'ECONNRESET', 'ETIMEDOUT'],
      }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    );
  }

  /**
   * Get vector database instance (for pipeline orchestration)
   */
  getVectorDB(): VectorDatabase | null {
    return this.vectorDB;
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    await this.featureExtractor.cleanup();
    if (this.vectorDB) {
      await this.vectorDB.cleanup();
    }
  }
}

/**
 * Vector Database Interface
 */
interface VectorDatabase {
  initialize(): Promise<void>;
<<<<<<< HEAD
  similaritySearch(
    embedding: number[],
    options: { topK: number },
  ): Promise<SimilarTrack[]>;
  upsert(
    trackId: string,
    embedding: number[],
    metadata: TrackMetadata,
  ): Promise<void>;
=======
  similaritySearch(embedding: number[], options: { topK: number }): Promise<SimilarTrack[]>;
  upsert(trackId: string, embedding: number[], metadata: TrackMetadata): Promise<void>;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  cleanup(): Promise<void>;
}

/**
 * Pinecone Vector Database Implementation
 */
class PineconeVectorDB implements VectorDatabase {
  private apiKey: string;
  private indexName: string;
  private environment: string;
  private client: any; // PineconeClient from types/pipeline.ts
  private index: any; // PineconeIndex from types/pipeline.ts

  constructor(apiKey: string, indexName: string, environment: string) {
    this.apiKey = apiKey;
    this.indexName = indexName;
    this.environment = environment;
  }

  async initialize(): Promise<void> {
    try {
      // Import Pinecone client (dynamic import for browser compatibility)
      // @ts-ignore - Pinecone types may not be available at compile time
      // Optional Pinecone import - only if package is installed
      // Using dynamic import with error handling
      // @ts-ignore - Pinecone types may not be available at compile time
      let Pinecone;
      try {
<<<<<<< HEAD
        const pineconeModule = await import("@pinecone-database/pinecone");
        Pinecone = pineconeModule.Pinecone;
      } catch (error) {
        // Pinecone not installed - provide helpful error message
        throw new Error(
          "Pinecone database package not installed. Install with: npm install @pinecone-database/pinecone",
        );
      }

=======
        const pineconeModule = await import('@pinecone-database/pinecone');
        Pinecone = pineconeModule.Pinecone;
      } catch (error) {
        // Pinecone not installed - provide helpful error message
        throw new Error('Pinecone database package not installed. Install with: npm install @pinecone-database/pinecone');
      }
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Initialize Pinecone client
      // Note: New Pinecone SDK (v1+) only requires apiKey, environment is deprecated
      this.client = new Pinecone({
        apiKey: this.apiKey,
      } as any);

      // Get index reference
      this.index = this.client.index(this.indexName);
<<<<<<< HEAD

      console.log("✅ Pinecone VectorDB initialized");
    } catch (error) {
      console.error("❌ Failed to initialize Pinecone:", error);
      throw new Error(
        `Pinecone initialization failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  async similaritySearch(
    embedding: number[],
    options: { topK: number },
  ): Promise<SimilarTrack[]> {
    if (!this.index) {
      throw new Error(
        "Pinecone index not initialized. Call initialize() first.",
      );
=======
      
      console.log('✅ Pinecone VectorDB initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Pinecone:', error);
      throw new Error(`Pinecone initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async similaritySearch(embedding: number[], options: { topK: number }): Promise<SimilarTrack[]> {
    if (!this.index) {
      throw new Error('Pinecone index not initialized. Call initialize() first.');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }

    try {
      // Validate embedding
<<<<<<< HEAD
      const { validateEmbedding } = await import("./validation");
      validateEmbedding(embedding, { required: true, name: "Query embedding" });

      // Add retry and timeout
      const { withRetry } = await import("./retry");
      const { withTimeout, TIMEOUTS } = await import("./timeout");
=======
      const { validateEmbedding } = await import('./validation');
      validateEmbedding(embedding, { required: true, name: 'Query embedding' });

      // Add retry and timeout
      const { withRetry } = await import('./retry');
      const { withTimeout, TIMEOUTS } = await import('./timeout');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

      // Pinecone query response type
      interface PineconeQueryResponse {
        matches: Array<{
          id: string;
          score?: number;
          metadata?: any;
        }>;
      }

      const queryResponse = await withRetry<PineconeQueryResponse>(
        () =>
          withTimeout(
            this.index!.query({
              vector: embedding,
              topK: options.topK,
              includeMetadata: true,
            }),
            TIMEOUTS.EXTERNAL_API,
<<<<<<< HEAD
            "Vector DB query timeout",
=======
            'Vector DB query timeout'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          ) as Promise<PineconeQueryResponse>,
        {
          maxRetries: 2,
          initialDelayMs: 500,
<<<<<<< HEAD
          retryableErrors: ["timeout", "ECONNRESET", "ETIMEDOUT"],
        },
      );

      const similarTracks: SimilarTrack[] = queryResponse.matches.map(
        (match: any) => ({
          trackId: match.id,
          similarity: match.score || 0,
          moodTags: match.metadata?.moodTags,
          metadata: match.metadata,
        }),
      );

      return similarTracks;
    } catch (error) {
      console.error("❌ Pinecone similarity search failed:", error);
=======
          retryableErrors: ['timeout', 'ECONNRESET', 'ETIMEDOUT'],
        }
      );

      const similarTracks: SimilarTrack[] = queryResponse.matches.map((match: any) => ({
        trackId: match.id,
        similarity: match.score || 0,
        moodTags: match.metadata?.moodTags,
        metadata: match.metadata,
      }));

      return similarTracks;
    } catch (error) {
      console.error('❌ Pinecone similarity search failed:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      return [];
    }
  }

<<<<<<< HEAD
  async upsert(
    trackId: string,
    embedding: number[],
    metadata: TrackMetadata,
  ): Promise<void> {
    if (!this.index) {
      throw new Error(
        "Pinecone index not initialized. Call initialize() first.",
      );
=======
  async upsert(trackId: string, embedding: number[], metadata: TrackMetadata): Promise<void> {
    if (!this.index) {
      throw new Error('Pinecone index not initialized. Call initialize() first.');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }

    try {
      await this.index.upsert([
        {
          id: trackId,
          values: embedding,
          metadata: {
            trackId: metadata.trackId,
            name: metadata.name,
            artist: metadata.artist,
            moodTags: metadata.moodTags,
            genre: metadata.genre || null,
          },
        },
      ]);

      console.log(`📊 Upserted track ${trackId} to Pinecone`);
    } catch (error) {
      console.error(`❌ Failed to upsert track ${trackId} to Pinecone:`, error);
      throw error;
    }
  }

  async cleanup(): Promise<void> {
    // Pinecone client doesn't require explicit cleanup
    this.index = null;
    this.client = null;
  }
}

/**
 * FAISS Vector Database Implementation (in-memory/local)
 */
class FAISSVectorDB implements VectorDatabase {
  private indexPath: string;
  private index: any; // FAISS index

  constructor(indexPath: string) {
    this.indexPath = indexPath;
  }

  async initialize(): Promise<void> {
    // Initialize FAISS index
    // In production: use faiss-node or similar
<<<<<<< HEAD
    console.log("✅ FAISS VectorDB initialized (mock)");
  }

  async similaritySearch(
    embedding: number[],
    options: { topK: number },
  ): Promise<SimilarTrack[]> {
=======
    console.log('✅ FAISS VectorDB initialized (mock)');
  }

  async similaritySearch(embedding: number[], options: { topK: number }): Promise<SimilarTrack[]> {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Mock implementation - in production, use FAISS search
    return [];
  }

<<<<<<< HEAD
  async upsert(
    trackId: string,
    embedding: number[],
    metadata: TrackMetadata,
  ): Promise<void> {
=======
  async upsert(trackId: string, embedding: number[], metadata: TrackMetadata): Promise<void> {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Mock implementation - in production, use FAISS add
    console.log(`📊 Upserted track ${trackId} to FAISS index`);
  }

  async cleanup(): Promise<void> {
    // Cleanup FAISS index
  }
}

/**
 * Vector Database Configuration
 */
export interface VectorDBConfig {
<<<<<<< HEAD
  type: "pinecone" | "faiss";
=======
  type: 'pinecone' | 'faiss';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  apiKey?: string;
  indexName?: string;
  environment?: string;
  indexPath?: string;
}

/**
 * Similar Track Interface
 */
export interface SimilarTrack {
  trackId: string;
  similarity: number; // 0-1
  moodTags?: MoodTags;
  metadata?: TrackMetadata;
}

/**
 * Track Metadata for Vector DB
 */
export interface TrackMetadata {
  trackId: string;
  name: string;
  artist: string;
  moodTags: MoodTags;
  genre?: string;
}

/**
 * Export singleton instance
 */
let pipelineInstance: RAGMoodAnalysisPipeline | null = null;

export function getRAGPipeline(): RAGMoodAnalysisPipeline {
  if (!pipelineInstance) {
    pipelineInstance = new RAGMoodAnalysisPipeline();
  }
  return pipelineInstance;
<<<<<<< HEAD
}
=======
}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
