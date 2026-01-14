import { css } from '@emotion/react';
import type { Post } from '../../types/Post';
import type { User } from '../../types/User';
import type { Comment } from '../../types/Comments';

interface DetailedPostCardProps {
  post: Post;
  user: User | null;
  comments: Comment[];
  commentsLoading: boolean;
  commentsError: boolean;
}

export const DetailedPostCard = ({
  post,
  user,
  comments,
  commentsLoading,
  commentsError
}: DetailedPostCardProps) => {
  return (
    <>
      <article
        css={theme => css`
          background-color: ${theme.colors.backgroundCard};
          border: 1px solid ${theme.colors.border};
          border-radius: ${theme.borderRadius.card};
          padding: ${theme.spacing(4)};
          margin-bottom: ${theme.spacing(3)};
          box-shadow: ${theme.shadows.card};
        `}
      >
        <div
          css={theme => css`
            display: flex;
            gap: ${theme.spacing(2)};
            margin: 0 0 ${theme.spacing(3)} 0;
            align-items: center;
          `}
        >
          <img
            css={css`
              width: 50px;
              height: 50px;
              border-radius: 50%;
              object-fit: cover;
            `}
            src={user?.image || '/default-avatar.png'}
            alt={user?.username || 'User'}
          />
          <div>
            <h3
              css={theme => css`
                margin: 0 0 ${theme.spacing(0.5)} 0;
                color: ${theme.colors.textPrimary};
              `}
            >
              {user?.username || 'Unknown user'}
            </h3>
            <p
              css={theme => css`
                margin: 0;
                color: ${theme.colors.textTertiary};
                font-size: ${theme.typography.fontSize.sm};
              `}
            >
              Post ID: {post.id}
            </p>
          </div>
        </div>

        <h1
          css={theme => css`
            margin: 0 0 ${theme.spacing(2)} 0;
            color: ${theme.colors.textPrimary};
            font-size: ${theme.typography.fontSize['2xl']};
          `}
        >
          {post.title}
        </h1>

        <div
          css={theme => css`
            margin: 0 0 ${theme.spacing(3)} 0;
            display: flex;
            gap: ${theme.spacing(1)};
            flex-wrap: wrap;
          `}
        >
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              css={theme => css`
                background-color: ${theme.colors.backgroundTertiary};
                color: ${theme.colors.textSecondary};
                padding: 4px 12px;
                border-radius: ${theme.borderRadius.full};
                font-size: ${theme.typography.fontSize.sm};
              `}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div
          css={theme => css`
            color: ${theme.colors.textPrimary};
            line-height: 1.7;
            margin: 0 0 ${theme.spacing(3)} 0;
            font-size: ${theme.typography.fontSize.base};
          `}
        >
          {post.body}
        </div>

        <div
          css={theme => css`
            display: flex;
            gap: ${theme.spacing(3)};
            color: ${theme.colors.textTertiary};
            font-size: ${theme.typography.fontSize.sm};
            padding-top: ${theme.spacing(2)};
            border-top: 1px solid ${theme.colors.border};
          `}
        >
          <span>👍 {post.reactions.likes}</span>
          <span>👎 {post.reactions.dislikes}</span>
          <span>👁️ {post.views}</span>
        </div>
      </article>

      <section
        css={theme => css`
          background-color: ${theme.colors.backgroundCard};
          border: 1px solid ${theme.colors.border};
          border-radius: ${theme.borderRadius.card};
          padding: ${theme.spacing(4)};
          box-shadow: ${theme.shadows.card};
        `}
      >
        <h2
          css={theme => css`
            margin: 0 0 ${theme.spacing(3)} 0;
            color: ${theme.colors.textPrimary};
            font-size: ${theme.typography.fontSize.xl};
          `}
        >
          Comments ({comments.length})
        </h2>

        {commentsLoading ? (
          <div
            css={theme => css`
              text-align: center;
              padding: ${theme.spacing(4)};
              color: ${theme.colors.textTertiary};
            `}
          >
            Loading comments...
          </div>
        ) : commentsError ? (
          <div
            css={theme => css`
              text-align: center;
              padding: ${theme.spacing(4)};
              color: ${theme.colors.error};
            `}
          >
            Failed to load comments.
          </div>
        ) : comments.length === 0 ? (
          <div
            css={theme => css`
              text-align: center;
              padding: ${theme.spacing(4)};
              color: ${theme.colors.textTertiary};
            `}
          >
            No comments yet.
          </div>
        ) : (
          <ul
            css={css`
              list-style: none;
              padding: 0;
              margin: 0;
            `}
          >
            {comments.map((comment: Comment) => {
              return (
                <li
                  key={comment.id}
                  css={theme => css`
                    padding: ${theme.spacing(3)} 0;
                    border-bottom: 1px solid ${theme.colors.border};
                    &:last-child {
                      border-bottom: none;
                    }
                  `}
                >
                  <p
                    css={theme => css`
                      margin: 0 0 ${theme.spacing(2)} 0;
                      color: ${theme.colors.textPrimary};
                      line-height: 1.6;
                    `}
                  >
                    {comment.body}
                  </p>
                  <div
                    css={theme => css`
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    `}
                  >
                    <span
                      css={theme => css`
                        color: ${theme.colors.textTertiary};
                        font-size: ${theme.typography.fontSize.sm};
                      `}
                    >
                      @{comment.user.username}
                    </span>
                    <span
                      css={theme => css`
                        color: ${theme.colors.textTertiary};
                        font-size: ${theme.typography.fontSize.xs};
                      `}
                    >
                      Likes: {comment.likes}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
};
