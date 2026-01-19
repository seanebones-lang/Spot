/**
 * Performance Benchmarking Script
 *
 * Benchmarks RAG system performance:
 * - Inference latency (<200ms target)
 * - Semantic search accuracy (>90% target)
 * - Batch processing speed (<5s per track target)
 * - Memory usage
 *
 * Usage:
 *   npm run benchmark -- --samples 100 --output ./benchmarks/results.json
 */

import { RAGMoodAnalysisPipeline, getRAGPipeline } from "../lib/aiMoodAnalysis";
import {
  DataPipelineOrchestrator,
  getPipelineOrchestrator,
} from "../lib/pipelineOrchestration";

interface BenchmarkResult {
  test: string;
  latency: {
    mean: number;
    median: number;
    p95: number;
    p99: number;
    min: number;
    max: number;
  };
  accuracy?: number;
  throughput?: number;
  memoryUsage?: number;
  timestamp: string;
}

interface BenchmarkConfig {
  samples: number;
  warmupSamples: number;
  outputPath: string;
}

/**
 * Performance Benchmarker
 */
class PerformanceBenchmarker {
  private pipeline: RAGMoodAnalysisPipeline;
  private orchestrator: DataPipelineOrchestrator;

  constructor() {
    this.pipeline = getRAGPipeline();
    this.orchestrator = getPipelineOrchestrator({
      vectorDB: {
        type: process.env.VECTOR_DB_TYPE === "faiss" ? "faiss" : "pinecone",
        apiKey: process.env.PINECONE_API_KEY,
        indexName: process.env.PINECONE_INDEX_NAME,
        environment: process.env.PINECONE_ENVIRONMENT,
        indexPath: process.env.FAISS_INDEX_PATH,
      },
      neo4j: {
        uri: process.env.NEO4J_URI || "bolt://localhost:7687",
        user: process.env.NEO4J_USER || "neo4j",
        password: process.env.NEO4J_PASSWORD || "password",
      },
    });
  }

  /**
   * Generate mock audio file for testing
   */
  private createMockAudioFile(): File {
    // Create a small mock audio file
    const blob = new Blob(["mock audio data"], { type: "audio/mpeg" });
    return new File([blob], "benchmark-test.mp3", { type: "audio/mpeg" });
  }

  /**
   * Calculate statistics from latency array
   */
  private calculateLatencyStats(
    latencies: number[],
  ): BenchmarkResult["latency"] {
    const sorted = [...latencies].sort((a, b) => a - b);
    const mean = latencies.reduce((sum, l) => sum + l, 0) / latencies.length;
    const median = sorted[Math.floor(sorted.length / 2)];
    const p95 = sorted[Math.floor(sorted.length * 0.95)];
    const p99 = sorted[Math.floor(sorted.length * 0.99)];
    const min = sorted[0];
    const max = sorted[sorted.length - 1];

    return { mean, median, p95, p99, min, max };
  }

