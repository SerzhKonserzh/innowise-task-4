import axios from "axios";
import type { GraphQLData } from "../types/GraphQL";

// Use Vite proxy to prevent CORS
const graphqlApi = axios.create({
  baseURL: '/api/graphql', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchGraphQL = async <T>(query: string, variables: Record<string, any> = {}): Promise<T> => {
  try {
    const response = await graphqlApi.post<GraphQLData<T>>('', {
      query,
      variables,
    });

    if (response.data.errors?.length) {
      throw new Error(response.data.errors[0]?.message || 'GraphQL error');
    }

    return response.data.data ?? ({} as T);
  } catch (error: any) {
    console.error('GraphQL request failed:', error.response?.data || error.message || error);
    throw error;
  }
};

export const ALL_FILMS_QUERY = `
  query GetAllFilms {
    allFilms {
      films {
        id
        title
        episodeID
        openingCrawl
        director
        producers
        releaseDate
      }
    }
  }
`;