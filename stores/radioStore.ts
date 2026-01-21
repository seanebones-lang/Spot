<<<<<<< HEAD
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createSafeStorage } from "@/lib/safeStorage";
=======
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createSafeStorage } from '@/lib/safeStorage';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export interface RadioStation {
  id: string;
  name: string;
  genre: string;
  description?: string;
  videoId: string;
  duration: number;
  icon?: string;
}

interface RadioState {
  stations: RadioStation[];
  currentStation: RadioStation | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  volume: number; // 0-100
  startTime: number; // Random start time for "live radio" feel
  setStations: (stations: RadioStation[]) => void;
  setCurrentStation: (station: RadioStation | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setVolume: (volume: number) => void;
  setStartTime: (time: number) => void;
  playStation: (station: RadioStation) => void;
  stopStation: () => void;
  togglePlayPause: () => void;
}

export const useRadioStore = create<RadioState>()(
  persist(
    (set, get) => ({
      stations: [],
      currentStation: null,
      isPlaying: false,
      isLoading: false,
      error: null,
      volume: 50,
      startTime: 0,

      setStations: (stations) => set({ stations }),
<<<<<<< HEAD

      setCurrentStation: (station) => {
        // Generate random start time when switching stations
        const randomStart = station
          ? Math.floor(Math.random() * station.duration)
          : 0;
        set({
=======
      
      setCurrentStation: (station) => {
        // Generate random start time when switching stations
        const randomStart = station 
          ? Math.floor(Math.random() * station.duration)
          : 0;
        set({ 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          currentStation: station,
          startTime: randomStart,
          error: null,
        });
      },

      setIsPlaying: (isPlaying) => set({ isPlaying }),
<<<<<<< HEAD

      setIsLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      setVolume: (volume) =>
        set({ volume: Math.max(0, Math.min(100, volume)) }),

=======
      
      setIsLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),
      
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(100, volume)) }),
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      setStartTime: (time) => set({ startTime: time }),

      playStation: (station) => {
        const randomStart = Math.floor(Math.random() * station.duration);
        set({
          currentStation: station,
          startTime: randomStart,
          isPlaying: true,
          isLoading: true,
          error: null,
        });
      },

      stopStation: () => {
        set({
          currentStation: null,
          isPlaying: false,
          isLoading: false,
          startTime: 0,
        });
      },

      togglePlayPause: () => {
        const { isPlaying, currentStation } = get();
        if (currentStation) {
          set({ isPlaying: !isPlaying });
        }
      },
    }),
    {
<<<<<<< HEAD
      name: "radio-storage",
=======
      name: 'radio-storage',
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
          return sessionStorage;
        }
      }),
      partialize: (state) => ({
        currentStation: state.currentStation,
        volume: state.volume,
        startTime: state.startTime,
      }),
<<<<<<< HEAD
    },
  ),
=======
    }
  )
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
);
