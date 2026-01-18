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
    <div 
      className="min-h-screen bg-spotify-dark text-white"
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#FFFFFF'
      }}
    >
      {/* Profile Header - Exact Spotify Style */}
      <div 
        className="relative bg-gradient-to-b from-[#2a2a2a] to-spotify-dark pt-16 pb-8 px-8"
        style={{
          position: 'relative',
          background: 'linear-gradient(180deg, #2a2a2a 0%, #121212 100%)',
          paddingTop: '64px',
          paddingBottom: '32px',
          paddingLeft: '32px',
          paddingRight: '32px'
        }}
      >
        <div 
          className="flex items-end gap-6"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '24px'
          }}
        >
          {/* Avatar - Exact Spotify Style */}
          <div 
            className="w-[232px] h-[232px] bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full flex items-center justify-center flex-shrink-0 shadow-2xl"
            style={{
              width: '232px',
              height: '232px',
              background: 'linear-gradient(135deg, #7209B7 0%, #457B9D 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
            }}
          >
            <span 
              className="text-white text-7xl font-bold"
              style={{
                color: '#FFFFFF',
                fontSize: '72px',
                lineHeight: '80px',
                fontWeight: 900
              }}
            >
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* User Info - Exact Spotify Style */}
          <div 
            className="flex-1 min-w-0 pb-2"
            style={{
              flex: '1 1 0%',
              minWidth: 0,
              paddingBottom: '8px'
            }}
          >
            <div className="mb-4" style={{ marginBottom: '16px' }}>
              <h1 
                className="text-6xl font-bold mb-4 tracking-tight"
                style={{
                  fontSize: '72px',
                  lineHeight: '80px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}
              >
                {userName}
              </h1>
              <div 
                className="flex items-center gap-6 text-sm text-spotify-text-gray"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#B3B3B3'
                }}
              >
                <span 
                  className="hover:text-white transition-colors cursor-pointer"
                  style={{
                    transition: 'color 200ms ease-out',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#B3B3B3';
                  }}
                >
                  <span 
                    className="font-medium text-white"
                    style={{
                      fontWeight: 600,
                      color: '#FFFFFF'
                    }}
                  >
                    {followers.toLocaleString()}
                  </span> followers
                </span>
                <span 
                  className="hover:text-white transition-colors cursor-pointer"
                  style={{
                    transition: 'color 200ms ease-out',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#B3B3B3';
                  }}
                >
                  <span 
                    className="font-medium text-white"
                    style={{
                      fontWeight: 600,
                      color: '#FFFFFF'
                    }}
                  >
                    {following.toLocaleString()}
                  </span> following
                </span>
                <span 
                  className="hover:text-white transition-colors cursor-pointer"
                  style={{
                    transition: 'color 200ms ease-out',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#B3B3B3';
                  }}
                >
                  <span 
                    className="font-medium text-white"
                    style={{
                      fontWeight: 600,
                      color: '#FFFFFF'
                    }}
                  >
                    {publicPlaylists}
                  </span> public playlists
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons - Exact Spotify Style */}
      <div 
        className="sticky top-16 z-30 bg-spotify-dark border-b border-white/10 px-8 py-4"
        style={{
          position: 'sticky',
          top: '64px',
          zIndex: 30,
          backgroundColor: '#121212',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '16px 32px'
        }}
      >
        <div 
          className="flex items-center gap-2"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "rounded-full font-medium transition-colors whitespace-nowrap",
              filter === 'all' 
                ? 'bg-white text-black hover:bg-[#f5f5f5]' 
                : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
            )}
            style={{
              padding: '6px 16px',
              borderRadius: '500px',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              transition: 'all 200ms ease-out',
              backgroundColor: filter === 'all' ? '#FFFFFF' : 'transparent',
              color: filter === 'all' ? '#000000' : '#B3B3B3',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (filter !== 'all') {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              } else {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== 'all') {
                e.currentTarget.style.color = '#B3B3B3';
                e.currentTarget.style.backgroundColor = 'transparent';
              } else {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }
            }}
          >
            All
          </button>
          <button
            onClick={() => setFilter('playlists')}
            className={cn(
              "rounded-full font-medium transition-colors whitespace-nowrap",
              filter === 'playlists' 
                ? 'bg-white text-black hover:bg-[#f5f5f5]' 
                : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
            )}
            style={{
              padding: '6px 16px',
              borderRadius: '500px',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              transition: 'all 200ms ease-out',
              backgroundColor: filter === 'playlists' ? '#FFFFFF' : 'transparent',
              color: filter === 'playlists' ? '#000000' : '#B3B3B3',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (filter !== 'playlists') {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              } else {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== 'playlists') {
                e.currentTarget.style.color = '#B3B3B3';
                e.currentTarget.style.backgroundColor = 'transparent';
              } else {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }
            }}
          >
            Playlists
          </button>
          <button
            onClick={() => setFilter('artists')}
            className={cn(
              "rounded-full font-medium transition-colors whitespace-nowrap",
              filter === 'artists' 
                ? 'bg-white text-black hover:bg-[#f5f5f5]' 
                : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
            )}
            style={{
              padding: '6px 16px',
              borderRadius: '500px',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              transition: 'all 200ms ease-out',
              backgroundColor: filter === 'artists' ? '#FFFFFF' : 'transparent',
              color: filter === 'artists' ? '#000000' : '#B3B3B3',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (filter !== 'artists') {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              } else {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== 'artists') {
                e.currentTarget.style.color = '#B3B3B3';
                e.currentTarget.style.backgroundColor = 'transparent';
              } else {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }
            }}
          >
            Artists
          </button>
          <button
            onClick={() => setFilter('albums')}
            className={cn(
              "rounded-full font-medium transition-colors whitespace-nowrap",
              filter === 'albums' 
                ? 'bg-white text-black hover:bg-[#f5f5f5]' 
                : 'bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10'
            )}
            style={{
              padding: '6px 16px',
              borderRadius: '500px',
              fontSize: '14px',
              lineHeight: '20px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              transition: 'all 200ms ease-out',
              backgroundColor: filter === 'albums' ? '#FFFFFF' : 'transparent',
              color: filter === 'albums' ? '#000000' : '#B3B3B3',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (filter !== 'albums') {
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              } else {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== 'albums') {
                e.currentTarget.style.color = '#B3B3B3';
                e.currentTarget.style.backgroundColor = 'transparent';
              } else {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }
            }}
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
