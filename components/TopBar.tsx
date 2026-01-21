<<<<<<< HEAD
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  PanelRight,
  X,
  Download,
  Bell,
  Settings,
  Crown,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useUIStore } from "@/stores/uiStore";
import { useSearchStore } from "@/stores/searchStore";
import UserMenu from "@/components/UserMenu";
import KeyboardShortcutsPanel from "@/components/KeyboardShortcutsPanel";
import SearchDropdown from "@/components/SearchDropdown";
import BackForwardButtons from "@/components/BackForwardButtons";
import { cn } from "@/lib/utils";
import Image from "next/image";
=======
'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  PanelRight, 
  X, 
  Download, 
  Bell, 
  Settings, 
  Crown
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUIStore } from '@/stores/uiStore';
import { useSearchStore } from '@/stores/searchStore';
import { useCheckInStore } from '@/stores/checkInStore';
import { usePointsStore } from '@/stores/pointsStore';
import UserMenu from '@/components/UserMenu';
import KeyboardShortcutsPanel from '@/components/KeyboardShortcutsPanel';
import SearchDropdown from '@/components/SearchDropdown';
import BackForwardButtons from '@/components/BackForwardButtons';
import { cn } from '@/lib/utils';
import Image from 'next/image';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
<<<<<<< HEAD
  const [searchQuery, setSearchQuery] = useState("");
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<
    "Free" | "Premium" | "Artist"
  >("Premium");
  const { addSearch } = useSearchStore();

  const {
    leftSidebarWidth,
    rightSidebarOpen,
    rightSidebarWidth,
    toggleRightSidebar,
  } = useUIStore();
=======
  const [searchQuery, setSearchQuery] = useState('');
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<'Free' | 'Premium' | 'Artist'>('Premium');
  const { addSearch } = useSearchStore();
  const { streak, lastCheckIn } = useCheckInStore();
  const { totalPoints } = usePointsStore();

  const { leftSidebarWidth, rightSidebarOpen, rightSidebarWidth, toggleRightSidebar } = useUIStore();
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to focus search
<<<<<<< HEAD
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[type="text"]',
        ) as HTMLInputElement;
=======
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        if (searchInput) {
          searchInput.focus();
        }
      }
      // Ctrl+/ or Cmd+/ to open shortcuts panel
<<<<<<< HEAD
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
=======
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        e.preventDefault();
        setShortcutsOpen(true);
      }
    };

<<<<<<< HEAD
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
=======
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }, []);

  // Spotify's TopBar does NOT have duplicate nav links - sidebar handles navigation

  return (
<<<<<<< HEAD
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "56px",
        backgroundColor: "#000000",
        width: "100vw",
        overflow: "visible",
        zIndex: 100,
        opacity: 1,
        flexShrink: 0,
        flexGrow: 0,
      }}
    >
      <div
