// Import the required dependencies
import styled from "styled-components";
import Center from "@/components/UI/Center";
import ProductsGrid from "@/components/Product/ProductsGrid";

// Styled component for the title
const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

// NewProducts functional component
export default function NewProducts({products}) {
  // Renders the section for new products
  return (
    <Center>
      <Title>Nouveautés</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}