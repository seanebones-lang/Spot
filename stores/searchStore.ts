import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SearchState {
  history: string[];
  recentSearches: string[];
  addSearch: (query: string) => void;
  clearHistory: () => void;
  removeSearch: (query: string) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      history: [],
      recentSearches: [],
      
      addSearch: (query) => set((state) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return state;
        
        const newHistory = [trimmedQuery, ...state.history.filter(q => q !== trimmedQuery)].slice(0, 20);
        const newRecent = [trimmedQuery, ...state.recentSearches.filter(q => q !== trimmedQuery)].slice(0, 10);
        
        return {
          history: newHistory,
          recentSearches: newRecent,
        };
      }),
      
      clearHistory: () => set({ history: [], recentSearches: [] }),
      
      removeSearch: (query) => set((state) => ({
        history: state.history.filter(q => q !== query),
        recentSearches: state.recentSearches.filter(q => q !== query),
      })),
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
