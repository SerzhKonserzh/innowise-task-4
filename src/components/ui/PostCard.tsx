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
		<article
			css={theme => css`
				background-color: ${theme.colors.backgroundCard};
				border: 1px solid ${theme.colors.border};
				border-radius: ${theme.borderRadius.card};
				padding: ${theme.components.card.padding};
				margin-bottom: ${theme.spacing(2)};
				transition: all 0.2s ease-in-out;
				box-shadow: ${theme.shadows.card};
				
				&:hover {
					transform: translateY(-2px);
					box-shadow: ${theme.shadows.hover};
				}
			`}
		>
			<Link 
				to={`/post/$postId`} 
				params={{ postId: post.id.toString() }}
				css={css`
					text-decoration: none;
					color: inherit;
				`}
			>
				<div
					css={theme => css`
						display: flex;
						gap: ${theme.spacing(2)};
						margin-bottom: ${theme.spacing(2)};
						align-items: center;
					`}
				>
					<img
						css={css`
							width: 40px;
							height: 40px;
							border-radius: 50%;
							object-fit: cover;
						`}
						src={user?.image || '/default-avatar.png'}
						alt={user?.username || 'User'}
					/>
					<div>
						<p
							css={theme => css`
								margin: 0;
								color: ${theme.colors.textPrimary};
								font-weight: ${theme.typography.fontWeight.semibold};
							`}
						>
							{user?.username || 'Unknown user'}
						</p>
					</div>
				</div>
				
				<div>
					<h2
						css={theme => css`
							margin: 0 0 ${theme.spacing(1)} 0;
							color: ${theme.colors.textPrimary};
							font-size: ${theme.typography.fontSize.xl};
						`}
					>
						{post.title}
					</h2>
					
					<div
						css={theme => css`
							margin: 0 0 ${theme.spacing(2)} 0;
							display: flex;
							gap: ${theme.spacing(1)};
							flex-wrap: wrap;
						`}
					>
						{post.tags.map(tag => (
							<span
								key={tag}
								css={theme => css`
									background-color: ${theme.colors.backgroundTertiary};
									color: ${theme.colors.textSecondary};
									padding: 2px 8px;
									border-radius: ${theme.borderRadius.full};
									font-size: ${theme.typography.fontSize.sm};
								`}
							>
								{'#' + tag}
							</span>
						))}
					</div>
					
					<div
						css={theme => css`
							color: ${theme.colors.textPrimary};
							line-height: 1.6;
							margin-bottom: ${theme.spacing(2)};
						`}
					>
						{previewText}
					</div>
					
					<div
						css={theme => css`
							display: flex;
							gap: ${theme.spacing(3)};
							color: ${theme.colors.textTertiary};
							font-size: ${theme.typography.fontSize.sm};
						`}
					>
						<span>👍 {post.reactions.likes}</span>
						<span>👎 {post.reactions.dislikes}</span>
						<span>👁️ {post.views}</span>
					</div>
				</div>
			</Link>
		</article>
	);
});

export default PostCard;
