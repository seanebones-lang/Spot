'use client';

import { useEffect, useRef } from 'react';
import { Play, Plus, MoreHorizontal, Copy, Link as LinkIcon } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onPlay: () => void;
  onAddToQueue: () => void;
  onAddToPlaylist: () => void;
  onCopyLink: () => void;
}

export default function ContextMenu({ x, y, onClose, onPlay, onAddToQueue, onAddToPlaylist, onCopyLink }: ContextMenuProps) {
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

  const menuItems = [
    { icon: Play, label: 'Play', onClick: onPlay },
    { icon: Plus, label: 'Add to Queue', onClick: onAddToQueue },
    { icon: MoreHorizontal, label: 'Add to Playlist', onClick: onAddToPlaylist },
    { icon: LinkIcon, label: 'Copy Link', onClick: onCopyLink },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed bg-spotify-dark-gray rounded-lg shadow-2xl border border-spotify-light-gray py-2 z-50 min-w-48"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm text-white hover:bg-spotify-light-gray transition-colors"
          >
            <Icon size={16} className="text-spotify-text-gray" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
