export interface Artist {
  id: string;
  name: string;
  image?: string; // Optional - fallback to placeholder
  followers: number;
  verified: boolean;
  bio?: string;
  genre?: string[];
}
