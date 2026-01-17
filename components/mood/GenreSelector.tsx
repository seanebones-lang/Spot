'use client';

import { cn } from '@/lib/utils';

interface GenreSelectorProps {
  selectedGenres: string[];
  onToggle: (genre: string) => void;
}

const genres = ['Pop', 'Rock', 'Electronic', 'Hip-Hop', 'Jazz', 'Classical', 'Ambient', 'R&B', 'Country', 'Indie', 'Metal', 'Punk', 'Blues', 'Folk', 'Reggae'];

export default function GenreSelector({ selectedGenres, onToggle }: GenreSelectorProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">4. GENRE</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onToggle(genre)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              selectedGenres.includes(genre)
                ? "bg-spotify-green text-black"
                : "bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80"
            )}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}
