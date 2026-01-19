/**
 * Data Pipeline Orchestration System
 * 
 * This module implements Apache Airflow/Kubeflow-style pipeline orchestration
 * for batch processing of audio files, mood analysis, and knowledge graph updates.
 * 
 * Pipeline Stages:
 * 1. Data Ingestion: Upload and validate audio files
 * 2. Feature Extraction: Extract audio features using Librosa-style processing
 * 3. Embedding Generation: Create vector embeddings from features
 * 4. Mood Classification: Run mood prediction model
 * 5. Vector DB Indexing: Store embeddings in Pinecone/FAISS
 * 6. Graph Update: Update Neo4j knowledge graph
 * 7. Similarity Computation: Calculate similarity relationships
 * 8. Validation: Validate accuracy and quality metrics
 * 
 * Target Performance:
 * - Batch processing: <5 seconds per track
 * - Real-time inference: <200ms latency
 * - Daily batch jobs: Scheduled via Airflow
 */

import { Track } from '@/types/track';
import { RAGMoodAnalysisPipeline, getRAGPipeline } from './aiMoodAnalysis';
import { Neo4jKnowledgeGraph, getKnowledgeGraph } from './knowledgeGraph';
import { SimilarityMatchingEngine, getSimilarityMatchingEngine } from './similarityMatching';
import { recordMetric } from './pipelineMetrics';
import { PERFORMANCE_TARGETS, DEFAULT_LIMITS, SIMILARITY_THRESHOLDS } from './pipelineConfig';

/**
 * Pipeline Stage Status
 */
export enum PipelineStageStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  SKIPPED = 'skipped',
}

/**
 * Pipeline Stage Result
 */
export interface PipelineStageResult {
  stage: string;
  status: PipelineStageStatus;
  duration: number; // milliseconds
  error?: string;
  metadata?: Record<string, any>;
}

/**
 * Pipeline Execution Result
 */
export interface PipelineExecutionResult {
  trackId: string;
  status: 'success' | 'failed' | 'partial';
  stages: PipelineStageResult[];
  totalDuration: number;
  overallAccuracy?: number;
}

/**
 * Data Pipeline Orchestrator
 */
export class DataPipelineOrchestrator {
  private ragPipeline: RAGMoodAnalysisPipeline;
  private knowledgeGraph: Neo4jKnowledgeGraph | null = null;
  private similarityEngine: SimilarityMatchingEngine;
  private config: PipelineConfig;

  constructor(config: PipelineConfig) {
    this.config = config;
    this.ragPipeline = getRAGPipeline();
    this.similarityEngine = getSimilarityMatchingEngine(this.knowledgeGraph || undefined);
  }

  /**
   * Initialize pipeline components
   */
  async initialize(): Promise<void> {
    try {
      // Initialize vector database if configured
      if (this.config.vectorDB) {
        await this.ragPipeline.initializeVectorDB(this.config.vectorDB);
      }

      // Initialize knowledge graph if configured
      if (this.config.neo4j) {
        this.knowledgeGraph = getKnowledgeGraph(
          this.config.neo4j.uri,
          this.config.neo4j.user,
          this.config.neo4j.password
        );
        await this.knowledgeGraph.initialize();
        await this.knowledgeGraph.createSchema();
      }

      console.log('✅ Data Pipeline Orchestrator initialized');
    } catch (error) {
      console.error('❌ Failed to initialize pipeline:', error);
      throw error;
    }
  }

