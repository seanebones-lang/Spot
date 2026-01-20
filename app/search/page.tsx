"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSearchStore } from "@/stores/searchStore";
import { useSpotifySearch } from "@/hooks/useSpotifySearch";
import PlayButton from "@/components/PlayButton";
import { usePlayerStore } from "@/stores/playerStore";
import { cn } from "@/lib/utils";
import { SpotifyTrack } from "@/hooks/useSpotifySearch";
import { Track } from "@/types/track";

interface BrowseCategory {
  id: string;
  title: string;
  href?: string;
  color: string;
  image?: string;
  category:
    | "music"
    | "podcasts"
    | "features"
    | "mental-health"
    | "artist"
    | "store"
    | "account"
    | "lifestyle"
    | "genres";
}

const browseCategories: BrowseCategory[] = [
  // Music Genres
  {
    id: "pop",
    title: "Pop",
    href: "/search?q=pop",
    color: "#8D67AB",
    category: "music",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "rock",
    title: "Rock",
    color: "#E61E32",
    category: "music",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "hip-hop",
    title: "Hip-Hop",
    color: "#BA5D07",
    category: "music",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "electronic",
    title: "Dance/Electronic",
    color: "#509BF5",
    category: "music",
    image:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "r-b",
    title: "R&B",
    color: "#E8115B",
    category: "music",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "latin",
    title: "Latin",
    color: "#148A08",
    category: "music",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "jazz",
    title: "Jazz",
    color: "#1E3264",
    category: "music",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "country",
    title: "Country",
    color: "#D84000",
    category: "music",
    image:
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=400&fit=crop&q=80",
  },
  {
    id: "indie",
    title: "Indie",
    color: "#E61E32",
    category: "music",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80",
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const { addSearch } = useSearchStore();
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } =
    usePlayerStore();

  // Use Spotify API search with TanStack Query
  const {
    data: searchResults,
    isLoading,
    error,
  } = useSpotifySearch(searchQuery, 20);

  // Update search query when URL param changes
  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    if (urlQuery !== searchQuery) {
      setSearchQuery(urlQuery);
    }
  }, [searchParams, searchQuery]);

  // Convert Spotify tracks to app Track format
  const tracks: Track[] = useMemo(() => {
    if (!searchResults?.tracks) return [];
    return searchResults.tracks.map((spotifyTrack: SpotifyTrack) => ({
      id: spotifyTrack.id,
      name: spotifyTrack.name,
      artist: spotifyTrack.artist,
      artistId: spotifyTrack.artistId,
      album: spotifyTrack.album,
      albumId: spotifyTrack.albumId,
      duration: spotifyTrack.duration,
      audioUrl: spotifyTrack.audioUrl,
      coverArt: spotifyTrack.coverArt,
      format: "MP3",
      quality: "standard",
    }));
  }, [searchResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      addSearch(trimmedQuery);
      // Update URL without page reload
      window.history.pushState(
        {},
        "",
        `/search?q=${encodeURIComponent(trimmedQuery)}`
      );
    }
  };

  const handlePlayTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const hasResults = tracks.length > 0;
  const showBrowse = !searchQuery.trim() && !hasResults;

  return (
    <div className="p-8 min-h-screen bg-[#121212] text-white">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full px-4 py-4 pl-12 bg-white text-black rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-spotify-green"
            aria-label="Search for songs, artists, or albums"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-spotify-green"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 mb-8">
          <p className="text-red-400">
            Failed to search. Please try again or check your connection.
          </p>
        </div>
      )}

      {/* Search Results */}
      {hasResults && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Songs ({searchResults.total} results)
          </h2>
          <div className="space-y-2">
            {tracks.map((track, index) => {
              const isCurrentTrack = currentTrack?.id === track.id;
              return (
                <div
                  key={track.id}
                  className={cn(
                    "flex items-center gap-4 p-2 rounded hover:bg-white/10 transition-colors group",
                    isCurrentTrack && "bg-white/10"
                  )}
                >
                  <div className="w-10 text-center text-spotify-text-gray text-sm">
                    {isCurrentTrack && isPlaying ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="w-1 h-4 bg-spotify-green rounded-full animate-pulse mr-0.5"></div>
                          <div className="w-1 h-3 bg-spotify-green rounded-full animate-pulse mr-0.5"></div>
                          <div className="w-1 h-4 bg-spotify-green rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    ) : (
                      <span className="group-hover:hidden">{index + 1}</span>
                    )}
                    {!isCurrentTrack && (
                      <div className="hidden group-hover:block">
                        <PlayButton
                          isPlaying={false}
                          onClick={() => handlePlayTrack(track)}
                          size="sm"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-medium truncate",
                        isCurrentTrack && "text-spotify-green"
                      )}
                    >
                      {track.name}
                    </p>
                    <p className="text-sm text-spotify-text-gray truncate">
                      {track.artist}
                    </p>
                  </div>
                  <div className="hidden md:block flex-1 min-w-0">
                    <p className="text-sm text-spotify-text-gray truncate">
                      {track.album}
                    </p>
                  </div>
                  <div className="text-spotify-text-gray text-sm">
                    {Math.floor(track.duration / 60000)}:
                    {String(Math.floor((track.duration % 60000) / 1000)).padStart(
                      2,
                      "0"
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Browse Categories (shown when no search) */}
      {showBrowse && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Browse all</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {browseCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href || `/search?q=${encodeURIComponent(category.title)}`}
                className="relative aspect-square rounded-lg overflow-hidden group"
                style={{ backgroundColor: category.color }}
              >
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                )}
                <div className="absolute inset-0 flex items-end p-4">
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !hasResults && searchQuery.trim() && (
        <div className="text-center py-20">
          <p className="text-spotify-text-gray text-lg mb-2">
            No results found for "{searchQuery}"
          </p>
          <p className="text-spotify-text-gray text-sm">
            Try searching for something else
          </p>
        </div>
      )}
    </div>
  );
}
