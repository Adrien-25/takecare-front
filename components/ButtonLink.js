// Import the required dependencies
import Link from "next/link";
import styled from "styled-components";
import {ButtonStyle} from "@/components/Button";

// Create a styled component for the Link using the ButtonStyle from the Button component
const StyledLink = styled(Link)`
  ${ButtonStyle}
`;

// Export a functional component ButtonLink that renders the StyledLink
export default function ButtonLink(props) {
  return (
    // Render the StyledLink with the provided props
    <StyledLink {...props} />
  );
}