=======
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '56px',
        backgroundColor: '#000000',
        width: '100vw',
        overflow: 'visible',
        zIndex: 100,
        opacity: 1,
        flexShrink: 0,
        flexGrow: 0
      }}
    >
      <div 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        className="flex items-center h-full relative"
        style={{
          paddingLeft: `${leftSidebarWidth + 16}px`,
          paddingRight: `${rightSidebarOpen ? rightSidebarWidth + 16 : 16}px`,
<<<<<<< HEAD
          paddingTop: "16px",
          paddingBottom: "16px",
          gap: "16px",
          width: "100%",
          backgroundColor: "#000000",
        }}
      >
        {/* Logo Container - Independent element */}
        <div
          style={{
            flexShrink: 0,
            flexGrow: 0,
            flexBasis: "113px",
            minWidth: "113px",
          }}
        >
          <Link
            href="/"
            className={cn(
              "flex items-center justify-center transition-opacity duration-200 gpu-accelerated",
              pathname === "/" && "active",
            )}
            style={{
              height: "24px",
              width: "113px",
              opacity: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
=======
          paddingTop: '16px',
          paddingBottom: '16px',
          gap: '16px',
          width: '100%',
          backgroundColor: '#000000'
        }}
      >
        {/* Logo Container - Independent element */}
        <div style={{ flexShrink: 0, flexGrow: 0, flexBasis: '113px', minWidth: '113px' }}>
          <Link 
            href="/"
            className={cn(
              "flex items-center justify-center transition-opacity duration-200 gpu-accelerated",
              pathname === '/' && "active"
            )}
            style={{
              height: '24px',
              width: '113px',
              opacity: 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
          >
            <Image
              src="/seanfy.png"
              alt="EmPulse Music"
              width={113}
              height={34}
              priority
              style={{
<<<<<<< HEAD
                width: "113px",
                height: "24px",
                objectFit: "contain",
                display: "inline-block",
=======
                width: '113px',
                height: '24px',
                objectFit: 'contain',
                display: 'inline-block'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }}
            />
          </Link>
        </div>
<<<<<<< HEAD

        {/* Back/Forward Buttons Container - Independent element */}
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "fit-content" }}>
          <BackForwardButtons />
        </div>

        {/* Search Container - Flex-1 with min-width protection */}
        <div
          className="flex justify-center min-w-0"
          style={{
            flex: "1 1 auto",
            justifyContent: "center",
            minWidth: "200px",
            flexShrink: 1,
            flexGrow: 1,
          }}
        >
          <div
            className="relative w-full"
            style={{
              maxWidth: "364px",
              width: "100%",
              position: "relative",
            }}
          >
            <Search
              className="absolute pointer-events-none"
              size={20}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#121212",
                width: "20px",
                height: "20px",
                opacity: 1,
                pointerEvents: "none",
=======
        
        {/* Back/Forward Buttons Container - Independent element */}
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: 'fit-content' }}>
          <BackForwardButtons />
        </div>

        {/* Daily Check-in Widget - Far Left Header */}
        <Link
          href="/check-in"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-white no-underline hover:bg-white/10 transition-colors hidden md:flex"
          style={{
            textDecoration: 'none',
            backgroundColor: 'transparent',
            transition: 'background-color 200ms ease-out',
            flexShrink: 0,
            flexGrow: 0,
            whiteSpace: 'nowrap'
          }}
          title="Daily Check-in"
        >
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold">🔥 Check-in</span>
            {streak > 0 && (
              <span
                className="text-xs px-2 py-0.5 rounded text-white font-medium shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(114, 9, 183, 0.8) 100%), linear-gradient(to right, #7209B7, #8a1dd0)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 2px 8px rgba(114, 9, 183, 0.4)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                {streak}
              </span>
            )}
          </div>
          {lastCheckIn && (
            <span className="text-xs text-white/70 hidden lg:inline">
              +{totalPoints}
            </span>
          )}
        </Link>

        {/* Search Container - Flex-1 with min-width protection */}
        <div 
          className="flex justify-center min-w-0"
          style={{
            flex: '1 1 auto',
            justifyContent: 'center',
            minWidth: '200px',
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
                if (e.key === "Enter" && searchQuery.trim()) {
=======
                if (e.key === 'Enter' && searchQuery.trim()) {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                  addSearch(searchQuery);
                  router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                  setShowSearchDropdown(false);
                }
              }}
              style={{
<<<<<<< HEAD
                width: "100%",
                height: "40px",
                backgroundColor: "#FFFFFF",
                borderRadius: "500px",
                paddingLeft: "40px",
                paddingRight: "16px",
                color: "#000000",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: 400,
                border: "none",
                outline: "none",
                fontFamily: "inherit",
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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

        {/* Premium/Upgrade Container - Independent element */}
<<<<<<< HEAD
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "fit-content" }}>
          {subscriptionTier === "Free" ? (
=======
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: 'fit-content', display: window.innerWidth < 640 ? 'none' : 'flex' }}>
          {subscriptionTier === 'Free' ? (
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            <Link
              href="/subscription"
              className="flex items-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
<<<<<<< HEAD
                paddingLeft: "16px",
                paddingRight: "16px",
                height: "32px",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: "16px",
                gap: "8px",
              }}
              title="Upgrade to Premium"
            >
              <Crown
                size={16}
                style={{
                  width: "16px",
                  height: "16px",
                  color: "#FFD700",
                  opacity: 1,
                }}
              />
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              <span>Upgrade</span>
            </Link>
          ) : (
            <Link
              href="/subscription"
              className="transition-colors duration-200"
              style={{
<<<<<<< HEAD
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: "16px",
                color: "#FFFFFF",
                textDecoration:
                  pathname === "/subscription" ? "underline" : "none",
                textUnderlineOffset: "2px",
              }}
              title="Premium"
              onMouseEnter={(e) => {
                if (pathname !== "/subscription") {
                  e.currentTarget.style.textDecoration = "underline";
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== "/subscription") {
                  e.currentTarget.style.textDecoration = "none";
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }
              }}
            >
              Premium
            </Link>
          )}
        </div>

        {/* Downloads Container - Independent element */}
