import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

export default defineConfig({
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
				rewrite: path => '/graphql'
			}
		}
	}
});
