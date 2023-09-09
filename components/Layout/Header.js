// Import the required dependencies
import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/UI/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";

import CartIcon from "../icons/CartIcon";
import BarsIcon from "../icons/Bars";
import ChevronRight from "../icons/ChevronRight";
import ChevronLeft from "../icons/ChevronLeft";
import Xmark from "../icons/Xmark";

// Define a set of reusable CSS styles for the header
const StyledHeader = styled.header`
  background-color: #fff;
  position: relative;
  @media screen and (max-width: 980px) {
    // position: fixed;
    // top: 0;
    // left: 0;
    // width: 100%;
    // z-index: 2;
  }
`;

// Styled component for the logo link
const Logo = styled(Link)`
  color: #000;
  text-decoration: none;
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
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
  max-width: 95%;
  width: 1600px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

// Styled component for the header wrapper
const NavContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  > div.cate-parent {
    cursor: pointer;
    @media screen and (max-width: 980px) {
      display: none;
    }
  }
`;
const NoScroll = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(6px);
  background-color: rgba(43, 43, 43, 0.65);
  cursor: revert;
  opacity: 0;
  z-index: 999;
  overflow: hidden;
  display: none;
  ${(props) =>
    props.mobileNavActive
      ? `
      cursor: unset;
      opacity: 1;
      overflow:hidden;
      display:block;

    `
      : `    
    cursor: revert;

    `}
`;
// Styled component for the navigation (for mobile view)
const StyledNav = styled.nav`
  transition: all 0.5s ease;
  display: flex;
  position: static;
  padding: 0;
  padding: 20px 0px;
  align-items: flex-start;
  gap: 30px;
  position: fixed;
  gap: 0;
  // top: 60px;
  bottom: 0;
  left: 0;
  // height: calc(100vh - 60px);
  top:0;
  height:100vh;
  width: 375px;
  max-width: 100%;
  padding: 0px;
  background-color: white;
  z-index: 99999;
  flex-direction: column;
  visibility:hidden;
  opacity:0;

  ${(props) =>
    props.mobileNavActive
      ? `
      transform: translateX(0);
      visibility:visible;
      opacity:1;
    
    `
      : `    
      transform: translateX(-100%);
  
    `}
  .parent-category {
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: all 0.5s ease;

    > div {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      border-top: 0.1rem solid #e4e4e4;
      cursor:pointer;

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
      top: 0;
      z-index: 999999;


      li {
        border-top: 0.1rem solid #e4e4e4;
        a{
          padding: 15px;
          display: block;
        }
        &.title {
          background-color: black;
          color: white;
          display: flex;
          align-items: center;
          gap: 10px; 
          padding: 20px;
          cursor:pointer;
          border:none;
        }
        &:last-child {
          border-bottom: 0.1rem solid #e4e4e4;
        }
      }
    }
    &:last-child > div{
      border-bottom: 0.1rem solid #e4e4e4;

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
  // display: block;
  // padding: 20px;
  // margin: 0 10px;
  // box-sizing: border-box;
  // text-transform: uppercase;
  // font-weight: bold;
  // font-size: 0.9rem;
  // border-bottom: 1px solid rgb(0 0 0 / 13%);
  // width: 100%;

  // @media screen and (min-width: 980px) {
  //   padding: 0;
  // }

  text-decoration: none;
  color: #000;
`;

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
  &.close-nav {
    padding: 20px;
    padding-left: 5%;
    width: unset;
    height: unset;
    width: 100%;
    justify-content: flex-start;
    background-color: black;
    color: white;
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
  justify-content: flex-end;
`;

// Header functional component
export default function Header({ ListCategory }) {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  // const [expandedCategories, setExpandedCategories] = useState({false});
  const [expandedCategories, setExpandedCategories] = useState({});

  // To be used with CartContext, but currently commented out
  // function addFeaturedToCart() {
  //   addProduct(product._id);
  // }
  // console.log(ListCategory);

  // Fonction pour désactiver le header
  const disableHeader = () => {
    setMobileNavActive(false);
    setExpandedCategories({});
  };

  const parentCategories = ListCategory.filter((category) => !category.parent);
  const childCategories = ListCategory.filter((category) => category.parent);

  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  return (
    // Header section
    <StyledHeader>
      {/* Center component to horizontally center the content */}
      <Wrapper>
        {/* Mobile navigation button */}

        <NavContainer>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
          {parentCategories.map((parentCategory) => (
            <div
              onClick={() => {
                toggleCategoryExpansion(parentCategory._id);
                setMobileNavActive((prev) => !prev);
              }}
              className="cate-parent"
            >
              {parentCategory.name}
            </div>
          ))}
          <NoScroll
            mobileNavActive={mobileNavActive}
            className="no-scroll"
          ></NoScroll>

          <StyledNav mobileNavActive={mobileNavActive}>
            <NavButton
              className="close-nav"
              onClick={() => setMobileNavActive((prev) => !prev)}
            >
              <Xmark />
            </NavButton>
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
                  <ChevronRight />
                </div>
                {/* Display child categories inside a list */}
                <ul>
                  <li
                    key={parentCategory._id}
                    className="child-category title"
                    onClick={() => toggleCategoryExpansion(parentCategory._id)}
                  >
                    <ChevronLeft />
                    {parentCategory.name}
                  </li>
                  <li className="child-category">
                    <NavLink href={`/category/${parentCategory._id}`} onClick={disableHeader}>
                    {/* <NavLink to={`/category/${parentCategory._id}`}> */}
                      Voir tout
                    </NavLink>
                  </li>
                  {childCategories
                    .filter(
                      (childCategory) =>
                        childCategory.parent === parentCategory._id
                    )
                    .map((childCategory) => (
                      <li key={childCategory._id} className="child-category">
                        <NavLink href={`/category/${childCategory._id}`} onClick={disableHeader}>
                          {childCategory.name}
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </StyledNav>
        </NavContainer>

        {/* Logo link */}
        <Logo href={"/"}>
          {/* Logo image */}
          <LogoImg src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FLogo-take-care-transparent.png?alt=media&token=df0a3a01-f1cb-4393-b712-545d7fea1829"></LogoImg>
        </Logo>

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
    </StyledHeader>
  );
}