<<<<<<< HEAD
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "32px" }}>
=======
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: '32px', display: window.innerWidth < 640 ? 'none' : 'flex' }}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          <Link
            href="/downloads"
            className="flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
<<<<<<< HEAD
              width: "32px",
              height: "32px",
              color: pathname === "/downloads" ? "#FFFFFF" : "#B3B3B3",
              backgroundColor:
                pathname === "/downloads"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
=======
              width: '32px',
              height: '32px',
              color: pathname === '/downloads' ? '#FFFFFF' : '#B3B3B3',
              backgroundColor: pathname === '/downloads' ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
            title="Your Downloads"
            aria-label="Downloads"
            onMouseEnter={(e) => {
<<<<<<< HEAD
              if (pathname !== "/downloads") {
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (pathname !== "/downloads") {
                e.currentTarget.style.color = "#B3B3B3";
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <Download
              size={20}
              style={{ width: "20px", height: "20px", opacity: 1 }}
              aria-hidden="true"
            />
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </Link>
        </div>

        {/* Notifications Container - Independent element */}
<<<<<<< HEAD
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "32px" }}>
          <button
            className="flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none"
            style={{
              width: "32px",
              height: "32px",
              color: "#B3B3B3",
              backgroundColor: "transparent",
=======
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: '32px', display: window.innerWidth < 640 ? 'none' : 'flex' }}>
          <button
            className="flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none"
            style={{
              width: '32px',
              height: '32px',
              color: '#B3B3B3',
              backgroundColor: 'transparent'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
            title="Notifications"
            aria-label="Notifications"
            onMouseEnter={(e) => {
<<<<<<< HEAD
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#B3B3B3";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Bell
              size={20}
              style={{ width: "20px", height: "20px", opacity: 1 }}
              aria-hidden="true"
            />
=======
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#B3B3B3';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Bell size={20} style={{ width: '20px', height: '20px', opacity: 1 }} aria-hidden="true" />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </button>
        </div>

        {/* Settings Container - Independent element */}
<<<<<<< HEAD
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "32px" }}>
=======
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: '32px', display: window.innerWidth < 640 ? 'none' : 'flex' }}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          <Link
            href="/settings"
            className="flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
<<<<<<< HEAD
              width: "32px",
              height: "32px",
              color: pathname?.startsWith("/settings") ? "#FFFFFF" : "#B3B3B3",
              backgroundColor: pathname?.startsWith("/settings")
                ? "rgba(255, 255, 255, 0.1)"
                : "transparent",
=======
              width: '32px',
              height: '32px',
              color: pathname?.startsWith('/settings') ? '#FFFFFF' : '#B3B3B3',
              backgroundColor: pathname?.startsWith('/settings') ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
            title="Settings"
            aria-label="Settings"
            onMouseEnter={(e) => {
<<<<<<< HEAD
              if (!pathname?.startsWith("/settings")) {
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (!pathname?.startsWith("/settings")) {
                e.currentTarget.style.color = "#B3B3B3";
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <Settings
              size={20}
              style={{ width: "20px", height: "20px", opacity: 1 }}
              aria-hidden="true"
            />
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </Link>
        </div>

        {/* Keyboard Shortcuts Container - Independent element */}
<<<<<<< HEAD
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "32px" }}>
=======
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: '32px', display: window.innerWidth < 640 ? 'none' : 'flex' }}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          <button
            data-tour="keyboard-shortcuts"
            onClick={() => setShortcutsOpen(true)}
            className="flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none"
            style={{
<<<<<<< HEAD
              width: "32px",
              height: "32px",
              color: shortcutsOpen ? "#FFFFFF" : "#B3B3B3",
              backgroundColor: shortcutsOpen
                ? "rgba(255, 255, 255, 0.1)"
                : "transparent",
=======
              width: '32px',
              height: '32px',
              color: shortcutsOpen ? '#FFFFFF' : '#B3B3B3',
              backgroundColor: shortcutsOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            }}
            title="Keyboard Shortcuts (Ctrl+/)"
            aria-label="Keyboard Shortcuts"
            onMouseEnter={(e) => {
              if (!shortcutsOpen) {
<<<<<<< HEAD
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
=======
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }
            }}
            onMouseLeave={(e) => {
              if (!shortcutsOpen) {
<<<<<<< HEAD
                e.currentTarget.style.color = "#B3B3B3";
                e.currentTarget.style.backgroundColor = "transparent";
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
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="9" x2="15" y2="9" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </button>
        </div>

<<<<<<< HEAD
        {/* Right Sidebar Toggle Container - Independent element */}
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "32px" }}>
=======
{/* Right Sidebar Toggle Container - Independent element */}
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: '32px', display: window.innerWidth < 640 ? 'none' : 'flex' }}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          <button
            onClick={toggleRightSidebar}
            className="flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
<<<<<<< HEAD
              width: "32px",
              height: "32px",
              color: rightSidebarOpen ? "#FFFFFF" : "#B3B3B3",
              backgroundColor: rightSidebarOpen
                ? "rgba(255, 255, 255, 0.1)"
                : "transparent",
            }}
            aria-label={
              rightSidebarOpen ? "Close right sidebar" : "Open right sidebar"
            }
            title={rightSidebarOpen ? "Close sidebar" : "Open sidebar"}
            onMouseEnter={(e) => {
              if (!rightSidebarOpen) {
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }
            }}
            onMouseLeave={(e) => {
              if (!rightSidebarOpen) {
<<<<<<< HEAD
                e.currentTarget.style.color = "#B3B3B3";
                e.currentTarget.style.backgroundColor = "transparent";
=======
                e.currentTarget.style.color = '#B3B3B3';
                e.currentTarget.style.backgroundColor = 'transparent';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }
            }}
          >
            {rightSidebarOpen ? (
<<<<<<< HEAD
              <X
                size={20}
                style={{ width: "20px", height: "20px", opacity: 1 }}
              />
            ) : (
              <PanelRight
                size={20}
                style={{ width: "20px", height: "20px", opacity: 1 }}
              />
=======
              <X size={20} style={{ width: '20px', height: '20px', opacity: 1 }} />
            ) : (
              <PanelRight size={20} style={{ width: '20px', height: '20px', opacity: 1 }} />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            )}
          </button>
        </div>

        {/* User Menu Container - Independent element */}
<<<<<<< HEAD
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "fit-content" }}>
=======
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: 'fit-content' }}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          <UserMenu subscriptionTier={subscriptionTier} />
        </div>
      </div>

      {/* Keyboard Shortcuts Panel */}
<<<<<<< HEAD
      <KeyboardShortcutsPanel
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
=======
      <KeyboardShortcutsPanel isOpen={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    </div>
  );
}
