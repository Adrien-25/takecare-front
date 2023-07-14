import styled from "styled-components";
import Link from "next/link";

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
  margin:20px;
  background-color:grey;
  position:relative;
  color:white;
`;

const CategoryBackground = styled.div`
  width: 100%;
  height: 400px;
  background-position: center;
  background-size: cover;
`;

const CategoryTitle = styled.h2`
  font-size: 35px;
  margin-bottom: 10px;
  position:absolute;
  top:10px;
`;


export default function CategoriesSection() {
  return (
    <StyledCategoriesSection>
      <Column href="/categories/femme">
        <CategoryBackground
          style={{ backgroundImage: "url('/homme.jpg')" }}
        />
        <CategoryTitle>Homme</CategoryTitle>
      </Column>
      <Column href="/categories/femme">
        <CategoryBackground
          style={{ backgroundImage: "url('/femme.jpg')" }}
        />
        <CategoryTitle>Femme</CategoryTitle>
      </Column>
    </StyledCategoriesSection>
  );
}

