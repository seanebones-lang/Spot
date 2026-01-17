import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Track } from '@/types/track';
import { Playlist } from '@/types/playlist';

interface LibraryState {
  savedTracks: Track[];
  savedAlbums: string[]; // Album IDs
  savedPlaylists: Playlist[];
  addTrack: (track: Track) => void;
  removeTrack: (trackId: string) => void;
  addAlbum: (albumId: string) => void;
  removeAlbum: (albumId: string) => void;
  addPlaylist: (playlist: Playlist) => void;
  removePlaylist: (playlistId: string) => void;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      savedTracks: [],
      savedAlbums: [],
      savedPlaylists: [],
      
      addTrack: (track) => set((state) => ({
        savedTracks: [...state.savedTracks.filter(t => t.id !== track.id), track]
      })),
      removeTrack: (trackId) => set((state) => ({
        savedTracks: state.savedTracks.filter(t => t.id !== trackId)
      })),
      
      addAlbum: (albumId) => set((state) => ({
        savedAlbums: [...state.savedAlbums.filter(id => id !== albumId), albumId]
      })),
      removeAlbum: (albumId) => set((state) => ({
        savedAlbums: state.savedAlbums.filter(id => id !== albumId)
      })),
      
      addPlaylist: (playlist) => set((state) => ({
        savedPlaylists: [...state.savedPlaylists.filter(p => p.id !== playlist.id), playlist]
      })),
      removePlaylist: (playlistId) => set((state) => ({
        savedPlaylists: state.savedPlaylists.filter(p => p.id !== playlistId)
      })),
    }),
    {
      name: 'library-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
