/**
 * Similarity Matching Algorithm for Mood-Based Track Recommendations
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * This module implements hybrid similarity matching combining:
 * - Vector similarity (cosine similarity on embeddings)
 * - Graph-based similarity (Neo4j path traversals)
 * - Feature-based similarity (audio features)
 * - Collaborative filtering (user behavior)
<<<<<<< HEAD
 *
 * Target: >90% recall/precision for mood-based recommendations
 */

import { Track } from "@/types/track";
import { MoodTags, MoodState } from "@/types/mood";
import { AudioFeatures } from "./aiMoodAnalysis";
import { Neo4jKnowledgeGraph } from "./knowledgeGraph";
import { DEFAULT_LIMITS, SIMILARITY_THRESHOLDS } from "./pipelineConfig";
=======
 * 
 * Target: >90% recall/precision for mood-based recommendations
 */

import { Track } from '@/types/track';
import { MoodTags, MoodState } from '@/types/mood';
import { AudioFeatures } from './aiMoodAnalysis';
import { Neo4jKnowledgeGraph } from './knowledgeGraph';
import { DEFAULT_LIMITS, SIMILARITY_THRESHOLDS } from './pipelineConfig';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

/**
 * Similarity Match Result
 */
export interface SimilarityMatch {
  track: Track;
  overallSimilarity: number; // 0-1
  vectorSimilarity: number;
  graphSimilarity: number;
  featureSimilarity: number;
  collaborativeSimilarity: number;
  breakdown: {
    moodMatch: number;
    vibeMatch: number;
    genreMatch: number;
    feelingMatch: number;
  };
}

/**
 * Similarity Matching Engine
 */
export class SimilarityMatchingEngine {
  private knowledgeGraph: Neo4jKnowledgeGraph | null = null;
  private weights: SimilarityWeights;

  constructor(
    knowledgeGraph?: Neo4jKnowledgeGraph,
<<<<<<< HEAD
    weights?: Partial<SimilarityWeights>,
=======
    weights?: Partial<SimilarityWeights>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ) {
    this.knowledgeGraph = knowledgeGraph || null;
    this.weights = {
      vector: 0.35,
      graph: 0.25,
      feature: 0.25,
      collaborative: 0.15,
      ...weights,
    };
  }

