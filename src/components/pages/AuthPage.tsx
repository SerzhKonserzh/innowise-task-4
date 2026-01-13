import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';
import { fetchUserLogin } from '../../api/client';
import { type LoginSchemaType } from '../../types/LoginForm';
import { LoginForm } from '../../components/ui/LoginForm';

export default function AuthPage() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async (data: LoginSchemaType) => {
		setIsSubmitting(true);
		setError(null);

		try {
			// Выполняем запрос на авторизацию
			const user = await fetchUserLogin(data.username, data.password);
			console.log('Login successful:', user);

			login({
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				image: user.image,
				username: user.username
			});
			navigate({ to: '/' });
		} catch (err: any) {
			console.error('Login error:', err);
			setError(
				err.response?.data?.message ||
				err.message ||
				'Failed to connect to server'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<LoginForm
			onSubmit={onSubmit}
			isSubmitting={isSubmitting}
			error={error}
		/>
	);
}
