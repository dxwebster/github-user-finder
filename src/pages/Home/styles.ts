import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';
import background from '../../assets/github-bg.svg';

export const Container = styled.main`
  display: flex;
  height: 100vh;
  align-items: stretch;
`;
export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: cover;
  background-color: ${(props) => props.theme.darkGrey};
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const SearchContent = styled.div`
  width: 100%;
  max-width: 700px;

  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
  animation: ${appearFromLeft} 1s;

  h1 {
    font-size: 3.6rem;
    color: ${(props) => props.theme.title};
    max-width: 35rem;
  }

  h5 {
    font-size: 1.6rem;
    color: ${(props) => props.theme.subtitle};
    max-width: 35rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    header {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    section {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    button {
      width: 100%;
      height: 5rem;

      background: #04d361;
      border-radius: 0.5rem;
      border: 0;

      color: ${(props) => props.theme.white};
      font-weight: bold;
      transition: background-color 0.2s;

      &:hover {
        background: ${shade(0.2, '#04d361')};
      }
    }
  }
`;
