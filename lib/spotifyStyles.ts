/**
 * Spotify UI Exact Style Constants
 * Pixel-perfect measurements matching Spotify web (January 2026)
 */

export const spotifyColors = {
  green: '#1DB954',
  greenHover: '#1ED760',
  black: '#000000',
  dark: '#121212',
  darkGray: '#181818',
  lightGray: '#282828',
  text: '#FFFFFF',
  textGray: '#B3B3B3',
  white: '#FFFFFF',
} as const;

export const spotifyTypography = {
  hero: {
    fontSize: '72px',
    lineHeight: '80px',
    fontWeight: 900,
  },
  pageTitle: {
    fontSize: '32px',
    lineHeight: '36px',
    fontWeight: 700,
  },
  sectionHeader: {
    fontSize: '24px',
    lineHeight: '28px',
    fontWeight: 700,
  },
  cardTitle: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 600,
  },
  body: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
  },
  small: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
  },
  caption: {
    fontSize: '11px',
    lineHeight: '16px',
    fontWeight: 400,
  },
  uppercase: {
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  },
} as const;

export const spotifySpacing = {
  playerHeight: '90px',
  topBarHeight: '56px',
  sidebarDefaultWidth: '240px',
  sidebarCollapsedWidth: '72px',
  sidebarMinWidth: '180px',
  sidebarMaxWidth: '400px',
  padding: {
    page: '32px',
    card: '16px',
    button: { horizontal: '16px', vertical: '12px' },
  },
  gap: {
    section: '24px',
    card: '16px',
    item: '8px',
  },
  borderRadius: {
    button: '500px',
    card: '8px',
    image: '4px',
    small: '4px',
  },
} as const;

export const spotifyTransitions = {
  default: '200ms ease-out',
  sidebar: '300ms ease-in-out',
  hover: '200ms ease-out',
  active: '100ms ease-out',
} as const;

/**
 * Get exact Spotify button styles
 */
export const getSpotifyButtonStyles = (variant: 'primary' | 'secondary' | 'ghost' = 'primary') => {
  const base = {
    borderRadius: spotifySpacing.borderRadius.button,
    fontSize: spotifyTypography.body.fontSize,
    lineHeight: spotifyTypography.body.lineHeight,
    fontWeight: 700,
    letterSpacing: '0.1em',
    padding: `${spotifySpacing.padding.button.vertical} ${spotifySpacing.padding.button.horizontal}`,
    transition: spotifyTransitions.default,
    border: 'none',
    cursor: 'pointer',
  };

  switch (variant) {
    case 'primary':
      return {
        ...base,
        backgroundColor: spotifyColors.green,
        color: spotifyColors.black,
      };
    case 'secondary':
      return {
        ...base,
        backgroundColor: spotifyColors.white,
        color: spotifyColors.black,
      };
    case 'ghost':
      return {
        ...base,
        backgroundColor: 'transparent',
        color: spotifyColors.textGray,
      };
    default:
      return base;
  }
};

/**
 * Get exact Spotify card styles
 */
export const getSpotifyCardStyles = () => ({
  backgroundColor: spotifyColors.darkGray,
  borderRadius: spotifySpacing.borderRadius.card,
  padding: spotifySpacing.padding.card,
  transition: spotifyTransitions.hover,
});

/**
 * Get exact Spotify hover styles
 */
export const getSpotifyHoverStyles = (element: 'card' | 'link' | 'button' | 'track') => {
  switch (element) {
    case 'card':
      return {
        backgroundColor: spotifyColors.lightGray,
      };
    case 'link':
      return {
        color: spotifyColors.text,
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
      };
    case 'button':
      return {
        transform: 'scale(1.05)',
      };
    case 'track':
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      };
    default:
      return {};
  }
};

/**
 * Common Spotify style objects for direct use
 */
export const spotifyStyles = {
  page: {
    backgroundColor: spotifyColors.dark,
    padding: spotifySpacing.padding.page,
    minHeight: '100vh',
    color: spotifyColors.text,
  },
  section: {
    marginBottom: spotifySpacing.gap.section,
  },
  sectionTitle: {
    ...spotifyTypography.sectionHeader,
    color: spotifyColors.text,
    marginBottom: spotifySpacing.gap.card,
  },
  card: getSpotifyCardStyles(),
  button: {
    primary: getSpotifyButtonStyles('primary'),
    secondary: getSpotifyButtonStyles('secondary'),
    ghost: getSpotifyButtonStyles('ghost'),
  },
} as const;
