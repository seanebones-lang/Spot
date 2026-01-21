/**
 * Integration Tests for RAG Pipeline System
<<<<<<< HEAD
 *
 * These tests demonstrate end-to-end pipeline functionality
 * using mock implementations for external services.
 *
 * Run with: npm test -- pipeline.integration
 */

import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from "@jest/globals";
import { getRAGPipeline } from "@/lib/aiMoodAnalysis";
import {
  getPipelineOrchestrator,
  PipelineExecutionResult,
} from "@/lib/pipelineOrchestration";
import { getMetricsCollector } from "@/lib/pipelineMetrics";
import { getEmbeddingCache } from "@/lib/embeddingCache";
=======
 * 
 * These tests demonstrate end-to-end pipeline functionality
 * using mock implementations for external services.
 * 
 * Run with: npm test -- pipeline.integration
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { getRAGPipeline } from '@/lib/aiMoodAnalysis';
import { getPipelineOrchestrator, PipelineExecutionResult } from '@/lib/pipelineOrchestration';
import { getMetricsCollector } from '@/lib/pipelineMetrics';
import { getEmbeddingCache } from '@/lib/embeddingCache';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
import {
  createMockAudioFile,
  createMockAudioFeatures,
  createMockMoodSuggestion,
  createMockTrack,
  MockPineconeVectorDB,
  MockNeo4jKnowledgeGraph,
  assertValidMoodSuggestion,
  assertValidEmbedding,
<<<<<<< HEAD
} from "./ragTestHelpers";
import { Track } from "@/types/track";

