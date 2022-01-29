import styled from 'styled-components';

import Tooltip from '../Tooltip';
import { INPUT_ERROR, INPUT_FILLED, INPUT_FOCUSED } from '../../constants/validation';

interface ContainerProps {
  validation: string;
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
  position: relative;

  border: 2px solid;
  border-color: ${(props) => returnColorPerType(props)};

  background: ${(props) => props.theme.white};
  border-radius: 0.5rem;
  padding: 1.6rem;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 0.8rem;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    outline: none;

    &::placeholder {
      color: ${(props) => props.theme.text};
    }

    margin-right: 1.6rem;
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
