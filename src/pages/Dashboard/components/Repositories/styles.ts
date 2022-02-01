import styled from 'styled-components';
interface RepositoriesProps {
  displayList: boolean;
}

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 20rem;
`;

export const RepositoriesList = styled.div<RepositoriesProps>`
  grid-area: content;

  display: ${(props) => (props.displayList ? 'flex' : 'grid')};
  flex-direction: ${(props) => (props.displayList ? 'column' : 'row')};
  grid-template-columns: ${(props) => !props.displayList && '1fr 1fr 1fr'};
  align-content: space-between;
  gap: 1.2rem;

  a {
    width: 100%;
    max-height: ${(props) => (props.displayList ? 'auto' : '30rem')};
    padding: 1.5rem 2rem;

    display: grid;
    justify-content: space-between;
    flex-direction: ${(props) => (props.displayList ? 'row' : 'column')};
    grid-template-columns: ${(props) => (props.displayList ? '5fr 2fr 1fr;' : '1fr')};
    gap: 2rem;

    transition: transform 0.2s;
    text-decoration: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.white};

    p {
      max-height: ${(props) => (props.displayList ? 'auto' : '5rem')};
      overflow: hidden;
      text-overflow: ${(props) => (props.displayList ? 'none' : 'ellipsis')};
      font-size: 1.4rem;
      color: ${(props) => props.theme.text};
      margin-top: 1rem;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
  }
`;

export const TitleContent = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 1.6rem;
  }
`;

export const InfosContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 3rem;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
      color: ${(props) => props.theme.darkOrange};
      margin-bottom: 0.3rem;
    }

    span {
      font-size: 1.4em;
      font-weight: 700;
      font-family: 'Montserrat', sans-serif;
      color: ${(props) => props.theme.title};
    }

    div {
      font-size: 1.2rem;
      color: ${(props) => props.theme.text};
    }
  }
`;

export const ArrowContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    padding: 0.8rem;
    border: 1px solid ${(props) => props.theme.border};
    border-radius: 0.5rem;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2rem;
`;
