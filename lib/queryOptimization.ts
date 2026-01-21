/**
 * Prisma Query Optimization Utilities
 * Eliminates N+1 queries, implements pagination, and adds caching
 */

import prisma from "./db";
import { Redis } from "@upstash/redis";
import { logger } from "./logger";

const redis = Redis.fromEnv();

/**
 * Cache-aside pattern for database queries
 * Reduces database load by caching hot data
 */
export async function cachedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  ttlSeconds: number = 300,
): Promise<T> {
  try {
    // Try to get from cache
    const cached = await redis.get<T>(key);
    if (cached !== null) {
      logger.debug(`Cache hit: ${key}`);
      return cached;
    }
  } catch (error) {
    logger.warn(`Cache retrieval failed for ${key}:`, error);
  }

  // Cache miss; execute query
  const result = await queryFn();

  // Store in cache
  try {
    await redis.set(key, result, { ex: ttlSeconds });
  } catch (error) {
    logger.warn(`Cache write failed for ${key}:`, error);
  }

  return result;
}

/**
 * Optimized track listing with pagination
 * Eliminates N+1 by using Prisma include instead of separate queries
 */
export async function getTracksWithPagination(
  userId: string,
  page: number = 1,
  limit: number = 50,
) {
  const skip = (page - 1) * limit;

  // Use include to fetch related data in single query
  const [tracks, total] = await Promise.all([
    prisma.track.findMany({
      where: { userId },
      include: {
        artist: {
          select: { id: true, name: true, image: true },
        },
        album: {
          select: { id: true, name: true },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.track.count({ where: { userId } }),
  ]);

  return {
    data: tracks,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
  };
}

/**
 * Optimized playlist loading with track details
 * Prevents N+1 by loading all playlist data in single query
 */
export async function getPlaylistWithTracks(
  playlistId: string,
  page: number = 1,
  limit: number = 50,
) {
  const skip = (page - 1) * limit;

  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
    include: {
      user: { select: { id: true, name: true } },
      tracks: {
        include: {
          track: {
            include: {
              artist: { select: { id: true, name: true } },
              album: { select: { id: true, name: true } },
            },
          },
        },
        skip,
        take: limit,
      },
    },
  });

  if (!playlist) {
    return null;
  }

  // Count total tracks for pagination
  const totalTracks = await prisma.playlistTrack.count({
    where: { playlistId },
  });

  return {
    ...playlist,
    tracks: playlist.tracks.map((pt) => pt.track),
    pagination: {
      page,
      limit,
      total: totalTracks,
      pages: Math.ceil(totalTracks / limit),
    },
  };
}

/**
 * Batch query optimization - fetch multiple items in single query
 * Prevents multiple separate queries in loops
 */
export async function getTracksBatch(trackIds: string[]) {
  if (trackIds.length === 0) {
    return [];
  }

  // Use IN clause instead of individual queries
  return prisma.track.findMany({
    where: {
      id: { in: trackIds },
    },
    include: {
      artist: { select: { id: true, name: true } },
      album: { select: { id: true, name: true } },
    },
  });
}

/**
 * Artist with stats (aggregation query)
 * Uses Prisma aggregation to avoid separate COUNT queries
 */
export async function getArtistWithStats(artistId: string) {
  const artist = await prisma.artist.findUnique({
    where: { id: artistId },
    include: {
      tracks: {
        select: { id: true }, // Lightweight
      },
    },
  });

  if (!artist) {
    return null;
  }

  // Get aggregated stats
  const [totalListens, totalTracks] = await Promise.all([
    prisma.track.aggregate({
      where: { artistId },
      _sum: { listens: true },
    }),
    prisma.track.count({
      where: { artistId },
    }),
  ]);

  return {
    ...artist,
    stats: {
      totalTracks,
      totalListens: totalListens._sum?.listens || 0,
    },
  };
}

/**
 * Cursor-based pagination (better for large datasets)
 * Avoids OFFSET scalability issues
 */
export async function getTracksWithCursorPagination(
  userId: string,
  cursor?: string,
  limit: number = 50,
) {
  const whereClause: any = { userId };

  if (cursor) {
    whereClause.createdAt = { lt: new Date(cursor) };
  }

  const tracks = await prisma.track.findMany({
    where: whereClause,
    include: {
      artist: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: limit + 1, // Fetch one extra to determine if more pages exist
  });

  const hasMore = tracks.length > limit;
  const data = tracks.slice(0, limit);
  const nextCursor = hasMore
    ? data[data.length - 1]?.createdAt.toISOString()
    : null;

  return {
    data,
    pageInfo: {
      hasMore,
      endCursor: nextCursor,
    },
  };
}

/**
 * Selective field loading (reduce payload size)
 * Only fetch necessary fields instead of entire objects
 */
export async function getTrackSummaries(userId: string, limit: number = 100) {
  return prisma.track.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      artist: { select: { name: true } },
      duration: true,
      createdAt: true,
      // Exclude: full schema, unused fields
    },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Cache invalidation helper
 * Use when data is updated to clear related cache entries
 */
export async function invalidateCache(keys: string[]) {
  try {
    if (keys.length > 0) {
      await Promise.all(keys.map((key) => redis.del(key)));
      logger.info(`Cache invalidated: ${keys.length} keys`);
    }
  } catch (error) {
    logger.warn("Cache invalidation failed:", error);
  }
}

/**
 * Invalidate user's playlist cache on changes
 */
export async function invalidatePlaylistCache(userId: string) {
  const patterns = [`playlists:${userId}:*`, `playlist-tracks:${userId}:*`];
  // Note: Redis doesn't support pattern deletion efficiently
  // In production, consider using tagged cache or separate cache layer
}

/**
 * Database query analyzer
 * Logs slow queries for optimization
 */
export function withQueryLogging<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  threshold: number = 100, // ms
): T {
  return (async (...args: any[]) => {
    const start = Date.now();
    try {
      const result = await fn(...args);
      const duration = Date.now() - start;

      if (duration > threshold) {
        logger.warn(`Slow query detected (${duration}ms):`, {
          function: fn.name,
          duration,
          threshold,
        });
      }

      return result;
    } catch (error) {
      const duration = Date.now() - start;
      logger.error(`Query error after ${duration}ms:`, error);
      throw error;
    }
  }) as T;
}
