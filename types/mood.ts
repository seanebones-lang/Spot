export type MoodState =
  | "Melancholic"
  | "Nostalgic"
  | "Reflective"
  | "Content"
  | "Joyful"
  | "Euphoric";

export interface MoodTags {
  mood: MoodState;
  feelings: string[]; // Multi-select: ['Anxious', 'Overwhelmed'] or ['Great', 'Confident']
  vibe: number; // 0-100 (Calm ↔ Energetic)
  genres: string[]; // Multi-select: ['Pop', 'Electronic']
}

export interface AIMoodSuggestion {
  mood: MoodState;
  feelings: string[];
  vibe: number;
  genres: string[];
  confidence: number; // 0-1
  embedding?: number[]; // Optional embedding vector for vector DB storage
}
