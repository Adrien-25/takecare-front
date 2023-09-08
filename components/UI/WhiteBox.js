// Import the required dependencies
import styled from "styled-components";

const WhiteBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  @media screen and (min-width: 960px) {
    padding: 0px;
    background-color:transparent;
  }
  @media screen and (max-width: 960px) {
    padding: 5px;

  }

`;

export default WhiteBox;