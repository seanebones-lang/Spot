import { create } from 'zustand';
import { MoodState } from '@/types/mood';

interface MoodStateType {
  selectedMood: MoodState | null;
  selectedFeelings: string[];
  vibe: number; // 0-100
  selectedGenres: string[];
  filteredPlaylists: any[];
  setMood: (mood: MoodState | null) => void;
  setFeelings: (feelings: string[]) => void;
  setVibe: (vibe: number) => void;
  setGenres: (genres: string[]) => void;
  filterPlaylists: () => void;
}

export const useMoodStore = create<MoodStateType>((set) => ({
  selectedMood: null,
  selectedFeelings: [],
  vibe: 50,
  selectedGenres: [],
  filteredPlaylists: [],
  
  setMood: (mood) => set({ selectedMood: mood }),
  setFeelings: (feelings) => set({ selectedFeelings: feelings }),
  setVibe: (vibe) => set({ vibe }),
  setGenres: (genres) => set({ selectedGenres: genres }),
  
  filterPlaylists: () => {
    // This will be implemented with the mood matching algorithm
    set({ filteredPlaylists: [] });
  },
}));
