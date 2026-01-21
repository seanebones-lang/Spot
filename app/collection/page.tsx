<<<<<<< HEAD
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Grid3x3,
  List,
  LayoutGrid,
  Music,
  Disc,
  User,
} from "lucide-react";
import { useLibraryStore } from "@/stores/libraryStore";
import { mockData } from "@/lib/data";
import EmptyState from "@/components/EmptyState";
import { cn } from "@/lib/utils";

type FilterType = "all" | "playlists" | "artists" | "albums";
type ViewMode = "grid" | "list" | "compact";

export default function CollectionPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
=======
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Grid3x3, List, LayoutGrid, Music, Disc, User } from 'lucide-react';
import { useLibraryStore } from '@/stores/libraryStore';
import { mockData } from '@/lib/data';
import EmptyState from '@/components/EmptyState';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'playlists' | 'artists' | 'albums';
type ViewMode = 'grid' | 'list' | 'compact';

export default function CollectionPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const { savedTracks, savedAlbums, savedPlaylists } = useLibraryStore();
  const albums = mockData.getAlbums();

  // Filter and search logic
  const filteredPlaylists = useMemo(() => {
    let items = savedPlaylists;
    if (searchQuery) {
<<<<<<< HEAD
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.owner.toLowerCase().includes(searchQuery.toLowerCase()),
=======
      items = items.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.owner.toLowerCase().includes(searchQuery.toLowerCase())
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }
    return items;
  }, [savedPlaylists, searchQuery]);

  const filteredAlbums = useMemo(() => {
<<<<<<< HEAD
    let items = albums.filter((album) => savedAlbums.includes(album.id));
    if (searchQuery) {
      items = items.filter(
        (a) =>
          a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.artist.name.toLowerCase().includes(searchQuery.toLowerCase()),
=======
    let items = albums.filter(album => savedAlbums.includes(album.id));
    if (searchQuery) {
      items = items.filter(a => 
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }
    return items;
  }, [albums, savedAlbums, searchQuery]);

  const filteredTracks = useMemo(() => {
    let items = savedTracks;
    if (searchQuery) {
<<<<<<< HEAD
      items = items.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.album.toLowerCase().includes(searchQuery.toLowerCase()),
=======
      items = items.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.album.toLowerCase().includes(searchQuery.toLowerCase())
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      );
    }
    return items;
  }, [savedTracks, searchQuery]);

  return (
<<<<<<< HEAD
    <div
      className="p-8"
      style={{
        padding: "32px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#FFFFFF",
      }}
    >
      {/* Header with Search and View Controls - Exact Spotify Style */}
      <div
        className="flex items-center justify-between mb-6"
        style={{
          marginBottom: "24px",
        }}
      >
        <h1
          className="text-4xl font-bold"
          style={{
            fontSize: "32px",
            lineHeight: "36px",
            fontWeight: 700,
            color: "#FFFFFF",
=======
    <div 
      className="p-8"
      style={{
        padding: '32px',
        backgroundColor: '#121212',
        minHeight: '100vh',
        color: '#FFFFFF'
      }}
    >
      {/* Header with Search and View Controls - Exact Spotify Style */}
      <div 
        className="flex items-center justify-between mb-6"
        style={{
          marginBottom: '24px'
        }}
      >
        <h1 
          className="text-4xl font-bold"
          style={{
            fontSize: '32px',
            lineHeight: '36px',
            fontWeight: 700,
            color: '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Your Library
        </h1>
        <div className="flex items-center gap-4">
          {/* Search Input - Exact Spotify Style */}
<<<<<<< HEAD
          <div className="relative w-64" style={{ width: "256px" }}>
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-spotify-text-gray"
              style={{
                left: "12px",
                color: "#B3B3B3",
                width: "20px",
                height: "20px",
=======
          <div 
            className="relative w-64"
            style={{ width: '256px' }}
          >
            <Search 
              size={20} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-spotify-text-gray"
              style={{
                left: '12px',
                color: '#B3B3B3',
                width: '20px',
                height: '20px'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            />
            <input
              type="text"
              placeholder="Search in Your Library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-spotify-light-gray rounded-full pl-10 pr-4 py-2 text-white placeholder:text-spotify-text-gray focus:outline-none"
              style={{
<<<<<<< HEAD
                width: "100%",
                backgroundColor: "#282828",
                borderRadius: "500px",
                paddingLeft: "40px",
                paddingRight: "16px",
                paddingTop: "8px",
                paddingBottom: "8px",
                color: "#FFFFFF",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 400,
                border: "none",
                outline: "none",
              }}
            />
          </div>

          {/* View Mode Toggles */}
          <div className="flex items-center gap-1 bg-spotify-light-gray rounded-full p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-full transition-colors",
                viewMode === "grid"
                  ? "bg-white text-black"
                  : "text-spotify-text-gray hover:text-white",
=======
                width: '100%',
                backgroundColor: '#282828',
                borderRadius: '500px',
                paddingLeft: '40px',
                paddingRight: '16px',
                paddingTop: '8px',
                paddingBottom: '8px',
                color: '#FFFFFF',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 400,
                border: 'none',
                outline: 'none'
              }}
            />
          </div>
          
          {/* View Mode Toggles */}
          <div className="flex items-center gap-1 bg-spotify-light-gray rounded-full p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-full transition-colors",
                viewMode === 'grid' ? 'bg-white text-black' : 'text-spotify-text-gray hover:text-white'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              )}
              aria-label="Grid view"
            >
              <Grid3x3 size={18} />
            </button>
            <button
<<<<<<< HEAD
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-full transition-colors",
                viewMode === "list"
                  ? "bg-white text-black"
                  : "text-spotify-text-gray hover:text-white",
=======
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-full transition-colors",
                viewMode === 'list' ? 'bg-white text-black' : 'text-spotify-text-gray hover:text-white'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              )}
              aria-label="List view"
            >
              <List size={18} />
            </button>
            <button
<<<<<<< HEAD
              onClick={() => setViewMode("compact")}
              className={cn(
                "p-2 rounded-full transition-colors",
                viewMode === "compact"
                  ? "bg-white text-black"
                  : "text-spotify-text-gray hover:text-white",
=======
              onClick={() => setViewMode('compact')}
              className={cn(
                "p-2 rounded-full transition-colors",
                viewMode === 'compact' ? 'bg-white text-black' : 'text-spotify-text-gray hover:text-white'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              )}
              aria-label="Compact view"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Buttons - Exact Spotify Style */}
<<<<<<< HEAD
      <div
        className="flex gap-2 mb-8"
        style={{
          gap: "8px",
          marginBottom: "32px",
        }}
      >
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-full font-medium transition-colors",
            filter === "all"
              ? "bg-white text-black hover:bg-[#f5f5f5]"
              : "bg-spotify-light-gray text-white hover:bg-spotify-dark-gray",
          )}
          style={{
            padding: "6px 16px",
            borderRadius: "500px",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            transition: "all 200ms ease-out",
            backgroundColor: filter === "all" ? "#FFFFFF" : "#282828",
            color: filter === "all" ? "#000000" : "#FFFFFF",
=======
      <div 
        className="flex gap-2 mb-8"
        style={{
          gap: '8px',
          marginBottom: '32px'
        }}
      >
        <button
          onClick={() => setFilter('all')}
          className={cn(
            "rounded-full font-medium transition-colors",
            filter === 'all' ? 'bg-white text-black hover:bg-[#f5f5f5]' : 'bg-spotify-light-gray text-white hover:bg-spotify-dark-gray'
          )}
          style={{
            padding: '6px 16px',
            borderRadius: '500px',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            transition: 'all 200ms ease-out',
            backgroundColor: filter === 'all' ? '#FFFFFF' : '#282828',
            color: filter === 'all' ? '#000000' : '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          All
        </button>
        <button
<<<<<<< HEAD
          onClick={() => setFilter("playlists")}
          className={cn(
            "rounded-full font-medium transition-colors",
            filter === "playlists"
              ? "bg-white text-black hover:bg-[#f5f5f5]"
              : "bg-spotify-light-gray text-white hover:bg-spotify-dark-gray",
          )}
          style={{
            padding: "6px 16px",
            borderRadius: "500px",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            transition: "all 200ms ease-out",
            backgroundColor: filter === "playlists" ? "#FFFFFF" : "#282828",
            color: filter === "playlists" ? "#000000" : "#FFFFFF",
=======
          onClick={() => setFilter('playlists')}
          className={cn(
            "rounded-full font-medium transition-colors",
            filter === 'playlists' ? 'bg-white text-black hover:bg-[#f5f5f5]' : 'bg-spotify-light-gray text-white hover:bg-spotify-dark-gray'
          )}
          style={{
            padding: '6px 16px',
            borderRadius: '500px',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            transition: 'all 200ms ease-out',
            backgroundColor: filter === 'playlists' ? '#FFFFFF' : '#282828',
            color: filter === 'playlists' ? '#000000' : '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Playlists
        </button>
        <button
<<<<<<< HEAD
          onClick={() => setFilter("artists")}
          className={cn(
            "rounded-full font-medium transition-colors",
            filter === "artists"
              ? "bg-white text-black hover:bg-[#f5f5f5]"
              : "bg-spotify-light-gray text-white hover:bg-spotify-dark-gray",
          )}
          style={{
            padding: "6px 16px",
            borderRadius: "500px",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            transition: "all 200ms ease-out",
            backgroundColor: filter === "artists" ? "#FFFFFF" : "#282828",
            color: filter === "artists" ? "#000000" : "#FFFFFF",
=======
          onClick={() => setFilter('artists')}
          className={cn(
            "rounded-full font-medium transition-colors",
            filter === 'artists' ? 'bg-white text-black hover:bg-[#f5f5f5]' : 'bg-spotify-light-gray text-white hover:bg-spotify-dark-gray'
          )}
          style={{
            padding: '6px 16px',
            borderRadius: '500px',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            transition: 'all 200ms ease-out',
            backgroundColor: filter === 'artists' ? '#FFFFFF' : '#282828',
            color: filter === 'artists' ? '#000000' : '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Artists
        </button>
        <button
<<<<<<< HEAD
          onClick={() => setFilter("albums")}
          className={cn(
            "rounded-full font-medium transition-colors",
            filter === "albums"
              ? "bg-white text-black hover:bg-[#f5f5f5]"
              : "bg-spotify-light-gray text-white hover:bg-spotify-dark-gray",
          )}
          style={{
            padding: "6px 16px",
            borderRadius: "500px",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            transition: "all 200ms ease-out",
            backgroundColor: filter === "albums" ? "#FFFFFF" : "#282828",
            color: filter === "albums" ? "#000000" : "#FFFFFF",
=======
          onClick={() => setFilter('albums')}
          className={cn(
            "rounded-full font-medium transition-colors",
            filter === 'albums' ? 'bg-white text-black hover:bg-[#f5f5f5]' : 'bg-spotify-light-gray text-white hover:bg-spotify-dark-gray'
          )}
          style={{
            padding: '6px 16px',
            borderRadius: '500px',
            fontSize: '14px',
            lineHeight: '20px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            transition: 'all 200ms ease-out',
            backgroundColor: filter === 'albums' ? '#FFFFFF' : '#282828',
            color: filter === 'albums' ? '#000000' : '#FFFFFF'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        >
          Albums
        </button>
      </div>

      {/* Playlists Section */}
<<<<<<< HEAD
      {(filter === "all" || filter === "playlists") &&
        filteredPlaylists.length > 0 && (
          <section className="mb-8">
            {filter === "all" && (
              <h2 className="text-2xl font-bold mb-4">Playlists</h2>
            )}
            {viewMode === "grid" && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredPlaylists.map((playlist) => (
                  <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                    <div className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80 transition-colors cursor-pointer group">
                      <img
                        src={playlist.coverArt}
                        alt={playlist.name}
                        className="w-full aspect-square object-cover rounded mb-3 shadow-lg group-hover:shadow-xl transition-shadow"
                      />
                      <h3 className="font-semibold text-sm truncate">
                        {playlist.name}
                      </h3>
                      <p className="text-xs text-spotify-text-gray">
                        {playlist.owner}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {viewMode === "list" && (
              <div className="space-y-2">
                {filteredPlaylists.map((playlist) => (
                  <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                    <div className="flex items-center gap-4 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer group">
                      <img
                        src={playlist.coverArt}
                        alt={playlist.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base truncate group-hover:text-spotify-green transition-colors">
                          {playlist.name}
                        </h3>
                        <p className="text-sm text-spotify-text-gray truncate">
                          Playlist • {playlist.owner}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {viewMode === "compact" && (
              <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2">
                {filteredPlaylists.map((playlist) => (
                  <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                    <div className="bg-spotify-light-gray rounded-lg aspect-square overflow-hidden hover:bg-spotify-light-gray/80 transition-colors cursor-pointer">
                      <img
                        src={playlist.coverArt}
                        alt={playlist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

      {/* Albums Section */}
      {(filter === "all" || filter === "albums") &&
        filteredAlbums.length > 0 && (
          <section className="mb-8">
            {filter === "all" && (
              <h2 className="text-2xl font-bold mb-4">Albums</h2>
            )}
            {viewMode === "grid" && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredAlbums.map((album) => (
                  <Link key={album.id} href={`/album/${album.id}`}>
                    <div className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80 transition-colors cursor-pointer group">
                      <img
                        src={album.coverArt}
                        alt={album.name}
                        className="w-full aspect-square object-cover rounded mb-3 shadow-lg group-hover:shadow-xl transition-shadow"
                      />
                      <h3 className="font-semibold text-sm truncate">
                        {album.name}
                      </h3>
                      <p className="text-xs text-spotify-text-gray truncate">
                        {album.artist.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {viewMode === "list" && (
              <div className="space-y-2">
                {filteredAlbums.map((album) => (
                  <Link key={album.id} href={`/album/${album.id}`}>
                    <div className="flex items-center gap-4 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer group">
                      <img
                        src={album.coverArt}
                        alt={album.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base truncate group-hover:text-spotify-green transition-colors">
                          {album.name}
                        </h3>
                        <p className="text-sm text-spotify-text-gray truncate">
                          Album • {album.artist.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {viewMode === "compact" && (
              <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2">
                {filteredAlbums.map((album) => (
                  <Link key={album.id} href={`/album/${album.id}`}>
                    <div className="bg-spotify-light-gray rounded-lg aspect-square overflow-hidden hover:bg-spotify-light-gray/80 transition-colors cursor-pointer">
                      <img
                        src={album.coverArt}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

      {/* Liked Songs Section */}
      {filter === "all" && filteredTracks.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Liked Songs</h2>
          {viewMode === "list" || viewMode === "compact" ? (
=======
      {(filter === 'all' || filter === 'playlists') && filteredPlaylists.length > 0 && (
        <section className="mb-8">
          {filter === 'all' && <h2 className="text-2xl font-bold mb-4">Playlists</h2>}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredPlaylists.map((playlist) => (
                <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                  <div className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80 transition-colors cursor-pointer group">
                    <img src={playlist.coverArt} alt={playlist.name} className="w-full aspect-square object-cover rounded mb-3 shadow-lg group-hover:shadow-xl transition-shadow" />
                    <h3 className="font-semibold text-sm truncate">{playlist.name}</h3>
                    <p className="text-xs text-spotify-text-gray">{playlist.owner}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {viewMode === 'list' && (
            <div className="space-y-2">
              {filteredPlaylists.map((playlist) => (
                <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                  <div className="flex items-center gap-4 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer group">
                    <img src={playlist.coverArt} alt={playlist.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate group-hover:text-spotify-green transition-colors">{playlist.name}</h3>
                      <p className="text-sm text-spotify-text-gray truncate">Playlist • {playlist.owner}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {viewMode === 'compact' && (
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2">
              {filteredPlaylists.map((playlist) => (
                <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                  <div className="bg-spotify-light-gray rounded-lg aspect-square overflow-hidden hover:bg-spotify-light-gray/80 transition-colors cursor-pointer">
                    <img src={playlist.coverArt} alt={playlist.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Albums Section */}
      {(filter === 'all' || filter === 'albums') && filteredAlbums.length > 0 && (
        <section className="mb-8">
          {filter === 'all' && <h2 className="text-2xl font-bold mb-4">Albums</h2>}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredAlbums.map((album) => (
                <Link key={album.id} href={`/album/${album.id}`}>
                  <div className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80 transition-colors cursor-pointer group">
                    <img src={album.coverArt} alt={album.name} className="w-full aspect-square object-cover rounded mb-3 shadow-lg group-hover:shadow-xl transition-shadow" />
                    <h3 className="font-semibold text-sm truncate">{album.name}</h3>
                    <p className="text-xs text-spotify-text-gray truncate">{album.artist.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {viewMode === 'list' && (
            <div className="space-y-2">
              {filteredAlbums.map((album) => (
                <Link key={album.id} href={`/album/${album.id}`}>
                  <div className="flex items-center gap-4 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer group">
                    <img src={album.coverArt} alt={album.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate group-hover:text-spotify-green transition-colors">{album.name}</h3>
                      <p className="text-sm text-spotify-text-gray truncate">Album • {album.artist.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {viewMode === 'compact' && (
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-2">
              {filteredAlbums.map((album) => (
                <Link key={album.id} href={`/album/${album.id}`}>
                  <div className="bg-spotify-light-gray rounded-lg aspect-square overflow-hidden hover:bg-spotify-light-gray/80 transition-colors cursor-pointer">
                    <img src={album.coverArt} alt={album.name} className="w-full h-full object-cover" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Liked Songs Section */}
      {(filter === 'all') && filteredTracks.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Liked Songs</h2>
          {viewMode === 'list' || viewMode === 'compact' ? (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            <div className="space-y-2">
              {filteredTracks.map((track) => (
                <Link key={track.id} href={`/track/${track.id}`}>
                  <div className="flex items-center gap-4 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer group">
                    {track.coverArt && (
<<<<<<< HEAD
                      <img
                        src={track.coverArt}
                        alt={track.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate group-hover:text-spotify-green transition-colors">
                        {track.name}
                      </h3>
                      <p className="text-sm text-spotify-text-gray truncate">
                        {track.artist} • {track.album}
                      </p>
=======
                      <img src={track.coverArt} alt={track.name} className="w-16 h-16 object-cover rounded" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate group-hover:text-spotify-green transition-colors">{track.name}</h3>
                      <p className="text-sm text-spotify-text-gray truncate">{track.artist} • {track.album}</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredTracks.map((track) => (
                <Link key={track.id} href={`/track/${track.id}`}>
                  <div className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80 transition-colors cursor-pointer group">
                    {track.coverArt && (
<<<<<<< HEAD
                      <img
                        src={track.coverArt}
                        alt={track.name}
                        className="w-full aspect-square object-cover rounded mb-3 shadow-lg group-hover:shadow-xl transition-shadow"
                      />
                    )}
                    <h3 className="font-semibold text-sm truncate">
                      {track.name}
                    </h3>
                    <p className="text-xs text-spotify-text-gray truncate">
                      {track.artist}
                    </p>
=======
                      <img src={track.coverArt} alt={track.name} className="w-full aspect-square object-cover rounded mb-3 shadow-lg group-hover:shadow-xl transition-shadow" />
                    )}
                    <h3 className="font-semibold text-sm truncate">{track.name}</h3>
                    <p className="text-xs text-spotify-text-gray truncate">{track.artist}</p>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Empty States */}
<<<<<<< HEAD
      {filter === "all" &&
        savedPlaylists.length === 0 &&
        filteredAlbums.length === 0 &&
        filteredTracks.length === 0 && (
          <EmptyState
            icon={Music}
            title="Your Library is empty"
            description="Start exploring music and save your favorites. They'll appear here for easy access."
            action={{
              label: "Explore Music",
              onClick: () => (window.location.href = "/"),
            }}
          />
        )}

      {filter === "playlists" && savedPlaylists.length === 0 && (
=======
      {filter === 'all' && savedPlaylists.length === 0 && filteredAlbums.length === 0 && filteredTracks.length === 0 && (
        <EmptyState
          icon={Music}
          title="Your Library is empty"
          description="Start exploring music and save your favorites. They'll appear here for easy access."
          action={{
            label: 'Explore Music',
            onClick: () => window.location.href = '/'
          }}
        />
      )}
      
      {(filter === 'playlists') && savedPlaylists.length === 0 && (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        <EmptyState
          icon={Music}
          title="No playlists yet"
          description="Create playlists to organize your favorite music. They'll appear here once you've created or saved some."
          action={{
<<<<<<< HEAD
            label: "Explore Playlists",
            onClick: () => (window.location.href = "/"),
=======
            label: 'Explore Playlists',
            onClick: () => window.location.href = '/'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        />
      )}

<<<<<<< HEAD
      {filter === "albums" && filteredAlbums.length === 0 && (
=======
      {(filter === 'albums') && filteredAlbums.length === 0 && (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        <EmptyState
          icon={Disc}
          title="No albums saved"
          description="Save albums you love to access them quickly. Click the heart icon on any album to save it."
          action={{
<<<<<<< HEAD
            label: "Browse Albums",
            onClick: () => (window.location.href = "/"),
=======
            label: 'Browse Albums',
            onClick: () => window.location.href = '/'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        />
      )}

<<<<<<< HEAD
      {filter === "artists" && (
=======
      {(filter === 'artists') && (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        <EmptyState
          icon={User}
          title="No artists followed"
          description="Follow your favorite artists to get updates and see their latest releases here."
          action={{
<<<<<<< HEAD
            label: "Discover Artists",
            onClick: () => (window.location.href = "/"),
=======
            label: 'Discover Artists',
            onClick: () => window.location.href = '/'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
        />
      )}

<<<<<<< HEAD
      {filter === "all" &&
        savedPlaylists.length === 0 &&
        filteredAlbums.length === 0 &&
        filteredTracks.length > 0 && (
          <EmptyState
            icon={Music}
            title="Start building your library"
            description="Save playlists, albums, and follow artists to organize your music collection."
          />
        )}
=======
      {(filter === 'all' && savedPlaylists.length === 0 && filteredAlbums.length === 0 && filteredTracks.length > 0) && (
        <EmptyState
          icon={Music}
          title="Start building your library"
          description="Save playlists, albums, and follow artists to organize your music collection."
        />
      )}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    </div>
  );
}
