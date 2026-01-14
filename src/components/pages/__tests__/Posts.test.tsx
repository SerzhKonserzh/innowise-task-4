import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyles } from '../../../theme/GlobalStyles';
import Posts from '../Posts';
import { theme } from '../../../theme/theme';

jest.mock('../../../api/client', () => ({
  fetchPosts: jest.fn(),
  fetchAllTags: jest.fn(),
  fetchUserById: jest.fn()
}));

jest.mock('../../../hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: () => ({ current: null })
}));

jest.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: any) => <div {...props}>{children}</div>
}));

const mockPosts = {
  pages: [
    {
      posts: [
        {
          id: 1,
          title: 'Test Post 1',
          body: 'Test content 1',
          tags: ['test'],
          reactions: { likes: 5, dislikes: 1 },
          views: 100,
          userId: 1
        }
      ],
      total: 1
    }
  ]
};

const mockTags = ['test', 'demo'];

describe('Posts', () => {
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

  test('renders loading state initially', async () => {
    const { fetchPosts } = await import('../../../api/client');
    (fetchPosts as jest.Mock).mockResolvedValue({ posts: [], total: 0 });
    
    const { fetchAllTags } = await import('../../../api/client');
    (fetchAllTags as jest.Mock).mockResolvedValue(mockTags);

    render(
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <Posts />
        </QueryClientProvider>
      </ThemeProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders posts when data is loaded', async () => {
    const { fetchPosts } = await import('../../../api/client');
    (fetchPosts as jest.Mock).mockResolvedValue(mockPosts.pages[0]);
    
    const { fetchAllTags } = await import('../../../api/client');
    (fetchAllTags as jest.Mock).mockResolvedValue(mockTags);
    
    const { fetchUserById } = await import('../../../api/client');
    (fetchUserById as jest.Mock).mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      image: 'test.jpg'
    });

    render(
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <Posts />
        </QueryClientProvider>
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    });
  });
});
