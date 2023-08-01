// Import the required dependencies
import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/UI/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";

import CartIcon from "../icons/CartIcon";
import BarsIcon from "../icons/Bars";

// Define a set of reusable CSS styles for the header
const StyledHeader = styled.header`
  background-color: #fff;
  @media screen and (max-width: 980px) {
  position:fixed;
  top:0;
  left:0;
  width:100%;
  z-index:2;
  }
`;

// Styled component for the logo link
const Logo = styled(Link)`
  color: #000;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

// Styled component for the logo image
const LogoImg = styled.img`
  width: 100px;
  height: auto;
`;

// Styled component for the header wrapper
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  @media screen and (max-width: 980px) {
    // display: grid;
  }
`;

// Styled component for the navigation (for mobile view)
const StyledNav = styled.nav`
  transition: all 0.5s ease;
  display: flex;
  position: static;
  padding: 0;
  align-items: center;
  gap: 30px;

  @media screen and (max-width: 980px) {
    position: fixed;
    top: 60px;
    bottom: 0;
    // left: 0;
    right: 0;
    height: calc(100vh - 65px);
    width: 400px;
    max-width:100%;
    padding: 0px 20px 20px;
    background-color: white;
    z-index: 2;
    border-top: 1px solid #eee;
    flex-direction: column;
    ${(props) =>
      props.mobileNavActive
        ? `
      transform: translateX(0);
    `
        : `    
      transform: translateX(100%);
  
    `}
  }
`;

// Styled component for the navigation links
const NavLink = styled(Link)`
  display: block;
  color: #000;
  text-decoration: none;
  padding: 10px 0;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
  @media screen and (min-width: 980px) {
    padding: 0;
  }
`;

// Styled component for the background of navigation links (for mobile view)
// const NavLinkBg = styled.div`
//   display: block;
//   color: #000;
//   text-decoration: none;
//   padding: 10px 0;
//   @media screen and (min-width: 980px) {
//     padding: 0;
//   }
// `;

// Styled component for the icon links in the navigation
const IconLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    height: 22px;
    color: #000;
  }
`;

// Styled component for the mobile navigation button
const NavButton = styled.button`
  background-color: transparent;
  width: 40px;
  height: 40px;
  border: 0;
  color: black;
  cursor: pointer;
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 980px) {
    display: none;
  }
`;

// Styled component for the cart count badge
const CartCount = styled.div`
  background-color: #000;
  color: #fff;
  width: 17px;
  height: 17px;
  text-align: center;
  font-size: 12px;
  border-radius: 100%;
  position: absolute;
  display: inline-block;
  right: -6px;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconContainer = styled.div`
  display:flex;
  gap:10px;
`;

// Header functional component
export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  // To be used with CartContext, but currently commented out
  // function addFeaturedToCart() {
  //   addProduct(product._id);
  // }
  return (
    // Header section
    <StyledHeader>
      {/* Center component to horizontally center the content */}
      <Center>
        <Wrapper>
          {/* Logo link */}
          <Logo href={"/"}>
            {/* Logo image */}
            <LogoImg src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FLogo-take-care-transparent.png?alt=media&token=df0a3a01-f1cb-4393-b712-545d7fea1829"></LogoImg>
          </Logo>

          {/* Mobile navigation */}
          <StyledNav mobileNavActive={mobileNavActive}>
            {/* Navigation links */}
            <NavLink href={"/category/64b23fdeabeec0c37de97e6a"}>
              Homme
            </NavLink>
            <NavLink href={"/category/64b23fe3abeec0c37de97e6d"}>
              Femme
            </NavLink>
            <NavLink href={"/category/64b23fe3abeec0c37de97e6d"}>
              Enfant
            </NavLink>
          </StyledNav>

          {/* Icon links */}
          <IconContainer>
            {/* Cart icon link */}
            <IconLink href={"/cart"}>
              <CartIcon />
              {/* Cart count badge */}
              <CartCount>{cartProducts.length}</CartCount>
            </IconLink>
            {/* </StyledNav> */}

            {/* Mobile navigation button */}
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <BarsIcon />
            </NavButton>
          </IconContainer>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
