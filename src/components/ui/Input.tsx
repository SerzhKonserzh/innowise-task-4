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
					padding: ${theme.spacing(1.5)};
					border: 1px solid ${theme.colors.border};
					border-radius: ${theme.borderRadius.medium};
					font-size: ${theme.typography.fontSize.base};
					background: ${theme.colors.background};
					color: ${theme.colors.textPrimary};

					&:focus {
						outline: none;
						border-color: ${theme.colors.accent};
						box-shadow: ${theme.shadows.focus};
					}
					&::placeholder {
						color: ${theme.colors.placeholder};
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
