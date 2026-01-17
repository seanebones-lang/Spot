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
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Downloads</h1>
        <p className="text-spotify-text-gray">Your offline content</p>
      </div>

      {downloadedTracks.length === 0 && downloadedAlbums.length === 0 && downloadedPlaylists.length === 0 ? (
        <div className="text-center py-24">
          <Download className="w-16 h-16 text-spotify-text-gray mx-auto mb-4" />
          <p className="text-spotify-text-gray text-xl font-medium mb-2">No downloads yet</p>
          <p className="text-spotify-text-gray text-sm">Download music to listen offline</p>
        </div>
      ) : (
        <div className="space-y-12">
          {downloadedTracks.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Songs</h2>
              <div className="space-y-2">
                {downloadedTracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg group"
                  >
                    <div className="w-12 h-12 bg-spotify-dark-gray rounded flex-shrink-0 relative">
                      {track.coverArt && (
                        <Image
                          src={track.coverArt}
                          alt={track.name}
                          fill
                          className="object-cover rounded"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">{track.name}</div>
                      <div className="text-sm text-spotify-text-gray truncate">{track.artist}</div>
                    </div>
                    <Check className="w-5 h-5 text-spotify-green flex-shrink-0" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {downloadedAlbums.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Albums</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {downloadedAlbums.map((album) => (
                  <Link
                    key={album.id}
                    href={`/album/${album.id}`}
                    className="group bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg p-4 transition-colors"
                  >
                    <div className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray">
                      {album.coverArt ? (
                        <Image
                          src={album.coverArt}
                          alt={album.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <p className="text-xs text-spotify-text-gray truncate">{album.artist.name}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {downloadedPlaylists.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {downloadedPlaylists.map((playlist) => (
                  <Link
                    key={playlist.id}
                    href={`/playlist/${playlist.id}`}
                    className="group bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg p-4 transition-colors"
                  >
                    <div className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray">
                      {playlist.coverArt ? (
                        <Image
                          src={playlist.coverArt}
                          alt={playlist.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <p className="text-xs text-spotify-text-gray truncate">{playlist.owner}</p>
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