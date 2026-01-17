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
  autoplay: boolean;
  smartShuffle: boolean;
  crossfade: boolean;
  crossfadeDuration: number; // 0-12 seconds
  gaplessPlayback: boolean;
  normalizeVolume: boolean;
  setCurrentTrack: (track: Track | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setProgress: (progress: number) => void;
  setVolume: (volume: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
  reorderQueue: (fromIndex: number, toIndex: number) => void;
  setShuffle: (shuffle: boolean) => void;
  setRepeat: (repeat: 'off' | 'all' | 'one') => void;
  setAutoplay: (autoplay: boolean) => void;
  setSmartShuffle: (smartShuffle: boolean) => void;
  setCrossfade: (crossfade: boolean) => void;
  setCrossfadeDuration: (duration: number) => void;
  setGaplessPlayback: (gapless: boolean) => void;
  setNormalizeVolume: (normalize: boolean) => void;
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
      autoplay: false,
      smartShuffle: false,
      crossfade: false,
      crossfadeDuration: 0,
      gaplessPlayback: false,
      normalizeVolume: false,
      
      setCurrentTrack: (track) => set({ currentTrack: track }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setProgress: (progress) => set({ progress }),
      setVolume: (volume) => set({ volume }),
      
      addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
      removeFromQueue: (trackId) => set((state) => ({
        queue: state.queue.filter(t => t.id !== trackId)
      })),
      clearQueue: () => set({ queue: [] }),
      reorderQueue: (fromIndex, toIndex) => set((state) => {
        const newQueue = [...state.queue];
        const [removed] = newQueue.splice(fromIndex, 1);
        newQueue.splice(toIndex, 0, removed);
        return { queue: newQueue };
      }),
      
      setShuffle: (shuffle) => set({ shuffle }),
      setRepeat: (repeat) => set({ repeat }),
      setAutoplay: (autoplay) => set({ autoplay }),
      setSmartShuffle: (smartShuffle) => set({ smartShuffle }),
      setCrossfade: (crossfade) => set({ crossfade }),
      setCrossfadeDuration: (duration) => set({ crossfadeDuration: Math.max(0, Math.min(12, duration)) }),
      setGaplessPlayback: (gapless) => set({ gaplessPlayback: gapless }),
      setNormalizeVolume: (normalize) => set({ normalizeVolume: normalize }),
      
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
