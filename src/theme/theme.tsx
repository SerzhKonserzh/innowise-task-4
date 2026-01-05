export const theme = {
  colors: {
    background: '#101010',
    backgroundSecondary: ' #181818',
    textPrimary: '#F4F4F4',
    textSecondary: '#65676B',
    textTertiary: '#A8A8A8',

    border: '#262626',
    borderLight: '#f0f0f0',

    accent: '#0077ff',
    accentHover: '#0062cc',
    accentText: '#0077ff',

    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',

    link: '#0077ff',
    placeholder: '#b0b0b0',
  },

  spacing: (factor: number): string => `${factor * 8}px`,

  borderRadius: {
    small: '6px',
    medium: '12px',
    large: '18px',
    circle: '50%',
  },

  typography: {
    fontFamily: `'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  shadows: {
    card: '0 2px 8px rgba(0, 0, 0, 0.08)',
    hover: '0 4px 12px rgba(0, 0, 0, 0.12)',
    focus: '0 0 0 3px rgba(0, 119, 255, 0.2)',
  },
};

export type ThemeType = typeof theme;