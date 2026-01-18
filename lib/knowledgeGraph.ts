/**
 * Knowledge Graph System for Music Recommendation
 * 
 * This module implements a Neo4j-based knowledge graph for track relationships,
 * mood-based similarity, and user preference graphs for intelligent recommendations.
 * 
 * Graph Schema:
 * - Nodes: Track, Artist, Album, User, Mood, Genre, Feeling
 * - Relationships: SIMILAR_TO, MOOD_MATCHES, LIKES, LISTENED_TO, SIMILAR_MOOD,
 *   COLLABORATES_WITH, CONTAINS, BELONGS_TO
 * 
 * Use Cases:
 * - Find similar tracks based on mood
 * - Discover tracks via graph traversals
 * - User preference modeling
 * - Collaborative filtering with graph structure
 */

import { Track } from '@/types/track';
import { MoodState, MoodTags } from '@/types/mood';
import { SIMILARITY_THRESHOLDS, DEFAULT_LIMITS, NEO4J_CONFIG } from './pipelineConfig';

/**
 * Neo4j Knowledge Graph Manager
 */
export class Neo4jKnowledgeGraph {
  private driver: any; // Neo4jDriver from types/pipeline.ts
  private uri: string;
  private user: string;
  private password: string;

  constructor(uri: string, user: string, password: string) {
    this.uri = uri;
    this.user = user;
    this.password = password;
  }

  /**
   * Initialize Neo4j connection
   */
  async initialize(): Promise<void> {
    try {
      // Import Neo4j driver (dynamic import for browser compatibility)
      const neo4j = await import('neo4j-driver');
      
      // Create driver instance
      this.driver = neo4j.driver(
        this.uri,
        neo4j.auth.basic(this.user, this.password),
        {
          maxConnectionPoolSize: NEO4J_CONFIG.MAX_POOL_SIZE,
          connectionAcquisitionTimeout: NEO4J_CONFIG.CONNECTION_TIMEOUT_MS,
        }
      );

      // Verify connectivity
      await this.driver.verifyConnectivity();
      
      // Note: Sessions are created per-query in executeCypher() for proper cleanup
      // No need to store a session instance here
      
      console.log('✅ Neo4j Knowledge Graph initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Neo4j:', error);
      throw error;
    }
  }

  /**
   * Create graph schema (constraints and indexes)
   */
  async createSchema(): Promise<void> {
    const schemaQueries = [
      // Constraints
      'CREATE CONSTRAINT track_id IF NOT EXISTS FOR (t:Track) REQUIRE t.id IS UNIQUE',
      'CREATE CONSTRAINT artist_id IF NOT EXISTS FOR (a:Artist) REQUIRE a.id IS UNIQUE',
      'CREATE CONSTRAINT user_id IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE',
      'CREATE CONSTRAINT mood_name IF NOT EXISTS FOR (m:Mood) REQUIRE m.name IS UNIQUE',
      
      // Indexes for performance
      'CREATE INDEX track_mood IF NOT EXISTS FOR (t:Track) ON (t.mood)',
      'CREATE INDEX track_genre IF NOT EXISTS FOR (t:Track) ON (t.genre)',
      'CREATE INDEX track_vibe IF NOT EXISTS FOR (t:Track) ON (t.vibe)',
    ];

    for (const query of schemaQueries) {
      try {
        await this.executeCypher(query);
        console.log(`📊 Schema created: ${query.substring(0, 60)}...`);
      } catch (error) {
        // Schema may already exist, log but don't fail
        console.warn(`⚠️ Schema creation warning (may already exist): ${query.substring(0, 60)}...`);
      }
    }
  }

