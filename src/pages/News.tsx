import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/client";


function News() {
	const {data} = useQuery({
		queryKey: ['posts'],
		queryFn: fetchPosts,
	})

	console.log(data?.posts)

	return <>
		{data?.posts.map(post => post.title)}
	</>;
}

export default News;
