// Import the required dependency
import styled from "styled-components";

// Styled component for the centering container
const StyledDiv = styled.div`
  max-width: 1400px;
  width: 90%;
  margin: 0 auto;
  padding: 0 20px;
`;

// Center functional component
export default function Center({children}) {
  return (
    // Render the children within the StyledDiv, centering the content
    <StyledDiv>{children}</StyledDiv>
  );
}