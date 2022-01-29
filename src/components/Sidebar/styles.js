import styled from 'styled-components';
import arrow from '../../assets/arrowDown.png';

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 50px);
  margin: 0 auto;
  width: 100%;
  max-width: 390px;
  transform: ${(props) => (props.isCollapsed ? 'translateX(330px)' : 'translateX(0)')};
  overflow: hidden;
  transition: all 0.4s ease;
`;

export const ButtonSection = styled.section`
  padding: 10px;
  height: 60px;

  button {
    width: 20px;
    height: 20px;
    padding: 20px;
    border-radius: 50%;
    cursor: pointer;

    background-color: ${(props) => props.theme.darkOrange};
    background-image: url(${arrow});
    background-position: center;
    background-size: 50%;
    background-repeat: no-repeat;

    transform: ${(props) => (props.isCollapsed ? 'rotate(90deg)' : 'rotate(-90deg)')};
    transition: all 0.4s ease-out;
  }
`;
export const ModuleSection = styled.section`
  background-color: ${(props) => props.theme.darkGrey};
  opacity: ${(props) => (props.isCollapsed ? '0' : '1')};
  overflow-y: ${(props) => (props.isCollapsed ? 'hidden' : 'auto')};
  overflow-x: hidden;
  transition: all 0.4s ease;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.darkGrey};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.text};
    border-radius: 10px;
  }
`;

export const ModuleList = styled.div`
  background-color: ${(props) => (props.isOpen ? props.theme.darkGrey : props.theme.darkOrange)};
  margin-bottom: 3px;

  div {
    position: relative;
    padding: 20px 50px 20px 20px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: all 0.4s ease;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 20px;
      transform: ${(props) => (props.isOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)')};
      width: 20px;
      height: 20px;

      background-image: url(${arrow});
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;

      transition: all 0.4s ease-out;
    }

    h3 {
      color: ${(props) => (props.isOpen ? props.theme.title : 'white')};
      font-size: 16px;
    }

    span {
      color: #fff;
      font-size: 14px;
    }
  }
`;

export const LessonList = styled.ul`
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  max-height: ${(props) => (props.isOpen ? '1000px' : '0')};
  overflow-y: hidden;
  background-color: ${(props) => (props.isActive ? props.theme.darkGrey : props.theme.darkOrange)};
  color: white;
  transition: all 0.4s ease-out;
`;

export const Lesson = styled.li`
  padding: 20px;
  color: ${(props) => (props.isActive ? props.theme.title : props.theme.text)};
  transition: all 0.4s ease-out;

  &:hover {
    color: white;
    cursor: pointer;
  }
`;
