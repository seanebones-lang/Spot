/**
 * Audio Context Manager
 * Prevents memory leaks by properly managing AudioContext lifecycle
 *
 * Issue: Multiple AudioContext instances can cause memory leaks
 * Solution: Singleton pattern with proper cleanup
 */

export class AudioContextManager {
  private static instance: AudioContextManager | null = null;
  private audioContext: AudioContext | null = null;
  private referenceCount: number = 0;

  private constructor() {
    // Private constructor for singleton
  }

  static getInstance(): AudioContextManager {
    if (!AudioContextManager.instance) {
      AudioContextManager.instance = new AudioContextManager();
    }
    return AudioContextManager.instance;
  }

  /**
   * Get or create AudioContext
   * Returns existing context if available, creates new one if needed
   */
  getContext(): AudioContext {
    if (!this.audioContext) {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass({
        sampleRate: 44100, // Optimal for music
        latencyHint: "interactive", // Low latency for UI responsiveness
      });
      console.log("[AudioContextManager] Created new AudioContext");
    }

    // Resume if suspended (browser autoplay restrictions)
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume().catch((error) => {
        console.error("[AudioContextManager] Failed to resume context:", error);
      });
    }

    this.referenceCount++;
    return this.audioContext;
  }

  /**
   * Release reference to AudioContext
   * Only closes context when no references remain
   */
  release(): void {
    this.referenceCount--;

    if (this.referenceCount <= 0 && this.audioContext) {
      console.log("[AudioContextManager] Closing AudioContext (no references)");
      this.audioContext.close().catch((error) => {
        console.error("[AudioContextManager] Failed to close context:", error);
      });
      this.audioContext = null;
      this.referenceCount = 0;
    }
  }

  /**
   * Force close AudioContext (for cleanup)
   */
  destroy(): void {
    if (this.audioContext) {
      console.log("[AudioContextManager] Force closing AudioContext");
      this.audioContext.close().catch((error) => {
        console.error("[AudioContextManager] Failed to close context:", error);
      });
      this.audioContext = null;
      this.referenceCount = 0;
    }
  }

  /**
   * Get current context state
   */
  getState(): AudioContextState | null {
    return this.audioContext?.state || null;
  }

  /**
   * Resume suspended context
   */
  async resume(): Promise<void> {
    if (this.audioContext && this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
  }
}

// Export singleton instance
export const audioContextManager = AudioContextManager.getInstance();
