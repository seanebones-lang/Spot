<<<<<<< HEAD
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Play,
  Plus,
  MoreHorizontal,
  Copy,
  Link as LinkIcon,
=======
'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { 
  Play, 
  Plus, 
  MoreHorizontal, 
  Copy, 
  Link as LinkIcon, 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  Heart,
  X,
  User,
  Disc,
  Eye,
  EyeOff,
<<<<<<< HEAD
  Share2,
} from "lucide-react";
=======
  Share2
} from 'lucide-react';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface MenuItem {
  icon?: React.ComponentType<{ size?: number | string; className?: string }>;
  label?: string;
  onClick?: () => void;
  href?: string;
  separator?: boolean;
  danger?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
<<<<<<< HEAD
  type: "track" | "playlist" | "album" | "artist";
=======
  type: 'track' | 'playlist' | 'album' | 'artist';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  itemId?: string;
  onPlay?: () => void;
  onAddToQueue?: () => void;
  onAddToPlaylist?: () => void;
  onLike?: () => void;
  onUnlike?: () => void;
  onCopyLink?: () => void;
  onShowArtist?: () => void;
  onShowAlbum?: () => void;
  onRemoveFromPlaylist?: () => void;
  onHide?: () => void;
  onSnooze?: () => void;
  onShare?: () => void;
  isLiked?: boolean;
}

