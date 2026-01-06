import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import {
	fetchPosts,
	fetchPostsByTag,
	fetchUserById,
	fetchAllTags
} from '../../api/client';
import { Container } from '../ui/Container';
import PostCard from '../ui/PostCard';
import { css } from '@emotion/react';
import { useMemo, useState, useEffect } from 'react';
import type { User } from '../../types/User';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

interface FiltersState {
	selectedTag: string;
	sortBy: string;
	sortOrder: 'asc' | 'desc';
}

function Posts() {
	const POSTS_PER_PAGE = 10;

	const [filters, setFilters] = useState<FiltersState>({
		selectedTag: '',
		sortBy: 'title',
		sortOrder: 'asc'
	});

	const [allTags, setAllTags] = useState<string[]>([]);

	const { data: tagsData } = useQuery({
		queryKey: ['tags'],
		queryFn: fetchAllTags,
		staleTime: 1000 * 60 * 5
	});

	useEffect(() => {
		if (tagsData) {
			setAllTags(tagsData);
		}
	}, [tagsData]);

	const resetFilters = () => {
		setFilters({
			selectedTag: '',
			sortBy: 'title',
			sortOrder: 'asc'
		});
	};

	const fetchPostsWithParams = async ({
		pageParam = 0
	}: {
		pageParam?: number;
	}) => {
		if (filters.selectedTag) {
			return fetchPostsByTag(
				filters.selectedTag,
				POSTS_PER_PAGE,
				pageParam,
				filters.sortBy,
				filters.sortOrder
			);
		}

		return fetchPosts(
			POSTS_PER_PAGE,
			pageParam,
			filters.sortBy,
			filters.sortOrder
		);
	};

	//similiar tool to useQuery, but useful for 'infinite' data
	const {
		data,
		fetchNextPage, //function, that runs next request
		hasNextPage, //figure out if server has more data (by total field in response)
		isFetchingNextPage,
		isFetching,
		isLoading,
		isError,
		refetch
	} = useInfiniteQuery({
		queryKey: ['posts', filters.sortBy, filters.sortOrder, filters.selectedTag],
		queryFn: fetchPostsWithParams,
		getNextPageParam: (lastPage, allPages) => {
			//figure out skip next request will be
			const loadedCount = allPages.reduce(
				(acc, page) => acc + page.posts.length,
				0
			);
			return loadedCount < lastPage.total ? loadedCount : undefined;
		},
		initialPageParam: 0
	});

	const showGeneralLoading = isLoading && !data;
	const showNextPageLoading = isFetchingNextPage || (isFetching && !isLoading);

	const allPosts = useMemo(
		() => data?.pages.flatMap(page => page.posts) ?? [],
		[data]
	);

	const uniqueUserIds = useMemo(
		() => [...new Set(allPosts.map(p => p.userId))],
		[allPosts]
	);

	const userQueries = useQueries({
		queries: uniqueUserIds
			.filter(userId => userId !== null && userId !== undefined)
			.map(userId => ({
				queryKey: ['user', userId],
				queryFn: () => fetchUserById(userId),
				staleTime: 1000 * 60 * 5,
				gcTime: 1000 * 60 * 10
			}))
	});

	const usersData = userQueries.map(q => q.data).filter(Boolean) as User[];

	const userMap = useMemo(() => {
		const map: Record<number, User> = {};
		usersData.forEach(user => {
			map[user.id] = user;
		});
		return map;
	}, [usersData]);

	//Help Observer to understand when we should load next part of data
	//TODO: find out about react-intersection-observer
	const sentinelRef = useInfiniteScroll(
		() => {
			if (hasNextPage && !isFetchingNextPage) {
				fetchNextPage();
			}
		},
		hasNextPage,
		isFetchingNextPage
	);

	if (isLoading && !data) {
		return (
			<Container>
				<div
					css={theme => css`
						text-align: center;
						padding: ${theme.spacing(4)};
					`}
				>
					Loading...
				</div>
			</Container>
		);
	}

	if (isError) {
		return (
			<Container>
				<div
					css={theme => css`
						text-align: center;
						padding: ${theme.spacing(4)};
					`}
				>
					Failed to load posts.
					<button
						onClick={() => refetch()}
						css={theme => css`
							display: block;
							margin: ${theme.spacing(2)} auto 0;
							padding: ${theme.spacing(1)} ${theme.spacing(2)};
							background-color: ${theme.colors.accent};
							color: white;
							border: none;
							border-radius: 4px;
							cursor: pointer;
						`}
					>
						Try again
					</button>
				</div>
			</Container>
		);
	}

	if (!allPosts.length) {
		return (
			<Container>
				<div
					css={theme => css`
						text-align: center;
						padding: ${theme.spacing(4)};
					`}
				>
					No posts available.
				</div>
			</Container>
		);
	}

	return (
		<>
			<Container>
				<div
					css={css`
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 20px;
						flex-wrap: wrap;
						gap: 10px;
					`}
				>
					<h1
						css={css`
							margin: 0;
						`}
					>
						Posts
					</h1>
					<div
						css={css`
							display: flex;
							gap: 10px;
							flex-wrap: wrap;
						`}
					>
						<select
							value={filters.sortBy}
							onChange={e =>
								setFilters({
									...filters,
									sortBy: e.target.value,
								})
							}
							css={theme => css`
								padding: ${theme.spacing(1)};
								border-radius: ${theme.borderRadius.small};
								border: 1px solid ${theme.colors.border};
								background-color: ${theme.colors.backgroundSecondary};
								color: ${theme.colors.textPrimary};
							`}
						>
							<option value="id">ID</option>
							<option value="title">Title</option>
							<option value="views">Views</option>
							<option value="reactions">Reactions</option>
						</select>
						<select
							value={filters.sortOrder}
							onChange={e =>
								setFilters({
									...filters,
									sortOrder: e.target.value as 'asc' | 'desc',
								})
							}
							css={theme => css`
								padding: ${theme.spacing(1)};
								border-radius: ${theme.borderRadius.small};
								border: 1px solid ${theme.colors.border};
								background-color: ${theme.colors.backgroundSecondary};
								color: ${theme.colors.textPrimary};
							`}
						>
							<option value="asc">Ascending</option>
							<option value="desc">Descending</option>
						</select>
						<select
							value={filters.selectedTag}
							onChange={e =>
								setFilters({
									...filters,
									selectedTag: e.target.value,
								})
							}
							css={theme => css`
								padding: ${theme.spacing(1)};
								border-radius: ${theme.borderRadius.small};
								border: 1px solid ${theme.colors.border};
								background-color: ${theme.colors.backgroundSecondary};
								color: ${theme.colors.textPrimary};
							`}
						>
							<option value="">All Tags</option>
							{allTags.map(tag => (
								<option key={tag} value={tag}>
									{tag}
								</option>
							))}
						</select>
						<button
							onClick={resetFilters}
							css={theme => css`
								padding: ${theme.spacing(1)} ${theme.spacing(2)};
								border-radius: ${theme.borderRadius.small};
								border: 1px solid ${theme.colors.border};
								background-color: ${theme.colors.backgroundSecondary};
								color: ${theme.colors.textPrimary};
								cursor: pointer;
								&:hover {
									background-color: ${theme.colors.accent};
									color: white;
								}
							`}
						>
							Reset Filters
						</button>
					</div>
				</div>
				{showGeneralLoading && (
					<div
						css={theme => css`
							text-align: center;
							padding: ${theme.spacing(4)};
						`}
					>
						Loading posts...
					</div>
				)}

				{!showGeneralLoading && (
					<>
						<ul>
							{allPosts.map(post => (
								<li
									key={post.id}
									css={css`
										&:first-child {
											border-radius: 20px 20px 0 0;
										}
									`}
								>
									<PostCard post={post} user={userMap[post.userId] || null} />
								</li>
							))}
						</ul>

						{/*Next part of data will be fetching when user see this element*/}
						<div
							ref={sentinelRef}
							css={css`
								height: 20px;
								margin: 20px 0;
							`}
						/>

						{showNextPageLoading && (
							<div
								css={theme => css`
									text-align: center;
									padding: ${theme.spacing(2)};
									color: ${theme.colors.textTertiary};
								`}
							>
								Loading more posts...
							</div>
						)}
					</>
				)}
			</Container>
		</>
	);
}

export default Posts;
