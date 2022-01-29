import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const Main = styled.main`
  width: 70%;
  margin: 50px auto;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Top = styled.div`
  display: flex;
  gap: 2rem;

  p {
    color: rgb(168, 168, 179);
  }

  h2 {
    color: white;
    margin-bottom: 2rem;
    font-size: 1.6rem;
  }
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
