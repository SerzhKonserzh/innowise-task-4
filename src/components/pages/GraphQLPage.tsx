import { useQuery } from '@tanstack/react-query';
import {
	fetchGraphQL,
	ALL_FILMS_QUERY
} from '../../api/graphql';
import { Container } from '../ui/Container';
import type { Film } from '../../types/GraphQL';

const GraphQLPage = () => {
	const {
		data: filmsData,
		isLoading: filmsLoading,
		error: filmsError
	} = useQuery({
		queryKey: ['films'],
		queryFn: () =>
			fetchGraphQL<{ allFilms: { films: Film[] } }>(ALL_FILMS_QUERY),
		placeholderData: { allFilms: { films: [] } }
	});

	const renderFilms = () => {
		if (filmsLoading) return <div>Loading films...</div>;
		if (filmsError)
			return <div>Error loading films: {(filmsError as Error).message}</div>;
		if (!filmsData?.allFilms?.films) return <div>No films data</div>;

		return (
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
					gap: '16px'
				}}
			>
				{filmsData.allFilms.films.map(film => (
					<div
						key={film.id}
						style={{
							border: '1px solid #ccc',
							borderRadius: '8px',
							padding: '16px'
						}}
					>
						<h3>
							{film.title} (Episode {film.episodeID})
						</h3>
						<p>
							<strong>Director:</strong> {film.director}
						</p>
						<p>
							<strong>Release Date:</strong>{' '}
							{new Date(film.releaseDate).toLocaleDateString()}
						</p>
						<p>
							<strong>Opening Crawl:</strong>{' '}
							{film.openingCrawl}
						</p>
					</div>
				))}
			</div>
		);
	};

	return (
		<Container>
			<h1>Star Wars GraphQL Data</h1>
			{renderFilms()}
		</Container>
	);
};

export default GraphQLPage;
