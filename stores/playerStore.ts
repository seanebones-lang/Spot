import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Track } from '@/types/track';

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number; // 0-100
  volume: number; // 0-100
  queue: Track[];
  shuffle: boolean;
  repeat: 'off' | 'all' | 'one';
  setCurrentTrack: (track: Track | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setProgress: (progress: number) => void;
  setVolume: (volume: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  setShuffle: (shuffle: boolean) => void;
  setRepeat: (repeat: 'off' | 'all' | 'one') => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      isPlaying: false,
      progress: 0,
      volume: 50,
      queue: [],
      shuffle: false,
      repeat: 'off',
      
      setCurrentTrack: (track) => set({ currentTrack: track }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setProgress: (progress) => set({ progress }),
      setVolume: (volume) => set({ volume }),
      
      addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
      removeFromQueue: (trackId) => set((state) => ({
        queue: state.queue.filter(t => t.id !== trackId)
      })),
      
      setShuffle: (shuffle) => set({ shuffle }),
      setRepeat: (repeat) => set({ repeat }),
      
      playNext: () => {
        const { queue, shuffle, currentTrack } = get();
        if (queue.length === 0) return;
        
        if (shuffle) {
          const randomIndex = Math.floor(Math.random() * queue.length);
          set({ currentTrack: queue[randomIndex] });
        } else {
          const currentIndex = currentTrack 
            ? queue.findIndex(t => t.id === currentTrack.id)
            : -1;
          const nextIndex = (currentIndex + 1) % queue.length;
          set({ currentTrack: queue[nextIndex] });
        }
      },
      
      playPrevious: () => {
        const { queue, currentTrack } = get();
        if (queue.length === 0) return;
        
        const currentIndex = currentTrack 
          ? queue.findIndex(t => t.id === currentTrack.id)
          : -1;
        const prevIndex = currentIndex <= 0 ? queue.length - 1 : currentIndex - 1;
        set({ currentTrack: queue[prevIndex] });
      },
    }),
    {
      name: 'player-storage',
      partialize: (state) => ({
        currentTrack: state.currentTrack,
        progress: state.progress,
        volume: state.volume,
        queue: state.queue,
      }),
    }
  )
);
