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
  gap: 10px;
  a {
    color: #7e7e7e;
    text-decoration: none;
    font-size: 0.8rem;
    padding: 5px 0;
  }
  span {
    margin-right: 30px;
  }
`;

// Styled component for the top part of the footer
const TopWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-bottom: 40px;
  gap: 20px;
`;

// Styled component for the title in each column
const Title = styled.h4`
  margin: 0;
  padding-bottom: 5px;
  font-weight: bold;
  font-size: 0.9rem;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

// Styled component for the bottom part of the footer
const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  padding-top: 50px;
`;

// Styled component for the links in the footer
const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
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
          <span>Take Care</span>
          <span>
            Bienvenue chez Take Care, votre destination en ligne pour les
            vêtements de seconde main d’occasion les plus tendance et
            éco-responsables.
          </span>
        </Column>
        <Column>
          <Title>Boutique</Title>
          <Link href={"/"}>Homme</Link>
          <Link href={"/"}>Femme</Link>
          <Link href={"/"}>Enfant</Link>
          <Link href={"/"}>Modes de paiement</Link>
          <Link href={"/"}>Nous contacter</Link>
        </Column>
        <Column>
          <Title>À propos de Take Care</Title>
          <Link href={"/"}>Statut de commande</Link>
          <Link href={"/"}>Expédition et livraison</Link>
          <Link href={"/"}>Retours</Link>
          <Link href={"/"}>Modes de paiement</Link>
          <Link href={"/"}>Nous contacter</Link>
        </Column>
        <Column>
          <Title>Aide</Title>
          <Link href={"/"}>Statut de commande</Link>
          <Link href={"/"}>Expédition et livraison</Link>
          <Link href={"/"}>Retours</Link>
          <Link href={"/"}>Modes de paiement</Link>
          <Link href={"/"}>Nous contacter</Link>
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
