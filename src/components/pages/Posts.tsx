import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../api/client';
import { Container } from '../ui/Container';

function Posts() {
	const { data, isPending } = useQuery({
		queryKey: ['posts'],
		queryFn: fetchPosts
	});

	if (isPending) return <span>Loading...</span>;

	return (
		<>
			<Container>
				<h1>Posts</h1>
				{data?.posts.map(post => (
					post.title
				))}
			</Container>
		</>
	);
}

export default Posts;
