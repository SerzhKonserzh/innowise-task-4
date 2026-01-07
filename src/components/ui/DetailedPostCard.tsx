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
          background-color: ${theme.colors.backgroundSecondary};
          border: 1px solid ${theme.colors.border};
          border-radius: ${theme.borderRadius.medium};
          padding: ${theme.spacing(3)};
          margin-bottom: ${theme.spacing(3)};
        `}
      >
        <div
          css={theme => css`
            display: flex;
            gap: 20px;
            margin: 0 0 ${theme.spacing(3)} 0;
          `}
        >
          <img
            css={css`
              max-width: 50px;
              border-radius: 50%;
            `}
            src={user?.image}
            alt={user?.username || 'User image'}
          />
          <div>
            <h3
              css={theme => css`
                margin: 0 0 ${theme.spacing(1)} 0;
                color: ${theme.colors.textPrimary};
              `}
            >
              {user?.username}
            </h3>
          </div>
        </div>

        <h1
          css={theme => css`
            margin: 0 0 ${theme.spacing(2)} 0;
            color: ${theme.colors.textPrimary};
          `}
        >
          {post.title}
        </h1>

        <div
          css={theme => css`
            margin: 0 0 ${theme.spacing(2)} 0;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          `}
        >
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              css={theme => css`
                background-color: ${theme.colors.accent};
                color: white;
                padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
                border-radius: ${theme.borderRadius.small};
                font-size: 0.8rem;
              `}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div
          css={theme => css`
            color: ${theme.colors.textPrimary};
            line-height: 1.6;
            margin: 0 0 ${theme.spacing(3)} 0;
          `}
        >
          {post.body}
        </div>

        <div
          css={css`
            display: flex;
            gap: 20px;
            margin-top: 16px;
          `}
        >
          <span>👍 {post.reactions.likes}</span>
          <span>👎 {post.reactions.dislikes}</span>
          <span>👁️ {post.views}</span>
        </div>
      </article>

      <section
        css={theme => css`
          background-color: ${theme.colors.backgroundSecondary};
          border: 1px solid ${theme.colors.border};
          border-radius: ${theme.borderRadius.medium};
          padding: ${theme.spacing(3)};
        `}
      >
        <h2
          css={theme => css`
            margin: 0 0 ${theme.spacing(2)} 0;
            color: ${theme.colors.textPrimary};
          `}
        >
          Comments
        </h2>

        {commentsLoading ? (
          <div
            css={theme => css`
              text-align: center;
              padding: ${theme.spacing(2)};
            `}
          >
            Loading comments...
          </div>
        ) : commentsError ? (
          <div
            css={theme => css`
              text-align: center;
              padding: ${theme.spacing(2)};
              color: ${theme.colors.error};
            `}
          >
            Failed to load comments.
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
                    padding: ${theme.spacing(2)} 0;
                    border-bottom: 1px solid ${theme.colors.border};
                    &:last-child {
                      border-bottom: none;
                    }
                  `}
                >
                  <p
                    css={theme => css`
                      margin: 0 0 ${theme.spacing(1)} 0;
                      color: ${theme.colors.textPrimary};
                      line-height: 1.5;
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
                        font-size: 0.9rem;
                      `}
                    >
                      @{comment.user.username}
                    </span>
                    <div
                      css={css`
                        display: flex;
                        gap: 10px;
                      `}
                    >
                    </div>
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
