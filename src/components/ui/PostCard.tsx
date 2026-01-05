import React from 'react';
import type { Post } from '../../types/Post';
import { css } from '@emotion/react';
import type { User } from '../../types/User';

interface PostProps {
	post: Post;
	user: User | null;
}

function PostCard({ post, user }: PostProps) {
	const previewLength = 250;
	const previewText =
		post.body.length > previewLength
			? post.body.slice(0, previewLength) + '…'
			: post.body;
	console.log(user);
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
				<div
					css={css`
						display: flex;
						gap: 20px;
					`}
				>
					<img
						css={css`
							max-width: 50px;
						`}
						src={user?.image}
						alt="User image"
					/>
					<p
						css={theme => css`
							margin: 0;
              display: flex;
              align-items: center;
						`}
					>
						{user?.username}
					</p>
				</div>
				<div>
					<h2>{post.title}</h2>
					<div>{previewText}</div>
					<div
						css={css`
							display: flex;
							gap: 20px;
						`}
					>
						<span>{post.reactions.likes}</span>
						<span>{post.reactions.dislikes}</span>
						<span>{post.views}</span>
					</div>
				</div>
			</article>
		</>
	);
}

export default PostCard;
