import styled from 'styled-components';

export const ProfileContainer = styled.div`
  height: fit-content;

  grid-area: sidenav;
  background-color: ${(props) => props.theme.white};

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 4rem 2rem;

`;

export const ImageContainer = styled.div`
  padding-bottom: 2rem;

  img {
    width: 15rem;
    height: 15rem;

    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.darkOrange};
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

export const UserData = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  text-align: center;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h1 {
      color: ${(props) => props.theme.title};
    }

    span {
      font-size: 1.6rem;
      color: ${(props) => props.theme.text};
    }
  }

  p {
    font-size: 1.4rem;
    color: ${(props) => props.theme.text};
  }

  ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 1rem;

    li {
      span {
        font-size: 1.4rem;
        color: ${(props) => props.theme.text};
      }
    }
  }
`;
