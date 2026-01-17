import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SearchState {
  recentSearches: string[];
  currentQuery: string;
  setQuery: (query: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      recentSearches: [],
      currentQuery: '',
      
      setQuery: (query) => set({ currentQuery: query }),
      addRecentSearch: (query) => set((state) => ({
        recentSearches: [query, ...state.recentSearches.filter(s => s !== query)].slice(0, 10)
      })),
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
