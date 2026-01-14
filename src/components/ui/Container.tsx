import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: ${p => p.theme.spacing(2)};
  
  @media (max-width: ${p => p.theme.breakpoints.desktop}) {
    padding: ${p => p.theme.spacing(2)};
  }
  
  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    padding: ${p => p.theme.spacing(1.5)};
  }
  
  @media (max-width: ${p => p.theme.breakpoints.mobile}) {
    padding: ${p => p.theme.spacing(1)};
  }
`;