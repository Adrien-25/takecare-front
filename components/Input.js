// Import the required dependencies
import styled from "styled-components";

// Styled component for the input element
const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing:border-box;
`;

// Input functional component
export default function Input(props) {
  // Renders the styled input element with the provided props
  return <StyledInput {...props} />
}