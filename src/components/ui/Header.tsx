import styled from '@emotion/styled';

const HeaderContainer = styled.header`
  background-color: ${(p) => p.theme.colors.white};
  padding: ${(p) => p.theme.spacing(1.5)} ${(p) => p.theme.spacing(2)};
  box-shadow: ${(p) => p.theme.shadow};

  a {
    text-decoration: none;
    color: ${(p) => p.theme.colors.textPrimary};
    font-weight: bold;
    margin-right: ${(p) => p.theme.spacing(3)};
    &:hover {
      color: ${(p) => p.theme.colors.primary};
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
    </HeaderContainer>
  );
};

export default Header;