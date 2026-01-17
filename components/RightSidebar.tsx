'use client';

import { X, Check } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { usePlayerStore } from '@/stores/playerStore';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function RightSidebar() {
  const { rightSidebarOpen, setRightSidebarOpen } = useUIStore();
  const { currentTrack } = usePlayerStore();

  // Mock data - replace with actual track/album data
  const playlistName = 'Coding';
  const albumName = currentTrack?.album || 'Echos of choices';
  const artistName = currentTrack?.artist || 'NextEleven Label Showcase';

  return (
    <div
      className={cn(
        "fixed right-0 top-16 bottom-player-height bg-spotify-dark-gray border-l border-white/10 transition-transform duration-300 ease-in-out z-30 overflow-y-auto sidebar-scrollbar",
        rightSidebarOpen ? "translate-x-0 w-80" : "translate-x-full w-80"
      )}
    >
      {rightSidebarOpen && (
        <>
          {/* Close Button */}
          <button
            onClick={() => setRightSidebarOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray rounded-full transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="p-6">
            {/* Playlist/Album Title */}
            <h2 className="text-sm font-medium text-white mb-6 uppercase tracking-wider">
              {playlistName}
            </h2>

            {/* Album Art & Info */}
            {currentTrack && (
              <div className="mb-6">
                <div className="w-full aspect-square mb-4 rounded-lg overflow-hidden bg-spotify-light-gray">
                  {currentTrack.coverArt ? (
                    <img
                      src={currentTrack.coverArt}
                      alt={albumName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-spotify-green to-spotify-dark-gray flex items-center justify-center">
                      <span className="text-6xl">🎵</span>
                    </div>
                  )}
                </div>
                
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-white mb-1">{albumName}</h3>
                  <Link
                    href={`/artist/${currentTrack.artistId || ''}`}
                    className="text-sm text-spotify-text-gray hover:text-white hover:underline transition-colors"
                  >
                    {artistName}
                  </Link>
                </div>

                {/* Check Icon */}
                <div className="flex items-center gap-2 mt-3">
                  <Check className="w-5 h-5 text-spotify-green" />
                  <span className="text-sm text-spotify-text-gray">Currently playing</span>
                </div>
              </div>
            )}

            {/* Credits Section */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-white">Credits</h3>
                <button className="text-xs text-spotify-text-gray hover:text-white transition-colors">
                  Show all
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white font-medium">{artistName}</div>
                    <div className="text-xs text-spotify-text-gray">Main Artist</div>
                  </div>
                  <button className="text-xs text-spotify-text-gray hover:text-white px-3 py-1 border border-white/20 rounded-full hover:border-white/40 transition-colors">
                    Unfollow
                  </button>
                </div>

                {currentTrack?.composer && (
                  <div>
                    <div className="text-sm text-white font-medium">{currentTrack.composer}</div>
                    <div className="text-xs text-spotify-text-gray">Composer, Lyricist</div>
                  </div>
                )}
              </div>
            </div>

            {/* Next in Queue Section */}
            <div className="border-t border-white/10 pt-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-white">Next in queue</h3>
                <button className="text-xs text-spotify-text-gray hover:text-white transition-colors">
                  Open queue
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
