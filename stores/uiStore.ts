<<<<<<< HEAD
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
=======
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface UIState {
  leftSidebarCollapsed: boolean;
  leftSidebarWidth: number; // Width in pixels
  rightSidebarOpen: boolean;
  rightSidebarWidth: number; // Width in pixels
  toggleLeftSidebar: () => void;
  setLeftSidebarCollapsed: (collapsed: boolean) => void;
  setLeftSidebarWidth: (width: number) => void;
  toggleRightSidebar: () => void;
  setRightSidebarOpen: (open: boolean) => void;
  setRightSidebarWidth: (width: number) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      leftSidebarCollapsed: false,
      leftSidebarWidth: 256, // Default 256px (w-64)
      rightSidebarOpen: true, // Default open like Spotify
      rightSidebarWidth: 320, // Default 320px (w-80)
<<<<<<< HEAD

      toggleLeftSidebar: () =>
        set((state) => ({
          leftSidebarCollapsed: !state.leftSidebarCollapsed,
          leftSidebarWidth: !state.leftSidebarCollapsed ? 64 : 256,
        })),
      setLeftSidebarCollapsed: (collapsed) =>
        set({
          leftSidebarCollapsed: collapsed,
          leftSidebarWidth: collapsed ? 64 : 256,
        }),
      setLeftSidebarWidth: (width) =>
        set({
          leftSidebarWidth: Math.max(64, Math.min(512, width)), // Min 64px, max 512px
          leftSidebarCollapsed: width <= 80, // Auto-collapse if very small
        }),

      toggleRightSidebar: () =>
        set((state) => ({ rightSidebarOpen: !state.rightSidebarOpen })),
      setRightSidebarOpen: (open) => set({ rightSidebarOpen: open }),
      setRightSidebarWidth: (width) =>
        set({
          rightSidebarWidth: Math.max(200, Math.min(640, width)), // Min 200px, max 640px
        }),
    }),
    {
      name: "ui-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
=======
      
      toggleLeftSidebar: () => set((state) => ({ 
        leftSidebarCollapsed: !state.leftSidebarCollapsed,
        leftSidebarWidth: !state.leftSidebarCollapsed ? 64 : 256
      })),
      setLeftSidebarCollapsed: (collapsed) => set({ 
        leftSidebarCollapsed: collapsed,
        leftSidebarWidth: collapsed ? 64 : 256
      }),
      setLeftSidebarWidth: (width) => set({ 
        leftSidebarWidth: Math.max(64, Math.min(512, width)), // Min 64px, max 512px
        leftSidebarCollapsed: width <= 80 // Auto-collapse if very small
      }),
      
      toggleRightSidebar: () => set((state) => ({ rightSidebarOpen: !state.rightSidebarOpen })),
      setRightSidebarOpen: (open) => set({ rightSidebarOpen: open }),
      setRightSidebarWidth: (width) => set({ 
        rightSidebarWidth: Math.max(200, Math.min(640, width)) // Min 200px, max 640px
      }),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
);
