'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Library, Heart, Radio, X, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Search, label: 'Search', href: '/search' },
  { icon: Library, label: 'Your Library', href: '/collection' },
  { icon: Heart, label: 'Mood', href: '/mood' },
  { icon: Radio, label: 'Radio', href: '/radio' },
];

export default function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button - Only visible on mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed left-2 top-2 z-[60] p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        style={{
          position: 'fixed',
          left: '8px',
          top: '8px',
          zIndex: 60,
          backgroundColor: isOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 200ms ease-out'
        }}
        aria-label="Toggle navigation"
        title="Navigation menu"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent';
        }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop - Invisible overlay to close drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40
          }}
        />
      )}

      {/* Navigation Drawer */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: '280px',
          backgroundColor: '#121212',
          zIndex: 50,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 300ms ease-out',
          borderRight: '1px solid #282828',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '16px',
          overflowY: 'auto'
        }}
      >
        {/* Close Button in Drawer */}
        <button
          onClick={() => setIsOpen(false)}
          className="self-end mr-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            marginRight: '16px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 200ms ease-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <X size={24} />
        </button>

        {/* Navigation Items */}
        <nav className="px-2" style={{ padding: '0 8px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href ||
              (item.href === '/' && pathname === '/') ||
              (item.href === '/search' && pathname?.startsWith('/search')) ||
              (item.href === '/collection' && pathname?.startsWith('/collection'));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group',
                  isActive
                    ? 'bg-empulse-purple text-white'
                    : 'text-spotify-text-gray hover:text-white hover:bg-white/10'
                )}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: isActive ? '#FFFFFF' : '#B3B3B3',
                  backgroundColor: isActive ? '#7209B7' : 'transparent',
                  transition: 'all 200ms ease-out',
                  marginBottom: '4px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#B3B3B3';
                  }
                }}
              >
                <Icon
                  size={24}
                  style={{
                    width: '24px',
                    height: '24px',
                    color: isActive ? '#FFFFFF' : '#B3B3B3',
                    transition: 'color 200ms ease-out'
                  }}
                />
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: isActive ? 700 : 500,
                    lineHeight: '24px'
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer Links in Drawer */}
        <nav
          className="border-t border-spotify-light-gray px-2 py-4"
          style={{
            borderTop: '1px solid #282828',
            padding: '16px 8px',
            marginTop: 'auto'
          }}
        >
          <Link
            href="/wellness"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-spotify-text-gray hover:text-white transition-colors"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#B3B3B3',
              fontSize: '14px',
              transition: 'color 200ms ease-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#B3B3B3';
            }}
          >
            Mental Health Hub
          </Link>
        </nav>
      </div>
    </>
  );
}
