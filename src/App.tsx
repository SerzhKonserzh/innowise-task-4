import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./api/client";


function App() {
	const {data} = useQuery({
		staleTime: 10000,
		queryKey: ['posts'],
		queryFn: fetchPosts,
	})

	console.log(data?.posts)

	return <>
		{data?.posts.map(post => post.title)}
	</>;
}

export default App;
