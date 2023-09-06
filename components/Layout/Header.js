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
  position: relative;
  @media screen and (max-width: 980px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
`;

// Styled component for the logo link
const Logo = styled(Link)`
  color: #000;
  text-decoration: none;
  position: relative;
  z-index: 3;
  display: flex;
  alkign-items: center;
`;

// Styled component for the logo image
const LogoImg = styled.img`
  width: 100px;
  height: auto;
`;

// Styled component for the reaseau images
const Social = styled.img`
  width: 40px;
  height: auto;
  // @media screen and (min-width: 980px) {
  //   display: none;
  // }
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 30px;
  padding: 5px 0;
  @media screen and (min-width: 980px) {
    //display: none;
  }
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
  padding: 20px 0px;
  align-items: center;
  gap: 30px;
  position: fixed;
  gap: 0;
  top: 60px;
  bottom: 0;
  left: 0;
  //right: 0;
  height: calc(100vh - 60px);
  width: 375px;
  max-width: 100%;
  padding: 0px;
  background-color: white;
  z-index: 2;
  //border-top: 1px solid #eee;
  flex-direction: column;

  ${(props) =>
    props.mobileNavActive
      ? `
      transform: translateX(0);
    `
      : `    
      transform: translateX(-100%);
  
    `}
  .parent-category {
    display: flex;
    flex-direction: column;
    width: 100%;
    //border-bottom: 1px solid rgb(0 0 0 / 13%);
    transition: all 0.5s ease;

    > div {
      display: flex;
      justify-content: space-between;
      // border-bottom: 1px solid rgb(0 0 0 / 13%);
      padding: 20px;
      border-top: 0.1rem solid #e4e4e4;

      svg {
        width: 20px;
        transition: all 0.5s ease;
      }
    }
    ul {
      position: fixed;
      left: 0;
      list-style-type: none;
      padding: 0;
      margin: 0;
      overflow: hidden;
      transition: all 0.5s ease-in-out;
      width: 375px;
      background-color: white;
      transform: translateX(-100%);
      height: calc(100vh - 60px);
      top:0;

      li {
        padding: 15px;
        border-top: 0.1rem solid #e4e4e4;
        &.title {
          background-color: black;
          color: white;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px;
        }
        &:last-child {
          border-bottom: 0.1rem solid #e4e4e4;
        }
      }
    }
  }
  .parent-category.expanded {
    // border-color:transparent;
  }
  .parent-category.expanded ul {
    transform: translateX(0);
  }
  .parent-category.expanded > div svg {
    //transform: rotate(90deg);
  }
`;

// Styled component for the navigation links
const NavLink = styled(Link)`
  display: block;
  color: #000;
  text-decoration: none;
  padding: 20px;
  margin: 0 10px;
  box-sizing: border-box;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
  border-bottom: 1px solid rgb(0 0 0 / 13%);
  width: 100%;

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
    //display: none;
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
  display: flex;
  gap: 10px;
`;

// Header functional component
export default function Header({ ListCategory }) {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  // To be used with CartContext, but currently commented out
  // function addFeaturedToCart() {
  //   addProduct(product._id);
  // }
  console.log(ListCategory);

  const parentCategories = ListCategory.filter((category) => !category.parent);
  const childCategories = ListCategory.filter((category) => category.parent);

  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  //console.log(expandedCategories);
  return (
    // Header section
    <StyledHeader>
      {/* Center component to horizontally center the content */}
      <Center>
        <Wrapper>
          {/* Mobile navigation button */}
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
          {/* Logo link */}
          <Logo href={"/"}>
            {/* Logo image */}
            <LogoImg src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FLogo-take-care-transparent.png?alt=media&token=df0a3a01-f1cb-4393-b712-545d7fea1829"></LogoImg>
          </Logo>
          {/* Mobile navigation */}
          {/* <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/category/64b23fdeabeec0c37de97e6a"}>Homme</NavLink>
            <NavLink href={"/category/64b23fe3abeec0c37de97e6d"}>Femme</NavLink>
            <NavLink href={"/category/64b23fe3abeec0c37de97e6d"}>
              Enfant
            </NavLink>
          </StyledNav> */}

          <StyledNav mobileNavActive={mobileNavActive}>
            {/* Display parent categories */}
            {parentCategories.map((parentCategory) => (
              <div
                key={parentCategory._id}
                className={`parent-category ${
                  expandedCategories[parentCategory._id] ? "expanded" : ""
                }`}
              >
                <div
                  onClick={() => toggleCategoryExpansion(parentCategory._id)}
                >
                  {parentCategory.name}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    width="20px"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
                {/* Display child categories inside a list */}
                <ul>
                  <li
                    key={parentCategory._id}
                    className="child-category title"
                    onClick={() => toggleCategoryExpansion(parentCategory._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                      width="20px"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                    {parentCategory.name}
                  </li>
                  {childCategories
                    .filter(
                      (childCategory) =>
                        childCategory.parent === parentCategory._id
                    )
                    .map((childCategory) => (
                      <li key={childCategory._id} className="child-category">
                        {childCategory.name}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            {/* <SocialContainer>
              <Social src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2Ffacebook.png?alt=media&token=b0c0a541-7ee0-4e5f-977d-90ff0fa679ce"></Social>
              <Social src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2Ffacebook.png?alt=media&token=b0c0a541-7ee0-4e5f-977d-90ff0fa679ce"></Social>
              <Social src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2Ffacebook.png?alt=media&token=b0c0a541-7ee0-4e5f-977d-90ff0fa679ce"></Social>
              <Social src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2Ffacebook.png?alt=media&token=b0c0a541-7ee0-4e5f-977d-90ff0fa679ce"></Social>
            </SocialContainer> */}
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
          </IconContainer>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
