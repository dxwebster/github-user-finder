import styled from 'styled-components';
interface DisplayButtonProps {
  active: boolean;
}

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

export const ListHeader = styled.div`
  grid-area: nav;
  align-items: center;
  justify-content: space-between;

  display: flex;
  gap: 4rem;
`;

export const FilterOptions = styled.div`
  align-items: center;
  display: flex;
  gap: 4rem;

  form {
    width: 50%;
  }
`;

export const FilterMenu = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  font-size: 1.4rem;
  text-align: center;

  a {
    position: relative;
    line-height: 5rem;
    transition: color 0.2s;
    cursor: pointer;

    &.active {
      font-weight: bold;

      &::after {
        content: '';
        height: 3px;
        border-radius: 3px 3px 0 0;
        width: 100%;
        position: absolute;
        bottom: 1px;
        left: 0;
        background: ${(props) => props.theme.darkOrange};
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-self: flex-end;
`;

export const Button = styled.button<DisplayButtonProps>`
  display: flex;
  background-color: ${(props) => (props.active ? props.theme.border : props.theme.white)};
  padding: 1rem 1.8rem;

  svg {
    width: 2rem;
    height: 2rem;
  }

  &.list {
    border-bottom-left-radius: 0.5rem;
    border-top-left-radius: 0.5rem;

    border-left: 1px solid ${(props) => props.theme.border};
    border-top: 1px solid ${(props) => props.theme.border};
    border-bottom: 1px solid ${(props) => props.theme.border};
  }

  &.grid {
    border-bottom-right-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.border};
  }
`;
