/**
 * Performance Benchmarking Script
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Benchmarks RAG system performance:
 * - Inference latency (<200ms target)
 * - Semantic search accuracy (>90% target)
 * - Batch processing speed (<5s per track target)
 * - Memory usage
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Usage:
 *   npm run benchmark -- --samples 100 --output ./benchmarks/results.json
 */

<<<<<<< HEAD
import { RAGMoodAnalysisPipeline, getRAGPipeline } from "../lib/aiMoodAnalysis";
import {
  DataPipelineOrchestrator,
  getPipelineOrchestrator,
} from "../lib/pipelineOrchestration";
=======
import { RAGMoodAnalysisPipeline, getRAGPipeline } from '../lib/aiMoodAnalysis';
import { DataPipelineOrchestrator, getPipelineOrchestrator } from '../lib/pipelineOrchestration';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

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
<<<<<<< HEAD
        type: process.env.VECTOR_DB_TYPE === "faiss" ? "faiss" : "pinecone",
=======
        type: process.env.VECTOR_DB_TYPE === 'faiss' ? 'faiss' : 'pinecone',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        apiKey: process.env.PINECONE_API_KEY,
        indexName: process.env.PINECONE_INDEX_NAME,
        environment: process.env.PINECONE_ENVIRONMENT,
        indexPath: process.env.FAISS_INDEX_PATH,
      },
      neo4j: {
<<<<<<< HEAD
        uri: process.env.NEO4J_URI || "bolt://localhost:7687",
        user: process.env.NEO4J_USER || "neo4j",
        password: process.env.NEO4J_PASSWORD || "password",
=======
        uri: process.env.NEO4J_URI || 'bolt://localhost:7687',
        user: process.env.NEO4J_USER || 'neo4j',
        password: process.env.NEO4J_PASSWORD || 'password',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      },
    });
  }

  /**
   * Generate mock audio file for testing
   */
  private createMockAudioFile(): File {
    // Create a small mock audio file
<<<<<<< HEAD
    const blob = new Blob(["mock audio data"], { type: "audio/mpeg" });
    return new File([blob], "benchmark-test.mp3", { type: "audio/mpeg" });
=======
    const blob = new Blob(['mock audio data'], { type: 'audio/mpeg' });
    return new File([blob], 'benchmark-test.mp3', { type: 'audio/mpeg' });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }

  /**
   * Calculate statistics from latency array
   */
