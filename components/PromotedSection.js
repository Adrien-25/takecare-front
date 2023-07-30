// Import the required dependencies
import styled from "styled-components";
import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";

// Styled component for the promotion section container
const StyledPromotionSection = styled.section`
  // background-color: #f9f9f9;
  background-color: #fff;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin:0;
`;

// Styled component for the title
const Title = styled.h2`
  font-size: 70px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 20px;
  margin:0;
`;

// Styled component for the subtitle
const Subtitle = styled.p`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

// Styled component for the container of buttons
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
  justify-content: center;
`;

// const Button = styled.a
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

// PromotedSection functional component
export default function PromotedSection() {
  return (
    // Styled container for the promotion section
    <StyledPromotionSection>
      <Title>La beauté de la maternité</Title>
      <Subtitle>Découvrez notre sélection pour les femmes enceintes</Subtitle>
      <ButtonsWrapper>
        <ButtonLink href={"/categories/femme-enceinte"} outline={0} black={1}>
          Découvrir
        </ButtonLink>
      </ButtonsWrapper>
    </StyledPromotionSection>
  );
}
