// Import the required dependencies
import styled from "styled-components";
import Link from "next/link";

// Define a set of reusable CSS styles for the footer
const StyledFooter = styled.footer`
  background-color: #000;
  color: #fff;
  // padding: 40px 40px 20px 40px;
`;

// Styled component for each column in the footer
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  a {
    color: #7e7e7e;
    text-decoration: none;
    font-size: 0.8rem;
    padding: 5px 0;
  }
  span {
    margin-right: 30px;
    font-size: 13px;
  }
  .brand-name{
    margin-bottom:30px;
    text-transform:uppercase;
    font-size: 25px;
    font-weight: bold;
  }
`;

// Styled component for the top part of the footer
const TopWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 40px;
  padding-bottom: 60px;
  gap: 30px;
  margin-left: 5%;
  margin-right: 5%;
  @media screen and (max-width: 980px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const Social = styled.img`
  width: 40px;
  height: auto;
  // @media screen and (min-width: 980px) {
  //   display: none;
  // }
`;
const SocialContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 5px 0;
  @media screen and (min-width: 980px) {
    //display: none;
  }
  > a{
    padding:0;
  }
`;

// Styled component for the title in each column
const Title = styled.h4`
  margin: 0;
  padding-bottom: 5px;
  font-weight: bold;
  font-size: 1.2rem;
  @media screen and (max-width: 980px) {
    text-align: center;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

// Styled component for the bottom part of the footer
const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  gap: 20px;
  padding: 30px;
  border-top:1px solid rgba(255,255,255,0.3);
  margin-left: 5%;
  margin-right: 5%;
`;

// Styled component for the links in the footer
const FooterLink = styled(Link)`
  color: #7e7e7e;
  text-decoration: none;
  font-size: 0.8rem;
  padding: 5px 0;
  @media screen and (max-width: 980px) {
    text-align: center;
  }
`;

// Styled component for the logo image in the footer (currently not used in the code)
const LogoImg = styled.img`
  width: 25px;
  height: auto;
`;

// Footer functional component
export default function Footer() {
  return (
    <StyledFooter>
      {/* Top section with four columns */}
      <TopWrapper>
        <Column>
          <div class="brand-name">Take Care</div>
          <SocialContainer>
            <Link href={"https://www.facebook.com/?locale=fr_FR"}>
              <Social src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2Ffacebook.png?alt=media&token=b0c0a541-7ee0-4e5f-977d-90ff0fa679ce"></Social>
            </Link>
            <Link href={"https://www.facebook.com/?locale=fr_FR"}>
              <Social src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2Finstagram.png?alt=media&token=ec81a6d5-15cc-4aa5-b124-3da3bfe1a4aa"></Social>
            </Link>
            <Link href={"https://www.facebook.com/?locale=fr_FR"}>
              <Social src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2Flinkedin.png?alt=media&token=9258499f-e67c-44d0-a3b9-f55291271f40"></Social>
            </Link>
            <Link href={"https://www.facebook.com/?locale=fr_FR"}>
              <Social src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2Fyoutube.png?alt=media&token=cd99e6eb-3a76-4bfa-b88f-59cd68496f60"></Social>
            </Link>
          </SocialContainer>
        </Column>

        <Column>
          <Title>Catalogue</Title>
          <FooterLink href={"/"}>Tous nos produits</FooterLink>
          <FooterLink href={"/category/64b23fdeabeec0c37de97e6a"}>Homme</FooterLink>
          <FooterLink href={"/category/64b23fe3abeec0c37de97e6d"}>Femme</FooterLink>
        </Column>

        <Column>
          <Title>Aide et Assistance</Title>
          <FooterLink href={"/"}>FAQ</FooterLink>
          <FooterLink href={"/"}>Expédition et livraison</FooterLink>
          <FooterLink href={"/"}>Retours et remboursements</FooterLink>
          <FooterLink href={"/"}>Commandes et paiements</FooterLink>
          <FooterLink href={"/"}>Nous contacter</FooterLink>
        </Column>
      </TopWrapper>
      {/* Botoom section with four columns */}
      <BottomWrapper>
        <LogoImg src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FTC-removebg-preview%20(1).png?alt=media&token=124597d4-e352-46cc-aab2-89e1f2172930"></LogoImg>
        <span>Tous droits d’auteur et conception par @Take Care – 2023</span>
      </BottomWrapper>
    </StyledFooter>
  );
}
