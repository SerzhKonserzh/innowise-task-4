import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { fetchPostById, fetchCommentsByPostId, fetchUserById } from '../../api/client';
import { Container } from '../ui/Container';
import { DetailedPostCard } from '../ui/DetailedPostCard';
import { css } from '@emotion/react';
import type { CommentsResponse } from '../../types/Comments';

function DetailedPost() {
  const { postId } = useParams({ from: '/post/$postId' });

  const {
    data: postData,
    isLoading: postLoading,
    isError: postError
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(Number(postId)),
    enabled: !!postId
  });

  const {
    data: commentsData,
    isLoading: commentsLoading,
    isError: commentsError
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsByPostId(Number(postId)),
    enabled: !!postId
  });

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError
  } = useQuery({
    queryKey: ['user', postData?.userId],
    queryFn: () => fetchUserById(Number(postData?.userId)),
    enabled: !!postData?.userId
  });

  if (postLoading || userLoading) {
    return (
      <Container>
        <div
          css={theme => css`
            text-align: center;
            padding: ${theme.spacing(4)};
          `}
        >
          Loading post...
        </div>
      </Container>
    );
  }

  if (postError || userError) {
    return (
      <Container>
        <div
          css={theme => css`
            text-align: center;
            padding: ${theme.spacing(4)};
          `}
        >
          Failed to load post.
        </div>
      </Container>
    );
  }

  if (!postData) {
    return (
      <Container>
        <div
          css={theme => css`
            text-align: center;
            padding: ${theme.spacing(4)};
          `}
        >
          Post not found.
        </div>
      </Container>
    );
  }

  return (
    <div
      css={theme => css`
        padding: ${theme.spacing(3)} 0;
      `}
    >
      <Container>
        <DetailedPostCard
          post={postData}
          user={userData || null}
          comments={(commentsData as CommentsResponse)?.comments || []}
          commentsLoading={commentsLoading}
          commentsError={commentsError}
        />
      </Container>
    </div>
  );
}

export default DetailedPost;