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

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[type="text"]',
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
      // Ctrl+/ or Cmd+/ to open shortcuts panel
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        setShortcutsOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Spotify's TopBar does NOT have duplicate nav links - sidebar handles navigation

  return (
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
        className="flex items-center h-full relative"
        style={{
          paddingLeft: `${leftSidebarWidth + 16}px`,
          paddingRight: `${rightSidebarOpen ? rightSidebarWidth + 16 : 16}px`,
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
            }}
          >
            <Image
              src="/seanfy.png"
              alt="EmPulse Music"
              width={113}
              height={34}
              priority
              style={{
                width: "113px",
                height: "24px",
                objectFit: "contain",
                display: "inline-block",
              }}
            />
          </Link>
        </div>

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
                if (e.key === "Enter" && searchQuery.trim()) {
                  addSearch(searchQuery);
                  router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                  setShowSearchDropdown(false);
                }
              }}
              style={{
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
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "fit-content" }}>
          {subscriptionTier === "Free" ? (
            <Link
              href="/subscription"
              className="flex items-center rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
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
              <span>Upgrade</span>
            </Link>
          ) : (
            <Link
              href="/subscription"
              className="transition-colors duration-200"
              style={{
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
                }
              }}
            >
              Premium
            </Link>
          )}
        </div>

        {/* Downloads Container - Independent element */}
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "32px" }}>
          <Link
            href="/downloads"
            className="flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
              width: "32px",
              height: "32px",
              color: pathname === "/downloads" ? "#FFFFFF" : "#B3B3B3",
              backgroundColor:
                pathname === "/downloads"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
            }}
            title="Your Downloads"
            aria-label="Downloads"
            onMouseEnter={(e) => {
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
          </Link>
        </div>

        {/* Notifications Container - Independent element */}
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "32px" }}>
          <button
            className="flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none"
            style={{
              width: "32px",
              height: "32px",
              color: "#B3B3B3",
              backgroundColor: "transparent",
            }}
            title="Notifications"
            aria-label="Notifications"
            onMouseEnter={(e) => {
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
          </button>
        </div>

        {/* Settings Container - Independent element */}
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "32px" }}>
          <Link
            href="/settings"
            className="flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
              width: "32px",
              height: "32px",
              color: pathname?.startsWith("/settings") ? "#FFFFFF" : "#B3B3B3",
              backgroundColor: pathname?.startsWith("/settings")
                ? "rgba(255, 255, 255, 0.1)"
                : "transparent",
            }}
            title="Settings"
            aria-label="Settings"
            onMouseEnter={(e) => {
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
          </Link>
        </div>

        {/* Keyboard Shortcuts Container - Independent element */}
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "32px" }}>
          <button
            data-tour="keyboard-shortcuts"
            onClick={() => setShortcutsOpen(true)}
            className="flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none"
            style={{
              width: "32px",
              height: "32px",
              color: shortcutsOpen ? "#FFFFFF" : "#B3B3B3",
              backgroundColor: shortcutsOpen
                ? "rgba(255, 255, 255, 0.1)"
                : "transparent",
            }}
            title="Keyboard Shortcuts (Ctrl+/)"
            aria-label="Keyboard Shortcuts"
            onMouseEnter={(e) => {
              if (!shortcutsOpen) {
                e.currentTarget.style.color = "#FFFFFF";
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
              }
            }}
            onMouseLeave={(e) => {
              if (!shortcutsOpen) {
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
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="9" x2="15" y2="9" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </button>
        </div>

        {/* Right Sidebar Toggle Container - Independent element */}
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "32px" }}>
          <button
            onClick={toggleRightSidebar}
            className="flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
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
              }
            }}
            onMouseLeave={(e) => {
              if (!rightSidebarOpen) {
                e.currentTarget.style.color = "#B3B3B3";
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {rightSidebarOpen ? (
              <X
                size={20}
                style={{ width: "20px", height: "20px", opacity: 1 }}
              />
            ) : (
              <PanelRight
                size={20}
                style={{ width: "20px", height: "20px", opacity: 1 }}
              />
            )}
          </button>
        </div>

        {/* User Menu Container - Independent element */}
        <div style={{ flexShrink: 0, flexGrow: 0, minWidth: "fit-content" }}>
          <UserMenu subscriptionTier={subscriptionTier} />
        </div>
      </div>

      {/* Keyboard Shortcuts Panel */}
      <KeyboardShortcutsPanel
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </div>
  );
}
