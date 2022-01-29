import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.header`
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${(props) => props.theme.title};
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  padding: 10px 60px;
  color: ${(props) => props.theme.darkGrey};

  position: relative;
`;
export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;

  ul {
    display: flex;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      font-size: 13px;
      font-weight: bold;

      & + li {
        margin-left: 30px;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme.darkGrey};

        svg {
          margin-right: 8px;
        }
      }
    }
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;

  ul {
    display: flex;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.4s ease;

      &:hover {
        background-color: ${(props) => darken(0.2, props.theme.title)};
      }

      & + li {
        margin-left: 10px;
      }
    }
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    cursor: pointer;

    p {
      margin-left: 20px;
    }
  }
`;

export const Avatar = styled.img`
  height: 34px;
  width: 34px;
  border-radius: 50%;
  margin: 0 0 0 15px;
  cursor: pointer;
`;

interface TooltipHeaderProps {
  fixed: string;
}

export const TooltipHeader = styled.div<TooltipHeaderProps>`
  width: 200px;
  font-size: 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${(props) => props.theme.title};
  box-shadow: rgba(0, 0, 0, 0.6) 0px 5px 20px;
  color: ${(props) => props.theme.darkGrey};
  border-radius: 5px;

  position: absolute;
  z-index: 9999;
  right: 10px;
  top: 70px;

  visibility: ${(props) => (props.fixed ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.fixed ? '1' : '0')};

  ul {
    width: 100%;

    li {
      padding: 7px 10px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        background-color: ${(props) => darken(0.2, props.theme.title)};
      }

      svg {
        margin-right: 5px;
      }
    }
  }

  &:before {
    content: '';
    display: block;
    float: left;

    width: 20px;
    height: 20px;

    margin: 5px 45px 5px 20px;
    transform: rotate(45deg);
    background-color: ${(props) => props.theme.title};

    position: absolute;

    right: -12px;
    top: -10px;
    z-index: -1;
  }
`;