<<<<<<< HEAD
export default function ContextMenu({
  x,
  y,
  onClose,
  type,
  itemId,
  onPlay,
  onAddToQueue,
  onAddToPlaylist,
  onLike,
  onUnlike,
  onCopyLink,
  onShowArtist,
  onShowAlbum,
  onRemoveFromPlaylist,
  onHide,
  onSnooze,
  onShare,
  isLiked,
=======
export default function ContextMenu({ 
  x, y, onClose, type, itemId,
  onPlay, onAddToQueue, onAddToPlaylist, onLike, onUnlike,
  onCopyLink, onShowArtist, onShowAlbum, onRemoveFromPlaylist,
  onHide, onSnooze, onShare, isLiked
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const trackMenuItems: MenuItem[] = [
<<<<<<< HEAD
    { icon: Play, label: "Play", onClick: onPlay },
    { icon: Plus, label: "Add to Queue", onClick: onAddToQueue },
    { separator: true },
    {
      icon: Heart,
      label: isLiked ? "Remove from Liked Songs" : "Add to Liked Songs",
      onClick: isLiked ? onUnlike : onLike,
    },
    { icon: Plus, label: "Add to Playlist", onClick: onAddToPlaylist },
    { separator: true },
    {
      icon: User,
      label: "Show Artist",
      onClick: onShowArtist,
      href: itemId ? `/artist/${itemId}` : undefined,
    },
    { icon: Disc, label: "Show Album", onClick: onShowAlbum },
    { separator: true },
    { icon: Share2, label: "Share", onClick: onShare },
    { icon: LinkIcon, label: "Copy Link", onClick: onCopyLink },
    { separator: true },
    { icon: EyeOff, label: "Hide Song", onClick: onHide },
    { icon: X, label: "Snooze for 30 days", onClick: onSnooze },
    ...(onRemoveFromPlaylist
      ? [
          {
            separator: true,
            icon: X,
            label: "Remove from Playlist",
            onClick: onRemoveFromPlaylist,
            danger: true,
          },
        ]
      : []),
  ];

  const playlistMenuItems: MenuItem[] = [
    { icon: Play, label: "Play", onClick: onPlay },
    { separator: true },
    { icon: Plus, label: "Add to Queue", onClick: onAddToQueue },
    {
      icon: Heart,
      label: isLiked ? "Remove from Library" : "Add to Library",
      onClick: isLiked ? onUnlike : onLike,
    },
    { separator: true },
    { icon: Share2, label: "Share", onClick: onShare },
    { icon: LinkIcon, label: "Copy Link", onClick: onCopyLink },
    { separator: true },
    { icon: User, label: "Show Creator", onClick: onShowArtist },
  ];

  const albumMenuItems: MenuItem[] = [
    { icon: Play, label: "Play", onClick: onPlay },
    { separator: true },
    { icon: Plus, label: "Add to Queue", onClick: onAddToQueue },
    {
      icon: Heart,
      label: isLiked ? "Remove from Library" : "Add to Library",
      onClick: isLiked ? onUnlike : onLike,
    },
    { separator: true },
    {
      icon: User,
      label: "Show Artist",
      onClick: onShowArtist,
      href: itemId ? `/artist/${itemId}` : undefined,
    },
    { separator: true },
    { icon: Share2, label: "Share", onClick: onShare },
    { icon: LinkIcon, label: "Copy Link", onClick: onCopyLink },
  ];

  const artistMenuItems: MenuItem[] = [
    { icon: Play, label: "Play", onClick: onPlay },
    { separator: true },
    {
      icon: Heart,
      label: isLiked ? "Unfollow" : "Follow",
      onClick: isLiked ? onUnlike : onLike,
    },
    { separator: true },
    { icon: Share2, label: "Share", onClick: onShare },
    { icon: LinkIcon, label: "Copy Link", onClick: onCopyLink },
  ];

  const menuItems =
    type === "track"
      ? trackMenuItems
      : type === "playlist"
        ? playlistMenuItems
        : type === "album"
          ? albumMenuItems
          : artistMenuItems;
=======
    { icon: Play, label: 'Play', onClick: onPlay },
    { icon: Plus, label: 'Add to Queue', onClick: onAddToQueue },
    { separator: true },
    { 
      icon: Heart, 
      label: isLiked ? 'Remove from Liked Songs' : 'Add to Liked Songs',
      onClick: isLiked ? onUnlike : onLike
    },
    { icon: Plus, label: 'Add to Playlist', onClick: onAddToPlaylist },
    { separator: true },
    { icon: User, label: 'Show Artist', onClick: onShowArtist, href: itemId ? `/artist/${itemId}` : undefined },
    { icon: Disc, label: 'Show Album', onClick: onShowAlbum },
    { separator: true },
    { icon: Share2, label: 'Share', onClick: onShare },
    { icon: LinkIcon, label: 'Copy Link', onClick: onCopyLink },
    { separator: true },
    { icon: EyeOff, label: 'Hide Song', onClick: onHide },
    { icon: X, label: 'Snooze for 30 days', onClick: onSnooze },
    ...(onRemoveFromPlaylist ? [{ separator: true, icon: X, label: 'Remove from Playlist', onClick: onRemoveFromPlaylist, danger: true }] : []),
  ];

  const playlistMenuItems: MenuItem[] = [
    { icon: Play, label: 'Play', onClick: onPlay },
    { separator: true },
    { icon: Plus, label: 'Add to Queue', onClick: onAddToQueue },
    { icon: Heart, label: isLiked ? 'Remove from Library' : 'Add to Library', onClick: isLiked ? onUnlike : onLike },
    { separator: true },
    { icon: Share2, label: 'Share', onClick: onShare },
    { icon: LinkIcon, label: 'Copy Link', onClick: onCopyLink },
    { separator: true },
    { icon: User, label: 'Show Creator', onClick: onShowArtist },
  ];

  const albumMenuItems: MenuItem[] = [
    { icon: Play, label: 'Play', onClick: onPlay },
    { separator: true },
    { icon: Plus, label: 'Add to Queue', onClick: onAddToQueue },
    { icon: Heart, label: isLiked ? 'Remove from Library' : 'Add to Library', onClick: isLiked ? onUnlike : onLike },
    { separator: true },
    { icon: User, label: 'Show Artist', onClick: onShowArtist, href: itemId ? `/artist/${itemId}` : undefined },
    { separator: true },
    { icon: Share2, label: 'Share', onClick: onShare },
    { icon: LinkIcon, label: 'Copy Link', onClick: onCopyLink },
  ];

  const artistMenuItems: MenuItem[] = [
    { icon: Play, label: 'Play', onClick: onPlay },
    { separator: true },
    { icon: Heart, label: isLiked ? 'Unfollow' : 'Follow', onClick: isLiked ? onUnlike : onLike },
    { separator: true },
    { icon: Share2, label: 'Share', onClick: onShare },
    { icon: LinkIcon, label: 'Copy Link', onClick: onCopyLink },
  ];

  const menuItems = type === 'track' ? trackMenuItems :
                   type === 'playlist' ? playlistMenuItems :
                   type === 'album' ? albumMenuItems :
                   artistMenuItems;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

  // Calculate valid items (non-separator) for keyboard navigation
  const validItems = menuItems.filter((i) => !i.separator);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyboard = (e: KeyboardEvent) => {
<<<<<<< HEAD
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
=======
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = prev + 1;
          return next >= validItems.length ? 0 : next;
        });
<<<<<<< HEAD
      } else if (e.key === "ArrowUp") {
=======
      } else if (e.key === 'ArrowUp') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = prev - 1;
          return next < 0 ? validItems.length - 1 : next;
        });
<<<<<<< HEAD
      } else if (e.key === "Enter") {
=======
      } else if (e.key === 'Enter') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        e.preventDefault();
        const selectedItem = validItems[selectedIndex];
        if (selectedItem) {
          selectedItem.onClick?.();
          onClose();
        }
      }
    };

