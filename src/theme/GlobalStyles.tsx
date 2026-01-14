import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

export const GlobalStyles = () => (
	<Global
		styles={theme => css`
			${emotionNormalize}
			* {
				box-sizing: border-box;
			}
			html {
				font-size: 16px;
				scroll-behavior: smooth;
			}

			body {
				color: ${theme.colors.textPrimary};
				background-color: ${theme.colors.background};
				font-family: ${theme.typography.fontFamily};
				line-height: 1.5;
				margin: 0;
				padding: 0;
				overflow-x: hidden;
			}

			button,
			input,
			textarea {
				font-family: ${theme.typography.fontFamily};
				font-size: 1rem;
			}

			a {
				text-decoration: none;
				color: inherit;
			}

			ul,
			ol {
				padding-left: 0;
				margin: 0;
			}

			li {
				list-style: none;
			}

			h1, h2, h3, h4, h5, h6 {
				margin: 0 0 ${theme.spacing(2)} 0;
				font-weight: ${theme.typography.fontWeight.bold};
				color: ${theme.colors.textPrimary};
			}

			p {
				margin: 0 0 ${theme.spacing(2)} 0;
				color: ${theme.colors.textPrimary};
			}

			img {
				max-width: 100%;
				height: auto;
				display: block;
			}

			// Стили для скроллбара
			::-webkit-scrollbar {
				width: 8px;
				height: 8px;
			}

			::-webkit-scrollbar-track {
				background: ${theme.colors.backgroundTertiary};
			}

			::-webkit-scrollbar-thumb {
				background: ${theme.colors.border};
				border-radius: 4px;
			}

			::-webkit-scrollbar-thumb:hover {
				background: ${theme.colors.textTertiary};
			}
		`}
	/>
);
