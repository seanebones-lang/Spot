<<<<<<< HEAD
import { Track } from "./track";
import { Artist } from "./artist";
=======
import { Track } from './track';
import { Artist } from './artist';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export interface Album {
  id: string;
  name: string;
  artist: Artist;
<<<<<<< HEAD
  coverArt: string;
=======
  coverArt?: string; // Optional - fallback to placeholder
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  tracks: Track[];
  releaseDate: string;
  label?: string;
  copyright?: string;
  totalDuration: number; // in milliseconds
}
