import { Track } from "./track";
import { MoodTags } from "./mood";

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverArt: string;
  owner: string;
  ownerId: string;
  tracks: Track[];
  moodTags?: MoodTags; // Overall playlist mood
  totalDuration: number; // in milliseconds
  createdAt: string;
  updatedAt: string;
}
