// Import necessary components and dependencies
import Center from "@/components/UI/Center";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Title from "@/components/UI/Title";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/UI/WhiteBox";
import ProductImages from "@/components/Product/ProductImages";
import Button from "@/components/UI/Button";
import CartIcon from "@/components/Icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import NewProducts from "@/components/Product/NewProducts";

// Styled component for grid layout
const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 960px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

// Styled component for price row
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

// Styled component for price
const Price = styled.span`
  font-size: 1.4rem;
`;

// Styled component for product content
const ProductContent = styled.div`
height: fit-content;
position: sticky;
top: 0;
`;

// ProductPage component
export default function ProductPage({product,relatedProducts}) {
  // Get the "addProduct" function from the CartContext using useContext
  const {addProduct} = useContext(CartContext);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <ProductContent>
            <Title>{product.title}</Title>
            <Title>{product.marque}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>{product.price}€</Price>
              </div>
              <div>
                <Button primary onClick={() => addProduct(product._id)}>
                  <CartIcon />Add to cart
                </Button>
              </div>
            </PriceRow>
          </ProductContent>
        </ColWrapper>
      </Center>
      <NewProducts products={relatedProducts} />
      <Footer />
    </>
  );
}

// Function to fetch data from the server
export async function getServerSideProps(context) {
  // Connect to the MongoDB database using Mongoose
  await mongooseConnect();
  
  const {id} = context.query;
  const product = await Product.findById(id);

  const CategoryProduct = product.category;
  // const relatedProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:4});
  const relatedProducts = await Product.find({ category: CategoryProduct }, null, { sort: { '_id': -1 }, limit: 4 });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),

    }
  }
}