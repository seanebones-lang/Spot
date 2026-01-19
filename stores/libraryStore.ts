import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Track } from "@/types/track";
import { Playlist } from "@/types/playlist";

interface LibraryState {
  savedTracks: Track[];
  savedAlbums: string[]; // Album IDs
  savedPlaylists: Playlist[];
  pinnedPlaylists: string[]; // Playlist IDs
  playlistOrder: string[]; // Custom order of playlist IDs
  addTrack: (track: Track) => void;
  removeTrack: (trackId: string) => void;
  toggleSavedTrack: (trackId: string) => void;
  addAlbum: (albumId: string) => void;
  removeAlbum: (albumId: string) => void;
  addPlaylist: (playlist: Playlist) => void;
  removePlaylist: (playlistId: string) => void;
  pinPlaylist: (playlistId: string) => void;
  unpinPlaylist: (playlistId: string) => void;
  reorderPlaylists: (playlistIds: string[]) => void;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      savedTracks: [],
      savedAlbums: [],
      savedPlaylists: [],
      pinnedPlaylists: [],
      playlistOrder: [],

      addTrack: (track) =>
        set((state) => ({
          savedTracks: [
            ...state.savedTracks.filter((t) => t.id !== track.id),
            track,
          ],
        })),
      removeTrack: (trackId) =>
        set((state) => ({
          savedTracks: state.savedTracks.filter((t) => t.id !== trackId),
        })),

      toggleSavedTrack: (trackId) =>
        set((state) => {
          const isSaved = state.savedTracks.some((t) => t.id === trackId);
          if (isSaved) {
            return {
              savedTracks: state.savedTracks.filter((t) => t.id !== trackId),
            };
          } else {
            // Track would need to be passed, but for now just toggle
            return state;
          }
        }),

      addAlbum: (albumId) =>
        set((state) => ({
          savedAlbums: [
            ...state.savedAlbums.filter((id) => id !== albumId),
            albumId,
          ],
        })),
      removeAlbum: (albumId) =>
        set((state) => ({
          savedAlbums: state.savedAlbums.filter((id) => id !== albumId),
        })),

      addPlaylist: (playlist) =>
        set((state) => ({
          savedPlaylists: [
            ...state.savedPlaylists.filter((p) => p.id !== playlist.id),
            playlist,
          ],
        })),
      removePlaylist: (playlistId) =>
        set((state) => ({
          savedPlaylists: state.savedPlaylists.filter(
            (p) => p.id !== playlistId,
          ),
          pinnedPlaylists: state.pinnedPlaylists.filter(
            (id) => id !== playlistId,
          ),
          playlistOrder: state.playlistOrder.filter((id) => id !== playlistId),
        })),

      pinPlaylist: (playlistId) =>
        set((state) => ({
          pinnedPlaylists: [
            ...state.pinnedPlaylists.filter((id) => id !== playlistId),
            playlistId,
          ],
        })),

      unpinPlaylist: (playlistId) =>
        set((state) => ({
          pinnedPlaylists: state.pinnedPlaylists.filter(
            (id) => id !== playlistId,
          ),
        })),

      reorderPlaylists: (playlistIds) => set({ playlistOrder: playlistIds }),
    }),
    {
      name: "library-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
