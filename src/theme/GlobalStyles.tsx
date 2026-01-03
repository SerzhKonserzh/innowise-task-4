import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

export const GlobalStyles = () => (
  <Global
    styles={(theme) => css`
      ${emotionNormalize}
      html {
        font-size: 16px;
        scroll-behavior: smooth;
      }

      body {
        color: ${theme.colors.textPrimary};
        background-color: ${theme.colors.background};
        line-height: 1.5;
        min-height: 100vh;
        margin: 0;
        padding: 0;
      }

      button,
      input,
      textarea {
        font-size: 1rem;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      ul, ol {
        padding-left: 0;
      }

      li {
        list-style: none;
      }
    `}
  />
);