/**
 * TanStack Query hook for Spotify search
 * Replaces SWR with TanStack Query for better caching and optimistic updates
 */

import { useQuery } from "@tanstack/react-query";

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: number;
  audioUrl: string;
  coverArt: string;
  uri: string;
  explicit: boolean;
  popularity: number;
}

interface SearchResponse {
  tracks: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
}

async function searchSpotify(query: string, limit: number = 20): Promise<SearchResponse> {
  if (!query.trim()) {
    return { tracks: [], total: 0, limit, offset: 0 };
  }

  const params = new URLSearchParams({
    q: query,
    limit: limit.toString(),
  });

  const response = await fetch(`/api/spotify/search?${params}`);
  
  if (!response.ok) {
    throw new Error("Failed to search tracks");
  }

  return response.json();
}

/**
 * Hook for searching Spotify tracks
 * @param query - Search query string
 * @param limit - Number of results (default: 20)
 * @param enabled - Whether to enable the query (default: true if query is not empty)
 */
export function useSpotifySearch(query: string, limit: number = 20) {
  const enabled = query.trim().length > 0;

  return useQuery({
    queryKey: ["spotify-search", query, limit],
    queryFn: () => searchSpotify(query, limit),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
}
