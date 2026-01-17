'use client';

import { useState, useEffect } from 'react';
import { Search, Award, Flame, PanelRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePointsStore } from '@/stores/pointsStore';
import { useCheckInStore } from '@/stores/checkInStore';
import { useUIStore } from '@/stores/uiStore';
import { useSearchStore } from '@/stores/searchStore';
import UserMenu from '@/components/UserMenu';
import KeyboardShortcutsPanel from '@/components/KeyboardShortcutsPanel';
import SearchDropdown from '@/components/SearchDropdown';
import BackForwardButtons from '@/components/BackForwardButtons';
import { cn } from '@/lib/utils';

export default function TopBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { totalPoints } = usePointsStore();
  const { getStreak } = useCheckInStore();
  const { addSearch } = useSearchStore();
  const streak = getStreak();

  const { leftSidebarWidth, rightSidebarOpen, rightSidebarWidth, toggleRightSidebar } = useUIStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
      // Ctrl+/ or Cmd+/ to open shortcuts panel
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShortcutsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className="fixed top-0 h-16 bg-spotify-dark/80 backdrop-blur-md z-40 flex items-center justify-between px-8 transition-all duration-300 ease-in-out"
      style={{ 
        left: `${leftSidebarWidth}px`, 
        right: rightSidebarOpen ? `${rightSidebarWidth}px` : '0' 
      }}
    >
      {/* Back/Forward Buttons */}
      <BackForwardButtons />
      
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative mx-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 z-10 pointer-events-none" size={20} />
        <input
          type="text"
          placeholder="What do you want to play?"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSearchDropdown(true);
          }}
          onFocus={() => setShowSearchDropdown(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchQuery.trim()) {
              addSearch(searchQuery);
              router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
              setShowSearchDropdown(false);
            }
          }}
          className="w-full bg-white rounded-full px-10 py-2.5 text-black placeholder:text-gray-500 focus:outline-none focus:ring-0 hover:bg-white transition-colors shadow-sm hover:shadow-md relative z-10 text-sm"
        />
        <SearchDropdown
          query={searchQuery}
          isOpen={showSearchDropdown && !searchQuery}
          onClose={() => setShowSearchDropdown(false)}
          onSelect={(query) => {
            setSearchQuery(query);
            addSearch(query);
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setShowSearchDropdown(false);
          }}
        />
      </div>

      {/* Right Side - Points, Streak, Affirmations */}
      <div className="flex items-center gap-6">
        {/* Points Counter */}
        <div className="flex items-center gap-2 text-white">
          <Award size={20} className="text-empulse-blue" />
          <span className="text-sm font-medium">{totalPoints}</span>
        </div>

        {/* Streak Badge */}
        {streak > 0 && (
          <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full">
            <Flame size={16} className="text-orange-500" />
            <span className="text-xs font-medium">{streak} day streak</span>
          </div>
        )}

        {/* Daily Affirmation Button */}
        <button className="bg-transparent border-2 border-empulse-purple text-empulse-purple hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
          Affirmations
        </button>

        {/* Right Sidebar Toggle */}
        <button
          onClick={toggleRightSidebar}
          className={cn(
            "w-8 h-8 flex items-center justify-center text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/50 rounded-full transition-colors",
            rightSidebarOpen && "text-white bg-spotify-light-gray/50"
          )}
          aria-label={rightSidebarOpen ? "Close right sidebar" : "Open right sidebar"}
          title={rightSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {rightSidebarOpen ? <X size={20} /> : <PanelRight size={20} />}
        </button>

        {/* User Menu */}
        <UserMenu userName="Bones" userEmail="bones@nextEleven.com" subscriptionTier="Premium" />
      </div>

      {/* Keyboard Shortcuts Panel */}
      <KeyboardShortcutsPanel isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  );
}