<<<<<<< HEAD
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyboard);
=======
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyboard);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyboard);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    };
  }, [onClose, selectedIndex, validItems]);

  // Keep menu within viewport
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    if (!menuRef.current) return;
    const menu = menuRef.current;
    const rect = menu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newX = x;
    let newY = y;

    if (x + rect.width > viewportWidth) {
      newX = viewportWidth - rect.width - 10;
    }
    if (y + rect.height > viewportHeight) {
      newY = viewportHeight - rect.height - 10;
    }

    setPosition({ x: newX, y: newY });
  }, [x, y]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-[#282828] rounded-md shadow-2xl py-1 z-[9999] min-w-[200px] transition-opacity duration-150 ease-out"
      style={{
<<<<<<< HEAD
        position: "fixed",
        backgroundColor: "#282828",
        borderRadius: "4px",
        paddingTop: "4px",
        paddingBottom: "4px",
        zIndex: 9999,
        minWidth: "200px",
        left: `${position.x}px`,
        top: `${position.y}px`,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
        transition:
          "opacity 150ms cubic-bezier(0.3, 0, 0.1, 1), transform 150ms cubic-bezier(0.3, 0, 0.1, 1)",
        opacity: 1,
        transform: "scale(1)",
        animation: "contextMenuFadeIn 150ms cubic-bezier(0.3, 0, 0.1, 1)",
=======
        position: 'fixed',
        backgroundColor: '#282828',
        borderRadius: '4px',
        paddingTop: '4px',
        paddingBottom: '4px',
        zIndex: 9999,
        minWidth: '200px',
        left: `${position.x}px`,
        top: `${position.y}px`,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
        transition: 'opacity 150ms cubic-bezier(0.3, 0, 0.1, 1), transform 150ms cubic-bezier(0.3, 0, 0.1, 1)',
        opacity: 1,
        transform: 'scale(1)',
        animation: 'contextMenuFadeIn 150ms cubic-bezier(0.3, 0, 0.1, 1)'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      }}
    >
      {menuItems.map((item, index) => {
        if (item.separator && index > 0) {
<<<<<<< HEAD
          return (
            <div key={`sep-${index}`} className="h-px bg-white/10 my-1 mx-2" />
          );
=======
          return <div key={`sep-${index}`} className="h-px bg-white/10 my-1 mx-2" />;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        }

        // Calculate the index of this item in the valid items array
        let itemIndex = -1;
        let validCount = 0;
        for (let i = 0; i < menuItems.length; i++) {
          if (!menuItems[i].separator) {
            if (i === index) {
              itemIndex = validCount;
              break;
            }
            validCount++;
          }
        }
        const isSelected = itemIndex === selectedIndex;

        const Icon = item.icon;
        const content = (
          <>
<<<<<<< HEAD
            {Icon && (
              <Icon
                size={16}
                className={cn(
                  "text-spotify-text-gray flex-shrink-0",
                  item.danger && "text-red-400",
                )}
              />
            )}
            {item.label && (
              <span className={cn("text-sm", item.danger && "text-red-400")}>
                {item.label}
              </span>
            )}
=======
            {Icon && <Icon size={16} className={cn("text-spotify-text-gray flex-shrink-0", item.danger && "text-red-400")} />}
            {item.label && <span className={cn("text-sm", item.danger && "text-red-400")}>{item.label}</span>}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          </>
        );

        if (item.href) {
          return (
            <Link
              key={index}
              href={item.href}
              onClick={() => {
                item.onClick?.();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
              style={{
<<<<<<< HEAD
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                textAlign: "left",
                color: "#FFFFFF",
                backgroundColor: isSelected
                  ? "rgba(255, 255, 255, 0.1)"
                  : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background-color 200ms ease-out",
                textDecoration: "none",
                fontSize: "14px",
                lineHeight: "20px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)";
=======
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                textAlign: 'left',
                color: '#FFFFFF',
                backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 200ms ease-out',
                textDecoration: 'none',
                fontSize: '14px',
                lineHeight: '20px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                if (itemIndex !== -1) setSelectedIndex(itemIndex);
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
<<<<<<< HEAD
                  e.currentTarget.style.backgroundColor = "transparent";
=======
                  e.currentTarget.style.backgroundColor = 'transparent';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                }
              }}
            >
              {content}
            </Link>
          );
        }

        return (
          <button
            key={index}
            onClick={() => {
              item.onClick?.();
              onClose();
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2 text-left transition-colors",
<<<<<<< HEAD
              item.danger
                ? "text-red-400 hover:bg-red-500/20"
                : "text-white hover:bg-white/10",
            )}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              textAlign: "left",
              backgroundColor: isSelected
                ? item.danger
                  ? "rgba(239, 68, 68, 0.2)"
                  : "rgba(255, 255, 255, 0.1)"
                : "transparent",
              border: "none",
              cursor: "pointer",
              transition:
                "background-color 200ms ease-out, color 200ms ease-out",
              fontSize: "14px",
              lineHeight: "20px",
              color: item.danger ? "#EF4444" : "#FFFFFF",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = item.danger
                ? "rgba(239, 68, 68, 0.2)"
                : "rgba(255, 255, 255, 0.1)";
=======
              item.danger 
                ? "text-red-400 hover:bg-red-500/20"
                : "text-white hover:bg-white/10"
            )}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              textAlign: 'left',
              backgroundColor: isSelected 
                ? (item.danger ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)')
                : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 200ms ease-out, color 200ms ease-out',
              fontSize: '14px',
              lineHeight: '20px',
              color: item.danger ? '#EF4444' : '#FFFFFF'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = item.danger 
                ? 'rgba(239, 68, 68, 0.2)' 
                : 'rgba(255, 255, 255, 0.1)';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              if (itemIndex !== -1) setSelectedIndex(itemIndex);
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
<<<<<<< HEAD
                e.currentTarget.style.backgroundColor = "transparent";
=======
                e.currentTarget.style.backgroundColor = 'transparent';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              }
            }}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