  /**
   * Create or update track node
   * Uses transaction for atomic multi-query operation
   */
  async upsertTrack(track: Track): Promise<void> {
    if (!this.driver) {
      throw new Error('Neo4j driver not initialized. Call initialize() first.');
    }

    const query = `
      MERGE (t:Track {id: $trackId})
      SET t.name = $name,
          t.artist = $artist,
          t.artistId = $artistId,
          t.album = $album,
          t.albumId = $albumId,
          t.duration = $duration,
          t.mood = $mood,
          t.vibe = $vibe,
          t.genres = $genres,
          t.feelings = $feelings,
          t.genre = $genre,
          t.format = $format,
          t.quality = $quality,
          t.releaseDate = $releaseDate,
          t.isrc = $isrc,
          t.updatedAt = datetime()
      
      // Create mood relationships
      MERGE (m:Mood {name: $mood})
      MERGE (t)-[:HAS_MOOD]->(m)
      
      // Create genre relationships
      FOREACH (genre IN $genres |
        MERGE (g:Genre {name: genre})
        MERGE (t)-[:HAS_GENRE]->(g)
      )
      
      // Create feeling relationships
      FOREACH (feeling IN $feelings |
        MERGE (f:Feeling {name: feeling})
        MERGE (t)-[:HAS_FEELING]->(f)
      )
      
      // Create artist relationship
      MERGE (a:Artist {id: $artistId})
      SET a.name = $artist
      MERGE (t)-[:CREATED_BY]->(a)
      
      // Create album relationship
      MERGE (alb:Album {id: $albumId})
      SET alb.name = $album
      MERGE (t)-[:BELONGS_TO]->(alb)
    `;

    const parameters = {
      trackId: track.id,
      name: track.name,
      artist: track.artist,
      artistId: track.artistId,
      album: track.album,
      albumId: track.albumId,
      duration: track.duration,
      mood: track.moodTags.mood,
      vibe: track.moodTags.vibe,
      genres: track.moodTags.genres,
      feelings: track.moodTags.feelings,
      genre: track.genre || null,
      format: track.format || null,
      quality: track.quality || null,
      releaseDate: track.releaseDate || null,
      isrc: track.isrc || null,
    };

    // Use transaction for atomic operation (single query already atomic, but explicit transaction adds safety)
    const { withRetry } = await import('./retry');
    const { withTimeout, TIMEOUTS } = await import('./timeout');

    await withRetry(
      async () => {
        const session = this.driver!.session();
        try {
          // Single MERGE query is already atomic in Neo4j, but we can use explicit transaction for clarity
          const result = await withTimeout(
            session.run(query, parameters),
            TIMEOUTS.DATABASE_QUERY,
            'Neo4j upsert track timeout'
          );
          return result;
        } finally {
          await session.close();
        }
      },
      {
        maxRetries: 2,
        initialDelayMs: 500,
        retryableErrors: ['timeout', 'ECONNRESET', 'ServiceUnavailable'],
      }
    ).catch((error) => {
      console.error(`❌ Failed to upsert track ${track.id}:`, error);
      throw error;
    });

    console.log(`📊 Upserted track: ${track.id}`);
  }

  /**
   * Create similarity relationships between tracks
   * Uses cosine similarity on mood embeddings
   */
  async createSimilarityRelationships(
    trackId: string,
    similarTracks: Array<{ trackId: string; similarity: number }>,
    threshold: number = SIMILARITY_THRESHOLDS.SIMILARITY_THRESHOLD
  ): Promise<void> {
    for (const similar of similarTracks) {
      if (similar.similarity >= threshold) {
        const query = `
          MATCH (t1:Track {id: $trackId})
          MATCH (t2:Track {id: $similarTrackId})
          MERGE (t1)-[r:SIMILAR_TO {
            similarity: $similarity,
            createdAt: datetime()
          }]-(t2)
          SET r.weight = $similarity
        `;

        const parameters = {
          trackId,
          similarTrackId: similar.trackId,
          similarity: similar.similarity,
        };

        await this.executeCypher(query, parameters);
      }
    }

    console.log(`📊 Created similarity relationships for track: ${trackId}`);
  }

