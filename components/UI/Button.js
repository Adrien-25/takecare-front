// Import the required dependencies
import styled, {css} from "styled-components";
import {primary} from "@/lib/colors";

// Define a set of reusable CSS styles for the button
export const ButtonStyle = css`
  border:0;
  padding: 10px 35px;
  border-radius: 0px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight:500;
  transition: all 0.3s ease;
  svg{
    height: 20px;
    margin-right: 5px;
  }
  /* Conditional styles based on props */
  ${props => props.block && css`
    display: block;
    width: 100%;
  `}
  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
    &:hover {
      background-color: #e5e5e5;
    }
  `}
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
  `}
  ${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
    &:hover {
      background-color: #232323;
    }
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.primary && !props.outline && css`
    background-color: ${primary};
    border: 1px solid ${primary};
    color:#fff;
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    border: 1px solid ${primary};
    color:${primary};
  `}
  ${props => props.size === 'l' && css`
    font-size:1.2rem;
    padding: 10px 20px;
    svg{
      height: 20px;
    }
  `}
`;

// Create a styled component for the button using the ButtonStyle
const StyledButton = styled.button`
  ${ButtonStyle}
`;

// Export a functional component Button which renders the StyledButton
export default function Button({children,...rest}) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  );
}