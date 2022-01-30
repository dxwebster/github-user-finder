import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

interface RepositoriesProps {
  displayList: boolean;
}

export const RepositoriesList = styled.div<RepositoriesProps>`
  grid-area: content;

  display: ${(props) => (props.displayList ? 'flex' : 'grid')};
  flex-direction: ${(props) => (props.displayList ? 'column' : 'row')};
  min-height: ${(props) => (props.displayList ? 'auto' : '20rem')};
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
