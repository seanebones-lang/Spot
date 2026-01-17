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
  Heart,
  X,
  User,
  Disc,
  Eye,
  EyeOff,
  Share2
} from 'lucide-react';

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
  type: 'track' | 'playlist' | 'album' | 'artist';
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

export default function ContextMenu({ 
  x, y, onClose, type, itemId,
  onPlay, onAddToQueue, onAddToPlaylist, onLike, onUnlike,
  onCopyLink, onShowArtist, onShowAlbum, onRemoveFromPlaylist,
  onHide, onSnooze, onShare, isLiked
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

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

  const trackMenuItems: MenuItem[] = [
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

  return (
    <div
      ref={menuRef}
      className="fixed bg-[#282828] rounded-md shadow-2xl py-1 z-[9999] min-w-[200px]"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
      }}
    >
      {menuItems.map((item, index) => {
        if (item.separator && index > 0) {
          return <div key={`sep-${index}`} className="h-px bg-white/10 my-1 mx-2" />;
        }

        const Icon = item.icon;
        const content = (
          <>
            {Icon && <Icon size={16} className={cn("text-spotify-text-gray flex-shrink-0", item.danger && "text-red-400")} />}
            {item.label && <span className={cn("text-sm", item.danger && "text-red-400")}>{item.label}</span>}
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
              item.danger 
                ? "text-red-400 hover:bg-red-500/20"
                : "text-white hover:bg-white/10"
            )}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
