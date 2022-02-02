import styled from 'styled-components';
import { shade } from 'polished';
interface DisplayButtonProps {
  active: boolean;
}

export const Container = styled.div`
  grid-area: nav;
  display: flex;
  gap: 2rem;

  padding-bottom: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

export const FilterContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 4rem;

  form {
    display: flex;
    width: 100%;

    input {
      width: 100%;
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

export const MenuContent = styled.nav`
  width: 40%;
  display: flex;
  gap: 4rem;

  font-size: 1.4rem;
  text-align: center;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    position: relative;
    cursor: pointer;

    font-size: 1.6rem;
    white-space: nowrap;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    color: ${(props) => props.theme.text};

    &.active {
      font-weight: bold;

      &::after {
        content: '';
        height: 3px;
        border-radius: 0 0 3px 3px;
        width: 100%;
        position: absolute;
        top: 3.9rem;
        left: 0;
        background: ${(props) => props.theme.darkOrange};
      }
    }
    &:disabled {
      color: ${(props) => props.theme.darkOrange};
    }
  }
`;

export const ButtonContent = styled.div`
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