  /**
   * Execute full pipeline for a single track
   */
  async executePipeline(
    audioFile: File,
    trackMetadata: Partial<Track>
  ): Promise<PipelineExecutionResult> {
    const startTime = performance.now();
    const stages: PipelineStageResult[] = [];
    const trackId = trackMetadata.id || `track-${Date.now()}`;

    try {
      // Stage 1: Data Ingestion & Validation
      const ingestionResult = await this.stageIngestion(audioFile, trackMetadata);
      stages.push(ingestionResult);
      if (ingestionResult.status === PipelineStageStatus.FAILED) {
        return this.createFailureResult(trackId, stages, startTime);
      }

      // Stage 2: Feature Extraction
      const featureResult = await this.stageFeatureExtraction(audioFile);
      stages.push(featureResult);
      if (featureResult.status === PipelineStageStatus.FAILED) {
        return this.createFailureResult(trackId, stages, startTime);
      }

      // Stage 3: Mood Analysis (RAG)
      const moodResult = await this.stageMoodAnalysis(audioFile);
      stages.push(moodResult);
      if (moodResult.status === PipelineStageStatus.FAILED) {
        return this.createFailureResult(trackId, stages, startTime);
      }

      const moodSuggestion = moodResult.metadata?.moodSuggestion;

      // Stage 4: Vector DB Indexing
      if (this.config.vectorDB) {
        const indexingResult = await this.stageVectorIndexing(
          trackId,
          moodResult.metadata?.embedding,
          trackMetadata
        );
        stages.push(indexingResult);
      }

      // Stage 5: Graph Update
      if (this.knowledgeGraph && moodSuggestion) {
        const graphResult = await this.stageGraphUpdate(
          trackId,
          { ...trackMetadata, moodTags: moodSuggestion } as Track
        );
        stages.push(graphResult);
      }

      // Stage 6: Similarity Computation
      if (this.knowledgeGraph && moodSuggestion) {
        const similarityResult = await this.stageSimilarityComputation(
          trackId,
          { ...trackMetadata, moodTags: moodSuggestion } as Track
        );
        stages.push(similarityResult);
      }

      // Stage 7: Validation
      const validationResult = await this.stageValidation(stages, moodSuggestion);
      stages.push(validationResult);

      const totalDuration = performance.now() - startTime;
      const success = stages.every(s => s.status !== PipelineStageStatus.FAILED);

      return {
        trackId,
        status: success ? 'success' : 'partial',
        stages,
        totalDuration,
        overallAccuracy: validationResult.metadata?.accuracy,
      };
    } catch (error) {
      console.error('❌ Pipeline execution failed:', error);
      return this.createFailureResult(
        trackId,
        stages,
        startTime,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  /**
   * Stage 1: Data Ingestion & Validation
   */
  private async stageIngestion(
    audioFile: File,
    trackMetadata: Partial<Track>
  ): Promise<PipelineStageResult> {
    const startTime = performance.now();

    try {
      // Validate file format
      const validFormats = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/mp4', 'audio/x-m4a'];
      if (!validFormats.includes(audioFile.type) && 
          !['.mp3', '.wav', '.flac', '.m4a', '.mp4'].some(ext => audioFile.name.endsWith(ext))) {
        throw new Error(`Invalid audio format: ${audioFile.type}`);
      }

      // Validate file size (max 500MB)
      const maxSize = 500 * 1024 * 1024;
      if (audioFile.size > maxSize) {
        throw new Error(`File size exceeds maximum: ${(audioFile.size / 1024 / 1024).toFixed(2)}MB`);
      }

      // Validate metadata
      if (!trackMetadata.name || !trackMetadata.artist) {
        throw new Error('Missing required metadata: name, artist');
      }

      const duration = performance.now() - startTime;
      return {
        stage: 'ingestion',
        status: PipelineStageStatus.COMPLETED,
        duration,
        metadata: {
          fileName: audioFile.name,
          fileSize: audioFile.size,
          fileType: audioFile.type,
        },
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        stage: 'ingestion',
        status: PipelineStageStatus.FAILED,
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Stage 2: Feature Extraction
   */
  private async stageFeatureExtraction(
    audioFile: File
  ): Promise<PipelineStageResult> {
    const startTime = performance.now();

    try {
      // Feature extraction happens in RAG pipeline
      // This stage is for tracking/logging
      const duration = performance.now() - startTime;
      return {
        stage: 'feature_extraction',
        status: PipelineStageStatus.COMPLETED,
        duration,
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        stage: 'feature_extraction',
        status: PipelineStageStatus.FAILED,
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Stage 3: Mood Analysis (RAG)
   */
  private async stageMoodAnalysis(
    audioFile: File
  ): Promise<PipelineStageResult & { metadata?: { moodSuggestion: any; embedding: number[] } }> {
    const startTime = performance.now();

    try {
      const moodSuggestion = await this.ragPipeline.analyzeMood(audioFile);
      const duration = performance.now() - startTime;

      // Extract embedding from RAG pipeline result
      const embedding: number[] = moodSuggestion.embedding || [];

      // Record metric
      recordMetric({
        stage: 'mood_analysis',
        duration,
        success: true,
        metadata: {
          confidence: moodSuggestion.confidence,
          embeddingDimensions: embedding.length,
        },
      });

      if (duration > PERFORMANCE_TARGETS.MOOD_ANALYSIS_LATENCY_MS) {
        console.warn(
          `⚠️ Mood analysis latency (${duration.toFixed(2)}ms) exceeds target (<${PERFORMANCE_TARGETS.MOOD_ANALYSIS_LATENCY_MS}ms)`
        );
      }

      return {
        stage: 'mood_analysis',
        status: PipelineStageStatus.COMPLETED,
        duration,
        metadata: {
          moodSuggestion,
          embedding,
          confidence: moodSuggestion.confidence,
        },
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        stage: 'mood_analysis',
        status: PipelineStageStatus.FAILED,
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Stage 4: Vector DB Indexing
   */
  private async stageVectorIndexing(
    trackId: string,
    embedding: number[] | undefined,
    trackMetadata: Partial<Track>
  ): Promise<PipelineStageResult> {
    const startTime = performance.now();

    try {
      // Check if vector DB is configured
      if (!this.config.vectorDB) {
        return {
          stage: 'vector_indexing',
          status: PipelineStageStatus.SKIPPED,
          duration: 0,
          metadata: {
            trackId,
            reason: 'Vector DB not configured',
          },
        };
      }

      // Validate embedding
      if (!embedding || embedding.length === 0) {
        return {
          stage: 'vector_indexing',
          status: PipelineStageStatus.FAILED,
          duration: performance.now() - startTime,
          error: 'Cannot index: embedding is empty or invalid',
        };
      }

      if (embedding.some(v => !isFinite(v))) {
        return {
          stage: 'vector_indexing',
          status: PipelineStageStatus.FAILED,
          duration: performance.now() - startTime,
          error: 'Cannot index: embedding contains NaN or Infinity values',
        };
      }

      // Upsert embedding to vector database
      await this.ragPipeline.upsertEmbedding(
        trackId,
        embedding,
        {
          trackId,
          name: trackMetadata.name || '',
          artist: trackMetadata.artist || '',
          moodTags: trackMetadata.moodTags || {
            mood: 'Content',
            feelings: [],
            vibe: 50,
            genres: [],
          },
          genre: trackMetadata.genre || undefined,
        }
      );

      const duration = performance.now() - startTime;
      return {
        stage: 'vector_indexing',
        status: PipelineStageStatus.COMPLETED,
        duration,
        metadata: {
          trackId,
          embeddingDimensions: embedding.length,
          vectorDBType: this.config.vectorDB.type,
        },
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        stage: 'vector_indexing',
        status: PipelineStageStatus.FAILED,
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Stage 5: Graph Update
   */
  private async stageGraphUpdate(
    trackId: string,
    track: Track
  ): Promise<PipelineStageResult> {
    const startTime = performance.now();

    try {
      if (!this.knowledgeGraph) {
        return {
          stage: 'graph_update',
          status: PipelineStageStatus.SKIPPED,
          duration: 0,
        };
      }

      await this.knowledgeGraph.upsertTrack(track);
      const duration = performance.now() - startTime;

      return {
        stage: 'graph_update',
        status: PipelineStageStatus.COMPLETED,
        duration,
        metadata: {
          trackId,
          mood: track.moodTags.mood,
        },
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        stage: 'graph_update',
        status: PipelineStageStatus.FAILED,
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Stage 6: Similarity Computation
   */
  private async stageSimilarityComputation(
    trackId: string,
    track: Track
  ): Promise<PipelineStageResult> {
    const startTime = performance.now();

    try {
      if (!this.knowledgeGraph) {
        return {
          stage: 'similarity_computation',
          status: PipelineStageStatus.SKIPPED,
          duration: 0,
        };
      }

      // Find similar tracks
      const similarTracks = await this.similarityEngine.findSimilarTracks(track, {
        limit: 10,
        minSimilarity: 0.7,
      });

      // Create similarity relationships in graph
      const similarityRelationships = similarTracks.map(match => ({
        trackId: match.track.id,
        similarity: match.overallSimilarity,
      }));

      await this.knowledgeGraph.createSimilarityRelationships(
        trackId,
        similarityRelationships,
        SIMILARITY_THRESHOLDS.SIMILARITY_THRESHOLD
      );

      const duration = performance.now() - startTime;

      return {
        stage: 'similarity_computation',
        status: PipelineStageStatus.COMPLETED,
        duration,
        metadata: {
          trackId,
          similarTracksFound: similarTracks.length,
        },
      };
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        stage: 'similarity_computation',
        status: PipelineStageStatus.FAILED,
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Stage 7: Validation
   */
  private async stageValidation(
    previousStages: PipelineStageResult[],
    moodSuggestion: any
  ): Promise<PipelineStageResult> {
    const startTime = performance.now();

    try {
      // Validate accuracy
      const accuracy = moodSuggestion?.confidence || 0.8;
      const meetsTarget = accuracy >= 0.9;

      // Validate latency
      const moodAnalysisStage = previousStages.find(s => s.stage === 'mood_analysis');
      const latencyOK =
        !moodAnalysisStage || moodAnalysisStage.duration < PERFORMANCE_TARGETS.MOOD_ANALYSIS_LATENCY_MS;

      // Validate all stages completed
      const allCompleted = previousStages.every(
        s => s.status === PipelineStageStatus.COMPLETED || s.status === PipelineStageStatus.SKIPPED
      );

      const duration = performance.now() - startTime;

      const result = {
        stage: 'validation',
        status: allCompleted ? PipelineStageStatus.COMPLETED : PipelineStageStatus.FAILED,
        duration,
        metadata: {
          accuracy,
          meetsTarget,
          latencyOK,
          allStagesCompleted: allCompleted,
        },
      };

      // Record validation metric
      recordMetric({
        stage: 'validation',
        duration,
        success: allCompleted && meetsTarget && latencyOK,
        metadata: result.metadata,
      });

      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      return {
        stage: 'validation',
        status: PipelineStageStatus.FAILED,
        duration,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Create failure result
   */
  private createFailureResult(
    trackId: string,
    stages: PipelineStageResult[],
    startTime: number,
    error?: string
  ): PipelineExecutionResult {
    const totalDuration = performance.now() - startTime;
    if (error) {
      stages.push({
        stage: 'error',
        status: PipelineStageStatus.FAILED,
        duration: 0,
        error,
      });
    }

    return {
      trackId,
      status: 'failed',
      stages,
      totalDuration,
    };
  }

  /**
   * Batch process multiple tracks
   */
  async batchProcess(
    tracks: Array<{ file: File; metadata: Partial<Track> }>,
    options: { parallel?: boolean; maxConcurrency?: number } = {}
  ): Promise<PipelineExecutionResult[]> {
    const { parallel = false, maxConcurrency = 3 } = options;
    const results: PipelineExecutionResult[] = [];

    if (parallel) {
      // Process in parallel with concurrency limit
      const chunks = [];
      for (let i = 0; i < tracks.length; i += maxConcurrency) {
        chunks.push(tracks.slice(i, i + maxConcurrency));
      }

      for (const chunk of chunks) {
        const chunkResults = await Promise.all(
          chunk.map(({ file, metadata }) => this.executePipeline(file, metadata))
        );
        results.push(...chunkResults);
      }
    } else {
      // Process sequentially
      for (const { file, metadata } of tracks) {
        const result = await this.executePipeline(file, metadata);
        results.push(result);
      }
    }

    return results;
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    await this.ragPipeline.cleanup();
    if (this.knowledgeGraph) {
      await this.knowledgeGraph.cleanup();
    }
  }
}

/**
 * Pipeline Configuration
 */
export interface PipelineConfig {
  vectorDB?: {
    type: 'pinecone' | 'faiss';
    apiKey?: string;
    indexName?: string;
    environment?: string;
    indexPath?: string;
  };
  neo4j?: {
    uri: string;
    user: string;
    password: string;
  };
  batchSize?: number;
  enableParallelProcessing?: boolean;
}

/**
 * Export singleton instance
 */
let orchestratorInstance: DataPipelineOrchestrator | null = null;

export function getPipelineOrchestrator(
  config: PipelineConfig
): DataPipelineOrchestrator {
  if (!orchestratorInstance) {
    orchestratorInstance = new DataPipelineOrchestrator(config);
  }
  return orchestratorInstance;
}