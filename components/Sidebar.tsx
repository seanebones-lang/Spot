'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Library, Heart, Radio, ChevronLeft, ChevronRight, Pin, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCheckInStore } from '@/stores/checkInStore';
import { usePointsStore } from '@/stores/pointsStore';
import { useUIStore } from '@/stores/uiStore';
import { useLibraryStore } from '@/stores/libraryStore';
import { mockData } from '@/lib/data';
import FriendsActivity from './FriendsActivity';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: Library, label: 'Your Library', href: '/collection' },
  { icon: Heart, label: 'Mood', href: '/mood' },
  { icon: Radio, label: 'Radio', href: '/radio' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { streak, lastCheckIn } = useCheckInStore();
  const { totalPoints } = usePointsStore();
  const { leftSidebarCollapsed, leftSidebarWidth, toggleLeftSidebar, setLeftSidebarWidth } = useUIStore();
  const { savedPlaylists, pinnedPlaylists, pinPlaylist, unpinPlaylist } = useLibraryStore();
  
  // Get all playlists (saved + default)
  const allPlaylists = [...mockData.getPlaylists(), ...savedPlaylists];
  
  // Sort: pinned first, then by name
  const sortedPlaylists = [...allPlaylists].sort((a, b) => {
    const aPinned = pinnedPlaylists.includes(a.id);
    const bPinned = pinnedPlaylists.includes(b.id);
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return a.name.localeCompare(b.name);
  });
  
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = e.clientX;
      setLeftSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, setLeftSidebarWidth]);

  return (
    <>
      <div 
        className={cn(
          "fixed left-0 top-0 bottom-player-height bg-spotify-dark-gray text-white flex flex-col z-40",
          isResizing ? "" : "transition-all duration-300 ease-in-out"
        )}
        style={{ 
          width: `${leftSidebarWidth}px`,
          borderRight: '1px solid #000000'
        }}
      >
      {/* Toggle Button */}
      <button
        onClick={toggleLeftSidebar}
        className="absolute -right-3 top-4 w-6 h-6 bg-spotify-light-gray hover:bg-spotify-light-gray/80 rounded-full flex items-center justify-center text-white shadow-lg z-10 transition-colors"
        aria-label={leftSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {leftSidebarCollapsed ? (
          <ChevronRight size={16} />
        ) : (
          <ChevronLeft size={16} />
        )}
      </button>

      {/* Logo */}
      <div className={cn("p-6", leftSidebarWidth <= 80 && "p-4")}>
        <Link href="/" className="flex items-center">
          {leftSidebarWidth > 100 && (
            <span className="text-xl font-bold whitespace-nowrap">EmPulse Music</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-3 mb-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-md transition-colors mb-1 group relative",
                isActive 
                  ? "bg-spotify-light-gray text-white" 
                  : "text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/50"
              )}
              title={leftSidebarCollapsed ? item.label : undefined}
            >
              <Icon size={24} className="flex-shrink-0" />
              {leftSidebarWidth > 100 && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
              {leftSidebarWidth <= 100 && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-spotify-dark-gray text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mental Health Hub */}
      {leftSidebarWidth > 100 && (
        <div className="px-3 mb-4">
          <Link
            href="/wellness"
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-md transition-colors",
              pathname === '/wellness'
                ? "bg-spotify-light-gray text-white" 
                : "text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/50"
            )}
          >
            <span className="font-medium">Mental Health Hub</span>
          </Link>
        </div>
      )}

      {/* Playlists Section */}
      {leftSidebarWidth > 100 && sortedPlaylists.length > 0 && (
        <div className="flex-1 overflow-y-auto px-3 mb-4 custom-scrollbar">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="text-xs font-bold text-spotify-text-gray uppercase tracking-wider">
              Playlists
            </h3>
            <Link
              href="/collection"
              className="text-spotify-text-gray hover:text-white transition-colors text-xs"
            >
              Show all
            </Link>
          </div>
          <div className="space-y-1">
            {sortedPlaylists.slice(0, 10).map((playlist) => {
              const isPinned = pinnedPlaylists.includes(playlist.id);
              const isActive = pathname === `/playlist/${playlist.id}`;
              return (
                <div
                  key={playlist.id}
                  className="group flex items-center gap-2"
                >
                  <Link
                    href={`/playlist/${playlist.id}`}
                    className={cn(
                      "flex-1 flex items-center gap-2 px-2 py-1.5 rounded transition-colors min-w-0",
                      isActive
                        ? "bg-spotify-light-gray text-white"
                        : "text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/50"
                    )}
                  >
                    <div className="w-4 h-4 bg-spotify-light-gray rounded flex-shrink-0">
                      {playlist.coverArt && (
                        <img src={playlist.coverArt} alt="" className="w-full h-full object-cover rounded" />
                      )}
                    </div>
                    <span className="text-sm truncate">{playlist.name}</span>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isPinned) {
                        unpinPlaylist(playlist.id);
                      } else {
                        pinPlaylist(playlist.id);
                      }
                    }}
                    className={cn(
                      "opacity-0 group-hover:opacity-100 p-1 text-spotify-text-gray hover:text-white transition-all",
                      isPinned && "opacity-100 text-spotify-green"
                    )}
                    title={isPinned ? "Unpin playlist" : "Pin playlist"}
                  >
                    <Pin size={14} className={cn(isPinned && "fill-current")} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Friends Activity */}
      {leftSidebarWidth > 200 && <FriendsActivity />}

      {/* Daily Check-in Widget */}
      {leftSidebarWidth > 100 && (
        <div className="px-3 mb-4 mt-auto">
          <Link
            href="/check-in"
            className="bg-gradient-to-r from-empulse-purple to-empulse-blue p-4 rounded-lg text-white"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">Daily Check-in</span>
              {streak > 0 && (
                <span className="text-xs bg-white/20 px-2 py-1 rounded">🔥 {streak}</span>
              )}
            </div>
            <div className="text-xs text-white/80">
              {lastCheckIn ? `${totalPoints} points` : 'Earn points today'}
            </div>
          </Link>
        </div>
      )}

      {/* User Profile */}
      {leftSidebarWidth > 100 && (
        <div className="px-3 pb-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-spotify-light-gray/50 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full"></div>
            <span className="text-sm font-medium">User</span>
          </div>
        </div>
      )}
      </div>
      
      {/* Resize Handle */}
      {leftSidebarWidth > 64 && (
        <div
          onMouseDown={handleMouseDown}
          className={cn(
            "fixed top-0 bottom-player-height w-1 bg-transparent hover:bg-spotify-green/60 cursor-col-resize z-[60] transition-all",
            isResizing && "bg-spotify-green/60 w-1"
          )}
          style={{ left: `${leftSidebarWidth}px` }}
        />
      )}
    </>
  );
}
