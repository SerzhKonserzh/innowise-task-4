import { Link } from '@tanstack/react-router';
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { Button } from './Button';
import { Container } from './Container';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from '@tanstack/react-router';

function Header() {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleLogout = () => {
		logout();
		navigate({ to: '/auth' });
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const menu = document.getElementById('mobile-menu');
			const burgerButton = document.getElementById('burger-button');
			
			if (isMenuOpen && menu && !menu.contains(event.target as Node) &&
					burgerButton && !burgerButton.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [isMenuOpen]);

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
							display: none;
							
							@media (min-width: ${theme.breakpoints.mobile}) {
								display: flex;
								gap: ${theme.spacing(2)};
								align-items: center;
							}
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
					
					<div
						css={theme => css`
							@media (min-width: ${theme.breakpoints.mobile}) {
								display: none;
							}
						`}
					>
						<Button
							id="burger-button"
							variant="ghost"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							css={css`
								padding: 8px;
								min-width: 40px;
								font-size: 24px;
							`}
						>
							{isMenuOpen ? '✕' : '☰'}
						</Button>
						
						{isMenuOpen && (
							<div
								id="mobile-menu"
								css={theme => css`
									position: absolute;
									top: 60px;
									right: 0;
									left: 0;
									background: ${theme.colors.background};
									border-bottom: 1px solid ${theme.colors.border};
									box-shadow: ${theme.shadows.modal};
									z-index: 1000;
								`}
							>
								<div
									css={css`
										display: flex;
										flex-direction: column;
										padding: 8px 0;
									`}
								>
									<Link
										to="/chat"
										css={css`
											padding: 12px 16px;
											text-decoration: none;
										`}
										onClick={() => setIsMenuOpen(false)}
									>
										<Button variant="ghost" fullWidth css={css`justify-content: flex-start;`}>Chat</Button>
									</Link>
									<Link
										to="/graphql"
										css={css`
											padding: 12px 16px;
											text-decoration: none;
										`}
										onClick={() => setIsMenuOpen(false)}
									>
										<Button variant="ghost" fullWidth css={css`justify-content: flex-start;`}>GraphQL</Button>
									</Link>
									<div
										css={css`
											padding: 12px 16px;
										`}
									>
										<Button onClick={() => {
											handleLogout();
											setIsMenuOpen(false);
										}} variant="outline" fullWidth>
											Logout
										</Button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</Container>
		</header>
	);
}

export default Header;
