import styled from 'styled-components';

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

interface RepositoriesProps {
  display: boolean;
}

export const Repositories = styled.div<RepositoriesProps>`
  grid-area: content;

  display: ${(props) => (props.display ? 'flex' : 'grid')};
  flex-direction: ${(props) => (props.display ? 'column' : 'row')};
  min-height: ${(props) => (props.display ? 'auto' : '20rem')};
  grid-template-columns: 1fr 1fr;
  flex-wrap: wrap;
  gap: 1.2rem;

  a {
    background-color: ${(props) => props.theme.white};
    border-radius: 5px;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;
    gap: 2rem;

    span {
      font-size: 2rem;
      color: ${(props) => props.theme.title};
    }

    p {
      font-size: 1.4rem;
      color: ${(props) => props.theme.text};
      margin-top: 1rem;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }

    /* div {
      margin: 0 16px;
      flex: 1;


    } */
  }
`;

interface DisplayButtonProps {
  active: boolean;
}

export const DisplayButton = styled.button<DisplayButtonProps>`
  background-color: ${(props) => (props.active ? props.theme.border : props.theme.white)};
  padding: 1rem 1.8rem;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;
