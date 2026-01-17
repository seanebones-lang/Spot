import { MoodTags } from './mood';

export interface Track {
  id: string;
  name: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  duration: number; // in milliseconds
  audioUrl: string;
  coverArt: string;
  moodTags: MoodTags;
  format?: 'WAV' | 'FLAC' | 'MP3' | 'M4A' | 'MP4';
  quality?: 'lossless' | 'high' | 'standard' | 'data-saver';
  releaseDate?: string;
  isrc?: string;
}
