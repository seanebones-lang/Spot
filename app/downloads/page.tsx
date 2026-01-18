'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Download, Check } from 'lucide-react';
import { mockData } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function DownloadsPage() {
  const tracks = mockData.getTracks();
  const albums = mockData.getAlbums();
  const playlists = mockData.getPlaylists();

  // Mock downloaded content
  const downloadedTracks = tracks.slice(0, 10);
  const downloadedAlbums = albums.slice(0, 6);
  const downloadedPlaylists = playlists.slice(0, 4);

  return (
    <div 
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212',
        padding: '32px',
        color: '#FFFFFF'
      }}
    >
      <div 
        className="mb-8"
        style={{ marginBottom: '32px' }}
      >
        <h1 
          className="text-4xl font-bold mb-2"
          style={{
            fontSize: '32px',
            lineHeight: '36px',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '8px'
          }}
        >
          Downloads
        </h1>
        <p 
          className="text-spotify-text-gray"
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            color: '#B3B3B3'
          }}
        >
          Your offline content
        </p>
      </div>

      {downloadedTracks.length === 0 && downloadedAlbums.length === 0 && downloadedPlaylists.length === 0 ? (
        <div 
          className="text-center py-24"
          style={{
            textAlign: 'center',
            padding: '96px 16px'
          }}
        >
          <Download 
            className="w-16 h-16 text-spotify-text-gray mx-auto mb-4"
            style={{
              width: '64px',
              height: '64px',
              color: '#B3B3B3',
              margin: '0 auto 16px auto'
            }}
          />
          <p 
            className="text-spotify-text-gray text-xl font-medium mb-2"
            style={{
              fontSize: '20px',
              lineHeight: '28px',
              fontWeight: 600,
              color: '#B3B3B3',
              marginBottom: '8px'
            }}
          >
            No downloads yet
          </p>
          <p 
            className="text-spotify-text-gray text-sm"
            style={{
              fontSize: '14px',
              lineHeight: '20px',
              color: '#B3B3B3'
            }}
          >
            Download music to listen offline
          </p>
        </div>
      ) : (
        <div 
          className="space-y-12"
          style={{ gap: '48px' }}
        >
          {downloadedTracks.length > 0 && (
            <section>
              <h2 
                className="text-2xl font-bold mb-4"
                style={{
                  fontSize: '24px',
                  lineHeight: '28px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}
              >
                Songs
              </h2>
              <div 
                className="space-y-2"
                style={{ gap: '8px' }}
              >
                {downloadedTracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg group"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '12px 16px',
                      borderRadius: '4px',
                      transition: 'background-color 200ms ease-out'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div 
                      className="w-12 h-12 bg-spotify-dark-gray rounded flex-shrink-0 relative"
                      style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#282828',
                        borderRadius: '4px',
                        flexShrink: 0,
                        position: 'relative'
                      }}
                    >
                      {track.coverArt && (
                        <Image
                          src={track.coverArt}
                          alt={track.name}
                          fill
                          className="object-cover rounded"
                          style={{ borderRadius: '4px' }}
                        />
                      )}
                    </div>
                    <div 
                      className="flex-1 min-w-0"
                      style={{
                        flex: '1 1 0%',
                        minWidth: 0
                      }}
                    >
                      <div 
                        className="font-medium text-white truncate"
                        style={{
                          fontSize: '14px',
                          lineHeight: '20px',
                          fontWeight: 400,
                          color: '#FFFFFF'
                        }}
                      >
                        {track.name}
                      </div>
                      <div 
                        className="text-sm text-spotify-text-gray truncate"
                        style={{
                          fontSize: '13px',
                          lineHeight: '16px',
                          color: '#B3B3B3'
                        }}
                      >
                        {track.artist}
                      </div>
                    </div>
                    <Check 
                      className="w-5 h-5 text-spotify-green flex-shrink-0"
                      style={{
                        width: '20px',
                        height: '20px',
                        color: '#7209B7',
                        flexShrink: 0
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {downloadedAlbums.length > 0 && (
            <section>
              <h2 
                className="text-2xl font-bold mb-4"
                style={{
                  fontSize: '24px',
                  lineHeight: '28px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}
              >
                Albums
              </h2>
              <div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                style={{ gap: '24px' }}
              >
                {downloadedAlbums.map((album) => (
                  <Link
                    key={album.id}
                    href={`/album/${album.id}`}
                    className="group bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg p-4 transition-all duration-200"
                    style={{
                      backgroundColor: '#181818',
                      borderRadius: '8px',
                      padding: '16px',
                      transition: 'background-color 200ms ease-out',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#282828';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#181818';
                    }}
                  >
                    <div 
                      className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray"
                      style={{
                        borderRadius: '4px',
                        aspectRatio: '1',
                        marginBottom: '16px',
                        backgroundColor: '#282828'
                      }}
                    >
                      {album.coverArt ? (
                        <Image
                          src={album.coverArt}
                          alt={album.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          style={{
                            borderRadius: '4px',
                            transition: 'transform 200ms ease-out'
                          }}
                        />
                      ) : (
                        <div 
                          className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #7209B7 0%, #181818 100%)',
                            borderRadius: '4px'
                          }}
                        >
                          <span className="text-4xl" style={{ fontSize: '32px' }}>💿</span>
                        </div>
                      )}
                    </div>
                    <h3 
                      className="font-semibold text-sm text-white mb-1 truncate group-hover:underline"
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        marginBottom: '4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      {album.name}
                    </h3>
                    <p 
                      className="text-xs text-spotify-text-gray truncate"
                      style={{
                        fontSize: '13px',
                        lineHeight: '16px',
                        color: '#B3B3B3'
                      }}
                    >
                      {album.artist.name}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {downloadedPlaylists.length > 0 && (
            <section>
              <h2 
                className="text-2xl font-bold mb-4"
                style={{
                  fontSize: '24px',
                  lineHeight: '28px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '16px'
                }}
              >
                Playlists
              </h2>
              <div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
                style={{ gap: '24px' }}
              >
                {downloadedPlaylists.map((playlist) => (
                  <Link
                    key={playlist.id}
                    href={`/playlist/${playlist.id}`}
                    className="group bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg p-4 transition-all duration-200"
                    style={{
                      backgroundColor: '#181818',
                      borderRadius: '8px',
                      padding: '16px',
                      transition: 'background-color 200ms ease-out',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#282828';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#181818';
                    }}
                  >
                    <div 
                      className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray"
                      style={{
                        borderRadius: '4px',
                        aspectRatio: '1',
                        marginBottom: '16px',
                        backgroundColor: '#282828'
                      }}
                    >
                      {playlist.coverArt ? (
                        <Image
                          src={playlist.coverArt}
                          alt={playlist.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          style={{
                            borderRadius: '4px',
                            transition: 'transform 200ms ease-out'
                          }}
                        />
                      ) : (
                        <div 
                          className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(135deg, #7209B7 0%, #181818 100%)',
                            borderRadius: '4px'
                          }}
                        >
                          <span className="text-4xl" style={{ fontSize: '32px' }}>🎵</span>
                        </div>
                      )}
                    </div>
                    <h3 
                      className="font-semibold text-sm text-white mb-1 truncate group-hover:underline"
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        marginBottom: '4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      {playlist.name}
                    </h3>
                    <p 
                      className="text-xs text-spotify-text-gray truncate"
                      style={{
                        fontSize: '13px',
                        lineHeight: '16px',
                        color: '#B3B3B3'
                      }}
                    >
                      {playlist.owner}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}