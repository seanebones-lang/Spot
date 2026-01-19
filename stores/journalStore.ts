import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface JournalEntry {
  id: string;
  date: string;
  text: string;
  moodTags?: {
    tired?: number;
    energetic?: number;
    lonely?: number;
    connected?: number;
  };
  feelings?: string[];
  associatedMusic?: string[]; // Track IDs
  shared: boolean;
}

interface JournalState {
  entries: JournalEntry[];
  streak: number;
  addEntry: (entry: Omit<JournalEntry, "id" | "date">) => void;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  getStreak: () => number;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],
      streak: 0,

      addEntry: (entry) => {
        const newEntry: JournalEntry = {
          ...entry,
          id: Date.now().toString(),
          date: new Date().toISOString(),
        };
        set((state) => {
          const entries = [...state.entries, newEntry].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );

          // Calculate streak
          let streak = 1;
          if (entries.length > 1) {
            let currentDate = new Date(newEntry.date);
            for (let i = 1; i < entries.length; i++) {
              const entryDate = new Date(entries[i].date);
              const diffDays = Math.floor(
                (currentDate.getTime() - entryDate.getTime()) /
                  (1000 * 60 * 60 * 24),
              );
              if (diffDays === 1) {
                streak++;
                currentDate = entryDate;
              } else {
                break;
              }
            }
          }

          return { entries, streak };
        });
      },

      updateEntry: (id, updates) =>
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.id === id ? { ...entry, ...updates } : entry,
          ),
        })),

      deleteEntry: (id) =>
        set((state) => ({
          entries: state.entries.filter((entry) => entry.id !== id),
        })),

      getStreak: () => get().streak,
    }),
    {
      name: "journal-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