  /**
   * Find similar tracks using hybrid similarity matching
   */
  async findSimilarTracks(
    sourceTrack: Track,
<<<<<<< HEAD
    options: SimilarityMatchOptions = {},
=======
    options: SimilarityMatchOptions = {}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ): Promise<SimilarityMatch[]> {
    const {
      limit = DEFAULT_LIMITS.MAX_SIMILAR_TRACKS,
      minSimilarity = SIMILARITY_THRESHOLDS.MIN_SIMILARITY,
      includeVectorSimilarity = true,
      includeGraphSimilarity = true,
      includeFeatureSimilarity = true,
      includeCollaborativeSimilarity = false,
      userId,
    } = options;

    const matches: SimilarityMatch[] = [];

    // Step 1: Vector similarity search (from vector database)
    let vectorMatches: Array<{ track: Track; similarity: number }> = [];
    if (includeVectorSimilarity) {
      vectorMatches = await this.findVectorSimilar(sourceTrack);
    }

    // Step 2: Graph-based similarity (from Neo4j)
    let graphMatches: Array<{ track: Track; similarity: number }> = [];
    if (includeGraphSimilarity && this.knowledgeGraph) {
      graphMatches = await this.findGraphSimilar(sourceTrack, limit * 2);
    }

    // Step 3: Feature-based similarity (audio features)
    let featureMatches: Array<{ track: Track; similarity: number }> = [];
    if (includeFeatureSimilarity) {
      featureMatches = await this.findFeatureSimilar(sourceTrack, limit * 2);
    }

    // Step 4: Collaborative filtering (user behavior)
    let collaborativeMatches: Array<{ track: Track; similarity: number }> = [];
    if (includeCollaborativeSimilarity && userId && this.knowledgeGraph) {
      collaborativeMatches = await this.findCollaborativeSimilar(
        sourceTrack,
        userId,
<<<<<<< HEAD
        limit * 2,
=======
        limit * 2
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }

    // Step 5: Combine all similarity sources
    const combinedMatches = this.combineSimilaritySources({
      vector: vectorMatches,
      graph: graphMatches,
      feature: featureMatches,
      collaborative: collaborativeMatches,
    });

    // Step 6: Calculate detailed similarity for each match
    for (const match of combinedMatches.slice(0, limit * 3)) {
      const similarity = await this.calculateDetailedSimilarity(
        sourceTrack,
<<<<<<< HEAD
        match.track,
=======
        match.track
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );

      if (similarity.overallSimilarity >= minSimilarity) {
        matches.push(similarity);
      }
    }

    // Step 7: Sort by overall similarity and return top results
    matches.sort((a, b) => b.overallSimilarity - a.overallSimilarity);

    return matches.slice(0, limit);
  }

  /**
   * Find similar tracks using vector similarity
   */
  private async findVectorSimilar(
<<<<<<< HEAD
    sourceTrack: Track,
=======
    sourceTrack: Track
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ): Promise<Array<{ track: Track; similarity: number }>> {
    // In production, query vector database with track embedding
    // For now, return empty array (will be populated by vector DB integration)
    return [];
  }

  /**
   * Find similar tracks using graph traversal
   */
  private async findGraphSimilar(
    sourceTrack: Track,
<<<<<<< HEAD
    limit: number,
=======
    limit: number
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ): Promise<Array<{ track: Track; similarity: number }>> {
    if (!this.knowledgeGraph) {
      return [];
    }

    try {
      const similarTracks = await this.knowledgeGraph.findSimilarTracks(
        sourceTrack.id,
<<<<<<< HEAD
        { limit, minSimilarity: 0.5, includeMoodMatches: true },
=======
        { limit, minSimilarity: 0.5, includeMoodMatches: true }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );

      return similarTracks.map(({ track, similarity }) => ({
        track: track as Track,
        similarity,
      }));
    } catch (error) {
<<<<<<< HEAD
      console.error("Error in graph similarity search:", error);
=======
      console.error('Error in graph similarity search:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      return [];
    }
  }

  /**
   * Find similar tracks using audio feature similarity
   */
  private async findFeatureSimilar(
    sourceTrack: Track,
<<<<<<< HEAD
    limit: number,
=======
    limit: number
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ): Promise<Array<{ track: Track; similarity: number }>> {
    // In production, compare audio features with database of features
    // For now, use mock data or query from database
    return [];
  }

  /**
   * Find similar tracks using collaborative filtering
   */
  private async findCollaborativeSimilar(
    sourceTrack: Track,
    userId: string,
<<<<<<< HEAD
    limit: number,
=======
    limit: number
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ): Promise<Array<{ track: Track; similarity: number }>> {
    if (!this.knowledgeGraph) {
      return [];
    }

    try {
<<<<<<< HEAD
      const recommendations =
        await this.knowledgeGraph.getPersonalizedRecommendations(userId, {
          limit,
          useCollaborativeFiltering: true,
        });

      return recommendations.map((track) => ({
=======
      const recommendations = await this.knowledgeGraph.getPersonalizedRecommendations(
        userId,
        { limit, useCollaborativeFiltering: true }
      );

      return recommendations.map(track => ({
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        track,
        similarity: SIMILARITY_THRESHOLDS.SIMILARITY_THRESHOLD, // Default collaborative similarity
      }));
    } catch (error) {
<<<<<<< HEAD
      console.error("Error in collaborative similarity search:", error);
=======
      console.error('Error in collaborative similarity search:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      return [];
    }
  }

  /**
   * Combine similarity sources into unified match list
   */
  private combineSimilaritySources(sources: {
    vector: Array<{ track: Track; similarity: number }>;
    graph: Array<{ track: Track; similarity: number }>;
    feature: Array<{ track: Track; similarity: number }>;
    collaborative: Array<{ track: Track; similarity: number }>;
  }): Array<{ track: Track; similarities: Record<string, number> }> {
<<<<<<< HEAD
    const trackMap = new Map<
      string,
      { track: Track; similarities: Record<string, number> }
    >();
=======
    const trackMap = new Map<string, { track: Track; similarities: Record<string, number> }>();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

    // Add vector matches
    for (const match of sources.vector) {
      const existing = trackMap.get(match.track.id);
      if (existing) {
        existing.similarities.vector = match.similarity;
      } else {
        trackMap.set(match.track.id, {
          track: match.track,
          similarities: { vector: match.similarity },
        });
      }
    }

    // Add graph matches
    for (const match of sources.graph) {
      const existing = trackMap.get(match.track.id);
      if (existing) {
        existing.similarities.graph = match.similarity;
      } else {
        trackMap.set(match.track.id, {
          track: match.track,
          similarities: { graph: match.similarity },
        });
      }
    }

    // Add feature matches
    for (const match of sources.feature) {
      const existing = trackMap.get(match.track.id);
      if (existing) {
        existing.similarities.feature = match.similarity;
      } else {
        trackMap.set(match.track.id, {
          track: match.track,
          similarities: { feature: match.similarity },
        });
      }
    }

    // Add collaborative matches
    for (const match of sources.collaborative) {
      const existing = trackMap.get(match.track.id);
      if (existing) {
        existing.similarities.collaborative = match.similarity;
      } else {
        trackMap.set(match.track.id, {
          track: match.track,
          similarities: { collaborative: match.similarity },
        });
      }
    }

    return Array.from(trackMap.values());
  }

  /**
   * Calculate detailed similarity between two tracks
   */
  async calculateDetailedSimilarity(
    track1: Track,
<<<<<<< HEAD
    track2: Track,
=======
    track2: Track
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ): Promise<SimilarityMatch> {
    // Vector similarity (if available)
    const vectorSimilarity = 0; // Would be calculated from embeddings

    // Graph similarity
    let graphSimilarity = 0;
    if (this.knowledgeGraph) {
      try {
        graphSimilarity = await this.knowledgeGraph.calculateTrackSimilarity(
          track1.id,
<<<<<<< HEAD
          track2.id,
        );
      } catch (error) {
        console.error("Error calculating graph similarity:", error);
=======
          track2.id
        );
      } catch (error) {
        console.error('Error calculating graph similarity:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      }
    }

    // Feature similarity
    const featureSimilarity = this.calculateFeatureSimilarity(track1, track2);

    // Collaborative similarity (default if no user context)
    const collaborativeSimilarity = 0;

    // Mood tag breakdown
<<<<<<< HEAD
    const breakdown = this.calculateMoodTagBreakdown(
      track1.moodTags,
      track2.moodTags,
    );
=======
    const breakdown = this.calculateMoodTagBreakdown(track1.moodTags, track2.moodTags);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

    // Weighted overall similarity
    const overallSimilarity =
      vectorSimilarity * this.weights.vector +
      graphSimilarity * this.weights.graph +
      featureSimilarity * this.weights.feature +
      collaborativeSimilarity * this.weights.collaborative;

    return {
      track: track2,
      overallSimilarity,
      vectorSimilarity,
      graphSimilarity,
      featureSimilarity,
      collaborativeSimilarity,
      breakdown,
    };
  }

  /**
   * Calculate feature-based similarity between tracks
   */
  private calculateFeatureSimilarity(track1: Track, track2: Track): number {
    // Simplified feature similarity based on mood tags
    // In production, use actual audio features
    const moodMatch = track1.moodTags.mood === track2.moodTags.mood ? 1.0 : 0.0;
<<<<<<< HEAD

    const vibeDiff = Math.abs(track1.moodTags.vibe - track2.moodTags.vibe);
    const vibeMatch = 1 - vibeDiff / 100; // Normalize to 0-1

    const genreIntersection = track1.moodTags.genres.filter((g) =>
      track2.moodTags.genres.includes(g),
=======
    
    const vibeDiff = Math.abs(track1.moodTags.vibe - track2.moodTags.vibe);
    const vibeMatch = 1 - vibeDiff / 100; // Normalize to 0-1

    const genreIntersection = track1.moodTags.genres.filter(g =>
      track2.moodTags.genres.includes(g)
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    ).length;
    const genreUnion = new Set([
      ...track1.moodTags.genres,
      ...track2.moodTags.genres,
    ]).size;
    const genreMatch = genreUnion > 0 ? genreIntersection / genreUnion : 0;

<<<<<<< HEAD
    const feelingIntersection = track1.moodTags.feelings.filter((f) =>
      track2.moodTags.feelings.includes(f),
=======
    const feelingIntersection = track1.moodTags.feelings.filter(f =>
      track2.moodTags.feelings.includes(f)
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    ).length;
    const feelingUnion = new Set([
      ...track1.moodTags.feelings,
      ...track2.moodTags.feelings,
    ]).size;
<<<<<<< HEAD
    const feelingMatch =
      feelingUnion > 0 ? feelingIntersection / feelingUnion : 0;
=======
    const feelingMatch = feelingUnion > 0 ? feelingIntersection / feelingUnion : 0;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

    // Weighted combination
    return (
      moodMatch * 0.3 +
      vibeMatch * 0.25 +
      genreMatch * 0.25 +
      feelingMatch * 0.2
    );
  }

  /**
   * Calculate mood tag breakdown similarity
   */
  private calculateMoodTagBreakdown(
    tags1: MoodTags,
<<<<<<< HEAD
    tags2: MoodTags,
  ): SimilarityMatch["breakdown"] {
=======
    tags2: MoodTags
  ): SimilarityMatch['breakdown'] {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    const moodMatch = tags1.mood === tags2.mood ? 1.0 : 0.0;

    const vibeDiff = Math.abs(tags1.vibe - tags2.vibe);
    const vibeMatch = 1 - vibeDiff / 100;

<<<<<<< HEAD
    const genreIntersection = tags1.genres.filter((g) =>
      tags2.genres.includes(g),
    ).length;
    const genreUnion = new Set([...tags1.genres, ...tags2.genres]).size;
    const genreMatch = genreUnion > 0 ? genreIntersection / genreUnion : 0;

    const feelingIntersection = tags1.feelings.filter((f) =>
      tags2.feelings.includes(f),
    ).length;
    const feelingUnion = new Set([...tags1.feelings, ...tags2.feelings]).size;
    const feelingMatch =
      feelingUnion > 0 ? feelingIntersection / feelingUnion : 0;
=======
    const genreIntersection = tags1.genres.filter(g => tags2.genres.includes(g)).length;
    const genreUnion = new Set([...tags1.genres, ...tags2.genres]).size;
    const genreMatch = genreUnion > 0 ? genreIntersection / genreUnion : 0;

    const feelingIntersection = tags1.feelings.filter(f => tags2.feelings.includes(f)).length;
    const feelingUnion = new Set([...tags1.feelings, ...tags2.feelings]).size;
    const feelingMatch = feelingUnion > 0 ? feelingIntersection / feelingUnion : 0;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

    return {
      moodMatch,
      vibeMatch,
      genreMatch,
      feelingMatch,
    };
  }

  /**
   * Find tracks matching mood criteria
   */
  async findMoodMatches(
    moodCriteria: {
      mood?: MoodState;
      vibeRange?: { min: number; max: number };
      feelings?: string[];
      genres?: string[];
    },
<<<<<<< HEAD
    options: { limit?: number } = {},
=======
    options: { limit?: number } = {}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  ): Promise<Track[]> {
    if (!this.knowledgeGraph) {
      return [];
    }

    const limit = options.limit || DEFAULT_LIMITS.MAX_RECOMMENDATIONS;

    try {
      const tracks = await this.knowledgeGraph.findTracksByMood(
<<<<<<< HEAD
        moodCriteria.mood || "Content",
=======
        moodCriteria.mood || 'Content',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        {
          limit,
          includeFeelings: moodCriteria.feelings,
          vibeRange: moodCriteria.vibeRange,
<<<<<<< HEAD
        },
=======
        }
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );

      // Filter by additional criteria
      let filtered = tracks;

      if (moodCriteria.genres && moodCriteria.genres.length > 0) {
<<<<<<< HEAD
        filtered = filtered.filter((track) =>
          moodCriteria.genres!.some((g) => track.moodTags?.genres?.includes(g)),
=======
        filtered = filtered.filter(track =>
          moodCriteria.genres!.some(g => track.moodTags?.genres?.includes(g))
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        );
      }

      return filtered.slice(0, limit);
    } catch (error) {
<<<<<<< HEAD
      console.error("Error finding mood matches:", error);
=======
      console.error('Error finding mood matches:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      return [];
    }
  }
}

/**
 * Similarity Weights Configuration
 */
export interface SimilarityWeights {
  vector: number; // Vector similarity weight (0-1)
  graph: number; // Graph similarity weight (0-1)
  feature: number; // Feature similarity weight (0-1)
  collaborative: number; // Collaborative similarity weight (0-1)
}

/**
 * Similarity Match Options
 */
export interface SimilarityMatchOptions {
  limit?: number;
  minSimilarity?: number;
  includeVectorSimilarity?: boolean;
  includeGraphSimilarity?: boolean;
  includeFeatureSimilarity?: boolean;
  includeCollaborativeSimilarity?: boolean;
  userId?: string;
}

/**
 * Export singleton instance
 */
let matchingEngineInstance: SimilarityMatchingEngine | null = null;

export function getSimilarityMatchingEngine(
  knowledgeGraph?: Neo4jKnowledgeGraph,
<<<<<<< HEAD
  weights?: Partial<SimilarityWeights>,
): SimilarityMatchingEngine {
  if (!matchingEngineInstance) {
    matchingEngineInstance = new SimilarityMatchingEngine(
      knowledgeGraph,
      weights,
    );
  }
  return matchingEngineInstance;
}
=======
  weights?: Partial<SimilarityWeights>
): SimilarityMatchingEngine {
  if (!matchingEngineInstance) {
    matchingEngineInstance = new SimilarityMatchingEngine(knowledgeGraph, weights);
  }
  return matchingEngineInstance;
}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
