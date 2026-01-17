import { Howl } from 'howler';

class AudioPlayer {
  private sound: Howl | null = null;
  private currentTrackId: string | null = null;
  private progressInterval: NodeJS.Timeout | null = null;
  
  private onProgress?: (progress: number) => void;
  private onEnd?: () => void;
  
  loadTrack(audioUrl: string, trackId: string, onProgress?: (progress: number) => void, onEnd?: () => void) {
    // Clean up previous track
    if (this.sound) {
      this.sound.unload();
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    
    this.currentTrackId = trackId;
    this.onProgress = onProgress;
    this.onEnd = onEnd;
    
    this.sound = new Howl({
      src: [audioUrl],
      html5: true,
      format: ['mp3', 'wav', 'm4a', 'flac'],
      onend: () => {
        if (this.onEnd) {
          this.onEnd();
        }
      },
    });
    
    // Update progress every 100ms (10fps)
    this.progressInterval = setInterval(() => {
      if (this.sound && this.onProgress) {
        const seek = this.sound.seek() as number;
        const duration = this.sound.duration();
        if (duration > 0) {
          const progress = (seek / duration) * 100;
          this.onProgress(progress);
        }
      }
    }, 100);
  }
  
  play() {
    if (this.sound) {
      this.sound.play();
    }
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
    if (this.sound) {
      this.sound.volume(volume / 100);
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
    if (this.sound) {
      return this.sound.playing();
    }
    return false;
  }
  
  unload() {
    if (this.sound) {
      this.sound.unload();
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    this.sound = null;
    this.currentTrackId = null;
  }
}

export const audioPlayer = new AudioPlayer();
