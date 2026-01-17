'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KeyboardShortcut {
  category: string;
  shortcuts: {
    keys: string[];
    description: string;
  }[];
}

const shortcuts: KeyboardShortcut[] = [
  {
    category: 'Playback',
    shortcuts: [
      { keys: ['Space'], description: 'Play/Pause' },
      { keys: ['←'], description: 'Seek backward 10s' },
      { keys: ['→'], description: 'Seek forward 10s' },
      { keys: ['Ctrl', '←'], description: 'Previous track' },
      { keys: ['Ctrl', '→'], description: 'Next track' },
      { keys: ['Ctrl', '↑'], description: 'Volume up' },
      { keys: ['Ctrl', '↓'], description: 'Volume down' },
      { keys: ['M'], description: 'Mute/Unmute' },
      { keys: ['S'], description: 'Shuffle' },
      { keys: ['R'], description: 'Repeat' },
      { keys: ['L'], description: 'Like/Unlike track' },
    ],
  },
  {
    category: 'Navigation',
    shortcuts: [
      { keys: ['Ctrl', 'K'], description: 'Search' },
      { keys: ['Alt', '←'], description: 'Back' },
      { keys: ['Alt', '→'], description: 'Forward' },
      { keys: ['Ctrl', '/'], description: 'Show keyboard shortcuts' },
    ],
  },
  {
    category: 'Player',
    shortcuts: [
      { keys: ['Ctrl', 'P'], description: 'Open queue' },
      { keys: ['Ctrl', 'B'], description: 'Toggle right sidebar' },
      { keys: ['Ctrl', 'Shift', 'B'], description: 'Toggle left sidebar' },
    ],
  },
];

interface KeyboardShortcutsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KeyboardShortcutsPanel({ isOpen, onClose }: KeyboardShortcutsPanelProps) {
  const [activeCategory, setActiveCategory] = useState(shortcuts[0]?.category || '');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleShortcutKey = (e: KeyboardEvent) => {
      // Ctrl+/ or Cmd+/ to open shortcuts panel
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        if (!isOpen) {
          // This would be handled by parent component
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleShortcutKey);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleShortcutKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
      <div className="bg-spotify-dark-gray rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="text-spotify-text-gray hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shortcuts.map((category) => (
              <div key={category.category} className="space-y-4">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.shortcuts.map((shortcut, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {shortcut.keys.map((key, keyIndex) => (
                          <span
                            key={keyIndex}
                            className="px-2 py-1 bg-spotify-light-gray text-xs font-medium rounded text-white"
                          >
                            {key}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-spotify-text-gray">{shortcut.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
