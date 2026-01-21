<<<<<<< HEAD
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AffirmationCategory =
  | "morning"
  | "calm"
  | "confidence"
  | "empowerment";
=======
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type AffirmationCategory = 'morning' | 'calm' | 'confidence' | 'empowerment';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export interface Affirmation {
  id: string;
  text: string;
  audioUrl?: string;
  category: AffirmationCategory;
<<<<<<< HEAD
  voice: "team" | "artist" | string;
=======
  voice: 'team' | 'artist' | string;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  artistId?: string;
}

interface AffirmationsState {
  affirmations: Affirmation[];
  favorites: string[];
  dailyReminder: boolean;
  reminderTime?: string;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  setDailyReminder: (enabled: boolean, time?: string) => void;
}

const defaultAffirmations: Affirmation[] = [
<<<<<<< HEAD
  {
    id: "1",
    text: "You are capable of amazing things. Let today be proof of that.",
    category: "morning",
    voice: "team",
  },
  {
    id: "2",
    text: "Take a deep breath. You are safe, you are strong, you are enough.",
    category: "calm",
    voice: "team",
  },
  {
    id: "3",
    text: "Your voice matters. Your story matters. You matter.",
    category: "confidence",
    voice: "team",
  },
  {
    id: "4",
    text: "You have the power to create change in your life, one step at a time.",
    category: "empowerment",
    voice: "team",
  },
=======
  { id: '1', text: 'You are capable of amazing things. Let today be proof of that.', category: 'morning', voice: 'team' },
  { id: '2', text: 'Take a deep breath. You are safe, you are strong, you are enough.', category: 'calm', voice: 'team' },
  { id: '3', text: 'Your voice matters. Your story matters. You matter.', category: 'confidence', voice: 'team' },
  { id: '4', text: 'You have the power to create change in your life, one step at a time.', category: 'empowerment', voice: 'team' },
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
];

export const useAffirmationsStore = create<AffirmationsState>()(
  persist(
    (set) => ({
      affirmations: defaultAffirmations,
      favorites: [],
      dailyReminder: false,
<<<<<<< HEAD

      addFavorite: (id) =>
        set((state) => ({
          favorites: [...state.favorites.filter((f) => f !== id), id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== id),
        })),
      setDailyReminder: (enabled, time) =>
        set({ dailyReminder: enabled, reminderTime: time }),
    }),
    {
      name: "affirmations-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
=======
      
      addFavorite: (id) => set((state) => ({
        favorites: [...state.favorites.filter(f => f !== id), id]
      })),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter(f => f !== id)
      })),
      setDailyReminder: (enabled, time) => set({ dailyReminder: enabled, reminderTime: time }),
    }),
    {
      name: 'affirmations-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
);
