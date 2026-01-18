'use client';

import { X, Trash2, GripVertical, Power, Music } from 'lucide-react';
import { useState } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import PlayButton from './PlayButton';
import EmptyState from './EmptyState';
import { formatDuration, cn } from '@/lib/utils';

interface QueuePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QueuePanel({ isOpen, onClose }: QueuePanelProps) {
  const { 
    queue, 
    currentTrack, 
    setCurrentTrack, 
    setIsPlaying,
    removeFromQueue,
    clearQueue,
    reorderQueue,
    autoplay,
    smartShuffle,
    setAutoplay,
    setSmartShuffle
  } = usePlayerStore();
  
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      reorderQueue(draggedIndex, dragOverIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedIndex !== null && draggedIndex !== index) {
      reorderQueue(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-200",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className={cn(
          "bg-spotify-dark-gray w-full max-w-md h-[70vh] rounded-t-2xl flex flex-col transform transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        style={{
          transition: "transform 300ms cubic-bezier(0.3, 0, 0.1, 1), opacity 200ms ease-out"
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold">Queue</h2>
          <div className="flex items-center gap-2">
            {queue.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear the queue? This will remove all tracks.')) {
                    clearQueue();
                  }
                }}
                className="text-xs text-spotify-text-gray hover:text-white transition-colors px-2 py-1"
                title="Clear queue"
                aria-label="Clear queue"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="text-spotify-text-gray hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Autoplay and Smart Shuffle Toggles */}
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoplay(!autoplay)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                autoplay 
                  ? "bg-white text-black" 
                  : "bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10"
              )}
            >
              <Power size={14} className={cn(!autoplay && "opacity-50")} />
              Autoplay
            </button>
            <button
              onClick={() => setSmartShuffle(!smartShuffle)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                smartShuffle 
                  ? "bg-white text-black" 
                  : "bg-transparent text-spotify-text-gray hover:text-white hover:bg-white/10"
              )}
            >
              <Power size={14} className={cn(!smartShuffle && "opacity-50")} />
              Smart Shuffle
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {currentTrack && (
            <div className="p-3 bg-spotify-light-gray rounded-lg mb-4">
              <div className="text-xs text-spotify-text-gray mb-2">Now Playing</div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-spotify-dark-gray rounded">
                  {currentTrack.coverArt && (
                    <img src={currentTrack.coverArt} alt={currentTrack.name} className="w-full h-full object-cover rounded" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate text-white">{currentTrack.name}</div>
                  <div className="text-sm text-spotify-text-gray truncate">{currentTrack.artist}</div>
                </div>
                <span className="text-xs text-spotify-text-gray">{formatDuration(currentTrack.duration)}</span>
              </div>
            </div>
          )}
          {queue.length === 0 && (
            <EmptyState
              icon={Music}
              title="Your queue is empty"
              description="Add tracks to your queue to see them here. Play a track, album, or playlist to get started."
            />
          )}
          {queue.map((track, index) => (
            <div
              key={`${track.id}-${index}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => {
                setCurrentTrack(track);
                setIsPlaying(true);
              }}
              className={cn(
                "flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer group transition-all",
                draggedIndex === index && "opacity-50 scale-95",
                dragOverIndex === index && dragOverIndex !== draggedIndex && "bg-white/20 border-l-4 border-spotify-green transform translate-x-1"
              )}
              style={{
                transition: draggedIndex === index || dragOverIndex === index 
                  ? 'all 150ms ease-out' 
                  : 'all 200ms ease-out'
              }}
            >
              <GripVertical 
                size={16} 
                className="text-spotify-text-gray opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing" 
              />
              <div className="w-12 h-12 bg-spotify-light-gray rounded flex-shrink-0">
                {track.coverArt && (
                  <img src={track.coverArt} alt={track.name} className="w-full h-full object-cover rounded" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate text-white">{track.name}</div>
                <div className="text-sm text-spotify-text-gray truncate">{track.artist}</div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-spotify-text-gray">{formatDuration(track.duration)}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromQueue(track.id);
                  }}
                  className="p-1.5 text-spotify-text-gray hover:text-white transition-colors"
                  title="Remove from queue"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