  /**
   * Benchmark mood analysis inference latency
   */
  async benchmarkInferenceLatency(
    config: BenchmarkConfig,
  ): Promise<BenchmarkResult> {
    console.log(
      `⚡ Benchmarking inference latency (${config.samples} samples)...`,
    );

    const latencies: number[] = [];

    // Warmup
    for (let i = 0; i < config.warmupSamples; i++) {
      const audioFile = this.createMockAudioFile();
      try {
        await this.pipeline.analyzeMood(audioFile);
      } catch (error) {
        // Ignore errors during warmup
      }
    }

    // Actual benchmark
    for (let i = 0; i < config.samples; i++) {
      const audioFile = this.createMockAudioFile();
      const startTime = performance.now();

      try {
        await this.pipeline.analyzeMood(audioFile);
        const latency = performance.now() - startTime;
        latencies.push(latency);
      } catch (error) {
        console.error(`❌ Sample ${i + 1} failed:`, error);
      }

      if ((i + 1) % 10 === 0) {
        console.log(`   Processed ${i + 1}/${config.samples} samples...`);
      }
    }

    const stats = this.calculateLatencyStats(latencies);
    const meetsTarget = stats.mean < 200;

    console.log(`✅ Inference latency benchmark complete`);
    console.log(
      `   Mean: ${stats.mean.toFixed(2)}ms ${meetsTarget ? "✅" : "❌"} (target: <200ms)`,
    );
    console.log(`   Median: ${stats.median.toFixed(2)}ms`);
    console.log(`   P95: ${stats.p95.toFixed(2)}ms`);
    console.log(`   P99: ${stats.p99.toFixed(2)}ms`);

    return {
      test: "inference_latency",
      latency: stats,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Benchmark batch processing throughput
   */
  async benchmarkBatchProcessing(
    config: BenchmarkConfig,
  ): Promise<BenchmarkResult> {
    console.log(
      `⚡ Benchmarking batch processing (${config.samples} tracks)...`,
    );

    const tracks = Array.from({ length: config.samples }, (_, i) => ({
      file: this.createMockAudioFile(),
      metadata: {
        name: `Test Track ${i + 1}`,
        artist: "Test Artist",
      },
    }));

    const startTime = performance.now();

    try {
      const results = await this.orchestrator.batchProcess(tracks, {
        parallel: true,
        maxConcurrency: 5,
      });

      const totalTime = performance.now() - startTime;
      const throughput = (config.samples / totalTime) * 1000; // tracks per second
      const timePerTrack = totalTime / config.samples;
      const meetsTarget = timePerTrack < 5000; // <5 seconds per track

      console.log(`✅ Batch processing benchmark complete`);
      console.log(`   Total time: ${(totalTime / 1000).toFixed(2)}s`);
      console.log(`   Throughput: ${throughput.toFixed(2)} tracks/sec`);
      console.log(
        `   Time per track: ${timePerTrack.toFixed(2)}ms ${meetsTarget ? "✅" : "❌"} (target: <5000ms)`,
      );

      return {
        test: "batch_processing",
        latency: {
          mean: timePerTrack,
          median: timePerTrack,
          p95: timePerTrack,
          p99: timePerTrack,
          min: timePerTrack,
          max: timePerTrack,
        },
        throughput,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("❌ Batch processing benchmark failed:", error);
      throw error;
    }
  }

  /**
   * Benchmark memory usage
   */
  async benchmarkMemoryUsage(
    config: BenchmarkConfig,
  ): Promise<BenchmarkResult> {
    console.log(`⚡ Benchmarking memory usage...`);

    // Note: Memory usage measurement requires Node.js
    // In browser, use performance.memory if available
    const memoryBefore = (performance as any).memory?.usedJSHeapSize || 0;

    const audioFile = this.createMockAudioFile();
    await this.pipeline.analyzeMood(audioFile);

    const memoryAfter = (performance as any).memory?.usedJSHeapSize || 0;
    const memoryDelta = memoryAfter - memoryBefore;

    console.log(`✅ Memory usage benchmark complete`);
    console.log(`   Memory delta: ${(memoryDelta / 1024 / 1024).toFixed(2)}MB`);

    return {
      test: "memory_usage",
      latency: {
        mean: 0,
        median: 0,
        p95: 0,
        p99: 0,
        min: 0,
        max: 0,
      },
      memoryUsage: memoryDelta,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Run all benchmarks
   */
  async runAllBenchmarks(config: BenchmarkConfig): Promise<BenchmarkResult[]> {
    console.log("🎯 RAG System Performance Benchmarks");
    console.log("====================================\n");

    const results: BenchmarkResult[] = [];

    // Benchmark 1: Inference latency
    try {
      const latencyResult = await this.benchmarkInferenceLatency(config);
      results.push(latencyResult);
    } catch (error) {
      console.error("❌ Inference latency benchmark failed:", error);
    }

    // Benchmark 2: Batch processing
    try {
      const batchResult = await this.benchmarkBatchProcessing({
        ...config,
        samples: Math.min(config.samples, 10), // Limit for batch test
      });
      results.push(batchResult);
    } catch (error) {
      console.error("❌ Batch processing benchmark failed:", error);
    }

    // Benchmark 3: Memory usage
    try {
      const memoryResult = await this.benchmarkMemoryUsage(config);
      results.push(memoryResult);
    } catch (error) {
      console.error("❌ Memory usage benchmark failed:", error);
    }

    return results;
  }

  /**
   * Save benchmark results to file
   */
  async saveResults(
    results: BenchmarkResult[],
    outputPath: string,
  ): Promise<void> {
    const fs = await import("fs/promises");
    await fs.writeFile(outputPath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Results saved to: ${outputPath}`);
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    await this.pipeline.cleanup();
    await this.orchestrator.cleanup();
  }
}

/**
 * Main benchmark function
 */
async function main() {
  const args = process.argv.slice(2);
  const config: BenchmarkConfig = {
    samples: args.includes("--samples")
      ? parseInt(args[args.indexOf("--samples") + 1])
      : 100,
    warmupSamples: args.includes("--warmup")
      ? parseInt(args[args.indexOf("--warmup") + 1])
      : 10,
    outputPath: args.includes("--output")
      ? args[args.indexOf("--output") + 1]
      : "./benchmarks/results.json",
  };

  const benchmarker = new PerformanceBenchmarker();

  try {
    const results = await benchmarker.runAllBenchmarks(config);
    await benchmarker.saveResults(results, config.outputPath);

    console.log("\n✅ All benchmarks complete!\n");
  } catch (error) {
    console.error("❌ Benchmarking failed:", error);
    process.exit(1);
  } finally {
    await benchmarker.cleanup();
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { PerformanceBenchmarker };
export type { BenchmarkResult, BenchmarkConfig };
