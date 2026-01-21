"use client";

import { cn } from "@/lib/utils";

interface GenreSelectorProps {
  selectedGenres: string[];
  onToggle: (genre: string) => void;
}

const genres = [
  "Pop",
  "Rock",
  "Electronic",
  "Hip-Hop",
  "Jazz",
  "Classical",
  "Ambient",
  "R&B",
  "Country",
  "Indie",
  "Metal",
  "Punk",
  "Blues",
  "Folk",
  "Reggae",
];

export default function GenreSelector({
  selectedGenres,
  onToggle,
}: GenreSelectorProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">4. GENRE</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onToggle(genre)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              "bg-transparent border-2",
              selectedGenres.includes(genre)
                ? "border-spotify-green text-spotify-green shadow-[0_0_15px_rgba(29,185,84,0.5)]"
                : "border-spotify-light-gray/50 text-white hover:border-spotify-green hover:shadow-[0_0_20px_rgba(29,185,84,0.6)]",
            )}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}
