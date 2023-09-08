// Import necessary components and dependencies
import Center from "@/components/UI/Center";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Title from "@/components/UI/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";

import styled from "styled-components";
import WhiteBox from "@/components/UI/WhiteBox";
import ProductImages from "@/components/Product/ProductImages";
import Button from "@/components/UI/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import NewProducts from "@/components/Product/NewProducts";
import ReassuranceSection from "@/components/Sections/ReassuranceSection";

// Styled component for grid layout
const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 960px) {
    // grid-template-columns: 1.3fr 0.7fr;
    grid-template-columns: 53% 44%;
  }
  gap: 3%;
  margin: 40px 0;
`;

// Styled component for price row
const Brand = styled.div`
  // font-style: italic;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

// Styled component for price row
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

// Styled component for price
const Price = styled.span`
  font-size: 1.4rem;
  margin-top: 20px;
`;

// Styled component for product content
const ProductContent = styled.div`
  height: fit-content;
  position: sticky;
  top: 0;
  text-align: center;
  > h1 {
    max-width: 350px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
`;

// ProductPage component
export default function ProductPage({ product, relatedProducts, Categories }) {
  // Get the "addProduct" function from the CartContext using useContext
  const { addProduct } = useContext(CartContext);
  console.log(product.description);
  return (
    <>
      <Header ListCategory={Categories} />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <ProductContent>
            <Brand>{product.marque}</Brand>
            <Title>{product.title}</Title>

            <Price>{product.price}€</Price>

            <p>{product.description}</p>
            <PriceRow>
              <Button primary onClick={() => addProduct(product._id)}>
                <CartIcon />
                Ajouter au panier
              </Button>
            </PriceRow>
          </ProductContent>
        </ColWrapper>
      </Center>
      <NewProducts products={relatedProducts} />
      <ReassuranceSection />
      <Footer />
    </>
  );
}

// Function to fetch data from the server
export async function getServerSideProps(context) {
  // Connect to the MongoDB database using Mongoose
  await mongooseConnect();

  const { id } = context.query;
  const product = await Product.findById(id);

  const CategoryProduct = product.category;
  // const relatedProducts = await Product.find({}, null, {sort: {'_id':-1}, limit:4});
  const relatedProducts = await Product.find(
    { category: CategoryProduct },
    null,
    { sort: { _id: -1 }, limit: 4 }
  );

  const Categories = await Category.find();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
      Categories: JSON.parse(JSON.stringify(Categories)),
    },
  };
}
