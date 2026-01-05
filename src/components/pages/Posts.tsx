import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchPosts, fetchUserById } from '../../api/client';
import { Container } from '../ui/Container';
import PostCard from '../ui/PostCard';
import { css } from '@emotion/react';
import { useMemo } from 'react';
import type { User } from '../../types/User';

function Posts() {
	const {
		data: postsData,
		isLoading: postsLoading,
		isError: postsError
	} = useQuery({
		queryKey: ['posts'],
		queryFn: fetchPosts
	});

	const uniqueUserIds = useMemo(() => {
		return postsData ? [...new Set(postsData?.posts.map(p => p.userId))] : [];
	}, [postsData]);

	const userQueries = useQueries({
		queries: uniqueUserIds.map(userId => ({
			queryKey: ['user', userId],
			queryFn: () => fetchUserById(userId),
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 10
		}))
	});

	const usersLoading = userQueries.some(q => q.isLoading);
	const usersError = userQueries.some(q => q.isError);
	const usersData = userQueries.map(q => q.data).filter(Boolean) as User[];

	const userMap = useMemo(() => {
		const map: Record<number, User> = {};
		usersData.forEach(user => {
			map[user.id] = user;
		});
		return map;
	}, [usersData]);

	const isLoading = postsLoading || (postsData && usersLoading);
	const isError = postsError || usersError;

	if (isLoading) return <span>Loading...</span>;

	return (
		<>
			<Container>
				<h1
					css={css`
						text-align: center;
					`}
				>
					Posts
				</h1>
				<ul>
					{postsData?.posts.map(post => (
						<li
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
			</Container>
		</>
	);
}

export default Posts;
