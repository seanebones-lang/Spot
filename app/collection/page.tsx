'use client';

import { useState } from 'react';
import { useLibraryStore } from '@/stores/libraryStore';
import { mockData } from '@/lib/data';

export default function CollectionPage() {
  const [filter, setFilter] = useState<'all' | 'playlists' | 'artists' | 'albums'>('all');
  const { savedTracks, savedAlbums, savedPlaylists } = useLibraryStore();
  const albums = mockData.getAlbums();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Your Library</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-white text-black' : 'bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('playlists')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'playlists' ? 'bg-white text-black' : 'bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80'
            }`}
          >
            Playlists
          </button>
          <button
            onClick={() => setFilter('artists')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'artists' ? 'bg-white text-black' : 'bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80'
            }`}
          >
            Artists
          </button>
          <button
            onClick={() => setFilter('albums')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'albums' ? 'bg-white text-black' : 'bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80'
            }`}
          >
            Albums
          </button>
        </div>
      </div>

      {(filter === 'all' || filter === 'playlists') && savedPlaylists.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {savedPlaylists.map((playlist) => (
              <div key={playlist.id} className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80 transition-colors">
                <img src={playlist.coverArt} alt={playlist.name} className="w-full aspect-square object-cover rounded mb-3" />
                <h3 className="font-semibold text-sm truncate">{playlist.name}</h3>
                <p className="text-xs text-spotify-text-gray">{playlist.owner}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {(filter === 'all' || filter === 'albums') && savedAlbums.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {albums.filter(album => savedAlbums.includes(album.id)).map((album) => (
              <div key={album.id} className="bg-spotify-light-gray rounded-lg p-4 hover:bg-spotify-light-gray/80 transition-colors">
                <img src={album.coverArt} alt={album.name} className="w-full aspect-square object-cover rounded mb-3" />
                <h3 className="font-semibold text-sm truncate">{album.name}</h3>
                <p className="text-xs text-spotify-text-gray truncate">{album.artist.name}</p>
              </div>
            ))}
          </div>
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
