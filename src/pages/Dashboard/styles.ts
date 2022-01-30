import styled from 'styled-components';
interface DisplayButtonProps {
  active: boolean;
}

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const Main = styled.main`
  width: 70%;
  margin: 50px auto;

  display: grid;
  gap: 2rem;
  grid-template-columns: 30% 70%;
  grid-template-areas:
    'sidenav nav'
    'sidenav content';
`;

export const FilterOptions = styled.div`
  grid-area: nav;
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;
  }

  .list {
    border-bottom-left-radius: 0.5rem;
    border-top-left-radius: 0.5rem;

    border-left: 1px solid ${(props) => props.theme.border};
    border-top: 1px solid ${(props) => props.theme.border};
    border-bottom: 1px solid ${(props) => props.theme.border};
  }

  .grid {
    border-bottom-right-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.border};
  }
`;

export const ProfileContainer = styled.div`
  grid-area: sidenav;
  background-color: ${(props) => props.theme.white};
`;

export const DisplayButton = styled.button<DisplayButtonProps>`
  background-color: ${(props) => (props.active ? props.theme.border : props.theme.white)};
  padding: 1rem 1.8rem;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;
