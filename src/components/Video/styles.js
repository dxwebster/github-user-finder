import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-right: ${(props) => props.sidebarIsCollapsed ? '-380px' : '0'}; 

  transition: all 0.4s ease;


  div {
    padding: 48px 40px 0;
  }
  iframe {
    margin: 20px 40px 0;
    width: 90%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: center;
    align-self: center;
  }
`;
