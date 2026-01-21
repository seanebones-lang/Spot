<<<<<<< HEAD
import tracksData from "@/data/mock/tracks.json";
import artistsData from "@/data/mock/artists.json";
import albumsData from "@/data/mock/albums.json";
import playlistsData from "@/data/mock/playlists.json";
import { Track } from "@/types/track";
import { Artist } from "@/types/artist";
import { Album } from "@/types/album";
import { Playlist } from "@/types/playlist";
=======
import tracksData from '@/data/mock/tracks.json';
import artistsData from '@/data/mock/artists.json';
import albumsData from '@/data/mock/albums.json';
import playlistsData from '@/data/mock/playlists.json';
import { Track } from '@/types/track';
import { Artist } from '@/types/artist';
import { Album } from '@/types/album';
import { Playlist } from '@/types/playlist';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

// Mock data accessor - ready for backend API replacement
export const mockData = {
  getTracks: (): Track[] => tracksData as Track[],
<<<<<<< HEAD
  getTrack: (id: string): Track | undefined =>
    tracksData.find((track) => track.id === id) as Track | undefined,

  getArtists: (): Artist[] => artistsData as Artist[],
  getArtist: (id: string): Artist | undefined =>
    artistsData.find((artist) => artist.id === id) as Artist | undefined,

  getAlbums: (): Album[] => albumsData as Album[],
  getAlbum: (id: string): Album | undefined =>
    albumsData.find((album) => album.id === id) as Album | undefined,

  getPlaylists: (): Playlist[] => playlistsData as Playlist[],
  getPlaylist: (id: string): Playlist | undefined =>
    playlistsData.find((playlist) => playlist.id === id) as
      | Playlist
      | undefined,
=======
  getTrack: (id: string): Track | undefined => 
    tracksData.find(track => track.id === id) as Track | undefined,
  
  getArtists: (): Artist[] => artistsData as Artist[],
  getArtist: (id: string): Artist | undefined =>
    artistsData.find(artist => artist.id === id) as Artist | undefined,
  
  getAlbums: (): Album[] => albumsData as Album[],
  getAlbum: (id: string): Album | undefined =>
    albumsData.find(album => album.id === id) as Album | undefined,
  
  getPlaylists: (): Playlist[] => playlistsData as Playlist[],
  getPlaylist: (id: string): Playlist | undefined =>
    playlistsData.find(playlist => playlist.id === id) as Playlist | undefined,
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
};
