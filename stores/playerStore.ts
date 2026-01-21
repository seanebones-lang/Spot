<<<<<<< HEAD
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Track } from "@/types/track";
import { createSafeStorage } from "@/lib/safeStorage";
=======
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Track } from '@/types/track';
import { createSafeStorage } from '@/lib/safeStorage';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number; // 0-100
  volume: number; // 0-100
  queue: Track[];
  recentlyPlayed: Track[];
  shuffle: boolean;
<<<<<<< HEAD
  repeat: "off" | "all" | "one";
=======
  repeat: 'off' | 'all' | 'one';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
  addToRecentlyPlayed: (track: Track) => void;
  setShuffle: (shuffle: boolean) => void;
<<<<<<< HEAD
  setRepeat: (repeat: "off" | "all" | "one") => void;
=======
  setRepeat: (repeat: 'off' | 'all' | 'one') => void;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
      recentlyPlayed: [],
      shuffle: false,
<<<<<<< HEAD
      repeat: "off",
=======
      repeat: 'off',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      autoplay: false,
      smartShuffle: false,
      crossfade: false,
      crossfadeDuration: 0,
      gaplessPlayback: false,
      normalizeVolume: false,
<<<<<<< HEAD

=======
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      setCurrentTrack: (track) => set({ currentTrack: track }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setProgress: (progress) => set({ progress }),
      setVolume: (volume) => set({ volume }),
<<<<<<< HEAD

      addToQueue: (track) =>
        set((state) => ({ queue: [...state.queue, track] })),
      removeFromQueue: (trackId) =>
        set((state) => ({
          queue: state.queue.filter((t) => t.id !== trackId),
        })),
      clearQueue: () => set({ queue: [] }),
      reorderQueue: (fromIndex, toIndex) =>
        set((state) => {
          const newQueue = [...state.queue];
          const [removed] = newQueue.splice(fromIndex, 1);
          newQueue.splice(toIndex, 0, removed);
          return { queue: newQueue };
        }),

      addToRecentlyPlayed: (track) =>
        set((state) => {
          // Remove track if already exists, then add to front
          const filtered = state.recentlyPlayed.filter(
            (t) => t.id !== track.id,
          );
          return { recentlyPlayed: [track, ...filtered].slice(0, 10) }; // Keep last 10
        }),

=======
      
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
      
      addToRecentlyPlayed: (track) => set((state) => {
        // Remove track if already exists, then add to front
        const filtered = state.recentlyPlayed.filter(t => t.id !== track.id);
        return { recentlyPlayed: [track, ...filtered].slice(0, 10) }; // Keep last 10
      }),
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      setShuffle: (shuffle) => set({ shuffle }),
      setRepeat: (repeat) => set({ repeat }),
      setAutoplay: (autoplay) => set({ autoplay }),
      setSmartShuffle: (smartShuffle) => set({ smartShuffle }),
      setCrossfade: (crossfade) => set({ crossfade }),
<<<<<<< HEAD
      setCrossfadeDuration: (duration) =>
        set({ crossfadeDuration: Math.max(0, Math.min(12, duration)) }),
      setGaplessPlayback: (gapless) => set({ gaplessPlayback: gapless }),
      setNormalizeVolume: (normalize) => set({ normalizeVolume: normalize }),

      playNext: () => {
        const { queue, shuffle, currentTrack } = get();
        if (queue.length === 0) return;

=======
      setCrossfadeDuration: (duration) => set({ crossfadeDuration: Math.max(0, Math.min(12, duration)) }),
      setGaplessPlayback: (gapless) => set({ gaplessPlayback: gapless }),
      setNormalizeVolume: (normalize) => set({ normalizeVolume: normalize }),
      
      playNext: () => {
        const { queue, shuffle, currentTrack } = get();
        if (queue.length === 0) return;
        
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        if (shuffle) {
          const randomIndex = Math.floor(Math.random() * queue.length);
          set({ currentTrack: queue[randomIndex] });
        } else {
<<<<<<< HEAD
          const currentIndex = currentTrack
            ? queue.findIndex((t) => t.id === currentTrack.id)
=======
          const currentIndex = currentTrack 
            ? queue.findIndex(t => t.id === currentTrack.id)
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            : -1;
          const nextIndex = (currentIndex + 1) % queue.length;
          set({ currentTrack: queue[nextIndex] });
        }
      },
<<<<<<< HEAD

      playPrevious: () => {
        const { queue, currentTrack } = get();
        if (queue.length === 0) return;

        const currentIndex = currentTrack
          ? queue.findIndex((t) => t.id === currentTrack.id)
          : -1;
        const prevIndex =
          currentIndex <= 0 ? queue.length - 1 : currentIndex - 1;
=======
      
      playPrevious: () => {
        const { queue, currentTrack } = get();
        if (queue.length === 0) return;
        
        const currentIndex = currentTrack 
          ? queue.findIndex(t => t.id === currentTrack.id)
          : -1;
        const prevIndex = currentIndex <= 0 ? queue.length - 1 : currentIndex - 1;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        set({ currentTrack: queue[prevIndex] });
      },
    }),
    {
<<<<<<< HEAD
      name: "player-storage",
=======
      name: 'player-storage',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      storage: createJSONStorage(() => {
        try {
          return createSafeStorage();
        } catch (error) {
<<<<<<< HEAD
          console.error("Failed to create storage:", error);
=======
          console.error('Failed to create storage:', error);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          return sessionStorage; // Fallback to sessionStorage
        }
      }),
      partialize: (state) => ({
        currentTrack: state.currentTrack,
        progress: state.progress,
        volume: state.volume,
        queue: state.queue,
        recentlyPlayed: state.recentlyPlayed,
      }),
<<<<<<< HEAD
    },
  ),
=======
    }
  )
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
);
