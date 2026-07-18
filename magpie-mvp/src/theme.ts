// Dark premium tokens. Restrained palette, one warm accent.
// The chrome should feel expensive and get out of the way so the voice is the star.

export const theme = {
  color: {
    // Backgrounds, from deepest to raised surfaces.
    bg: '#0B0B0F',
    surface: '#141419',
    surfaceRaised: '#1C1C24',
    hairline: '#26262F',

    // Text.
    text: '#F2F2F4',
    textDim: '#9A9AA6',
    textFaint: '#5C5C68',

    // The one accent — a muted iridescent green-blue, magpie-feather.
    accent: '#5EE8C4',
    accentDim: '#2C6B5C',
    onAccent: '#06120E',

    // Message bubbles.
    bubbleUser: '#232631',
    bubbleAssistant: 'transparent',

    danger: '#F0736A',
  },

  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },

  radius: {
    sm: 10,
    md: 16,
    lg: 22,
    pill: 999,
  },

  font: {
    body: 16,
    small: 13,
    tiny: 11,
    title: 28,
  },
} as const;

export type Theme = typeof theme;
