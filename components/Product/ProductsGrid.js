// Import the required dependencies
import styled from "styled-components";
import ProductBox from "@/components/Product/ProductBox";

// Styled component for the products grid container
const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom:20px;
  @media screen and (min-width: 980px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

// ProductsGrid functional component
export default function ProductsGrid({products}) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 && products.map(product => (
        <ProductBox key={product._id} {...product} />
      ))}
    </StyledProductsGrid>
  );
}