import { NextRequest, NextResponse } from "next/server";
import { searchTracks } from "@/lib/spotify";
import { z } from "zod";
import { logger, generateCorrelationId } from "@/lib/logger";

const searchSchema = z.object({
  q: z.string().min(1).max(100),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
});

/**
 * Spotify Search API Route
 * GET /api/spotify/search?q=query&limit=20
 * 
 * Returns search results from Spotify Web API
 * Uses client credentials flow (no user auth required for search)
 */
export async function GET(req: NextRequest) {
  const correlationId = generateCorrelationId();
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const limitParam = searchParams.get("limit");

    // Validate input
    const validated = searchSchema.parse({
      q: query,
      limit: limitParam,
    });

    // Search Spotify
    const results = await searchTracks(validated.q, validated.limit);

    // Transform to our Track format
    const tracks = results.tracks?.items.map((item) => ({
      id: item.id,
      name: item.name,
      artist: item.artists[0]?.name || "Unknown Artist",
      artistId: item.artists[0]?.id || "",
      album: item.album?.name || "",
      albumId: item.album?.id || "",
      duration: item.duration_ms,
      audioUrl: item.preview_url || "",
      coverArt: item.album?.images[0]?.url || "",
      uri: item.uri,
      explicit: item.explicit || false,
      popularity: item.popularity || 0,
    })) || [];

    return NextResponse.json({
      tracks,
      total: results.tracks?.total || 0,
      limit: validated.limit,
      offset: results.tracks?.offset || 0,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid search parameters", details: error.errors },
        { status: 400 }
      );
    }

    logger.error("Spotify search error", error, { correlationId, query });
    return NextResponse.json(
      { error: "Failed to search tracks. Please try again." },
      { status: 500 }
    );
  }
}
