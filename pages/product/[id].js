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
import Heart from "@/components/icons/Heart";
import Cookies from "js-cookie";

// Styled component for grid layout
const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 100%;
  @media screen and (min-width: 960px) {
    // grid-template-columns: 1.3fr 0.7fr;
    grid-template-columns: 53% 44%;
  }
  gap: 3%;
  padding: 40px 0;
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
  margin-bottom: 30px;
  margin-top: 20px;
  .add-wish {
    padding: 10px 20px;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

// Styled component for price
const Price = styled.span`
  font-size: 1.4rem;
  margin-top: 20px;
`;

// Styled component for product content
const ProductContent = styled.div`
  // height: fit-content;
  // height: 100%;
  position: sticky;
  top: 0;
  text-align: center;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  @media screen and (max-width: 960px) {
    padding: 10px;
  }
  > h1 {
    max-width: 350px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .bottom-detail {
    border-top: 1px solid #e5e8ec;
    padding-top: 30px;
    > p {
      margin: 0;
      margin-bottom: 5px;
      font-size: 12px;
    }
  }
  .paiement-container {
    position: relative;
    border-radius: 5px;
    > div {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%) translateY(-50%);
      padding: 0 20px;
      background-color: white;
    }
    padding: 25px 0 20px 0;
    border: 1px solid #e5e8ec;
    margin-top: 30px;
  }
`;

// ProductPage component
export default function ProductPage({ product, relatedProducts }) {
  // Get the "addProduct" function from the CartContext using useContext
  const { addProduct } = useContext(CartContext);

  const addWish = (wishId) => {
    if (localStorage.getItem("wishlist")) {
      const existingWishlist = JSON.parse(localStorage.getItem("wishlist"));
      if (!existingWishlist.includes(wishId)) {
        existingWishlist.push(wishId);
        localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
      }
    } else {
      const newWishlist = [wishId];
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    }
    const wishlistChangeEvent = new CustomEvent('wishlistChange', {
      
    });
    
    window.dispatchEvent(wishlistChangeEvent);
  };

  return (
    <>
      {/* <Header ListCategory={Categories} /> */}
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
              <Button
                black
                outline
                className="add-wish"
                onClick={() => addWish(product._id)}
              >
                <Heart />
                Wishlist
              </Button>
            </PriceRow>
            <div className="bottom-detail">
              <p>SKU : {product.reference}</p>
              <p>Available : En stock</p>
            </div>
            <div className="paiement-container">
              <div>Paiement sécurisé</div>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2Fpayment_1.avif?alt=media&token=68632f14-6581-48d1-af1b-0c1d41b75d60"
                alt="Icones de paiements"
              />
            </div>
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

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
    },
  };
}
