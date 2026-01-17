import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CheckInState {
  lastCheckIn: string | null; // ISO date string
  streak: number;
  todaysCheckIn: {
    mood?: { tired?: number; energetic?: number; lonely?: number; connected?: number };
    feelings?: string[];
    journalEntry?: string;
  } | null;
  checkIn: (mood?: { tired?: number; energetic?: number; lonely?: number; connected?: number }, feelings?: string[], journalEntry?: string) => void;
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
      
      checkIn: (mood, feelings, journalEntry) => {
        const today = new Date().toISOString();
        const { lastCheckIn, streak } = get();
        
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
        
        set({
          lastCheckIn: today,
          streak: newStreak,
          todaysCheckIn: { mood, feelings, journalEntry },
        });
      },
      
      getStreak: () => {
        const { lastCheckIn, streak } = get();
        if (!lastCheckIn) return 0;
        if (isToday(lastCheckIn)) return streak;
        if (isYesterday(lastCheckIn)) return streak;
        return 0; // Streak broken
      },
    }),
    {
      name: 'checkin-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
