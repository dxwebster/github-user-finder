import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  color: white;
`

export const CourseItem = styled.div`
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease 0s;

  button {
    color: white;
    background: #232129;
    text-align: left;
    cursor: pointer;
  }

  &:hover{
    transform: translateY(-10px);
  }

  img {
    width: 100%;
  }

  .title-box {
    margin: 20px;
    justify-content: space-between;

    h2 {
      margin-bottom: 5px;
      font-size: 22px;
      font-weight: bold;
      font-size: 20px;
      
    }
    

    p {
      margin: 20px 0 0;
    }
  }

  .footer-box{
    display: flex;
    flex-direction: row;
    margin: 0 20px 20px;
    justify-content: space-between;
  }
`