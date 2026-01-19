import { Track } from './track';
import { Artist } from './artist';

export interface Album {
  id: string;
  name: string;
  artist: Artist;
  coverArt?: string; // Optional - fallback to placeholder
  tracks: Track[];
  releaseDate: string;
  label?: string;
  copyright?: string;
  totalDuration: number; // in milliseconds
}
