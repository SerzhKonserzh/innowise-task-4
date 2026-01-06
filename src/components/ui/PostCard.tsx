import React from 'react';
import type { Post } from '../../types/Post';
import { css } from '@emotion/react';
import type { User } from '../../types/User';
import { Link } from '@tanstack/react-router';

interface PostProps {
	post: Post;
	user: User | null;
}

const PostCard: React.FC<PostProps> = React.memo(({ post, user }) => {
	const previewLength = 250;
	const previewText =
		post.body.length > previewLength
			? post.body.slice(0, previewLength) + '…'
			: post.body;

	return (
		<>
			<article
				css={theme => css`
					margin: 0 auto;
					max-width: 80%;
					background-color: ${theme.colors.backgroundSecondary};
					border: 1px solid ${theme.colors.border};
					border-radius: inherit;
					padding: ${theme.spacing(2)};
				`}
			>
				<Link to={`/`}>
					<div
						css={theme => css`
							display: flex;
							gap: 20px;
							margin: 0 0 ${theme.spacing(2)} 0;
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
						<p
							css={theme => css`
								margin: 0;
								display: flex;
								align-items: center;
								color: ${theme.colors.textPrimary};
								font-weight: ${theme.typography.fontWeight.semibold};
							`}
						>
							{user?.username || 'Unknown user'}
						</p>
					</div>
					<div>
						<h2
							css={theme => css`
								margin: 0 0 ${theme.spacing(1)} 0;
								color: ${theme.colors.textPrimary};
							`}
						>
							{post.title}
						</h2>
						<div
							css={theme => css`
								margin: 0 0 ${theme.spacing(1)} 0;
								display: flex;
								gap: 10px;
							`}
						>
							{post.tags.map(tag => (
								<span
									key={tag}
									css={theme => css`
										color: ${theme.colors.textTertiary};
									`}
								>
									{'#' + tag}
								</span>
							))}
						</div>
						<div
							css={theme => css`
								color: ${theme.colors.textPrimary};
								line-height: 1.5;
							`}
						>
							{previewText}
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
					</div>
				</Link>
			</article>
		</>
	);
});

export default PostCard;
