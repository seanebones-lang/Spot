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

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      // Issue-10: Add min/max width constraints (min: 200px, max: 50% of viewport)
      const minWidth = 200;
      const maxWidth = window.innerWidth * 0.5;
      const newWidth = Math.max(minWidth, Math.min(maxWidth, e.clientX));
      setLeftSidebarWidth(newWidth);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isResizing || e.touches.length === 0) return;
      // Issue-10: Add min/max width constraints
      const minWidth = 200;
      const maxWidth = window.innerWidth * 0.5;
      const newWidth = Math.max(minWidth, Math.min(maxWidth, e.touches[0].clientX));
      setLeftSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    const handleTouchEnd = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('touchcancel', handleTouchEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('touchcancel', handleTouchEnd);
      };
    }
  }, [isResizing, setLeftSidebarWidth]);

  return (
    <>
      <div 
        className={cn(
          "fixed left-0 top-0 bottom-[90px] bg-spotify-dark-gray text-white flex flex-col z-40",
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

      {/* Logo - Exact Spotify: padding 20px 24px (or 16px when collapsed) */}
      <div 
        className={cn(
          leftSidebarWidth <= 80 ? "p-4" : "px-6 py-5"
        )}
      >
        <Link 
          href="/" 
          className="flex items-center no-underline"
        >
          {leftSidebarWidth > 100 && (
            <span 
              className="text-2xl font-bold whitespace-nowrap text-white"
              style={{ 
                fontSize: '24px',
                lineHeight: '28px'
              }}
            >
              EmPulse Music
            </span>
          )}
        </Link>
      </div>

      {/* Navigation - Exact Spotify: padding 0 8px, gap 16px, font 14px, line-height 20px */}
      <nav className="px-2 mb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
            (item.href === '/' && pathname === '/') ||
            (item.href === '/search' && pathname?.startsWith('/search')) ||
            (item.href === '/collection' && pathname?.startsWith('/collection'));
          const isCollapsed = leftSidebarWidth <= 100;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded transition-all duration-200 gpu-accelerated mb-1 no-underline",
                isActive 
                  ? "bg-spotify-light-gray" 
                  : "hover:bg-white/10",
                isCollapsed 
                  ? "flex flex-col items-center justify-center py-2 px-1 gap-1" 
                  : "flex items-center py-3 px-4 gap-4"
              )}
              style={{
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: isActive ? 700 : 400,
                lineHeight: '20px'
              }}
              title={leftSidebarCollapsed && !isCollapsed ? item.label : undefined}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon 
                size={24} 
                className={cn(
                  "flex-shrink-0 transition-colors duration-200 w-6 h-6",
                  isActive 
                    ? "text-white" 
                    : "text-[#535353] group-hover:text-white"
                )}
              />
              {!isCollapsed ? (
                <span 
                  className={cn(
                    "whitespace-nowrap transition-colors duration-200",
                    isActive ? "text-white font-bold" : "text-spotify-text-gray group-hover:text-white"
                  )}
                  style={{ 
                    fontSize: '14px',
                    lineHeight: '20px'
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <span 
                  className={cn(
                    "transition-all duration-100 text-center block",
                    isActive ? "text-white" : "text-[#535353] group-hover:text-white"
                  )}
                  style={{
                    fontSize: '11px',
                    lineHeight: '15px',
                    height: '15px',
                    transform: 'scale(0.97)'
                  }}
                >
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

      {/* Playlists Section - Exact Spotify Styling */}
      {leftSidebarWidth > 100 && sortedPlaylists.length > 0 && (
        <div 
          className="flex-1 overflow-y-auto px-2 mb-2 custom-scrollbar"
          style={{ 
            padding: '0 8px',
            marginBottom: '8px',
            minHeight: 0
          }}
        >
          <div 
            className="flex items-center justify-between mb-2 px-2"
            style={{ 
              padding: '0 8px',
              marginBottom: '8px'
            }}
          >
            <h3 
              className="text-[11px] leading-4 font-bold text-spotify-text-gray uppercase tracking-wider"
              style={{
                letterSpacing: '0.1em'
              }}
            >
              Playlists
            </h3>
            <Link
              href="/collection"
              className="text-[11px] leading-4 text-spotify-text-gray hover:text-white transition-colors duration-200 no-underline"
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
                  style={{ gap: '8px' }}
                >
                  <Link
                    href={`/playlist/${playlist.id}`}
                    className={cn(
                      "flex-1 flex items-center gap-2 rounded transition-colors duration-200 min-w-0 py-1.5 px-2 no-underline",
                      isActive
                        ? "bg-spotify-light-gray text-white font-bold"
                        : "text-spotify-text-gray hover:text-white hover:bg-white/10 font-normal"
                    )}
                    style={{
                      borderRadius: '4px',
                      fontSize: '14px',
                      lineHeight: '20px'
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div 
                      className={cn(
                        "w-4 h-4 rounded flex-shrink-0 overflow-hidden",
                        !playlist.coverArt && "bg-spotify-light-gray"
                      )}
                      style={{ 
                        borderRadius: '2px'
                      }}
                    >
                      {playlist.coverArt && (
                        <img 
                          src={playlist.coverArt} 
                          alt="" 
                          className="w-full h-full object-cover"
                          style={{ borderRadius: '2px' }}
                        />
                      )}
                    </div>
                    <span 
                      className={cn(
                        "truncate",
                        isActive ? "text-white font-bold" : "text-inherit"
                      )}
                      style={{
                        fontSize: '14px',
                        lineHeight: '20px'
                      }}
                    >
                      {playlist.name}
                    </span>
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
                      "opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity duration-200 bg-transparent border-none cursor-pointer",
                      isPinned && "opacity-100 text-spotify-green"
                    )}
                    style={{
                      borderRadius: '2px'
                    }}
                    title={isPinned ? "Unpin playlist" : "Pin playlist"}
                    aria-label={isPinned ? "Unpin playlist" : "Pin playlist"}
                  >
                    <Pin 
                      size={14} 
                      className={cn(
                        "w-3.5 h-3.5",
                        isPinned && "fill-current text-spotify-green"
                      )}
                    />
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
          onTouchStart={handleTouchStart}
          className={cn(
            "fixed top-0 bottom-[90px] w-1 bg-transparent hover:bg-spotify-green/60 cursor-col-resize z-[60] transition-all touch-none",
            isResizing && "bg-spotify-green/60 w-1"
          )}
          style={{ left: `${leftSidebarWidth}px`, touchAction: 'none' }}
        />
      )}
    </>
  );
}