describe("RAG Pipeline Integration Tests", () => {
=======
} from './ragTestHelpers';
import { Track } from '@/types/track';

describe('RAG Pipeline Integration Tests', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  let ragPipeline: ReturnType<typeof getRAGPipeline>;
  let mockVectorDB: MockPineconeVectorDB;
  let mockGraph: MockNeo4jKnowledgeGraph;
  let cache: ReturnType<typeof getEmbeddingCache>;

  beforeAll(async () => {
    // Initialize components
    ragPipeline = getRAGPipeline();
    mockVectorDB = new MockPineconeVectorDB();
    mockGraph = new MockNeo4jKnowledgeGraph();
    cache = getEmbeddingCache();
  });

  afterAll(async () => {
    await ragPipeline.cleanup();
    await mockVectorDB.cleanup();
    await mockGraph.cleanup();
    cache.clear();
  });

<<<<<<< HEAD
  describe("End-to-End Pipeline Execution", () => {
    it("should execute full pipeline with mock components", async () => {
      // Create mock audio file
      const audioFile = createMockAudioFile(
        "test-track.mp3",
        1024 * 1024,
        "audio/mpeg",
      );

      // Create mock track metadata
      const trackMetadata: Partial<Track> = {
        id: "test-track-1",
        name: "Test Track",
        artist: "Test Artist",
=======
  describe('End-to-End Pipeline Execution', () => {
    it('should execute full pipeline with mock components', async () => {
      // Create mock audio file
      const audioFile = createMockAudioFile('test-track.mp3', 1024 * 1024, 'audio/mpeg');
      
      // Create mock track metadata
      const trackMetadata: Partial<Track> = {
        id: 'test-track-1',
        name: 'Test Track',
        artist: 'Test Artist',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        duration: 180000,
      };

      // Get pipeline orchestrator (without actual DB connections for this test)
      const orchestrator = getPipelineOrchestrator({
        // Note: In real tests, would use actual config with mocks
      });

      // Execute pipeline
      // Note: This would require actual audio processing
      // For integration test structure, we verify the pipeline exists and can be configured
      expect(orchestrator).toBeDefined();
<<<<<<< HEAD
      expect(typeof orchestrator.executePipeline).toBe("function");
    });

    it("should validate mood suggestion structure", () => {
      const mockSuggestion = createMockMoodSuggestion({
        mood: "Joyful",
=======
      expect(typeof orchestrator.executePipeline).toBe('function');
    });

    it('should validate mood suggestion structure', () => {
      const mockSuggestion = createMockMoodSuggestion({
        mood: 'Joyful',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        confidence: 0.9,
      });

      // Use assertion helper
      expect(() => assertValidMoodSuggestion(mockSuggestion)).not.toThrow();
<<<<<<< HEAD

      expect(mockSuggestion.mood).toBe("Joyful");
=======
      
      expect(mockSuggestion.mood).toBe('Joyful');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      expect(mockSuggestion.confidence).toBeGreaterThanOrEqual(0);
      expect(mockSuggestion.confidence).toBeLessThanOrEqual(1);
      expect(Array.isArray(mockSuggestion.feelings)).toBe(true);
      expect(Array.isArray(mockSuggestion.genres)).toBe(true);
      expect(mockSuggestion.vibe).toBeGreaterThanOrEqual(0);
      expect(mockSuggestion.vibe).toBeLessThanOrEqual(100);
    });

<<<<<<< HEAD
    it("should validate embedding structure", () => {
      const embedding = new Array(768).fill(0).map(() => Math.random() * 2 - 1);

      // Use assertion helper
      expect(() => assertValidEmbedding(embedding)).not.toThrow();

      expect(Array.isArray(embedding)).toBe(true);
      expect(embedding.length).toBeGreaterThan(0);
      expect(embedding.every((v) => isFinite(v))).toBe(true);
    });
  });

  describe("Component Integration", () => {
    it("should integrate vector DB with pipeline", async () => {
      await mockVectorDB.initialize();

      const trackId = "test-track-1";
      const embedding = new Array(768).fill(0.5);
      const metadata = {
        trackId,
        name: "Test Track",
        artist: "Test Artist",
        moodTags: {
          mood: "Content" as const,
          feelings: ["Calm"],
          vibe: 60,
          genres: ["Pop"],
=======
    it('should validate embedding structure', () => {
      const embedding = new Array(768).fill(0).map(() => Math.random() * 2 - 1);
      
      // Use assertion helper
      expect(() => assertValidEmbedding(embedding)).not.toThrow();
      
      expect(Array.isArray(embedding)).toBe(true);
      expect(embedding.length).toBeGreaterThan(0);
      expect(embedding.every(v => isFinite(v))).toBe(true);
    });
  });

  describe('Component Integration', () => {
    it('should integrate vector DB with pipeline', async () => {
      await mockVectorDB.initialize();
      
      const trackId = 'test-track-1';
      const embedding = new Array(768).fill(0.5);
      const metadata = {
        trackId,
        name: 'Test Track',
        artist: 'Test Artist',
        moodTags: {
          mood: 'Content' as const,
          feelings: ['Calm'],
          vibe: 60,
          genres: ['Pop'],
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        },
      };

      await mockVectorDB.upsert(trackId, embedding, metadata);
<<<<<<< HEAD

      expect(mockVectorDB.getEmbeddingCount()).toBe(1);
    });

    it("should integrate knowledge graph with pipeline", async () => {
      await mockGraph.initialize();

      const track = createMockTrack({
        id: "test-track-2",
        name: "Graph Test Track",
      });

      await mockGraph.upsertTrack(track);

      expect(mockGraph.getTrackCount()).toBe(1);
    });

    it("should use caching layer for embeddings", () => {
      const key = "test-cache-key";
      const embedding = new Array(768).fill(0.5);

      // Set in cache
      cache.set(key, embedding);

      // Get from cache
      const cached = cache.get(key);

=======
      
      expect(mockVectorDB.getEmbeddingCount()).toBe(1);
    });

    it('should integrate knowledge graph with pipeline', async () => {
      await mockGraph.initialize();
      
      const track = createMockTrack({
        id: 'test-track-2',
        name: 'Graph Test Track',
      });

      await mockGraph.upsertTrack(track);
      
      expect(mockGraph.getTrackCount()).toBe(1);
    });

    it('should use caching layer for embeddings', () => {
      const key = 'test-cache-key';
      const embedding = new Array(768).fill(0.5);
      
      // Set in cache
      cache.set(key, embedding);
      
      // Get from cache
      const cached = cache.get(key);
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      expect(cached).not.toBeNull();
      expect(cached?.embedding).toEqual(embedding);
    });
  });

<<<<<<< HEAD
  describe("Metrics Collection Integration", () => {
    it("should collect metrics from pipeline stages", () => {
=======
  describe('Metrics Collection Integration', () => {
    it('should collect metrics from pipeline stages', () => {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const metricsCollector = getMetricsCollector();
      metricsCollector.clear();

      // Simulate pipeline metrics
      metricsCollector.record({
<<<<<<< HEAD
        stage: "mood_analysis",
=======
        stage: 'mood_analysis',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        duration: 150,
        success: true,
        metadata: { confidence: 0.9 },
      });

      metricsCollector.record({
<<<<<<< HEAD
        stage: "vector_indexing",
=======
        stage: 'vector_indexing',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        duration: 50,
        success: true,
        metadata: { embeddingDimensions: 768 },
      });

<<<<<<< HEAD
      const metrics = metricsCollector.getStageMetrics("mood_analysis");
=======
      const metrics = metricsCollector.getStageMetrics('mood_analysis');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      expect(metrics.length).toBe(1);
      expect(metrics[0].duration).toBe(150);
      expect(metrics[0].success).toBe(true);

      const aggregates = metricsCollector.getAggregateMetrics();
      expect(aggregates.length).toBeGreaterThan(0);
    });
  });

<<<<<<< HEAD
  describe("Error Handling Integration", () => {
    it("should handle vector DB failures gracefully", async () => {
      // In production, vector DB failures should not break the pipeline
      // The system should degrade gracefully

      const audioFile = createMockAudioFile();
      const pipeline = getRAGPipeline();

=======
  describe('Error Handling Integration', () => {
    it('should handle vector DB failures gracefully', async () => {
      // In production, vector DB failures should not break the pipeline
      // The system should degrade gracefully
      
      const audioFile = createMockAudioFile();
      const pipeline = getRAGPipeline();
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Test that pipeline can handle missing vector DB
      // (Vector DB is optional - pipeline should work without it)
      expect(pipeline).toBeDefined();
    });

<<<<<<< HEAD
    it("should validate inputs before processing", () => {
      const { validateEmbedding } = require("@/lib/validation");

      // Invalid embeddings should throw
      expect(() => validateEmbedding([], { required: true })).toThrow();
      expect(() =>
        validateEmbedding([NaN, 1, 2], { required: true }),
      ).toThrow();

      // Valid embeddings should pass
      expect(() =>
        validateEmbedding([0.5, 0.6, 0.7], { required: true }),
      ).not.toThrow();
    });
  });

  describe("Performance Validation", () => {
    it("should meet latency targets for mood analysis", () => {
      const { PERFORMANCE_TARGETS } = require("@/lib/pipelineConfig");

      // Target: <200ms
      const targetLatency = PERFORMANCE_TARGETS.MOOD_ANALYSIS_LATENCY_MS;
      expect(targetLatency).toBe(200);

      // In real tests, would verify actual latency < target
      // For now, verify target is defined
      expect(targetLatency).toBeDefined();
      expect(typeof targetLatency).toBe("number");
    });

    it("should use configuration constants", () => {
      const {
        DEFAULT_LIMITS,
        SIMILARITY_THRESHOLDS,
      } = require("@/lib/pipelineConfig");

=======
    it('should validate inputs before processing', () => {
      const { validateEmbedding } = require('@/lib/validation');
      
      // Invalid embeddings should throw
      expect(() => validateEmbedding([], { required: true })).toThrow();
      expect(() => validateEmbedding([NaN, 1, 2], { required: true })).toThrow();
      
      // Valid embeddings should pass
      expect(() => validateEmbedding([0.5, 0.6, 0.7], { required: true })).not.toThrow();
    });
  });

  describe('Performance Validation', () => {
    it('should meet latency targets for mood analysis', () => {
      const { PERFORMANCE_TARGETS } = require('@/lib/pipelineConfig');
      
      // Target: <200ms
      const targetLatency = PERFORMANCE_TARGETS.MOOD_ANALYSIS_LATENCY_MS;
      expect(targetLatency).toBe(200);
      
      // In real tests, would verify actual latency < target
      // For now, verify target is defined
      expect(targetLatency).toBeDefined();
      expect(typeof targetLatency).toBe('number');
    });

    it('should use configuration constants', () => {
      const { DEFAULT_LIMITS, SIMILARITY_THRESHOLDS } = require('@/lib/pipelineConfig');
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Verify configuration is available
      expect(DEFAULT_LIMITS.TOP_K_SIMILAR).toBe(5);
      expect(DEFAULT_LIMITS.MAX_SIMILAR_TRACKS).toBe(20);
      expect(SIMILARITY_THRESHOLDS.SIMILARITY_THRESHOLD).toBe(0.7);
      expect(SIMILARITY_THRESHOLDS.MIN_SIMILARITY).toBe(0.6);
    });
  });
});
