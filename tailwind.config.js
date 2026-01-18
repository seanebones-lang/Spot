/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Spotify exact colors
        'spotify-green': '#1DB954',
        'spotify-black': '#000000',
        'spotify-dark': '#121212',
        'spotify-dark-gray': '#181818',
        'spotify-light-gray': '#282828',
        'spotify-text': '#FFFFFF',
        'spotify-text-gray': '#B3B3B3',
        // Empulse brand colors
        'empulse-red': '#E63946',
        'empulse-blue': '#457B9D',
        'empulse-purple': '#7209B7',
      },
      fontFamily: {
        'circular': ['var(--font-circular)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      spacing: {
        'player-height': '90px',
      },
      inset: {
        'player-height': '90px', // For bottom positioning above player
      },
      borderRadius: {
        'spotify': '4px',
      },
    },
  },
  plugins: [],
}
