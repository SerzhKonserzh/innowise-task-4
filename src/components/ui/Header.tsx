import { Link } from '@tanstack/react-router';
import { css } from '@emotion/react';
import { Button } from './Button';
import { Container } from './Container';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';

function Header() {
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate({ to: '/auth' });
	};

	return (
		<header
			css={theme => css`
				background: ${theme.colors.background};
				border-bottom: 1px solid ${theme.colors.border};
				position: sticky;
				top: 0;
				z-index: 100;
				box-shadow: ${theme.shadows.card};
			`}
		>
			<Container>
				<div
					css={css`
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 60px;
					`}
				>
					<Link
						to="/"
						css={theme => css`
							font-size: ${theme.typography.fontSize['2xl']};
							font-weight: ${theme.typography.fontWeight.bold};
							color: ${theme.colors.textPrimary};
							text-decoration: none;
							transition: opacity 0.2s ease;
							&:hover {
								opacity: 0.8;
							}
						`}
					>
						PostIt
					</Link>
					
					<div
						css={theme => css`
							display: flex;
							gap: ${theme.spacing(2)};
							align-items: center;
						`}
					>
						<Link to="/chat">
							<Button variant="ghost">Chat</Button>
						</Link>
						<Link to="/graphql">
							<Button variant="ghost">GraphQL</Button>
						</Link>
						<Button onClick={handleLogout} variant="outline">
							Logout
						</Button>
					</div>
				</div>
			</Container>
		</header>
	);
}

export default Header;
