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
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';

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
					<Button
						onClick={() => refetch()}
						variant="primary"
						size="medium"
						css={theme => css`
							display: block;
							margin: ${theme.spacing(2)} auto 0;
						`}
					>
						Try again
					</Button>
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
					css={theme => css`
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: ${theme.spacing(3)};
						flex-wrap: wrap;
						gap: ${theme.spacing(2)};
					`}
				>
					<h1
						css={theme => css`
							margin: 0;
							font-size: ${theme.typography.fontSize['3xl']};
						`}
					>
						Posts
					</h1>
					<div
						css={theme => css`
							display: flex;
							gap: ${theme.spacing(1)};
							flex-wrap: wrap;
							align-items: center;
						`}
					>
						<Select
							value={filters.sortBy}
							onChange={e =>
								setFilters({
									...filters,
									sortBy: e.target.value,
								})
							}
							options={[
								{ value: 'id', label: 'ID' },
								{ value: 'title', label: 'Title' },
								{ value: 'views', label: 'Views' },
								{ value: 'reactions', label: 'Reactions' }
							]}
						/>
						<Select
							value={filters.sortOrder}
							onChange={e =>
								setFilters({
									...filters,
									sortOrder: e.target.value as 'asc' | 'desc',
								})
							}
							options={[
								{ value: 'asc', label: 'Ascending' },
								{ value: 'desc', label: 'Descending' }
							]}
						/>
						<Select
							value={filters.selectedTag}
							onChange={e =>
								setFilters({
									...filters,
									selectedTag: e.target.value,
								})
							}
							options={[
								{ value: '', label: 'All Tags' },
								...allTags.map(tag => ({ value: tag, label: tag }))
							]}
						/>
						<Button
							onClick={resetFilters}
							variant="outline"
							size="small"
						>
							Reset
						</Button>
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
						<ul
							css={css`
								margin: 0;
								padding: 0;
							`}
						>
							{allPosts.map(post => (
								<li
									key={post.id}
									css={theme => css`
										list-style: none;
										margin-bottom: ${theme.spacing(2)};
										&:last-child {
											margin-bottom: 0;
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
