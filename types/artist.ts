export interface Artist {
  id: string;
  name: string;
<<<<<<< HEAD
  image: string;
=======
  image?: string; // Optional - fallback to placeholder
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  followers: number;
  verified: boolean;
  bio?: string;
  genre?: string[];
}
