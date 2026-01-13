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
			`}
		>
			<Container>
				<div
					css={css`
						margin: 0 auto;
						display: flex;
						justify-content: space-between;
						align-items: center;
					`}
				>
					<Link
						to="/"
						css={theme => css`
							font-size: ${theme.typography.fontSize.xl};
							font-weight: ${theme.typography.fontWeight.bold};
							color: ${theme.colors.textPrimary};
							text-decoration: none;
							&:hover {
								opacity: 0.8;
							}
						`}
					>
						PostIt
					</Link>

					{/* Кнопки */}
					<div
						css={theme => css`
							display: flex;
							gap: ${theme.spacing(2)};
						`}
					>
						<>
							<Link to="/chat">
								<Button>Chat</Button>
							</Link>
							<Link to="/favourite">
								<Button>Favourites</Button>
							</Link>
							<Button onClick={handleLogout}>Logout</Button>
						</>
					</div>
				</div>
			</Container>
		</header>
	);
}

export default Header;
