import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import Posts from '../Posts';
import { theme } from '../../../theme/theme';

// Мокаем зависимости
jest.mock('../../../api/client', () => ({
  fetchPosts: jest.fn(),
  fetchAllTags: jest.fn()
}));

jest.mock('../../../hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: () => ({ current: null })
}));

describe('Posts Snapshot', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    });
  });

  test('matches snapshot for loading state', () => {
    const { fetchPosts } = jest.requireMock('../../../api/client');
    fetchPosts.mockResolvedValue({ posts: [], total: 0 });
    
    const { fetchAllTags } = jest.requireMock('../../../api/client');
    fetchAllTags.mockResolvedValue([]);

    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Posts />
        </QueryClientProvider>
      </ThemeProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});