  /**
   * Create mood-based similarity relationships
   * Connects tracks with similar mood profiles
   */
  async createMoodSimilarityRelationships(
    trackId: string,
    similarMoodTracks: Array<{ trackId: string; moodSimilarity: number }>,
    threshold: number = SIMILARITY_THRESHOLDS.MOOD_SIMILARITY_THRESHOLD
  ): Promise<void> {
    for (const similar of similarMoodTracks) {
      if (similar.moodSimilarity >= threshold) {
        const query = `
          MATCH (t1:Track {id: $trackId})
          MATCH (t2:Track {id: $similarTrackId})
          MERGE (t1)-[r:MOOD_MATCHES {
            similarity: $similarity,
            createdAt: datetime()
          }]-(t2)
          SET r.weight = $similarity
        `;

        const parameters = {
          trackId,
          similarTrackId: similar.trackId,
          similarity: similar.moodSimilarity,
        };

        await this.executeCypher(query, parameters);
      }
    }
  }

  /**
   * Find similar tracks via graph traversal
   * Uses Cypher queries to traverse relationships
   */
  async findSimilarTracks(
    trackId: string,
    options: {
      limit?: number;
      minSimilarity?: number;
      includeMoodMatches?: boolean;
    } = {}
  ): Promise<Array<{ track: Track; similarity: number; path: string }>> {
    const limit = options.limit || DEFAULT_LIMITS.TOP_K_RECOMMENDATIONS;
    const minSimilarity = options.minSimilarity || SIMILARITY_THRESHOLDS.SIMILARITY_THRESHOLD;
    const includeMoodMatches = options.includeMoodMatches ?? true;

    let query = `
      MATCH (source:Track {id: $trackId})
      MATCH path = (source)-[r:SIMILAR_TO*1..2]-(similar:Track)
      WHERE similar.id <> $trackId
        AND ALL(rel IN relationships(path) WHERE rel.weight >= $minSimilarity)
      RETURN similar, 
             reduce(sim = 1.0, rel IN relationships(path) | sim * rel.weight) AS similarity,
             [node IN nodes(path) | node.id] AS path
      ORDER BY similarity DESC
      LIMIT $limit
    `;

    if (includeMoodMatches) {
      query = `
        MATCH (source:Track {id: $trackId})
        MATCH path = (source)-[r:SIMILAR_TO|MOOD_MATCHES*1..2]-(similar:Track)
        WHERE similar.id <> $trackId
          AND ALL(rel IN relationships(path) WHERE rel.weight >= $minSimilarity)
        RETURN similar, 
               reduce(sim = 1.0, rel IN relationships(path) | sim * rel.weight) AS similarity,
               [node IN nodes(path) | node.id] AS path
        ORDER BY similarity DESC
        LIMIT $limit
      `;
    }

    const parameters = {
      trackId,
      limit,
      minSimilarity,
    };

    const result = await this.executeCypher(query, parameters);
    return result.records.map((record: any) => ({
      track: record.get('similar').properties,
      similarity: record.get('similarity'),
      path: record.get('path'),
    }));
  }

  /**
   * Find tracks by mood using graph traversal
   */
  async findTracksByMood(
    mood: MoodState,
    options: {
      limit?: number;
      includeFeelings?: string[];
      vibeRange?: { min: number; max: number };
    } = {}
  ): Promise<Track[]> {
    const limit = options.limit || DEFAULT_LIMITS.MAX_RECOMMENDATIONS;
    let query = `
      MATCH (m:Mood {name: $mood})<-[:HAS_MOOD]-(t:Track)
    `;

    const parameters: any = { mood, limit };

    if (options.includeFeelings && options.includeFeelings.length > 0) {
      query += `
        MATCH (t)-[:HAS_FEELING]->(f:Feeling)
        WHERE f.name IN $feelings
      `;
      parameters.feelings = options.includeFeelings;
    }

    if (options.vibeRange) {
      query += `
        WHERE t.vibe >= $vibeMin AND t.vibe <= $vibeMax
      `;
      parameters.vibeMin = options.vibeRange.min;
      parameters.vibeMax = options.vibeRange.max;
    }

    query += `
      RETURN t
      ORDER BY t.vibe DESC
      LIMIT $limit
    `;

    const result = await this.executeCypher(query, parameters);
    return result.records.map((record: any) => record.get('t').properties);
  }

