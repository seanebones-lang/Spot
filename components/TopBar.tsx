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
      className="fixed top-0 left-0 right-0 z-50"
      style={{ 
        height: '56px',
        backgroundColor: '#000000',
        width: '100vw'
      }}
    >
      <div 
        className="flex items-center h-full"
        style={{
          paddingLeft: `${leftSidebarWidth + 24}px`,
          paddingRight: `${rightSidebarOpen ? rightSidebarWidth + 24 : 24}px`
        }}
      >
        {/* Left Section: Back/Forward + Navigation Links */}
        <div className="flex items-center h-full flex-shrink-0">
          {/* Back/Forward Buttons */}
          <div className="flex items-center mr-4">
            <BackForwardButtons />
          </div>
          
          {/* Navigation Links - Exact Spotify: No icons, just text */}
          <nav className="flex items-center" style={{ gap: '32px', marginRight: '32px' }}>
            {headerNavLinks.map((link) => {
              const isActive = pathname === link.href || 
                (link.href === '/' && pathname === '/') ||
                (link.href === '/search' && pathname?.startsWith('/search')) ||
                (link.href === '/collection' && pathname?.startsWith('/collection'));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors duration-200"
                  style={{ 
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: '16px',
                    color: isActive ? '#FFFFFF' : '#B3B3B3'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#FFFFFF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#B3B3B3';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* Center Section: Search Bar - Exact Spotify Measurements */}
        <div 
          className="flex-1 flex justify-center min-w-0"
          style={{
            flex: '1 1 40%',
            justifyContent: 'center',
            minWidth: 0,
            marginLeft: '32px',
            marginRight: '32px'
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
              style={{
                width: '100%',
                height: '40px',
                backgroundColor: '#FFFFFF',
                borderRadius: '500px',
                paddingLeft: '40px',
                paddingRight: '16px',
                color: '#000000',
                fontSize: '14px',
                lineHeight: '20px',
                fontWeight: 400,
                border: 'none',
                outline: 'none',
                fontFamily: 'inherit'
              }}
              className="placeholder:text-[#121212] placeholder:opacity-[0.6]"
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

        {/* Right Section: Premium/Upgrade + Downloads + Notifications + Settings + User Menu */}
        <div 
          className="flex items-center h-full flex-shrink-0" 
          style={{ 
            gap: '8px'
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

        {/* Downloads Link */}
        <Link
          href="/downloads"
          className="flex items-center justify-center rounded-full transition-colors duration-200"
          style={{
            width: '32px',
            height: '32px',
            color: pathname === '/downloads' ? '#FFFFFF' : '#B3B3B3',
            backgroundColor: pathname === '/downloads' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
          }}
          title="Your Downloads"
          aria-label="Downloads"
          onMouseEnter={(e) => {
            if (pathname !== '/downloads') {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (pathname !== '/downloads') {
              e.currentTarget.style.color = '#B3B3B3';
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <Download size={20} style={{ width: '20px', height: '20px', opacity: 1 }} aria-hidden="true" />
        </Link>

        {/* Notifications */}
        <button
          className="flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none"
          style={{
            width: '32px',
            height: '32px',
            color: '#B3B3B3',
            backgroundColor: 'transparent'
          }}
          title="Notifications"
          aria-label="Notifications"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#B3B3B3';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Bell size={20} style={{ width: '20px', height: '20px', opacity: 1 }} aria-hidden="true" />
        </button>

        {/* Settings Quick Access */}
        <Link
          href="/settings"
          className="flex items-center justify-center rounded-full transition-colors duration-200"
          style={{
            width: '32px',
            height: '32px',
            color: pathname?.startsWith('/settings') ? '#FFFFFF' : '#B3B3B3',
            backgroundColor: pathname?.startsWith('/settings') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
          }}
          title="Settings"
          aria-label="Settings"
          onMouseEnter={(e) => {
            if (!pathname?.startsWith('/settings')) {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!pathname?.startsWith('/settings')) {
              e.currentTarget.style.color = '#B3B3B3';
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <Settings size={20} style={{ width: '20px', height: '20px', opacity: 1 }} aria-hidden="true" />
        </Link>

        {/* Keyboard Shortcuts Button */}
        <button
          data-tour="keyboard-shortcuts"
          onClick={() => setShortcutsOpen(true)}
          className="flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none"
          style={{
            width: '32px',
            height: '32px',
            color: shortcutsOpen ? '#FFFFFF' : '#B3B3B3',
            backgroundColor: shortcutsOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
          }}
          title="Keyboard Shortcuts (Ctrl+/)"
          aria-label="Keyboard Shortcuts"
          onMouseEnter={(e) => {
            if (!shortcutsOpen) {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!shortcutsOpen) {
              e.currentTarget.style.color = '#B3B3B3';
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
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

        {/* Right Sidebar Toggle */}
        <button
          onClick={toggleRightSidebar}
          className="flex items-center justify-center rounded-full transition-colors duration-200"
          style={{
            width: '32px',
            height: '32px',
            color: rightSidebarOpen ? '#FFFFFF' : '#B3B3B3',
            backgroundColor: rightSidebarOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
          }}
          aria-label={rightSidebarOpen ? "Close right sidebar" : "Open right sidebar"}
          title={rightSidebarOpen ? "Close sidebar" : "Open sidebar"}
          onMouseEnter={(e) => {
            if (!rightSidebarOpen) {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!rightSidebarOpen) {
              e.currentTarget.style.color = '#B3B3B3';
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          {rightSidebarOpen ? (
            <X size={20} style={{ width: '20px', height: '20px', opacity: 1 }} />
          ) : (
            <PanelRight size={20} style={{ width: '20px', height: '20px', opacity: 1 }} />
          )}
        </button>

        {/* User Menu */}
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
