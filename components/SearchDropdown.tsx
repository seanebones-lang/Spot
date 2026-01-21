"use client";

import { useState, useEffect, useRef, memo } from "react";
import { Clock, X, Search, Music, User, List, Disc } from "lucide-react";
import { useSearchStore } from "@/stores/searchStore";
import { useRouter } from "next/navigation";
import { mockData } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  type: "track" | "artist" | "playlist" | "album";
  name: string;
  subtitle?: string;
  image?: string;
}

interface SearchDropdownProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (query: string) => void;
}

const SearchDropdown = memo(function SearchDropdown({
  query,
  isOpen,
  onClose,
  onSelect,
}: SearchDropdownProps) {
  const { recentSearches, removeSearch } = useSearchStore();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Auto-complete search while typing
  useEffect(() => {
    if (query.trim().length > 2) {
      const results: SearchResult[] = [];
      const queryLower = query.toLowerCase();

      // Search tracks
      mockData.getTracks().forEach((track) => {
        if (
          track.name.toLowerCase().includes(queryLower) ||
          track.artist.toLowerCase().includes(queryLower)
        ) {
          results.push({
            id: track.id,
            type: "track",
            name: track.name,
            subtitle: track.artist,
            image: track.coverArt,
          });
        }
      });

      // Search artists
      mockData.getArtists().forEach((artist) => {
        if (artist.name.toLowerCase().includes(queryLower)) {
          results.push({
            id: artist.id,
            type: "artist",
            name: artist.name,
            subtitle: `${artist.followers} followers`,
            image: artist.image,
          });
        }
      });

      // Search playlists
      mockData.getPlaylists().forEach((playlist) => {
        if (playlist.name.toLowerCase().includes(queryLower)) {
          results.push({
            id: playlist.id,
            type: "playlist",
            name: playlist.name,
            subtitle: playlist.description,
            image: playlist.coverArt,
          });
        }
      });

      // Search albums
      mockData.getAlbums().forEach((album) => {
        if (
          album.name.toLowerCase().includes(queryLower) ||
          album.artist?.name?.toLowerCase().includes(queryLower)
        ) {
          results.push({
            id: album.id,
            type: "album",
            name: album.name,
            subtitle:
              typeof album.artist === "string"
                ? album.artist
                : album.artist?.name || "",
            image: album.coverArt,
          });
        }
      });

      setSearchResults(results.slice(0, 5)); // Top 5 results
    } else {
      setSearchResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasResults = searchResults.length > 0;
  const showRecent = !query || query.trim().length <= 2;

  const getResultIcon = (type: string) => {
    switch (type) {
      case "track":
        return <Music size={16} className="text-spotify-green" />;
      case "artist":
        return <User size={16} className="text-spotify-blue" />;
      case "playlist":
        return <List size={16} className="text-spotify-green" />;
      case "album":
        return <Disc size={16} className="text-orange-500" />;
      default:
        return <Search size={16} />;
    }
  };

  const getResultLink = (result: SearchResult) => {
    switch (result.type) {
      case "track":
        return "/track";
      case "artist":
        return `/artist/${result.id}`;
      case "playlist":
        return `/playlist/${result.id}`;
      case "album":
        return `/album/${result.id}`;
      default:
        return "/search";
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-spotify-dark-gray rounded-lg shadow-2xl border border-white/10 z-50 max-h-96 overflow-y-auto custom-scrollbar"
      style={{
        animation: "fadeIn 200ms ease-out",
        transformOrigin: "top center",
      }}
    >
      {/* Search Results (while typing) */}
      {hasResults && !showRecent && (
        <div className="p-2">
          <div className="px-3 py-2 mb-2">
            <h3 className="text-xs font-bold text-spotify-text-gray uppercase">
              Results
            </h3>
          </div>
          {searchResults.map((result) => (
            <button
              key={`${result.type}-${result.id}`}
              onClick={() => {
                onSelect(result.name);
                router.push(getResultLink(result));
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors group"
            >
              {result.image ? (
                <img
                  src={result.image}
                  alt={result.name}
                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded bg-spotify-light-gray flex items-center justify-center flex-shrink-0">
                  {getResultIcon(result.type)}
                </div>
              )}
              <div className="flex-1 min-w-0 text-left">
                <div className="text-white truncate font-medium">
                  {result.name}
                </div>
                {result.subtitle && (
                  <div className="text-xs text-spotify-text-gray truncate">
                    {result.subtitle}
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 text-spotify-text-gray">
                {getResultIcon(result.type)}
              </div>
            </button>
          ))}
          <button
            onClick={() => {
              router.push(`/search?q=${encodeURIComponent(query)}`);
              onClose();
            }}
            className="w-full mt-2 px-3 py-2 text-sm text-spotify-green hover:bg-white/10 rounded transition-colors font-medium"
          >
            View all results for &quot;{query}&quot;
          </button>
        </div>
      )}

      {/* Recent Searches (when empty or query <= 2 chars) */}
      {showRecent && recentSearches.length > 0 && (
        <div className="p-2">
          <div className="flex items-center justify-between px-3 py-2 mb-2">
            <h3 className="text-xs font-bold text-spotify-text-gray uppercase">
              Recent Searches
            </h3>
            <button
              onClick={() => {
                useSearchStore.getState().clearHistory();
              }}
              className="text-xs text-spotify-text-gray hover:text-white transition-colors"
            >
              Clear
            </button>
          </div>
          {recentSearches.map((search) => (
            <button
              key={search}
              onClick={() => {
                onSelect(search);
                router.push(`/search?q=${encodeURIComponent(search)}`);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors group"
            >
              <Clock
                size={16}
                className="text-spotify-text-gray flex-shrink-0"
              />
              <span className="flex-1 text-left text-white">{search}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSearch(search);
                }}
                className="opacity-0 group-hover:opacity-100 text-spotify-text-gray hover:text-white transition-all"
              >
                <X size={14} />
              </button>
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {showRecent && recentSearches.length === 0 && !hasResults && (
        <div className="p-8 text-center">
          <Search size={32} className="text-spotify-text-gray mx-auto mb-2" />
          <p className="text-spotify-text-gray text-sm">No recent searches</p>
          <p className="text-spotify-text-gray text-xs mt-1">
            Type to search for tracks, artists, playlists, and albums
          </p>
        </div>
      )}
    </div>
  );
});

export default SearchDropdown;
