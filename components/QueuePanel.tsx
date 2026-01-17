'use client';

import { X, Trash2, GripVertical, Power } from 'lucide-react';
import { useState } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import PlayButton from './PlayButton';
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
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      reorderQueue(draggedIndex, dragOverIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-spotify-dark-gray w-full max-w-md h-[70vh] rounded-t-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold">Queue</h2>
          <div className="flex items-center gap-2">
            {queue.length > 0 && (
              <button
                onClick={clearQueue}
                className="text-xs text-spotify-text-gray hover:text-white transition-colors px-2 py-1"
                title="Clear queue"
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
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
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
            <div className="text-center py-16 text-spotify-text-gray">
              <p>Your queue is empty</p>
            </div>
          )}
          {queue.map((track, index) => (
            <div
              key={track.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => {
                setCurrentTrack(track);
                setIsPlaying(true);
              }}
              className={cn(
                "flex items-center gap-3 p-3 hover:bg-white/10 rounded-lg cursor-pointer group transition-all",
                draggedIndex === index && "opacity-50",
                dragOverIndex === index && "bg-white/20 border-l-2 border-spotify-green"
              )}
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
