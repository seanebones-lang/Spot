/**
 * Audio Pipeline Manager
 * Manages multiple audio pipeline instances for different contexts (stations, tracks, etc.)
 *
 * Strategy:
 * - Single shared pipeline for regular tracks (default, efficient)
 * - Optional per-station pipelines for radio (if isolation needed)
 * - Automatic cleanup and resource management
 */

import { AudiophileAudioPipeline, getAudioPipeline } from "./audio-pipeline";

export type PipelineContext =
  | "shared"
  | `station-${string}`
  | `track-${string}`;

class AudioPipelineManager {
  private pipelines: Map<PipelineContext, AudiophileAudioPipeline> = new Map();
  private activeContext: PipelineContext | null = null;
  private usePerStationPipelines: boolean = false;

  /**
   * Configure whether to use separate pipelines per station
   * @param enabled - If true, each station gets its own pipeline
   */
  setPerStationPipelines(enabled: boolean): void {
    this.usePerStationPipelines = enabled;
    console.log(
      `📊 Per-station pipelines: ${enabled ? "enabled" : "disabled"}`,
    );
  }

  /**
   * Get pipeline for a specific context
   * @param context - Pipeline context identifier
   * @param createIfMissing - Create new pipeline if it doesn't exist
   */
  getPipeline(
    context: PipelineContext = "shared",
    createIfMissing: boolean = true,
  ): AudiophileAudioPipeline {
    // For regular tracks, always use shared pipeline
    if (context === "shared" || context.startsWith("track-")) {
      if (!this.pipelines.has("shared")) {
        this.pipelines.set("shared", getAudioPipeline());
      }
      return this.pipelines.get("shared")!;
    }

    // For stations, check if per-station pipelines are enabled
    if (context.startsWith("station-")) {
      if (!this.usePerStationPipelines) {
        // Use shared pipeline for stations too
        if (!this.pipelines.has("shared")) {
          this.pipelines.set("shared", getAudioPipeline());
        }
        return this.pipelines.get("shared")!;
      }

      // Use per-station pipeline
      if (!this.pipelines.has(context)) {
        if (createIfMissing) {
          // Create new pipeline instance for this station
          const newPipeline = new AudiophileAudioPipeline();
          this.pipelines.set(context, newPipeline);
          console.log(`📻 Created pipeline for station: ${context}`);
        } else {
          // Fallback to shared if not creating
          return this.getPipeline("shared", true);
        }
      }
      return this.pipelines.get(context)!;
    }

    // Default to shared
    return this.getPipeline("shared", createIfMissing);
  }

  /**
   * Set active pipeline context
   */
  setActiveContext(context: PipelineContext | null): void {
    this.activeContext = context;
  }

  /**
   * Get active pipeline context
   */
  getActiveContext(): PipelineContext | null {
    return this.activeContext;
  }

  /**
   * Cleanup pipeline for a specific context
   */
  async cleanupPipeline(context: PipelineContext): Promise<void> {
    const pipeline = this.pipelines.get(context);
    if (pipeline) {
      await pipeline.cleanup();
      this.pipelines.delete(context);
      console.log(`🧹 Cleaned up pipeline: ${context}`);
    }
  }

  /**
   * Cleanup all pipelines except shared
   */
  async cleanupAllExceptShared(): Promise<void> {
    const contextsToCleanup: PipelineContext[] = [];

    for (const context of this.pipelines.keys()) {
      if (context !== "shared") {
        contextsToCleanup.push(context);
      }
    }

    for (const context of contextsToCleanup) {
      await this.cleanupPipeline(context);
    }
  }

  /**
   * Cleanup all pipelines
   */
  async cleanupAll(): Promise<void> {
    const cleanupPromises: Promise<void>[] = [];

    for (const [context, pipeline] of this.pipelines.entries()) {
      cleanupPromises.push(
        pipeline.cleanup().then(() => {
          this.pipelines.delete(context);
          console.log(`🧹 Cleaned up pipeline: ${context}`);
        }),
      );
    }

    await Promise.all(cleanupPromises);
    this.activeContext = null;
  }

  /**
   * Get pipeline count (for monitoring)
   */
  getPipelineCount(): number {
    return this.pipelines.size;
  }

  /**
   * Get all active contexts
   */
  getActiveContexts(): PipelineContext[] {
    return Array.from(this.pipelines.keys());
  }
}

// Singleton instance
let managerInstance: AudioPipelineManager | null = null;

/**
 * Get the audio pipeline manager instance
 */
export function getAudioPipelineManager(): AudioPipelineManager {
  if (!managerInstance) {
    managerInstance = new AudioPipelineManager();
  }
  return managerInstance;
}

/**
 * Helper to get pipeline for a radio station
 */
export function getStationPipeline(stationId: string): AudiophileAudioPipeline {
  const manager = getAudioPipelineManager();
  return manager.getPipeline(`station-${stationId}` as PipelineContext);
}

/**
 * Helper to get shared pipeline (for regular tracks)
 */
export function getSharedPipeline(): AudiophileAudioPipeline {
  const manager = getAudioPipelineManager();
  return manager.getPipeline("shared");
}