<<<<<<< HEAD
  private calculateLatencyStats(
    latencies: number[],
  ): BenchmarkResult["latency"] {
=======
  private calculateLatencyStats(latencies: number[]): BenchmarkResult['latency'] {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
  async benchmarkInferenceLatency(
    config: BenchmarkConfig,
  ): Promise<BenchmarkResult> {
    console.log(
      `⚡ Benchmarking inference latency (${config.samples} samples)...`,
    );
=======
  async benchmarkInferenceLatency(config: BenchmarkConfig): Promise<BenchmarkResult> {
    console.log(`⚡ Benchmarking inference latency (${config.samples} samples)...`);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

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
<<<<<<< HEAD
    console.log(
      `   Mean: ${stats.mean.toFixed(2)}ms ${meetsTarget ? "✅" : "❌"} (target: <200ms)`,
    );
=======
    console.log(`   Mean: ${stats.mean.toFixed(2)}ms ${meetsTarget ? '✅' : '❌'} (target: <200ms)`);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    console.log(`   Median: ${stats.median.toFixed(2)}ms`);
    console.log(`   P95: ${stats.p95.toFixed(2)}ms`);
    console.log(`   P99: ${stats.p99.toFixed(2)}ms`);

    return {
<<<<<<< HEAD
      test: "inference_latency",
=======
      test: 'inference_latency',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      latency: stats,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Benchmark batch processing throughput
   */
<<<<<<< HEAD
  async benchmarkBatchProcessing(
    config: BenchmarkConfig,
  ): Promise<BenchmarkResult> {
    console.log(
      `⚡ Benchmarking batch processing (${config.samples} tracks)...`,
    );
=======
  async benchmarkBatchProcessing(config: BenchmarkConfig): Promise<BenchmarkResult> {
    console.log(`⚡ Benchmarking batch processing (${config.samples} tracks)...`);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

    const tracks = Array.from({ length: config.samples }, (_, i) => ({
      file: this.createMockAudioFile(),
      metadata: {
        name: `Test Track ${i + 1}`,
<<<<<<< HEAD
        artist: "Test Artist",
=======
        artist: 'Test Artist',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
      console.log(
        `   Time per track: ${timePerTrack.toFixed(2)}ms ${meetsTarget ? "✅" : "❌"} (target: <5000ms)`,
      );

      return {
        test: "batch_processing",
=======
      console.log(`   Time per track: ${timePerTrack.toFixed(2)}ms ${meetsTarget ? '✅' : '❌'} (target: <5000ms)`);

      return {
        test: 'batch_processing',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
      console.error("❌ Batch processing benchmark failed:", error);
=======
      console.error('❌ Batch processing benchmark failed:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      throw error;
    }
  }

  /**
   * Benchmark memory usage
   */
<<<<<<< HEAD
  async benchmarkMemoryUsage(
    config: BenchmarkConfig,
  ): Promise<BenchmarkResult> {
=======
  async benchmarkMemoryUsage(config: BenchmarkConfig): Promise<BenchmarkResult> {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
      test: "memory_usage",
=======
      test: 'memory_usage',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
    console.log("🎯 RAG System Performance Benchmarks");
    console.log("====================================\n");
=======
    console.log('🎯 RAG System Performance Benchmarks');
    console.log('====================================\n');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

    const results: BenchmarkResult[] = [];

    // Benchmark 1: Inference latency
    try {
      const latencyResult = await this.benchmarkInferenceLatency(config);
      results.push(latencyResult);
    } catch (error) {
<<<<<<< HEAD
      console.error("❌ Inference latency benchmark failed:", error);
=======
      console.error('❌ Inference latency benchmark failed:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }

    // Benchmark 2: Batch processing
    try {
      const batchResult = await this.benchmarkBatchProcessing({
        ...config,
        samples: Math.min(config.samples, 10), // Limit for batch test
      });
      results.push(batchResult);
    } catch (error) {
<<<<<<< HEAD
      console.error("❌ Batch processing benchmark failed:", error);
=======
      console.error('❌ Batch processing benchmark failed:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }

    // Benchmark 3: Memory usage
    try {
      const memoryResult = await this.benchmarkMemoryUsage(config);
      results.push(memoryResult);
    } catch (error) {
<<<<<<< HEAD
      console.error("❌ Memory usage benchmark failed:", error);
=======
      console.error('❌ Memory usage benchmark failed:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }

    return results;
  }

  /**
   * Save benchmark results to file
   */
<<<<<<< HEAD
  async saveResults(
    results: BenchmarkResult[],
    outputPath: string,
  ): Promise<void> {
    const fs = await import("fs/promises");
=======
  async saveResults(results: BenchmarkResult[], outputPath: string): Promise<void> {
    const fs = await import('fs/promises');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
    samples: args.includes("--samples")
      ? parseInt(args[args.indexOf("--samples") + 1])
      : 100,
    warmupSamples: args.includes("--warmup")
      ? parseInt(args[args.indexOf("--warmup") + 1])
      : 10,
    outputPath: args.includes("--output")
      ? args[args.indexOf("--output") + 1]
      : "./benchmarks/results.json",
=======
    samples: args.includes('--samples')
      ? parseInt(args[args.indexOf('--samples') + 1])
      : 100,
    warmupSamples: args.includes('--warmup')
      ? parseInt(args[args.indexOf('--warmup') + 1])
      : 10,
    outputPath: args.includes('--output')
      ? args[args.indexOf('--output') + 1]
      : './benchmarks/results.json',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  };

  const benchmarker = new PerformanceBenchmarker();

  try {
    const results = await benchmarker.runAllBenchmarks(config);
    await benchmarker.saveResults(results, config.outputPath);

<<<<<<< HEAD
    console.log("\n✅ All benchmarks complete!\n");
  } catch (error) {
    console.error("❌ Benchmarking failed:", error);
=======
    console.log('\n✅ All benchmarks complete!\n');
  } catch (error) {
    console.error('❌ Benchmarking failed:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
export type { BenchmarkResult, BenchmarkConfig };
=======
export type { BenchmarkResult, BenchmarkConfig };
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
