import '@emotion/react';
import type { theme, ThemeType } from '../theme/theme';

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}