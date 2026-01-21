/**
 * Jamendo API Integration
 * Legal, royalty-free music API with Creative Commons licensing
 *
 * Get API key: https://devportal.jamendo.com/
 * Free tier: 200 requests/day
 */

const JAMENDO_API_KEY = process.env.JAMENDO_API_KEY || "";
const JAMENDO_BASE_URL = "https://api.jamendo.com/v3.0";

export interface JamendoTrack {
  id: string;
  name: string;
  duration: number; // in seconds
  artist_name: string;
  artist_id: string;
  album_name?: string;
  album_id?: string;
  audio: string; // MP3 URL
  audiodownload?: string; // Download URL
  image: string; // Cover art URL
  tags: {
    genres?: string[];
    instruments?: string[];
    vartags?: string[];
  };
  license_ccurl?: string; // CC license URL
  license_ccurl_legalcode?: string;
  license_ccurl_deed?: string;
  shareurl: string;
}

export interface JamendoSearchParams {
  search?: string;
  tags?: string; // Comma-separated tags
  genre?: string;
  limit?: number;
  offset?: number;
  format?: "json" | "jsonpretty";
  order?: "popularity_total" | "popularity_month" | "releasedate_desc";
}

/**
 * Search tracks on Jamendo
 * All tracks are Creative Commons licensed
 */
export async function searchJamendoTracks(
  params: JamendoSearchParams = {},
): Promise<JamendoTrack[]> {
  if (!JAMENDO_API_KEY) {
    console.warn("[Jamendo] API key not set. Set JAMENDO_API_KEY in .env");
    return [];
  }

  const searchParams = new URLSearchParams({
    client_id: JAMENDO_API_KEY,
    format: params.format || "json",
    limit: String(params.limit || 50),
    offset: String(params.offset || 0),
    order: params.order || "popularity_total",
    ...(params.search && { search: params.search }),
    ...(params.tags && { tags: params.tags }),
    ...(params.genre && { tags: params.genre }), // Genre is passed as tag
  });

  try {
    const response = await fetch(`${JAMENDO_BASE_URL}/tracks/?${searchParams}`);

    if (!response.ok) {
      throw new Error(`Jamendo API error: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.headers?.status === "success" && data.results) {
      return data.results as JamendoTrack[];
    }

    return [];
  } catch (error) {
    console.error("[Jamendo] Search failed:", error);
    return [];
  }
}

/**
 * Get tracks by mood
 * Maps moods to Jamendo tags/genres
 */
const MOOD_TO_TAGS: Record<string, string[]> = {
  happy: ["upbeat", "energetic", "positive", "summer"],
  sad: ["melancholic", "emotional", "ballad", "acoustic"],
  chill: ["ambient", "lounge", "relax", "calm"],
  energetic: ["dance", "electronic", "upbeat", "party"],
  focus: ["instrumental", "ambient", "study", "concentration"],
  relaxed: ["ambient", "lounge", "chill", "peaceful"],
  workout: ["energetic", "dance", "electronic", "upbeat"],
  romantic: ["romantic", "ballad", "acoustic", "love"],
  nostalgic: ["vintage", "retro", "classic"],
};

export async function getTracksByMood(
  mood: string,
  limit: number = 50,
): Promise<JamendoTrack[]> {
  const tags = MOOD_TO_TAGS[mood.toLowerCase()] || [mood];
  const tagString = tags.join(",");

  return searchJamendoTracks({
    tags: tagString,
    limit,
    order: "popularity_total",
  });
}

/**
 * Get tracks by genre
 */
const GENRE_TO_TAGS: Record<string, string[]> = {
  rock: ["rock", "alternative"],
  pop: ["pop", "dance"],
  "hip-hop": ["hip-hop", "rap"],
  electronic: ["electronic", "edm", "techno"],
  classical: ["classical", "orchestral"],
  jazz: ["jazz", "swing"],
  ambient: ["ambient", "atmospheric"],
  lofi: ["lofi", "chillhop"],
  metal: ["metal", "hard-rock"],
};

export async function getTracksByGenre(
  genre: string,
  limit: number = 50,
): Promise<JamendoTrack[]> {
  const tags = GENRE_TO_TAGS[genre.toLowerCase()] || [genre];
  const tagString = tags.join(",");

  return searchJamendoTracks({
    tags: tagString,
    limit,
    order: "popularity_total",
  });
}

/**
 * Convert Jamendo track to EmPulse Track format
 */
import type { Track } from "@/types/track";

export function jamendoToTrack(jamendo: JamendoTrack): Track {
  return {
    id: `jamendo-${jamendo.id}`,
    name: jamendo.name,
    artist: jamendo.artist_name,
    artistId: `jamendo-artist-${jamendo.artist_id}`,
    album: jamendo.album_name || "Unknown Album",
    albumId: jamendo.album_id ? `jamendo-album-${jamendo.album_id}` : "",
    duration: jamendo.duration * 1000, // Convert to milliseconds
    audioUrl: jamendo.audio,
    coverArt: jamendo.image,
    moodTags: {
      mood: extractMoodFromTags(jamendo.tags),
      feeling: [],
      vibe: [],
      genre: jamendo.tags.genres || [],
    },
    format: "MP3",
    quality: "standard",
    // CC license info
    rightsMetadata: {
      composers: [],
      lyricists: [],
      publishers: [],
      compositionOwnershipTotal: 100,
      masterOwnershipPercentage: 100,
      ownsMasterRights: true,
      isOriginalComposition: true,
      samplesCleared: true,
      hasMechanicalLicenses: false,
      explicitContent: false,
      territoryRights: "worldwide",
      agreesToIndemnify: false,
      isrc: `JAMENDO-${jamendo.id}`,
      proAffiliation: "None",
    },
  };
}

function extractMoodFromTags(tags: JamendoTrack["tags"]): string[] {
  const allTags = [
    ...(tags.genres || []),
    ...(tags.instruments || []),
    ...(tags.vartags || []),
  ].map((t) => t.toLowerCase());

  const moods: string[] = [];

  for (const [mood, keywords] of Object.entries(MOOD_TO_TAGS)) {
    if (keywords.some((kw) => allTags.some((t) => t.includes(kw)))) {
      moods.push(mood);
    }
  }

  return moods.length > 0 ? moods : ["chill"]; // Default
}
