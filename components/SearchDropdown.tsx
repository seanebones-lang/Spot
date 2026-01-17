'use client';

import { useState, useEffect, useRef } from 'react';
import { Clock, X, Search } from 'lucide-react';
import { useSearchStore } from '@/stores/searchStore';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SearchDropdownProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (query: string) => void;
}

export default function SearchDropdown({ query, isOpen, onClose, onSelect }: SearchDropdownProps) {
  const { recentSearches, removeSearch } = useSearchStore();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-spotify-dark-gray rounded-lg shadow-2xl border border-white/10 z-50 max-h-96 overflow-y-auto"
    >
      {recentSearches.length > 0 ? (
        <div className="p-2">
          <div className="flex items-center justify-between px-3 py-2 mb-2">
            <h3 className="text-xs font-bold text-spotify-text-gray uppercase">Recent Searches</h3>
            <button
              onClick={() => {
                useSearchStore.getState().clearHistory();
              }}
              className="text-xs text-spotify-text-gray hover:text-white transition-colors"
            >
              Clear
            </button>
          </div>
          {recentSearches.map((search) => (
            <button
              key={search}
              onClick={() => {
                onSelect(search);
                router.push(`/search?q=${encodeURIComponent(search)}`);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 transition-colors group"
            >
              <Clock size={16} className="text-spotify-text-gray flex-shrink-0" />
              <span className="flex-1 text-left text-white">{search}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSearch(search);
                }}
                className="opacity-0 group-hover:opacity-100 text-spotify-text-gray hover:text-white transition-all"
              >
                <X size={14} />
              </button>
            </button>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <Search size={32} className="text-spotify-text-gray mx-auto mb-2" />
          <p className="text-spotify-text-gray text-sm">No recent searches</p>
        </div>
      )}
    </div>
  );
}
