/**
 * Spotify Web API Client
 * Server-side only - uses client credentials flow for public endpoints
 * For user-specific endpoints, requires OAuth token from NextAuth session
 */

import SpotifyWebApi from "spotify-web-api-node";

// Initialize with client credentials (for public endpoints)
let spotifyApi: SpotifyWebApi | null = null;

function getSpotifyClient(): SpotifyWebApi {
  if (!spotifyApi) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.NEXTAUTH_URL
      ? `${process.env.NEXTAUTH_URL}/api/auth/callback/spotify`
      : "http://localhost:3001/api/auth/callback/spotify";

    if (!clientId || !clientSecret) {
      throw new Error(
        "SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in environment variables",
      );
    }

    spotifyApi = new SpotifyWebApi({
      clientId,
      clientSecret,
      redirectUri,
    });
  }

  return spotifyApi;
}

/**
 * Get access token using client credentials flow
 * For public endpoints (search, browse, etc.)
 */
export async function getClientAccessToken(): Promise<string> {
  const client = getSpotifyClient();
  try {
    const data = await client.clientCredentialsGrant();
    client.setAccessToken(data.body.access_token);
    return data.body.access_token;
  } catch (error) {
    console.error("Error getting Spotify access token:", error);
    throw new Error("Failed to authenticate with Spotify");
  }
}

/**
 * Search tracks using Spotify API
 * @param query - Search query string
 * @param limit - Number of results (default: 20, max: 50)
 */
export async function searchTracks(
  query: string,
  limit: number = 20,
): Promise<SpotifyApi.SearchResponse> {
  const client = getSpotifyClient();
  const token = await getClientAccessToken();
  client.setAccessToken(token);

  try {
    const response = await client.searchTracks(query, {
      limit: Math.min(limit, 50),
      market: "US",
    });
    return response.body;
  } catch (error) {
    console.error("Error searching tracks:", error);
    throw new Error("Failed to search tracks");
  }
}

/**
 * Get track by ID
 */
export async function getTrack(
  trackId: string,
): Promise<SpotifyApi.SingleTrackResponse> {
  const client = getSpotifyClient();
  const token = await getClientAccessToken();
  client.setAccessToken(token);

  try {
    const response = await client.getTrack(trackId);
    return response.body;
  } catch (error) {
    console.error("Error getting track:", error);
    throw new Error("Failed to get track");
  }
}

/**
 * Get user's access token from NextAuth session
 * For user-specific endpoints (playlists, saved tracks, etc.)
 */
export function getSpotifyClientWithUserToken(
  accessToken: string,
): SpotifyWebApi {
  const client = getSpotifyClient();
  client.setAccessToken(accessToken);
  return client;
}

export { getSpotifyClient };
