import { Track } from "./track";

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverArt: string;
  owner: string;
  ownerId: string;
  tracks: Track[];
  totalDuration: number; // in milliseconds
  createdAt: string;
  updatedAt: string;
}
