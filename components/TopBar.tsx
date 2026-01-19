'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Award, 
  Flame, 
  PanelRight, 
  X, 
  Download, 
  Bell, 
  Settings, 
  Sparkles,
  Crown,
  Home,
  Music,
  Radio,
  Library
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { usePointsStore } from '@/stores/pointsStore';
import { useCheckInStore } from '@/stores/checkInStore';
import { useUIStore } from '@/stores/uiStore';
import { useSearchStore } from '@/stores/searchStore';
import UserMenu from '@/components/UserMenu';
import KeyboardShortcutsPanel from '@/components/KeyboardShortcutsPanel';
import SearchDropdown from '@/components/SearchDropdown';
import BackForwardButtons from '@/components/BackForwardButtons';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<'Free' | 'Premium' | 'Artist'>('Premium');
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

  // Navigation links that should appear in header (Exact Spotify: Home, Search, Your Library)
  const headerNavLinks = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '/search' },
    { label: 'Your Library', href: '/collection' },
  ];

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[2] bg-black"
      style={{ 
        height: '56px',
        width: '100vw',
        overflow: 'visible'
      }}
    >
      <div 
        className="flex items-center h-full relative"
        style={{
          paddingLeft: `${leftSidebarWidth + 16}px`,
          paddingRight: `${rightSidebarOpen ? rightSidebarWidth + 16 : 16}px`,
          paddingTop: '16px',
          paddingBottom: '16px',
          gap: '16px',
          width: '100%'
        }}
      >
        {/* Logo - Exact Spotify: height=24px, hover opacity=0.7, transition=200ms */}
        <Link 
          href="/"
          className="flex items-center justify-center transition-opacity duration-200 gpu-accelerated flex-shrink-0 flex-grow-0"
          style={{
            height: '24px',
            width: '113px',
            flexBasis: '113px',
            opacity: 1
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
          aria-label="EmPulse Music Home"
        >
          <Image
            src="/seanfy.png"
            alt="EmPulse Music"
            width={113}
            height={34}
            priority
            className="object-contain inline-block"
            style={{
              width: '113px',
              height: '24px'
            }}
          />
        </Link>
        
        {/* Left Section: Back/Forward + Navigation Links - Elements flow with gap */}
        <div 
          className="flex items-center h-full" 
          style={{ 
            flexShrink: 0, 
            flexGrow: 0,
            gap: '32px'
          }}
        >
          {/* Back/Forward Buttons - Independent element */}
          <div style={{ flexShrink: 0 }}>
            <BackForwardButtons />
          </div>
          
          {/* Navigation Links - Independent elements with gap spacing */}
          <nav 
            className="flex items-center" 
            style={{ 
              gap: '32px', 
              flexShrink: 0,
              flexGrow: 0
            }}
          >
            {headerNavLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href === '/' && pathname === '/') ||
                (link.href === '/search' && pathname?.startsWith('/search')) ||
                (link.href === '/collection' && pathname?.startsWith('/collection'));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors duration-200 flex-shrink-0 whitespace-nowrap",
                    "text-[14px] leading-4 font-bold",
                    isActive ? "text-white" : "text-spotify-text-gray hover:text-white"
                  )}
                  style={{ 
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: '16px'
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* Center Section: Search Bar - Flex-1 with natural spacing */}
        <div 
          className="flex justify-center min-w-0"
          style={{
            flex: '1 1 auto',
            justifyContent: 'center',
            minWidth: 0,
            flexShrink: 1,
            flexGrow: 1
          }}
        >
          <div 
            className="relative w-full"
            style={{
              maxWidth: '364px',
              width: '100%',
              position: 'relative'
            }}
          >
            <Search 
              className="absolute pointer-events-none"
              size={20}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#121212',
                width: '20px',
                height: '20px',
                opacity: 1,
                pointerEvents: 'none'
              }}
            />
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
              className="w-full h-10 bg-white rounded-full pl-10 pr-4 text-black text-sm leading-5 font-normal border-none outline-none font-inherit placeholder:text-[#121212] placeholder:opacity-60"
              style={{
                borderRadius: '500px',
                fontSize: '14px',
                lineHeight: '20px'
              }}
              aria-label="Search for songs, artists, albums, or playlists"
            />
          <SearchDropdown
            query={searchQuery}
            isOpen={showSearchDropdown}
            onClose={() => setShowSearchDropdown(false)}
            onSelect={(query) => {
              setSearchQuery(query);
              addSearch(query);
              router.push(`/search?q=${encodeURIComponent(query)}`);
              setShowSearchDropdown(false);
            }}
          />
          </div>
        </div>

        {/* Right Section: Premium/Upgrade + Downloads + Notifications + Settings + User Menu - Independent elements with gap */}
        <div 
          className="flex items-center h-full ml-auto" 
          style={{ 
            gap: '8px',
            flexShrink: 0,
            flexGrow: 0
          }}
        >
        {/* Premium/Upgrade Link - Conditional based on tier */}
        {subscriptionTier === 'Free' ? (
          <Link
            href="/subscription"
            className="flex items-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              paddingLeft: '16px',
              paddingRight: '16px',
              height: '32px',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              fontSize: '14px',
              fontWeight: 700,
              lineHeight: '16px',
              gap: '8px'
            }}
            title="Upgrade to Premium"
          >
            <Crown size={16} style={{ width: '16px', height: '16px', color: '#FFD700', opacity: 1 }} />
            <span>Upgrade</span>
          </Link>
        ) : (
          <Link
            href="/subscription"
            className="transition-colors duration-200"
            style={{
              fontSize: '14px',
              fontWeight: 700,
              lineHeight: '16px',
              color: '#FFFFFF',
              textDecoration: pathname === '/subscription' ? 'underline' : 'none',
              textUnderlineOffset: '2px'
            }}
            title="Premium"
            onMouseEnter={(e) => {
              if (pathname !== '/subscription') {
                e.currentTarget.style.textDecoration = 'underline';
              }
            }}
            onMouseLeave={(e) => {
              if (pathname !== '/subscription') {
                e.currentTarget.style.textDecoration = 'none';
              }
            }}
          >
            Premium
          </Link>
        )}

        {/* Downloads Link - Exact Spotify: 32px × 32px, hover bg rgba(255,255,255,0.1) */}
        <Link
          href="/downloads"
          className={cn(
            "flex items-center justify-center rounded-full transition-colors duration-200",
            "w-8 h-8",
            pathname === '/downloads' 
              ? "text-white bg-white/10" 
              : "text-spotify-text-gray hover:text-white hover:bg-white/10"
          )}
          title="Your Downloads"
          aria-label="Downloads"
        >
          <Download size={20} className="w-5 h-5" aria-hidden="true" />
        </Link>

        {/* Notifications - Exact Spotify: 32px × 32px, hover bg rgba(255,255,255,0.1) */}
        <button
          className="flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none w-8 h-8 text-spotify-text-gray hover:text-white hover:bg-white/10"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={20} className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Settings Quick Access - Exact Spotify: 32px × 32px */}
        <Link
          href="/settings"
          className={cn(
            "flex items-center justify-center rounded-full transition-colors duration-200 w-8 h-8",
            pathname?.startsWith('/settings')
              ? "text-white bg-white/10"
              : "text-spotify-text-gray hover:text-white hover:bg-white/10"
          )}
          title="Settings"
          aria-label="Settings"
        >
          <Settings size={20} className="w-5 h-5" aria-hidden="true" />
        </Link>

        {/* Keyboard Shortcuts Button - Exact Spotify: 32px × 32px */}
        <button
          data-tour="keyboard-shortcuts"
          onClick={() => setShortcutsOpen(true)}
          className={cn(
            "flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none w-8 h-8",
            shortcutsOpen
              ? "text-white bg-white/10"
              : "text-spotify-text-gray hover:text-white hover:bg-white/10"
          )}
          title="Keyboard Shortcuts (Ctrl+/)"
          aria-label="Keyboard Shortcuts"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="9" y1="9" x2="15" y2="9" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
        </button>

        {/* EmPulse-Specific Features: Points Counter */}
        <div 
          className="flex items-center rounded-full transition-colors duration-200 cursor-default" 
          title={`${totalPoints} points`}
          style={{
            paddingLeft: '12px',
            paddingRight: '12px',
            height: '32px',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Award size={18} style={{ width: '18px', height: '18px', color: '#457B9D', opacity: 1 }} />
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#FFFFFF', opacity: 1 }}>{totalPoints}</span>
        </div>

        {/* EmPulse-Specific: Streak Badge */}
        {streak > 0 && (
          <div 
            className="flex items-center rounded-full"
            style={{
              paddingLeft: '12px',
              paddingRight: '12px',
              height: '32px',
              gap: '6px',
              backgroundColor: 'rgba(249, 115, 22, 0.2)',
              border: '1px solid rgba(249, 115, 22, 0.3)'
            }}
          >
            <Flame size={14} style={{ width: '14px', height: '14px', color: '#F97316', opacity: 1 }} />
            <span style={{ fontSize: '12px', fontWeight: 500, color: '#F97316', opacity: 1 }}>{streak}</span>
          </div>
        )}

        {/* EmPulse-Specific: Affirmations Button */}
        <Link
          href="/affirmations"
          className="flex items-center rounded-full transition-all duration-200"
          style={{
            paddingLeft: '12px',
            paddingRight: '12px',
            height: '32px',
            gap: '8px',
            fontSize: '14px',
            fontWeight: 500,
            backgroundColor: pathname === '/affirmations' ? 'rgba(114, 9, 183, 0.2)' : 'transparent',
            border: `1px solid ${pathname === '/affirmations' ? '#7209B7' : 'rgba(114, 9, 183, 0.5)'}`,
            color: '#7209B7'
          }}
          title="Daily Affirmations"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#7209B7';
            e.currentTarget.style.backgroundColor = 'rgba(114, 9, 183, 0.1)';
          }}
          onMouseLeave={(e) => {
            if (pathname !== '/affirmations') {
              e.currentTarget.style.borderColor = 'rgba(114, 9, 183, 0.5)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <Sparkles size={14} style={{ width: '14px', height: '14px', opacity: 1 }} />
          <span className="hidden sm:inline" style={{ opacity: 1 }}>Affirmations</span>
        </Link>

        {/* Right Sidebar Toggle - Exact Spotify: 32px × 32px */}
        <button
          onClick={toggleRightSidebar}
          className={cn(
            "flex items-center justify-center rounded-full transition-colors duration-200 w-8 h-8",
            rightSidebarOpen
              ? "text-white bg-white/10"
              : "text-spotify-text-gray hover:text-white hover:bg-white/10"
          )}
          aria-label={rightSidebarOpen ? "Close right sidebar" : "Open right sidebar"}
          title={rightSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {rightSidebarOpen ? (
            <X size={20} className="w-5 h-5" />
          ) : (
            <PanelRight size={20} className="w-5 h-5" />
          )}
        </button>

        {/* User Menu - Part of Right Section Group */}
        <div style={{ marginLeft: '8px' }}>
          <UserMenu 
            userName="Bones" 
            userEmail="bones@nextEleven.com" 
            subscriptionTier={subscriptionTier} 
          />
        </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Panel */}
      <KeyboardShortcutsPanel isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </div>
  );
}
