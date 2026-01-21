module.exports = {
<<<<<<< HEAD
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "spotify-green": "#1DB954", // Spotify Green
=======
  "content": [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  "theme": {
    "extend": {
      "colors": {
        "spotify-green": "#7209B7", // Changed to Empulse Purple
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        "spotify-black": "#000000",
        "spotify-dark": "#121212",
        "spotify-dark-gray": "#181818",
        "spotify-light-gray": "#282828",
        "spotify-text": "#FFFFFF",
        "spotify-text-gray": "#B3B3B3",
<<<<<<< HEAD
      },
      fontFamily: {
        circular: [
=======
        "empulse-red": "#E63946",
        "empulse-blue": "#457B9D",
        "empulse-purple": "#7209B7"
      },
      "fontFamily": {
        "circular": [
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          "var(--font-circular)",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
<<<<<<< HEAD
          "sans-serif",
        ],
      },
      spacing: {
        "player-height": "90px",
      },
      inset: {
        "player-height": "90px",
      },
      borderRadius: {
        spotify: "4px",
      },
      screens: {
        xs: "375px", // Small mobile devices
        sm: "640px", // Mobile (standard)
        md: "768px", // Tablets (Spotify 2-column layout starts)
        lg: "1024px", // Desktop (main layout)
        xl: "1280px", // Large desktop
        "2xl": "1536px", // Extra large desktop
        "spotify-sm": "320px", // Legacy: keep for compatibility
      },
      boxShadow: {
        spotify: "0 4px 12px rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [],
};
=======
          "sans-serif"
        ]
      },
      "spacing": {
        "player-height": "90px",
        "player-height-mobile": "60px"
      },
      "inset": {
        "player-height": "90px",
        "player-height-mobile": "60px"
      },
      "borderRadius": {
        "spotify": "4px"
      },
      "screens": {
        "xs": "375px",        // Small mobile devices
        "sm": "640px",        // Mobile (standard)
        "md": "768px",        // Tablets (Spotify 2-column layout starts)
        "lg": "1024px",       // Desktop (main layout)
        "xl": "1280px",       // Large desktop
        "2xl": "1536px",      // Extra large desktop
        "spotify-sm": "320px" // Legacy: keep for compatibility
      },
      "boxShadow": {
        "spotify": "0 4px 12px rgba(0,0,0,0.25)"
      }
    }
  },
  "plugins": []
}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
