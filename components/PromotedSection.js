import styled from "styled-components";
import Link from "next/link";

const StyledPromotionSection = styled.section`
  background-color: #f9f9f9;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 70px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

// const Button = styled.a`
//   display: inline-block;
//   padding: 12px 24px;
//   background-color: #6fdcff;
//   color: #fff;
//   text-decoration: none;
//   font-size: 16px;
//   font-weight: bold;
//   border-radius: 4px;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #5db7e4;
//   }
// `;

export default function PromotedSection() {
  return (
    <StyledPromotionSection>
      <Title>La beauté de la maternité</Title>
      <Subtitle>Découvrez notre sélection pour les femmes enceintes</Subtitle>
      <Link href="/categories/femme-enceinte">
        {/* <Button>Explorer la catégorie</Button> */}
        Explorer la catégorie
      </Link>
    </StyledPromotionSection>
  );
}
