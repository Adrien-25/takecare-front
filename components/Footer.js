import styled from "styled-components";
import Link from "next/link";

const StyledFooter = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 40px 40px 20px 40px;
`;
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
`;
const TopWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-bottom: 20px;
  gap: 20px;
`;
const Title = styled.h4`
  margin: 0;
  padding-bottom: 10px;
  font-weight: bold;
  font-size: 0.9rem;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
`;
const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
`;

export default function Footer() {
  return (
    <StyledFooter>
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
      <BottomWrapper>
        <div>
          <span>© 2023 Take Care. Tous droits réservés.</span>
        </div>
      </BottomWrapper>
    </StyledFooter>
  );
}
