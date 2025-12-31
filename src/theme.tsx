import type { Theme } from "@emotion/react";

export const theme: Theme = {
  colors: {
    primary: '#007bc1',
    primaryLight: '#e6f2fa',
    textPrimary: '#1a1a1a',
    textSecondary: '#666',
    background: '#f9f9f9',
    white: '#fff',
    border: '#ddd',
    error: '#e02020',
    success: '#28a745',
    hoverBg: '#f0f8ff',
  },
  fonts: {
    primary: 'Helvetica Neue, Arial, sans-serif',
  },
  spacing: (factor: number) => `${factor * 8}px`,
  borderRadius: '4px',
  shadow: '0 2px 8px rgba(0,0,0,0.1)',
};