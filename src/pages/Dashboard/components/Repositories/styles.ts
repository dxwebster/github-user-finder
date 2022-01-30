import styled from 'styled-components';
interface RepositoriesProps {
  displayList: boolean;
}

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2rem;
`;

export const RepositoriesList = styled.div<RepositoriesProps>`
  grid-area: content;

  display: ${(props) => (props.displayList ? 'flex' : 'grid')};
  flex-direction: ${(props) => (props.displayList ? 'column' : 'row')};
  min-height: ${(props) => (props.displayList ? 'auto' : '20rem')};
  grid-template-columns: 1fr 1fr;
  flex-wrap: wrap;
  gap: 1.2rem;

  li {
    width: 100%;
    min-height: 10rem;

    background-color: ${(props) => props.theme.white};
    border-radius: 5px;
    padding: 24px;

    display: flex;
    align-items: center;
  }

  a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;

    transition: transform 0.2s;
    text-decoration: none;

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
  }
`;

export const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.8rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 0.5rem;
`;
