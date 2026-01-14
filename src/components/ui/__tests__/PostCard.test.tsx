import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyles } from '../../../theme/GlobalStyles';
import PostCard from '../PostCard';
import type { Post } from '../../../types/Post';
import type { User } from '../../../types/User';
import { theme } from '../../../theme/theme';

jest.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: any) => <div {...props}>{children}</div>
}));

describe('PostCard', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Test Post',
    body: 'This is a test post content',
    tags: ['test', 'demo'],
    reactions: {
      likes: 10,
      dislikes: 2
    },
    views: 100,
    userId: 1
  };

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    image: 'test.jpg'
  };

  test('renders post title and content', () => {
    render(
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <PostCard post={mockPost} user={mockUser} />
      </ThemeProvider>
    );
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test post content')).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <PostCard post={mockPost} user={mockUser} />
      </ThemeProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
