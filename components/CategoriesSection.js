import styled from "styled-components";
import Link from "next/link";
import Center from "@/components/Center";

const StyledCategoriesSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 40px 0; 
`;

const Column = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  background-color: grey;
  position: relative;
  color: white;
  hover{
    opacity:0.5;
  }
`;

const CategoryBackground = styled.img`
  width: 100%;
  height: auto;
  background-position: center;
  background-size: cover;
`;

const CategoryTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
  position: absolute;
  top: 10px;
  @media screen and (min-width: 768px) {
    font-size: 4rem;
  }
`;

export default function CategoriesSection() {
  return (
    <Center>

    <StyledCategoriesSection>
      <Column href="/category/64b23fdeabeec0c37de97e6a">
        <CategoryBackground src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FCategorie-Femme.webp?alt=media&token=997dc904-2711-48c7-bb0c-99b2c5cce556" />
        <CategoryTitle>Femme</CategoryTitle>
      </Column>
      <Column href="/category/64b23fe3abeec0c37de97e6d">
        <CategoryBackground src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FCategorie-Homme.webp?alt=media&token=a6a6ca6c-4d6c-407b-a784-97c62ca20823" />
        <CategoryTitle>Homme</CategoryTitle>
      </Column>
    </StyledCategoriesSection>
  </Center>
  );
}
