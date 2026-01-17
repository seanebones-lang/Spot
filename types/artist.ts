export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: number;
  verified: boolean;
  bio?: string;
  genre?: string[];
}
