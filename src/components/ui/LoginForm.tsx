import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { css } from '@emotion/react';
import { loginSchema, type LoginSchemaType } from '../../types/LoginForm';
import { Input } from './Input';
import { Button } from './Button';

interface LoginFormProps {
	onSubmit: (data: LoginSchemaType) => void;
	isSubmitting: boolean;
	error: string | null;
}

export function LoginForm({ onSubmit, isSubmitting, error }: LoginFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema)
	});

	return (
		<div
			css={theme => css`
				max-width: 400px;
				width: 100%;
				margin: 60px auto;
				padding: ${theme.spacing(4)};
				border: 1px solid ${theme.colors.border};
				border-radius: ${theme.borderRadius.large};
				background: ${theme.colors.backgroundCard};
				box-sizing: border-box;
				box-shadow: ${theme.shadows.card};
			`}
		>
			<h2
				css={theme => css`
					text-align: center;
					margin-bottom: ${theme.spacing(4)};
					font-size: ${theme.typography.fontSize['2xl']};
					color: ${theme.colors.textPrimary};
				`}
			>
				Sign In
			</h2>

			<form
				onSubmit={handleSubmit(onSubmit)}
				css={theme => css`
					display: flex;
					flex-direction: column;
					gap: ${theme.spacing(3)};
					width: 100%;
					box-sizing: border-box;
				`}
			>
				<div css={css`width: 100%; box-sizing: border-box;`}>
					<Input
						{...register('username')}
						placeholder="Username"
						type="text"
						errorMessage={errors.username?.message}
					/>
				</div>

				<div css={css`width: 100%; box-sizing: border-box;`}>
					<Input
						{...register('password')}
						placeholder="Password"
						type="password"
						errorMessage={errors.password?.message}
					/>
				</div>

				{error && (
					<p
						css={theme => css`
							color: ${theme.colors.error};
							text-align: center;
							margin: 0;
							padding: ${theme.spacing(1)};
							border-radius: ${theme.borderRadius.small};
							background-color: rgba(244, 67, 54, 0.1);
						`}
					>
						{error}
					</p>
				)}

				<Button
					type="submit"
					disabled={isSubmitting}
					fullWidth
					size="large"
				>
					{isSubmitting ? 'Signing in...' : 'Sign In'}
				</Button>
			</form>

			<p
				css={theme => css`
					text-align: center;
					margin-top: ${theme.spacing(3)};
					color: ${theme.colors.textSecondary};
					font-size: ${theme.typography.fontSize.sm};
				`}
			>
				Use any username/password from{' '}
				<a
					href="https://dummyjson.com/users"
					target="_blank"
					rel="noopener"
					css={theme => css`
						color: ${theme.colors.link};
						text-decoration: underline;
						&:hover {
							color: ${theme.colors.accent};
						}
					`}
				>
					dummyjson users
				</a>
			</p>
		</div>
	);
}
