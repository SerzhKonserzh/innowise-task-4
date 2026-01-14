import { useQuery } from '@tanstack/react-query';
import {
	fetchGraphQL,
	ALL_FILMS_QUERY
} from '../../api/graphql';
import { Container } from '../ui/Container';
import type { Film } from '../../types/GraphQL';
import { css } from '@emotion/react';
import { Button } from '../ui/Button';

const GraphQLPage = () => {
	const {
		data: filmsData,
		isLoading: filmsLoading,
		error: filmsError,
		refetch
	} = useQuery({
		queryKey: ['films'],
		queryFn: () =>
			fetchGraphQL<{ allFilms: { films: Film[] } }>(ALL_FILMS_QUERY),
		placeholderData: { allFilms: { films: [] } }
	});

	const renderFilms = () => {
		if (filmsLoading) {
			return (
				<div
					css={theme => css`
						text-align: center;
						padding: ${theme.spacing(4)};
					`}
				>
					Loading films...
				</div>
			);
		}
		
		if (filmsError) {
			return (
				<div
					css={theme => css`
						text-align: center;
						padding: ${theme.spacing(4)};
					`}
				>
					<p>Error loading films: {(filmsError as Error).message}</p>
					<Button onClick={() => refetch()} variant="primary">
						Try again
					</Button>
				</div>
			);
		}
		
		if (!filmsData?.allFilms?.films) {
			return (
				<div
					css={theme => css`
						text-align: center;
						padding: ${theme.spacing(4)};
					`}
				>
					No films data
				</div>
			);
		}

		return (
			<div
				css={theme => css`
					display: grid;
					grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
					gap: ${theme.spacing(3)};
					margin-top: ${theme.spacing(3)};
				`}
			>
				{filmsData.allFilms.films.map(film => (
					<div
						key={film.id}
						css={theme => css`
							background-color: ${theme.colors.backgroundCard};
							border: 1px solid ${theme.colors.border};
							border-radius: ${theme.borderRadius.card};
							padding: ${theme.spacing(3)};
							box-shadow: ${theme.shadows.card};
							transition: all 0.2s ease-in-out;
							
							&:hover {
								transform: translateY(-2px);
								box-shadow: ${theme.shadows.hover};
							}
						`}
					>
						<h3
							css={theme => css`
								margin-top: 0;
								font-size: ${theme.typography.fontSize.xl};
								color: ${theme.colors.textPrimary};
							`}
						>
							{film.title} (Episode {film.episodeID})
						</h3>
						<p
							css={theme => css`
								margin: ${theme.spacing(1)} 0;
								color: ${theme.colors.textSecondary};
							`}
						>
							<strong>Director:</strong> {film.director}
						</p>
						<p
							css={theme => css`
								margin: ${theme.spacing(1)} 0;
								color: ${theme.colors.textSecondary};
							`}
						>
							<strong>Release Date:</strong>{' '}
							{new Date(film.releaseDate).toLocaleDateString()}
						</p>
						<p
							css={theme => css`
								margin: ${theme.spacing(1)} 0 0 0;
								color: ${theme.colors.textPrimary};
								line-height: 1.5;
							`}
						>
							<strong>Opening Crawl:</strong>{' '}
							{film.openingCrawl}
						</p>
					</div>
				))}
			</div>
		);
	};

	return (
		<div
			css={theme => css`
				background-color: ${theme.colors.backgroundSecondary};
				padding: ${theme.spacing(3)} 0;
			`}
		>
			<Container>
				<h1
					css={theme => css`
						margin: 0 0 ${theme.spacing(3)} 0;
						font-size: ${theme.typography.fontSize['3xl']};
						color: ${theme.colors.textPrimary};
					`}
				>
					Star Wars GraphQL Data
				</h1>
				{renderFilms()}
			</Container>
		</div>
	);
};

export default GraphQLPage;
