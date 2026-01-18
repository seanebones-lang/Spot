/**
 * Test Utilities for RAG Pipeline Testing
 * Mock helpers and test utilities for RAG/pipeline system
 */

import { AIMoodSuggestion } from '@/types/mood';
import { Track } from '@/types/track';

/**
 * Mock audio file for testing
 */
export function createMockAudioFile(
  name: string = 'test-audio.mp3',
  size: number = 1024 * 1024, // 1MB
  type: string = 'audio/mpeg'
): File {
  // Create a mock File object
  const blob = new Blob(['mock audio data'], { type });
  const file = new File([blob], name, { type });
  
  // Mock File properties
  Object.defineProperty(file, 'size', { value: size });
  Object.defineProperty(file, 'type', { value: type });
  
  return file;
}

/**
 * Mock audio features for testing
 */
export function createMockAudioFeatures(): any {
  return {
    tempo: 120,
    duration: 180, // 3 minutes
    beatStrength: 70,
    spectralCentroid: 3000,
    spectralRolloff: 5000,
    spectralFlux: 50,
    zeroCrossingRate: 100,
    mfcc: new Array(13).fill(0).map(() => Math.random() * 10 - 5),
    rmsEnergy: 0.5,
    energyEntropy: 3.5,
    harmony: 0.7,
    inharmonicity: 0.3,
    brightness: 0.6,
    roughness: 0.4,
  };
}

/**
 * Mock mood suggestion for testing
 */
export function createMockMoodSuggestion(
  overrides: Partial<AIMoodSuggestion> = {}
): AIMoodSuggestion {
  return {
    mood: 'Content',
    feelings: ['Calm', 'Focused'],
    vibe: 60,
    genres: ['Pop', 'Electronic'],
    confidence: 0.85,
    embedding: new Array(768).fill(0).map(() => Math.random() * 2 - 1),
    ...overrides,
  };
}

/**
 * Mock track for testing
 */
export function createMockTrack(overrides: Partial<Track> = {}): Track {
  return {
    id: 'test-track-1',
    name: 'Test Track',
    artist: 'Test Artist',
    artistId: 'test-artist-1',
    album: 'Test Album',
    albumId: 'test-album-1',
    duration: 180,
    moodTags: {
      mood: 'Content',
      feelings: ['Calm', 'Focused'],
      vibe: 60,
      genres: ['Pop', 'Electronic'],
    },
    ...overrides,
  } as Track;
}

/**
 * Mock Pinecone vector DB for testing
 */
export class MockPineconeVectorDB {
  private embeddings: Map<string, { embedding: number[]; metadata: any }> = new Map();

  async initialize(): Promise<void> {
    // Mock initialization
  }

  async similaritySearch(
    embedding: number[],
    options: { topK: number }
  ): Promise<Array<{ trackId: string; similarity: number; moodTags?: any }>> {
    // Mock similarity search - return random similar tracks
    const results: Array<{ trackId: string; similarity: number; moodTags?: any }> = [];
    
    for (let i = 0; i < Math.min(options.topK, this.embeddings.size); i++) {
      results.push({
        trackId: `track-${i}`,
        similarity: 0.8 - (i * 0.1), // Decreasing similarity
        moodTags: {
          mood: 'Content',
          feelings: ['Calm'],
          vibe: 60,
          genres: ['Pop'],
        },
      });
    }
    
    return results;
  }

  async upsert(trackId: string, embedding: number[], metadata: any): Promise<void> {
    this.embeddings.set(trackId, { embedding, metadata });
  }

  async cleanup(): Promise<void> {
    this.embeddings.clear();
  }

  getEmbeddingCount(): number {
    return this.embeddings.size;
  }
}

/**
 * Mock Neo4j knowledge graph for testing
 */
export class MockNeo4jKnowledgeGraph {
  private tracks: Map<string, Track> = new Map();
  private relationships: Map<string, Set<string>> = new Map();

  async initialize(): Promise<void> {
    // Mock initialization
  }

  async createSchema(): Promise<void> {
    // Mock schema creation
  }

  async upsertTrack(track: Track): Promise<void> {
    this.tracks.set(track.id, track);
  }

  async findSimilarTracks(
    trackId: string,
    options: { limit?: number; minSimilarity?: number } = {}
  ): Promise<Array<{ track: Track; similarity: number }>> {
    const limit = options.limit || 10;
    const results: Array<{ track: Track; similarity: number }> = [];
    
    for (const [id, track] of this.tracks.entries()) {
      if (id !== trackId && results.length < limit) {
        results.push({
          track,
          similarity: 0.7 + Math.random() * 0.2, // 0.7-0.9
        });
      }
    }
    
    return results;
  }

  async cleanup(): Promise<void> {
    this.tracks.clear();
    this.relationships.clear();
  }

  getTrackCount(): number {
    return this.tracks.size;
  }
}

/**
 * Mock metrics collector for testing
 */
export class MockMetricsCollector {
  private metrics: any[] = [];

  record(metric: any): void {
    this.metrics.push(metric);
  }

  getMetrics(): any[] {
    return this.metrics;
  }

  getStageMetrics(stage: string): any[] {
    return this.metrics.filter(m => m.stage === stage);
  }

  clear(): void {
    this.metrics = [];
  }
}

/**
 * Wait for async operations (for testing)
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Assert embedding is valid
 */
export function assertValidEmbedding(embedding: number[] | undefined): void {
  if (!embedding) {
    throw new Error('Embedding is undefined');
  }
  if (!Array.isArray(embedding)) {
    throw new Error('Embedding must be an array');
  }
  if (embedding.length === 0) {
    throw new Error('Embedding is empty');
  }
  if (embedding.some(v => !isFinite(v))) {
    throw new Error('Embedding contains NaN or Infinity');
  }
}

/**
 * Assert mood suggestion is valid
 */
export function assertValidMoodSuggestion(suggestion: AIMoodSuggestion): void {
  if (!suggestion) {
    throw new Error('Mood suggestion is undefined');
  }
  if (!suggestion.mood) {
    throw new Error('Mood is missing');
  }
  if (!Array.isArray(suggestion.feelings)) {
    throw new Error('Feelings must be an array');
  }
  if (typeof suggestion.vibe !== 'number' || suggestion.vibe < 0 || suggestion.vibe > 100) {
    throw new Error('Vibe must be a number between 0 and 100');
  }
  if (!Array.isArray(suggestion.genres)) {
    throw new Error('Genres must be an array');
  }
  if (typeof suggestion.confidence !== 'number' || suggestion.confidence < 0 || suggestion.confidence > 1) {
    throw new Error('Confidence must be a number between 0 and 1');
  }
}
