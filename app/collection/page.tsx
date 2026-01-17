'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Grid3x3, List, LayoutGrid } from 'lucide-react';
import { useLibraryStore } from '@/stores/libraryStore';
import { mockData } from '@/lib/data';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'playlists' | 'artists' | 'albums';
type ViewMode = 'grid' | 'list' | 'compact';

export default function CollectionPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const { savedTracks, savedAlbums, savedPlaylists } = useLibraryStore();
  const albums = mockData.getAlbums();

  // Filter and search logic
  const filteredPlaylists = useMemo(() => {
    let items = savedPlaylists;
    if (searchQuery) {
      items = items.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.owner.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return items;
  }, [savedPlaylists, searchQuery]);

  const filteredAlbums = useMemo(() => {
    let items = albums.filter(album => savedAlbums.includes(album.id));
    if (searchQuery) {
      items = items.filter(a => 
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return items;
  }, [albums, savedAlbums, searchQuery]);

  const filteredTracks = useMemo(() => {
    let items = savedTracks;
    if (searchQuery) {
      items = items.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.album.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return items;
  }, [savedTracks, searchQuery]);

  return (
    <div className="p-8">
      {/* Header with Search and View Controls */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">Your Library</h1>
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative w-64">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-spotify-text-gray" />
            <input
              type="text"
              placeholder="Search in Your Library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-spotify-light-gray rounded-full pl-10 pr-4 py-2 text-white placeholder:text-spotify-text-gray focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          
          {/* View Mode Toggles */}
          <div className="flex items-center gap-1 bg-spotify-light-gray rounded-full p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-full transition-colors",
                viewMode === 'grid' ? 'bg-white text-black' : 'text-spotify-text-gray hover:text-white'
              )}
              aria-label="Grid view"
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-full transition-colors",
                viewMode === 'list' ? 'bg-white text-black' : 'text-spotify-text-gray hover:text-white'
              )}
              aria-label="List view"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode('compact')}
              className={cn(
                "p-2 rounded-full transition-colors",
                viewMode === 'compact' ? 'bg-white text-black' : 'text-spotify-text-gray hover:text-white'
              )}
              aria-label="Compact view"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            filter === 'all' ? 'bg-white text-black' : 'bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80'
          )}
        >
          All
        </button>
        <button
          onClick={() => setFilter('playlists')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            filter === 'playlists' ? 'bg-white text-black' : 'bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80'
          )}
        >
          Playlists
        </button>
        <button
          onClick={() => setFilter('artists')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            filter === 'artists' ? 'bg-white text-black' : 'bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80'
          )}
        >
          Artists
        </button>
        <button
          onClick={() => setFilter('albums')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            filter === 'albums' ? 'bg-white text-black' : 'bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80'
          )}
        >
          Albums
        </button>
      </div>

      {/* Playlists Section */}
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
            <div className="space-y-2">
              {filteredTracks.map((track) => (
                <Link key={track.id} href={`/track/${track.id}`}>
                  <div className="flex items-center gap-4 p-2 rounded hover:bg-white/10 transition-colors cursor-pointer group">
                    {track.coverArt && (
                      <img src={track.coverArt} alt={track.name} className="w-16 h-16 object-cover rounded" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base truncate group-hover:text-spotify-green transition-colors">{track.name}</h3>
                      <p className="text-sm text-spotify-text-gray truncate">{track.artist} • {track.album}</p>
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
                      <img src={track.coverArt} alt={track.name} className="w-full aspect-square object-cover rounded mb-3 shadow-lg group-hover:shadow-xl transition-shadow" />
                    )}
                    <h3 className="font-semibold text-sm truncate">{track.name}</h3>
                    <p className="text-xs text-spotify-text-gray truncate">{track.artist}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {(filter === 'all' || filter === 'playlists') && savedPlaylists.length === 0 && (
        <div className="text-center py-16">
          <p className="text-spotify-text-gray text-lg">No saved playlists yet</p>
          <p className="text-spotify-text-gray text-sm mt-2">Start exploring and save your favorites!</p>
        </div>
      )}
    </div>
  );
}
