import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
      
      addPoints: (amount, reason) => {
        set((state) => ({
          totalPoints: state.totalPoints + amount,
          pointsToday: state.pointsToday + amount,
        }));
      },
      
      getTotalPoints: () => get().totalPoints,
    }),
    {
      name: 'points-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