  /**
   * Create user preference graph
   */
  async createUserPreferences(
    userId: string,
    preferences: {
      likedTracks: string[];
      listenedTracks: string[];
      favoriteGenres: string[];
      favoriteMoods: MoodState[];
    }
  ): Promise<void> {
    // Create user node
    const userQuery = `
      MERGE (u:User {id: $userId})
      SET u.updatedAt = datetime()
    `;
    await this.executeCypher(userQuery, { userId });

    // Create LIKES relationships
    for (const trackId of preferences.likedTracks) {
      const likeQuery = `
        MATCH (u:User {id: $userId})
        MATCH (t:Track {id: $trackId})
        MERGE (u)-[r:LIKES {
          createdAt: datetime(),
          weight: 1.0
        }]->(t)
      `;
      await this.executeCypher(likeQuery, { userId, trackId });
    }

    // Create LISTENED_TO relationships
    for (const trackId of preferences.listenedTracks) {
      const listenQuery = `
        MATCH (u:User {id: $userId})
        MATCH (t:Track {id: $trackId})
        MERGE (u)-[r:LISTENED_TO {
          createdAt: datetime(),
          count: 1
        }]->(t)
        ON CREATE SET r.count = 1
        ON MATCH SET r.count = r.count + 1
      `;
      await this.executeCypher(listenQuery, { userId, trackId });
    }

    // Create genre preferences
    for (const genre of preferences.favoriteGenres) {
      const genreQuery = `
        MATCH (u:User {id: $userId})
        MERGE (g:Genre {name: $genre})
        MERGE (u)-[r:PREFERS_GENRE {
          weight: 1.0,
          createdAt: datetime()
        }]->(g)
      `;
      await this.executeCypher(genreQuery, { userId, genre });
    }

    // Create mood preferences
    for (const mood of preferences.favoriteMoods) {
      const moodQuery = `
        MATCH (u:User {id: $userId})
        MERGE (m:Mood {name: $mood})
        MERGE (u)-[r:PREFERS_MOOD {
          weight: 1.0,
          createdAt: datetime()
        }]->(m)
      `;
      await this.executeCypher(moodQuery, { userId, mood });
    }

    console.log(`📊 Created user preferences for user: ${userId}`);
  }

  /**
   * Get personalized recommendations using graph traversal
   */
  async getPersonalizedRecommendations(
    userId: string,
    options: {
      limit?: number;
      useCollaborativeFiltering?: boolean;
    } = {}
  ): Promise<Track[]> {
    const limit = options.limit || DEFAULT_LIMITS.MAX_RECOMMENDATIONS;
    const useCollaborativeFiltering = options.useCollaborativeFiltering ?? true;

    let query = `
      MATCH (u:User {id: $userId})
      MATCH (u)-[:LIKES|LISTENED_TO]->(liked:Track)
      MATCH (liked)-[:SIMILAR_TO|MOOD_MATCHES]->(recommended:Track)
      WHERE NOT (u)-[:LIKES|LISTENED_TO]->(recommended)
      RETURN recommended, 
             count(DISTINCT liked) AS recommendationStrength
      ORDER BY recommendationStrength DESC, recommended.vibe DESC
      LIMIT $limit
    `;

    if (useCollaborativeFiltering) {
      // Add collaborative filtering: find tracks liked by users with similar preferences
      query = `
        MATCH (u:User {id: $userId})
        MATCH (u)-[:LIKES]->(liked:Track)
        MATCH (liked)<-[:LIKES]-(similarUser:User)
        MATCH (similarUser)-[:LIKES]->(recommended:Track)
        WHERE NOT (u)-[:LIKES|LISTENED_TO]->(recommended)
        RETURN recommended, 
               count(DISTINCT similarUser) AS recommendationStrength
        ORDER BY recommendationStrength DESC, recommended.vibe DESC
        LIMIT $limit
      `;
    }

    const parameters = { userId, limit };

    const result = await this.executeCypher(query, parameters);
    return result.records.map((record: any) => record.get('recommended').properties);
  }

