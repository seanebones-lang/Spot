/**
 * Pipeline Metrics Collection
 * Basic metrics/telemetry for RAG pipeline performance
 */

export interface PipelineMetrics {
  stage: string;
  duration: number;
  success: boolean;
  error?: string;
  metadata?: Record<string, any>;
}

export interface AggregateMetrics {
  stage: string;
  count: number;
  totalDuration: number;
  avgDuration: number;
  minDuration: number;
  maxDuration: number;
  successCount: number;
  failureCount: number;
  successRate: number;
}

/**
 * Simple in-memory metrics collector
 * In production, integrate with Prometheus, StatsD, or CloudWatch
 */
export class MetricsCollector {
  private metrics: PipelineMetrics[] = [];
  private maxMetrics = 10000; // Keep last 10k metrics

  /**
   * Record a pipeline metric
   */
  record(metric: PipelineMetrics): void {
    this.metrics.push(metric);

    // Trim if too many metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  /**
   * Get metrics for a specific stage
   */
  getStageMetrics(stage: string): PipelineMetrics[] {
    return this.metrics.filter(m => m.stage === stage);
  }

  /**
   * Get aggregate metrics for a stage
   */
  getAggregateMetrics(stage?: string): AggregateMetrics[] {
    const stageMetrics = stage
      ? this.metrics.filter(m => m.stage === stage)
      : this.metrics;

    const stageGroups = new Map<string, PipelineMetrics[]>();

    for (const metric of stageMetrics) {
      const group = stageGroups.get(metric.stage) || [];
      group.push(metric);
      stageGroups.set(metric.stage, group);
    }

    const aggregates: AggregateMetrics[] = [];

    for (const [stageName, metrics] of stageGroups.entries()) {
      const durations = metrics.map(m => m.duration);
      const successCount = metrics.filter(m => m.success).length;
      const failureCount = metrics.length - successCount;

      aggregates.push({
        stage: stageName,
        count: metrics.length,
        totalDuration: durations.reduce((sum, d) => sum + d, 0),
        avgDuration: durations.reduce((sum, d) => sum + d, 0) / durations.length,
        minDuration: Math.min(...durations),
        maxDuration: Math.max(...durations),
        successCount,
        failureCount,
        successRate: metrics.length > 0 ? successCount / metrics.length : 0,
      });
    }

    return aggregates;
  }

  /**
   * Get recent metrics (last N)
   */
  getRecentMetrics(limit: number = 100): PipelineMetrics[] {
    return this.metrics.slice(-limit);
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    this.metrics = [];
  }

  /**
   * Export metrics as JSON
   */
  export(): {
    metrics: PipelineMetrics[];
    aggregates: AggregateMetrics[];
  } {
    return {
      metrics: this.metrics,
      aggregates: this.getAggregateMetrics(),
    };
  }
}

/**
 * Singleton metrics collector
 */
let globalCollector: MetricsCollector | null = null;

export function getMetricsCollector(): MetricsCollector {
  if (!globalCollector) {
    globalCollector = new MetricsCollector();
  }
  return globalCollector;
}

/**
 * Record pipeline stage metric (convenience function)
 */
export function recordMetric(metric: Omit<PipelineMetrics, 'timestamp'>): void {
  getMetricsCollector().record({
    ...metric,
    success: !metric.error,
  });
}
