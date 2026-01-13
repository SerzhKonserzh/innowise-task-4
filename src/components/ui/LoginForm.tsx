import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { css } from '@emotion/react';
import { loginSchema, type LoginSchemaType } from '../../types/LoginForm';
import { Input } from './Input';

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
				max-width: 500px;
				margin: 60px auto;
				padding: ${theme.spacing(4)};
				border: 1px solid ${theme.colors.border};
				border-radius: ${theme.borderRadius.medium};
				background: ${theme.colors.background};
				box-sizing: border-box;
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
					gap: ${theme.spacing(2)};
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
						`}
					>
						{error}
					</p>
				)}

				<button
					type="submit"
					disabled={isSubmitting}
					css={theme => css`
						width: 100%;
						padding: ${theme.spacing(1.5)};
						background: ${theme.colors.accent};
						color: white;
						border: none;
						border-radius: ${theme.borderRadius.medium};
						font-size: ${theme.typography.fontSize.base};
						font-weight: ${theme.typography.fontWeight.medium};
						cursor: pointer;
						box-sizing: border-box;
						&:disabled {
							opacity: 0.6;
							cursor: not-allowed;
						}
					`}
				>
					{isSubmitting ? 'Signing in...' : 'Sign In'}
				</button>
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
					`}
				>
					dummyjson users
				</a>
			</p>
		</div>
	);
}
