// Import the required dependencies
import styled from "styled-components";
import Link from "next/link";

// Define a set of reusable CSS styles for the footer
const StyledFooter = styled.footer`
  background-color: #000;
  color: #fff;
  // padding: 40px 40px 20px 40px;
  padding: 40px;
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
  // span {
  //   margin-right: 30px;
  // }
`;

// Styled component for the top part of the footer
const TopWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-bottom: 40px;
  gap: 30px;
  @media screen and (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
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
  padding-top: 0px;
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
  width: 100px;
  height: auto;
`;

// Footer functional component
export default function Footer() {
  return (
    <StyledFooter>
      {/* Top section with four columns */}
      <TopWrapper>
        <Column>
          <Title>Take Care</Title>
          <span>
            Bienvenue chez Take Care, votre destination en ligne pour les
            vêtements de seconde main d’occasion les plus tendance et
            éco-responsables.
          </span>
        </Column>
        <Column>
          <Title>Boutique</Title>
          <FooterLink href={"/"}>Homme</FooterLink>
          <FooterLink href={"/"}>Femme</FooterLink>
          <FooterLink href={"/"}>Enfant</FooterLink>
          <FooterLink href={"/"}>Modes de paiement</FooterLink>
          <FooterLink href={"/"}>Nous contacter</FooterLink>
        </Column>
        <Column>
          <Title>À propos de Take Care</Title>
          <FooterLink href={"/"}>Qui sommes-nous?</FooterLink>
          <FooterLink href={"/"}>Expédition et livraison</FooterLink>
          <FooterLink href={"/"}>Retours</FooterLink>
          <FooterLink href={"/"}>Modes de paiement</FooterLink>
          <FooterLink href={"/"}>Nous contacter</FooterLink>
        </Column>
        <Column>
          <Title>Aide et Assistance</Title>
          <FooterLink href={"/"}>FAQ</FooterLink>
          <FooterLink href={"/"}>Livraison</FooterLink>
          <FooterLink href={"/"}>Retours et remboursements</FooterLink>
          <FooterLink href={"/"}>Commandes et paiements</FooterLink>
          <FooterLink href={"/"}>Guide des tailles</FooterLink>
          <FooterLink href={"/"}>FAQ</FooterLink>
        </Column>
      </TopWrapper>
      {/* Botoom section with four columns */}
      <BottomWrapper>
        <div>
          <span>© 2023 Take Care. Tous droits réservés.</span>
        </div>
      </BottomWrapper>
    </StyledFooter>
  );
}
