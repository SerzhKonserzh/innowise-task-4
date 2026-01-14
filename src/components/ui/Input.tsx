import { css } from '@emotion/react';
import { theme } from '../../theme/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	errorMessage?: string;
}

export const Input = ({ errorMessage, ...props }: InputProps) => {
	return (
		<div
			css={css`
				width: 100%;
				display: flex;
				flex-direction: column;
				gap: ${theme.spacing(1)};
			`}
		>
			<input
				{...props}
				css={theme => css`
					width: 100%;
					padding: 0 ${theme.spacing(2)};
					height: ${theme.components.input.height};
					border: 1px solid ${theme.colors.border};
					border-radius: ${theme.borderRadius.medium};
					font-size: ${theme.typography.fontSize.base};
					background: ${theme.colors.backgroundSecondary};
					color: ${theme.colors.textPrimary};
					transition: all 0.2s ease-in-out;

					&:focus {
						outline: none;
						border-color: ${theme.colors.accent};
						box-shadow: ${theme.shadows.focus};
					}
					
					&:hover {
						border-color: ${theme.colors.textTertiary};
					}
					
					&::placeholder {
						color: ${theme.colors.placeholder};
					}
					
					&:disabled {
						opacity: 0.6;
						cursor: not-allowed;
					}
				`}
			/>
			{errorMessage && (
				<p
					css={theme => css`
						margin: 0;
						color: ${theme.colors.error};
						font-size: ${theme.typography.fontSize.sm};
					`}
				>
					{errorMessage}
				</p>
			)}
		</div>
	);
};
