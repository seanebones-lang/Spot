'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Search, Library, Heart, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCheckInStore } from '@/stores/checkInStore';
import { usePointsStore } from '@/stores/pointsStore';

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

  return (
    <div className="fixed left-0 top-0 bottom-player-height w-64 bg-spotify-dark-gray text-white flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/empulseheart.png" 
            alt="EmPulse Music" 
            width={64} 
            height={64} 
            className="object-contain"
          />
          <span className="text-xl font-bold">EmPulse Music</span>
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
                "flex items-center gap-4 px-4 py-3 rounded-md transition-colors mb-1",
                isActive 
                  ? "bg-spotify-light-gray text-white" 
                  : "text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/50"
              )}
            >
              <Icon size={24} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Mental Health Hub */}
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

      {/* Daily Check-in Widget */}
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

      {/* User Profile */}
      <div className="px-3 pb-4">
        <div className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-spotify-light-gray/50 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full"></div>
          <span className="text-sm font-medium">User</span>
        </div>
      </div>
    </div>
  );
}
