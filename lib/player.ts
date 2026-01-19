import { Howl } from 'howler';
import { getAudioPipeline, AudiophileAudioPipeline } from './audio-pipeline';
import { getAudioPipelineManager, getStationPipeline, getSharedPipeline } from './audio-pipeline-manager';

class AudioPlayer {
  private sound: Howl | null = null;
  private currentTrackId: string | null = null;
  private progressInterval: NodeJS.Timeout | null = null;
  private isLoaded: boolean = false;
  private pendingPlay: boolean = false;
  private onLoadCallback?: () => void;
  private audioPipeline: AudiophileAudioPipeline | null = null;
  private audioElement: HTMLAudioElement | null = null;
  
  private onProgress?: (progress: number) => void;
  private onEnd?: () => void;
  
  loadTrack(audioUrl: string, trackId: string, onProgress?: (progress: number) => void, onEnd?: () => void) {
    // Clean up previous track and pipeline first
    if (this.audioPipeline) {
      this.audioPipeline.cleanup().catch(console.error);
      this.audioPipeline = null;
    }
    if (this.sound) {
      this.sound.unload();
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    
    this.currentTrackId = trackId;
    this.onProgress = onProgress;
    this.onEnd = onEnd;
    this.isLoaded = false;
    this.pendingPlay = false;
    this.audioElement = null;
    
    console.log('🎵 Loading track:', audioUrl);
    
    this.sound = new Howl({
      src: [audioUrl],
      html5: true,
      format: ['mp3', 'wav', 'm4a', 'flac'],
      preload: true,
      onload: () => {
        console.log('✅ Audio loaded successfully:', audioUrl);
        this.isLoaded = true;
        
        // Initialize audio pipeline with Howler's audio element
        this.initializeAudioPipeline();
        
        // If there's a pending play, trigger it now
        if (this.pendingPlay && this.sound) {
          this.pendingPlay = false;
          this.attemptPlay();
        }
        if (this.onLoadCallback) {
          this.onLoadCallback();
        }
      },
      onloaderror: (id, error) => {
        console.error('❌ Audio load error:', audioUrl, error);
        this.isLoaded = false;
        this.pendingPlay = false;
      },
      onplayerror: (id, error) => {
        console.error('❌ Audio play error:', audioUrl, error);
        // Try to unlock and play again (for browser autoplay restrictions)
        if (this.sound) {
          this.sound.once('unlock', () => {
            console.log('🔓 Audio unlocked, attempting play');
            if (this.sound && this.pendingPlay) {
              this.attemptPlay();
            }
          });
        }
      },
      onend: () => {
        if (this.onEnd) {
          this.onEnd();
        }
      },
      onplay: () => {
        console.log('▶️ Audio playback started');
      },
      onpause: () => {
        console.log('⏸️ Audio playback paused');
      },
    });
    
    // Preload the audio
    this.sound.load();
    
    // Update progress every 100ms (10fps)
    this.progressInterval = setInterval(() => {
      if (this.sound && this.onProgress && this.isLoaded) {
        const seek = this.sound.seek() as number;
        const duration = this.sound.duration();
        if (duration > 0 && typeof seek === 'number' && !isNaN(seek)) {
          const progress = (seek / duration) * 100;
          this.onProgress(progress);
        }
      }
    }, 100);
  }
  
  private attemptPlay() {
    if (this.sound && this.isLoaded) {
      try {
        const soundId = this.sound.play();
        if (soundId) {
          this.pendingPlay = false;
          return true;
        }
      } catch (error) {
        console.error('❌ Play attempt failed:', error);
      }
    }
    return false;
  }
  
  play() {
    if (!this.sound) {
      console.warn('⚠️ Cannot play: no sound loaded');
      return;
    }
    
    if (this.isLoaded) {
      this.attemptPlay();
    } else {
      console.log('⏳ Audio not loaded yet, queuing play');
      this.pendingPlay = true;
    }
  }
  
  setOnLoadCallback(callback: () => void) {
    this.onLoadCallback = callback;
    if (this.isLoaded && callback) {
      callback();
    }
  }
  
  /**
   * Initialize the enhanced audio pipeline
   * Connects Howler's audio element to Web Audio API processing
   */
  private async initializeAudioPipeline(): Promise<void> {
    if (!this.sound || !this.isLoaded) return;
    
    try {
      // Get Howler's audio element (access internal _sounds array)
      const sounds = (this.sound as any)._sounds as any[];
      if (!sounds || sounds.length === 0) {
        console.warn('⚠️ Howler audio element not available yet');
        return;
      }
      
      const soundInstance = sounds[0];
      if (!soundInstance || !soundInstance._node) {
        console.warn('⚠️ Howler audio node not available');
        return;
      }
      
      // Get the HTMLAudioElement from Howler
      const newAudioElement = soundInstance._node as HTMLAudioElement;
      
      if (!newAudioElement) {
        console.warn('⚠️ Could not access audio element');
        return;
      }
      
      // If we already have a pipeline with a different element, cleanup first
      if (this.audioPipeline && this.audioElement && this.audioElement !== newAudioElement) {
        console.log('🔄 Cleaning up pipeline for new audio element');
        await this.audioPipeline.cleanup();
        this.audioPipeline = null;
      }
      
      this.audioElement = newAudioElement;
      
      // Initialize audio pipeline (it will check if element is already connected)
      this.audioPipeline = getAudioPipeline();
      await this.audioPipeline.initialize(this.audioElement);
      
      // Resume audio context if needed (browser autoplay restrictions)
      await this.audioPipeline.resume();
      
      console.log('✅ Enhanced audio pipeline initialized');
    } catch (error) {
      console.error('❌ Failed to initialize audio pipeline:', error);
      // Continue without pipeline (fallback to basic playback)
      this.audioPipeline = null;
    }
  }
  
  /**
   * Get the audio pipeline instance (for visualization, EQ, etc.)
   */
  getAudioPipeline(): AudiophileAudioPipeline | null {
    return this.audioPipeline;
  }
  
  /**
   * Set EQ band gain
   */
  setEQBand(band: number, gain: number): void {
    if (this.audioPipeline) {
      this.audioPipeline.setEQBand(band, gain);
    }
  }
  
  /**
   * Set all EQ bands (10-band array)
   */
  setEQBands(gains: number[]): void {
    if (this.audioPipeline) {
      this.audioPipeline.setEQBands(gains);
    }
  }
  
  /**
   * Get current EQ band gains
   */
  getEQBands(): number[] {
    if (this.audioPipeline) {
      return this.audioPipeline.getEQBands();
    }
    return new Array(10).fill(0);
  }
  
  pause() {
    if (this.sound) {
      this.sound.pause();
    }
  }
  
  seek(position: number) {
    if (this.sound) {
      this.sound.seek(position);
    }
  }
  
  setVolume(volume: number) {
    const normalizedVolume = volume / 100;
    
    // Set volume on both Howler and audio pipeline
    if (this.sound) {
      this.sound.volume(normalizedVolume);
    }
    if (this.audioPipeline) {
      this.audioPipeline.setVolume(normalizedVolume);
    }
  }
  
  getDuration(): number {
    if (this.sound) {
      return this.sound.duration() * 1000; // Convert to milliseconds
    }
    return 0;
  }
  
  getCurrentTime(): number {
    if (this.sound) {
      return (this.sound.seek() as number) * 1000; // Convert to milliseconds
    }
    return 0;
  }
  
  isPlaying(): boolean {
    if (this.sound && this.isLoaded) {
      return this.sound.playing();
    }
    return false;
  }
  
  isTrackLoaded(): boolean {
    return this.isLoaded;
  }
  
  async unload() {
    if (this.sound) {
      this.sound.unload();
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    
    // Cleanup audio pipeline
    if (this.audioPipeline) {
      await this.audioPipeline.cleanup();
      this.audioPipeline = null;
    }
    
    this.sound = null;
    this.currentTrackId = null;
    this.isLoaded = false;
    this.pendingPlay = false;
    this.onLoadCallback = undefined;
    this.audioElement = null;
  }
}

export const audioPlayer = new AudioPlayer();
