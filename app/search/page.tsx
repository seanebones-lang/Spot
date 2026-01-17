'use client';

import { useState } from 'react';
import { mockData } from '@/lib/data';
import { useSearchStore } from '@/stores/searchStore';
import PlayButton from '@/components/PlayButton';
import { usePlayerStore } from '@/stores/playerStore';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { addRecentSearch } = useSearchStore();
  const { setCurrentTrack, setIsPlaying, currentTrack, isPlaying } = usePlayerStore();
  
  const tracks = mockData.getTracks();
  const artists = mockData.getArtists();
  const playlists = mockData.getPlaylists();
  const albums = mockData.getAlbums();

  const filteredTracks = tracks.filter(track =>
    track.name.toLowerCase().includes(query.toLowerCase()) ||
    track.artist.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAlbums = albums.filter(album =>
    album.name.toLowerCase().includes(query.toLowerCase()) ||
    album.artist.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Search</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to play?"
          className="w-full bg-white rounded-full px-6 py-4 text-black text-lg focus:outline-none focus:ring-2 focus:ring-white"
        />
      </form>

      {query && (
        <>
          {/* Songs */}
          {filteredTracks.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Songs</h2>
              <div className="space-y-2">
                {filteredTracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg group"
                  >
                    <div className="w-12 h-12 bg-spotify-dark-gray rounded">
                      <img src={track.coverArt} alt={track.name} className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{track.name}</div>
                      <div className="text-sm text-spotify-text-gray">{track.artist}</div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayButton
                        isPlaying={currentTrack?.id === track.id && isPlaying}
                        onClick={() => {
                          setCurrentTrack(track);
                          setIsPlaying(true);
                        }}
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Artists */}
          {filteredArtists.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredArtists.map((artist) => (
                  <div key={artist.id} className="text-center">
                    <div className="w-full aspect-square rounded-full overflow-hidden mb-3">
                      <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-semibold">{artist.name}</h3>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Playlists */}
          {filteredPlaylists.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredPlaylists.map((playlist) => (
                  <div key={playlist.id} className="bg-spotify-light-gray rounded-lg p-4">
                    <img src={playlist.coverArt} alt={playlist.name} className="w-full aspect-square object-cover rounded mb-3" />
                    <h3 className="font-semibold text-sm truncate">{playlist.name}</h3>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Albums */}
          {filteredAlbums.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredAlbums.map((album) => (
                  <div key={album.id} className="bg-spotify-light-gray rounded-lg p-4">
                    <img src={album.coverArt} alt={album.name} className="w-full aspect-square object-cover rounded mb-3" />
                    <h3 className="font-semibold text-sm truncate">{album.name}</h3>
                    <p className="text-xs text-spotify-text-gray truncate">{album.artist.name}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {filteredTracks.length === 0 && filteredArtists.length === 0 && filteredPlaylists.length === 0 && filteredAlbums.length === 0 && (
            <div className="text-center py-16">
              <p className="text-spotify-text-gray text-lg">No results found for &quot;{query}&quot;</p>
            </div>
          )}
        </>
      )}

      {!query && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'R&B', 'Country', 'Indie', 'Metal', 'Punk', 'Blues'].map((genre) => (
            <div
              key={genre}
              className="bg-spotify-light-gray rounded-lg p-6 text-center hover:bg-spotify-light-gray/80 transition-colors cursor-pointer"
              onClick={() => setQuery(genre)}
            >
              <div className="text-2xl font-bold mb-2">{genre}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
