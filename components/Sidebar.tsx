'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Search, Library, Heart, Radio, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCheckInStore } from '@/stores/checkInStore';
import { usePointsStore } from '@/stores/pointsStore';
import { useUIStore } from '@/stores/uiStore';

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
  const { leftSidebarCollapsed, toggleLeftSidebar } = useUIStore();

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 bottom-player-height bg-spotify-dark-gray text-white flex flex-col transition-all duration-300 ease-in-out z-30",
        leftSidebarCollapsed ? "w-16" : "w-64"
      )}
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
      <div className={cn("p-6", leftSidebarCollapsed && "p-4")}>
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/empulseheart.png" 
            alt="EmPulse Music" 
            width={leftSidebarCollapsed ? 40 : 64} 
            height={leftSidebarCollapsed ? 40 : 64} 
            className="object-contain transition-all duration-300"
          />
          {!leftSidebarCollapsed && (
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
              {!leftSidebarCollapsed && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
              {leftSidebarCollapsed && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-spotify-dark-gray text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mental Health Hub */}
      {!leftSidebarCollapsed && (
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

      {/* Daily Check-in Widget */}
      {!leftSidebarCollapsed && (
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
      {!leftSidebarCollapsed && (
        <div className="px-3 pb-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-spotify-light-gray/50 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full"></div>
            <span className="text-sm font-medium">User</span>
          </div>
        </div>
      )}
    </div>
  );
}
