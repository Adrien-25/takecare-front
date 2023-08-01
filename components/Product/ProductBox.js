// Import the required dependencies
import styled from "styled-components";
import Link from "next/link";

// Styled component for the product wrapper
const ProductWrapper = styled.div``;

// Styled component for the white box containing the product information
const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  // height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img{
    max-width: 100%;
    // max-height: 80px;
  }
`;

// Styled component for the product title
const Title = styled(Link)`
  font-weight: normal;
  font-size:.9rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

// Styled component for the product info box
const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

// Styled component for the price row
const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:10px;
`;

// Styled component for the product price
const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

// ProductBox functional component
export default function ProductBox({_id,title,description,price,images}) {
  // To be used with CartContext, but currently commented out
  // const {addProduct} = useContext(CartContext);
  const url = '/product/'+_id;
  return (
    // Product wrapper
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt=""/>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            {price} €
          </Price>
          {/* <Button block onClick={() => addProduct(_id)} primary outline>
            Add to cart
          </Button> */}
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}