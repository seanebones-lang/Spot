<<<<<<< HEAD
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
=======
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface PointsState {
  totalPoints: number;
  pointsToday: number;
  badges: string[];
  addPoints: (amount: number, reason: string) => void;
  getTotalPoints: () => number;
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set, get) => ({
      totalPoints: 0,
      pointsToday: 0,
      badges: [],
<<<<<<< HEAD

=======
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      addPoints: (amount, reason) => {
        set((state) => ({
          totalPoints: state.totalPoints + amount,
          pointsToday: state.pointsToday + amount,
        }));
      },
<<<<<<< HEAD

      getTotalPoints: () => get().totalPoints,
    }),
    {
      name: "points-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
=======
      
      getTotalPoints: () => get().totalPoints,
    }),
    {
      name: 'points-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
);
