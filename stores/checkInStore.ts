<<<<<<< HEAD
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
=======
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface CheckInState {
  lastCheckIn: string | null; // ISO date string
  streak: number;
  todaysCheckIn: {
<<<<<<< HEAD
    feelings?: string[];
    journalEntry?: string;
  } | null;
  checkIn: (
    feelings?: string[],
    journalEntry?: string,
  ) => void;
=======
    mood?: { tired?: number; energetic?: number; lonely?: number; connected?: number };
    feelings?: string[];
    journalEntry?: string;
  } | null;
  checkIn: (mood?: { tired?: number; energetic?: number; lonely?: number; connected?: number }, feelings?: string[], journalEntry?: string) => void;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  getStreak: () => number;
}

const isToday = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isYesterday = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
};

export const useCheckInStore = create<CheckInState>()(
  persist(
    (set, get) => ({
      lastCheckIn: null,
      streak: 0,
      todaysCheckIn: null,
<<<<<<< HEAD

      checkIn: (feelings, journalEntry) => {
        const today = new Date().toISOString();
        const { lastCheckIn, streak } = get();

=======
      
      checkIn: (mood, feelings, journalEntry) => {
        const today = new Date().toISOString();
        const { lastCheckIn, streak } = get();
        
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        let newStreak = streak;
        if (!lastCheckIn || isToday(lastCheckIn)) {
          // First check-in or already checked in today
          newStreak = lastCheckIn ? streak : streak;
        } else if (isYesterday(lastCheckIn)) {
          // Continuing streak
          newStreak = streak + 1;
        } else {
          // Streak broken
          newStreak = 1;
        }
<<<<<<< HEAD

        set({
          lastCheckIn: today,
          streak: newStreak,
          todaysCheckIn: { feelings, journalEntry },
        });
      },

=======
        
        set({
          lastCheckIn: today,
          streak: newStreak,
          todaysCheckIn: { mood, feelings, journalEntry },
        });
      },
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      getStreak: () => {
        const { lastCheckIn, streak } = get();
        if (!lastCheckIn) return 0;
        if (isToday(lastCheckIn)) return streak;
        if (isYesterday(lastCheckIn)) return streak;
        return 0; // Streak broken
      },
    }),
    {
<<<<<<< HEAD
      name: "checkin-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
=======
      name: 'checkin-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
);