  /**
   * Calculate track similarity based on graph structure
   */
  async calculateTrackSimilarity(trackId1: string, trackId2: string): Promise<number> {
    const query = `
      MATCH (t1:Track {id: $trackId1})
      MATCH (t2:Track {id: $trackId2})
      
      // Direct similarity relationship
      OPTIONAL MATCH (t1)-[r:SIMILAR_TO]-(t2)
      
      // Mood similarity
      OPTIONAL MATCH (t1)-[:HAS_MOOD]->(m1:Mood)
      OPTIONAL MATCH (t2)-[:HAS_MOOD]->(m2:Mood)
      
      // Genre overlap
      OPTIONAL MATCH (t1)-[:HAS_GENRE]->(g1:Genre)
      OPTIONAL MATCH (t2)-[:HAS_GENRE]->(g2:Genre)
      
      RETURN 
        CASE WHEN r IS NOT NULL THEN r.weight ELSE 0 END AS directSimilarity,
        CASE WHEN m1 = m2 THEN 1.0 ELSE 0 END AS moodMatch,
        count(DISTINCT g1) + count(DISTINCT g2) AS genreOverlap
    `;

    const parameters = { trackId1, trackId2 };

    const result = await this.executeCypher(query, parameters);
    const record = result.records[0];
    
    if (!record) return 0;
    
    const directSimilarity = record.get('directSimilarity') || 0;
    const moodMatch = record.get('moodMatch') || 0;
    const genreOverlap = record.get('genreOverlap') || 0;
    
    // Weighted combination
    const similarity = (directSimilarity * 0.5) + (moodMatch * 0.3) + (Math.min(genreOverlap / 3, 1) * 0.2);
    
    return similarity;
  }

  /**
   * Execute Cypher query (helper method)
   * Includes retry logic and timeout protection
   */
  private async executeCypher(query: string, parameters?: any): Promise<any> {
    if (!this.driver) {
      throw new Error('Neo4j driver not initialized. Call initialize() first.');
    }

    // Import retry and timeout utilities
    const { withRetry } = await import('./retry');
    const { withTimeout, TIMEOUTS } = await import('./timeout');

    return withRetry(
      async () => {
        const session = this.driver.session();
        try {
          const result = await withTimeout(
            session.run(query, parameters),
            TIMEOUTS.DATABASE_QUERY,
            'Neo4j query timeout'
          );
          return result;
        } finally {
          await session.close();
        }
      },
      {
        maxRetries: 2,
        initialDelayMs: 500,
        retryableErrors: ['timeout', 'ECONNRESET', 'ServiceUnavailable'],
      }
    ).catch((error) => {
      console.error('❌ Cypher query failed:', error);
      console.error('Query:', query.substring(0, 200));
      throw error;
    });
  }

  /**
   * Cleanup Neo4j connection
   */
  async cleanup(): Promise<void> {
    if (this.driver) {
      await this.driver.close();
      this.driver = null;
    }
    console.log('🧹 Neo4j Knowledge Graph cleaned up');
  }
}

/**
 * Export singleton instance
 */
let graphInstance: Neo4jKnowledgeGraph | null = null;

export function getKnowledgeGraph(
  uri?: string,
  user?: string,
  password?: string
): Neo4jKnowledgeGraph {
  if (!graphInstance && uri && user && password) {
    graphInstance = new Neo4jKnowledgeGraph(uri, user, password);
  }
  if (!graphInstance) {
    throw new Error('Knowledge Graph not initialized. Provide uri, user, and password.');
  }
  return graphInstance;
}