<<<<<<< HEAD
import { Track } from "./track";
=======
import { Track } from './track';
import { MoodTags } from './mood';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export interface Playlist {
  id: string;
  name: string;
  description?: string;
<<<<<<< HEAD
  coverArt: string;
  owner: string;
  ownerId: string;
  tracks: Track[];
=======
  coverArt?: string; // Optional - fallback to placeholder
  owner: string;
  ownerId: string;
  tracks: Track[];
  moodTags?: MoodTags; // Overall playlist mood
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  totalDuration: number; // in milliseconds
  createdAt: string;
  updatedAt: string;
}
