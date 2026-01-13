import { Outlet, useLocation } from '@tanstack/react-router';
import Header from '../ui/Header';
import { ProtectedRoute } from '../ProtectedRoute';

export const RootLayout = () => {
	const location = useLocation();

	const isAuthPage = location.pathname === '/auth';

	return (
		<>
			{!isAuthPage && <Header />}
			<main>
				{isAuthPage ? (
					<Outlet />
				) : (
					<ProtectedRoute>
						<Outlet />
					</ProtectedRoute>
				)}
			</main>
		</>
	);
};
