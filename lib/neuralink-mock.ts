/**
 * Neuralink SDK Mock
 * Placeholder for future Neuralink API integration
 * Currently supports mock brainwave data for development
 */

export interface BrainwaveEvent {
  type: "alpha" | "beta" | "theta" | "gamma";
  frequency: number;
  amplitude: number;
  timestamp: number;
}

export class NeuralinkMock {
  private listeners: Map<string, Array<(data: BrainwaveEvent) => void>> =
    new Map();
  private isRecording = false;

  /**
   * Listen to brainwave events
   * @param type - Brainwave type (alpha, beta, theta, gamma)
   * @param callback - Callback function
   */
  on(type: string, callback: (data: BrainwaveEvent) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)?.push(callback);
  }

  /**
   * Start recording brainwaves (mock)
   */
  startRecording() {
    this.isRecording = true;
    this.simulateBrainwaves();
  }

  /**
   * Stop recording
   */
  stopRecording() {
    this.isRecording = false;
  }

  /**
   * Simulate brainwave data (for development)
   */
  private simulateBrainwaves() {
    if (!this.isRecording) return;

    // Simulate different brainwave patterns
    const patterns = [
      { type: "alpha" as const, frequency: 10, amplitude: 0.8 },
      { type: "beta" as const, frequency: 20, amplitude: 0.6 },
      { type: "theta" as const, frequency: 6, amplitude: 0.4 },
      { type: "gamma" as const, frequency: 40, amplitude: 0.3 },
    ];

    const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

    const event: BrainwaveEvent = {
      ...randomPattern,
      timestamp: Date.now(),
    };

    // Trigger listeners
    this.listeners.get(event.type)?.forEach((callback) => {
      callback(event);
    });

    // Continue simulation
    setTimeout(() => this.simulateBrainwaves(), 1000);
  }

  /**
   * Get current brainwave state
   */
  getCurrentState(): {
    alpha: number;
    beta: number;
    theta: number;
    gamma: number;
  } {
    // Mock current state
    return {
      alpha: Math.random() * 0.8,
      beta: Math.random() * 0.6,
      theta: Math.random() * 0.4,
      gamma: Math.random() * 0.3,
    };
  }
}

// Example usage:
// const brainwave = new NeuralinkMock();
// brainwave.on('alpha', () => play('chill'));
// brainwave.on('beta', () => play('energetic'));
// brainwave.startRecording();
