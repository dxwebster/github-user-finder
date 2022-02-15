import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const Main = styled.main`
  width: 90%;
  margin: 50px auto;

  @media (min-width: 1920px) {
    & {
      width: 60%;
    }
  }

  display: grid;
  gap: 2rem;
  grid-template-columns: 30% 70%;
  grid-template-areas:
    'sidenav nav'
    'sidenav content';
  @media (max-width: 500px){
    grid-template-columns: 1fr;
    grid-template-areas:
    'sidenav'
    'nav'
    'content';
  }
`
;

