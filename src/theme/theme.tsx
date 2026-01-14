export const theme = {
  colors: {
    // Основные цвета фона
    background: '#000000',
    backgroundSecondary: '#121212',
    backgroundTertiary: '#1e1e1e',
    backgroundCard: '#1a1a1a',
    
    // Цвета текста
    textPrimary: '#ffffff',
    textSecondary: '#a8a8a8',
    textTertiary: '#8a8a8a',
    textInverse: '#000000',
    
    // Цвета границ
    border: '#2a2a2a',
    borderLight: '#3a3a3a',
    
    // Акцентные цвета
    accent: '#0099ff',
    accentHover: '#007acc',
    accentText: '#0099ff',
    
    // Цвета состояний
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    
    // Специальные цвета
    link: '#0099ff',
    placeholder: '#7a7a7a',
  },

  spacing: (factor: number): string => `${factor * 8}px`,

  borderRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    circle: '50%',
    full: '9999px',
    card: '16px',
  },

  typography: {
    fontFamily: `'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '28px',
      '4xl': '32px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  shadows: {
    card: '0 4px 12px rgba(0, 0, 0, 0.25)',
    hover: '0 6px 16px rgba(0, 0, 0, 0.3)',
    focus: '0 0 0 3px rgba(0, 153, 255, 0.3)',
    modal: '0 10px 25px rgba(0, 0, 0, 0.5)',
  },

  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
  },
  
  // Дополнительные стили для компонентов
  components: {
    button: {
      height: '40px',
      padding: '0 16px',
    },
    input: {
      height: '40px',
      padding: '0 12px',
    },
    card: {
      padding: '16px',
    }
  }
};

export type ThemeType = typeof theme;