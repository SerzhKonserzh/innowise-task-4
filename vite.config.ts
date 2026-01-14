import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// @ts-ignore
const BASE_URL = process.env.GITHUB_PAGES ? '/innowise-task-4/' : '/';

export default defineConfig({
	base: BASE_URL,
	plugins: [
		tanstackRouter({
			target: 'react',
			autoCodeSplitting: true,
			generatedRouteTree: './src/routes/routeTree.gen.ts'
		}),
		react()
	],
	server: {
		proxy: {
			'/api/graphql': {
				target: 'https://swapi-graphql.netlify.app',
				changeOrigin: true,
				secure: true,
				rewrite: () => '/graphql'
			}
		}
	}
});
