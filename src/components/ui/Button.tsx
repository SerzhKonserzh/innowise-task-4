import styled from '@emotion/styled';

export const Button = styled.button`
  background-color: ${(p) => p.theme.colors.primary};
  color: white;
  border: none;
  padding: ${(p) => p.theme.spacing(1)} ${(p) => p.theme.spacing(2)};
  border-radius: ${(p) => p.theme.borderRadius};
  font-weight: ${(p) => p.theme.typography.fontWeightBold};
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;