// Import the required dependencies
import styled from "styled-components";
import ProductBox from "@/components/ProductBox";

// Styled component for the products grid container
const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom:20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

// ProductsGrid functional component
export default function ProductsGrid({products}) {
  // Render the products grid
  return (
    // Styled container for the products grid
    <StyledProductsGrid>
      {/* Check if products exist and map through each product to render ProductBox */}
      {products?.length > 0 && products.map(product => (
        // Each product is represented by a ProductBox component
        <ProductBox key={product._id} {...product} />
      ))}
    </StyledProductsGrid>
  );
}