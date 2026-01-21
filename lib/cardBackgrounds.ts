/**
 * Card Background Palette
 * Provides colorful gradient backgrounds and subdued images for all empty cards
 */

export interface CardBackground {
  color: string;
  image: string;
  gradient?: string;
}

// Curated palette of subdued music/mood related Unsplash images with matching colors
const backgroundPalette: CardBackground[] = [
  {
    color: "#8D67AB",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=60",
    gradient:
      "linear-gradient(135deg, rgba(141, 103, 171, 0.9) 0%, rgba(210, 140, 235, 0.8) 100%)",
  },
  {
    color: "#E61E32",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&q=60",
    gradient:
      "linear-gradient(135deg, rgba(230, 30, 50, 0.9) 0%, rgba(255, 100, 120, 0.8) 100%)",
  },
  {
    color: "#BA5D07",
    image:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop&q=60",
    gradient:
      "linear-gradient(135deg, rgba(186, 93, 7, 0.9) 0%, rgba(255, 140, 50, 0.8) 100%)",
  },
  {
    color: "#509BF5",
    image:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=400&fit=crop&q=60",
    gradient:
      "linear-gradient(135deg, rgba(80, 155, 245, 0.9) 0%, rgba(150, 190, 255, 0.8) 100%)",
  },
  {
    color: "#E8115B",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&q=60",
    gradient:
      "linear-gradient(135deg, rgba(232, 17, 91, 0.9) 0%, rgba(255, 100, 150, 0.8) 100%)",
  },
  {
    color: "#148A08",
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop&q=60",
    gradient:
      "linear-gradient(135deg, rgba(20, 138, 8, 0.9) 0%, rgba(100, 200, 50, 0.8) 100%)",
  },
  {
    color: "#1E3264",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&q=60",
    gradient:
      "linear-gradient(135deg, rgba(30, 50, 100, 0.9) 0%, rgba(100, 150, 200, 0.8) 100%)",
  },
  {
    color: "#D84000",
    image:
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=400&fit=crop&q=60",
    gradient:
      "linear-gradient(135deg, rgba(216, 64, 0, 0.9) 0%, rgba(255, 150, 80, 0.8) 100%)",
  },
  {
    color: "#E1118C",
    image:
      "https://images.unsplash.com/photo-1461784180009-21121b2f2044?w=400&h=400&fit=crop&q=60",
    gradient:
      "linear-gradient(135deg, rgba(225, 17, 140, 0.9) 0%, rgba(255, 120, 180, 0.8) 100%)",
  },
  {
    color: "#778899",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=60",
    gradient:
      "linear-gradient(135deg, rgba(119, 136, 153, 0.9) 0%, rgba(180, 190, 200, 0.8) 100%)",
  },
  {
    color: "#0D73EC",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=60",
    gradient:
      "linear-gradient(135deg, rgba(13, 115, 236, 0.9) 0%, rgba(100, 180, 255, 0.8) 100%)",
  },
  {
    color: "#FF4632",
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=60",
    gradient:
      "linear-gradient(135deg, rgba(255, 70, 50, 0.9) 0%, rgba(255, 150, 100, 0.8) 100%)",
  },
];

/**
 * Get a consistent background for a card based on its ID or name
 * Uses deterministic hashing to ensure same card always gets same background
 */
export function getCardBackground(id: string): CardBackground {
  const hash = id.split("").reduce((acc, char) => {
    return (acc << 5) - acc + char.charCodeAt(0);
  }, 0);

  const index = Math.abs(hash) % backgroundPalette.length;
  return backgroundPalette[index];
}

/**
 * Get a sequential background for a card based on array index
 * Useful for grid layouts to cycle through palette
 */
export function getSequentialBackground(index: number): CardBackground {
  return backgroundPalette[index % backgroundPalette.length];
}

/**
 * Get a background by category
 */
export function getBackgroundByCategory(category: string): CardBackground {
  const lowerCategory = category.toLowerCase();

  // Map common categories to specific backgrounds
  const categoryMap: Record<string, number> = {
    affirmation: 0,
    morning: 1,
    calm: 2,
    confidence: 3,
    empowerment: 4,
    mood: 5,
    jazz: 6,
    rock: 1,
    pop: 0,
    hiphop: 3,
    electronic: 4,
    indie: 8,
    metal: 9,
    acoustic: 6,
    classical: 6,
    playlist: 0,
    album: 2,
    podcast: 7,
    chart: 4,
  };

  const index = categoryMap[lowerCategory] ?? 0;
  return backgroundPalette[index];
}

/**
 * Generate CSS style object for card background
 * Includes both image and gradient overlay for better text contrast
 */
export function getCardBackgroundStyle(id: string): React.CSSProperties {
  const bg = getCardBackground(id);

  return {
    backgroundImage: `
      ${bg.gradient},
      url('${bg.image}')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: bg.color,
  };
}

/**
 * Generate inline style for fast application to cards
 */
export function getCardBackgroundInline(id: string) {
  const bg = getCardBackground(id);

  return {
    background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%), url('${bg.image}') center/cover no-repeat, ${bg.color}`,
    backgroundColor: bg.color,
  };
}

/**
 * Apply background to multiple cards efficiently
 */
export function getCardBackgroundsForList(
  ids: string[],
): Record<string, React.CSSProperties> {
  return ids.reduce(
    (acc, id) => {
      acc[id] = getCardBackgroundStyle(id);
      return acc;
    },
    {} as Record<string, React.CSSProperties>,
  );
}
