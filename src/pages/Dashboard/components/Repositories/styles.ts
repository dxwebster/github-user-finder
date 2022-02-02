import styled from 'styled-components';
import { shade } from 'polished';
interface RepositoriesProps {
  displayList: boolean;
}

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 40rem;
`;

export const RepositoriesList = styled.div<RepositoriesProps>`
  grid-area: content;

  display: ${(props) => (props.displayList ? 'flex' : 'grid')};
  flex-direction: ${(props) => (props.displayList ? 'column' : 'row')};
  grid-template-columns: ${(props) => !props.displayList && '1fr 1fr'};
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

export const PaginationContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const MessageContent = styled.div`
  width: 100%;
  overflow: hidden;
  min-height: 40rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.6rem;
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.6rem;
  margin-bottom: 3rem;

  form {
    display: flex;
    width: 50%;

    input {
      width: 100%;

      &:disabled {
        cursor: not-allowed;
      }
    }

    button {
      width: 30%;
      height: 4rem;

      background: ${(props) => props.theme.darkOrange};
      border-bottom-right-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      border: 0;
      padding: 0 2rem;

      color: ${(props) => props.theme.white};
      font-weight: bold;
      font-size: 1.2rem;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#F25D27')};
      }

      &:disabled {
        background: ${shade(0.2, '#F25D27')};
        cursor: not-allowed;
      }
    }
  }
`;
