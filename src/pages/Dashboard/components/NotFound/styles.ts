import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const Main = styled.main`
  width: 80%;
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
`;

export const FilterOptions = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
  grid-area: nav;
  height: 20rem;
  font-size: 1.6rem;
`;

export const Repositories = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
  grid-area: content;
  height: 20rem;
  font-size: 1.6rem;
`;

export const ProfileCard = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: white;
  grid-area: sidenav;
  height: 20rem;
  font-size: 1.6rem;
`;
