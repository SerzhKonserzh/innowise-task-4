import '@emotion/react';
import type { theme } from '../theme/theme';

type ThemeType = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}