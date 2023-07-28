import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import MyAccount from "@/components/icons/MyAccount";
import CartIcon from "@/components/icons/CartIcon";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";

const StyledHeader = styled.header`
  background-color: #fff;
`;
const Logo = styled(Link)`
  color: #000;
  text-decoration: none;
  position: relative;
  z-index: 3;
`;
const LogoImg = styled.img`
  width: 100px;
  height: auto;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
    display: block;
  `
      : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: transparent;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
    align-items: center;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color: #000;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;
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

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
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
  top: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const iconNav = "font-size:10px";
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>
            <LogoImg src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FLogo-take-care-transparent.png?alt=media&token=df0a3a01-f1cb-4393-b712-545d7fea1829"></LogoImg>
          </Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/products"}>Nouveautés</NavLink>
            <NavLink href={"/categories/homme"}>Homme</NavLink>
            <NavLink href={"/categories/femme"}>Femme</NavLink>
            <NavLink href={"/categories/enfant"}>Enfant</NavLink>
            <NavLink href={"/categories/soldes"}>Soldes</NavLink>
          </StyledNav>

          <StyledNav>
            <IconLink href={"/account"}>
              <MyAccount />
            </IconLink>
            <IconLink href={"/cart"} >
              <CartIcon />
              <CartCount>{cartProducts.length}</CartCount>
            </IconLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
