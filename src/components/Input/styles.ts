import styled from 'styled-components';

import Tooltip from '../Tooltip';
import { INPUT_ERROR, INPUT_FILLED, INPUT_FOCUSED } from '../../constants/validation';

interface ContainerProps {
  validation: string;
  hasBorder: boolean;
  inputHeight: string;
}

const returnColorPerType = (props: any) => {
  const { validation } = props;

  switch (validation) {
    case INPUT_ERROR:
      return props.theme.error;
    case INPUT_FILLED:
    case INPUT_FOCUSED:
      return props.theme.success;
    default:
      return props.theme.lightGrey;
  }
};

export const Container = styled.div<ContainerProps>`
  height: ${(props) => props.inputHeight};
  position: relative;

  border: ${(props) => (props.hasBorder ? '1px solid' : '2px solid')};
  border-color: ${(props) => (props.hasBorder ? props.theme.border : returnColorPerType(props))};

  background: ${(props) => props.theme.white};
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  width: 100%;

  display: flex;
  align-items: center;

  color: ${(props) => props.theme.subtitle};

  & + div {
    margin-top: 0.8rem;
  }

  svg {
    margin-right: 1rem;
  }

  input {
    width: 100%;
    background: transparent;
    border: 0;
    outline: none;
    font-size: 1.8rem;
    color: ${(props) => props.theme.subtitle};

    &::placeholder {
      color: ${(props) => props.theme.text};
      font-size: 1.6rem;
    }
  }
`;

export const Error = styled(Tooltip)`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 1.5rem;
  right: 1.2rem;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
    text-align: center;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
