import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../api/client";


function FavouritePosts() {
	const {data} = useQuery({
		queryKey: ['posts'],
		queryFn: fetchPosts,
	})

	console.log(data?.posts)

	return <>
    <h1>Favourite posts</h1>
		{data?.posts.map(post => post.title)}
	</>;
}

export default FavouritePosts;