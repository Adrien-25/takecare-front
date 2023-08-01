// Import the required dependencies
import styled from "styled-components";

// Styled component for the table
const StyledTable = styled.table`
  width: 100%;
  th{
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: .7rem;
  }
  td{
    border-top: 1px solid rgba(0,0,0,.1);
  }
`;

// Table functional component
export default function Table(props) {
  // Render the table with the specified props
  return <StyledTable {...props} />
}