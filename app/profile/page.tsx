'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLibraryStore } from '@/stores/libraryStore';
import { mockData } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const [filter, setFilter] = useState<'all' | 'playlists' | 'artists' | 'albums'>('all');
  const { savedTracks, savedAlbums, savedPlaylists } = useLibraryStore();
  const albums = mockData.getAlbums();
  const artists = mockData.getArtists();

  // Mock user data - replace with actual user data from auth store
  const userName = 'Bones';
  const userEmail = 'bones@nextEleven.com';
  const followers = 1247;
  const following = 89;
  const publicPlaylists = savedPlaylists.length;

  // Filter saved albums
  const savedAlbumsData = albums.filter(album => savedAlbums.includes(album.id));
  
  // Get unique artists from saved albums and playlists
  const savedArtistsData = artists.filter(artist => 
    savedAlbumsData.some(album => album.artist.id === artist.id) ||
    savedPlaylists.some(playlist => playlist.owner.includes(artist.name))
  );

  return (
    <div className="min-h-screen bg-spotify-dark text-white">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-b from-[#2a2a2a] to-spotify-dark pt-16 pb-8 px-8">
        <div className="flex items-end gap-6">
          {/* Avatar */}
          <div className="w-[232px] h-[232px] bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full flex items-center justify-center flex-shrink-0 shadow-2xl">
            <span className="text-white text-7xl font-bold">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0 pb-2">
            <div className="mb-4">
              <h1 className="text-6xl font-bold mb-4 tracking-tight">{userName}</h1>
              <div className="flex items-center gap-6 text-sm text-spotify-text-gray">
                <span className="hover:text-white transition-colors cursor-pointer">
                  <span className="font-medium text-white">{followers.toLocaleString()}</span> followers
                </span>
                <span className="hover:text-white transition-colors cursor-pointer">
                  <span className="font-medium text-white">{following.toLocaleString()}</span> following
                </span>
                <span className="hover:text-white transition-colors cursor-pointer">
                  <span className="font-medium text-white">{publicPlaylists}</span> public playlists
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="sticky top-16 z-30 bg-spotify-dark border-b border-white/10 px-8 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              filter === 'all' 
                ? 'bg-white text-black hover:bg-[#f5f5f5]' 
                : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter('playlists')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              filter === 'playlists' 
                ? 'bg-white text-black hover:bg-[#f5f5f5]' 
                : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
            )}
          >
            Playlists
          </button>
          <button
            onClick={() => setFilter('artists')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              filter === 'artists' 
                ? 'bg-white text-black hover:bg-[#f5f5f5]' 
                : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
            )}
          >
            Artists
          </button>
          <button
            onClick={() => setFilter('albums')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              filter === 'albums' 
                ? 'bg-white text-black hover:bg-[#f5f5f5]' 
                : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
            )}
          >
            Albums
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-8 py-6">
        {/* Playlists Section */}
        {(filter === 'all' || filter === 'playlists') && savedPlaylists.length > 0 && (
          <section className="mb-12">
            {filter === 'all' && (
              <h2 className="text-2xl font-bold mb-6">Playlists</h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {savedPlaylists.map((playlist) => (
                <Link
                  key={playlist.id}
                  href={`/playlist/${playlist.id}`}
                  className="group bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg p-4 transition-colors cursor-pointer"
                >
                  <div className="relative w-full aspect-square mb-4 rounded overflow-hidden shadow-lg bg-spotify-dark-gray">
                    {playlist.coverArt ? (
                      <img
                        src={playlist.coverArt}
                        alt={playlist.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center">
                        <span className="text-4xl">🎵</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-1 truncate group-hover:underline">
                    {playlist.name}
                  </h3>
                  <p className="text-xs text-spotify-text-gray line-clamp-2">
                    {playlist.description || `Playlist • ${playlist.owner}`}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Artists Section */}
        {(filter === 'all' || filter === 'artists') && savedArtistsData.length > 0 && (
          <section className="mb-12">
            {filter === 'all' && (
              <h2 className="text-2xl font-bold mb-6">Artists</h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {savedArtistsData.map((artist) => (
                <Link
                  key={artist.id}
                  href={`/artist/${artist.id}`}
                  className="group bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg p-4 transition-colors cursor-pointer text-center"
                >
                  <div className="relative w-full aspect-square mb-4 rounded-full overflow-hidden shadow-lg bg-spotify-dark-gray mx-auto max-w-[200px]">
                    {artist.image ? (
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center">
                        <span className="text-4xl">{artist.name.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-1 truncate group-hover:underline">
                    {artist.name}
                  </h3>
                  <p className="text-xs text-spotify-text-gray">Artist</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Albums Section */}
        {(filter === 'all' || filter === 'albums') && savedAlbumsData.length > 0 && (
          <section className="mb-12">
            {filter === 'all' && (
              <h2 className="text-2xl font-bold mb-6">Albums</h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {savedAlbumsData.map((album) => (
                <Link
                  key={album.id}
                  href={`/album/${album.id}`}
                  className="group bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg p-4 transition-colors cursor-pointer"
                >
                  <div className="relative w-full aspect-square mb-4 rounded overflow-hidden shadow-lg bg-spotify-dark-gray">
                    {album.coverArt ? (
                      <img
                        src={album.coverArt}
                        alt={album.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center">
                        <span className="text-4xl">💿</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm text-white mb-1 truncate group-hover:underline">
                    {album.name}
                  </h3>
                  <p className="text-xs text-spotify-text-gray truncate">
                    {album.artist.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {((filter === 'playlists' && savedPlaylists.length === 0) ||
          (filter === 'artists' && savedArtistsData.length === 0) ||
          (filter === 'albums' && savedAlbumsData.length === 0) ||
          (filter === 'all' && savedPlaylists.length === 0 && savedArtistsData.length === 0 && savedAlbumsData.length === 0)) && (
          <div className="text-center py-24">
            <p className="text-spotify-text-gray text-xl font-medium mb-2">
              {filter === 'all' ? 'No content yet' : `No ${filter} yet`}
            </p>
            <p className="text-spotify-text-gray text-sm">
              Start exploring and save your favorites!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
