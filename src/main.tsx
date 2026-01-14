import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routes/routeTree.gen.ts';
import {
	createHashHistory,
	createRouter,
	RouterProvider
} from '@tanstack/react-router';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme/theme.tsx';
import { GlobalStyles } from './theme/GlobalStyles.tsx';

const hashHistory = createHashHistory();

const router = createRouter({ routeTree, history: hashHistory });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 10 * 1000
		}
	}
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</ThemeProvider>
	</StrictMode>
);
