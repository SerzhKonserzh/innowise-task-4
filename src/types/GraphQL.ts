export interface Film {
  id: string;
  title: string;
  episodeID: number;
  openingCrawl: string;
  director: string;
  producers: string[];
  releaseDate: string;
}

export interface GraphQLData<T> {
  data: T;
  errors?: Array<{ message: string }>;
}