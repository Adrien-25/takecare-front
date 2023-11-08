// Import necessary components and dependencies
import Footer from "@/components/Layout/Footer";
import Center from "@/components/UI/Center";
import Cookies from "js-cookie";
import Title from "@/components/UI/Title";
import Button from "@/components/UI/Button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { mongooseConnect } from "@/lib/mongoose";
import Table from "@/components/UI/Table";

const WishlistContainer = styled.div`
  margin: 50px 0;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  .wish-container {
    .head-title {
      display: grid;
      grid-template-columns: auto auto auto;
      > div {
        /* width: 100%; */
        padding: 10px;
        text-align: center;
        border: 1px solid grey;
      }
    }
  }
  .wish-content {
    .wish-item {
      display: flex;
      padding: 20px 0;
      gap: 20px;
      align-items: center;
    }
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 70px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 70px;
    height: 70px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

// ProductsPage component
export default function WishlistPage(products) {
  const [wishlist, setWishlist] = useState([]);
  //   const wishProduct = {} ;

  useEffect(() => {
    if (localStorage.getItem("wishlist")) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist"));
      console.log(wishlist);
      setWishlist(wishlist);
    }

    if (wishlist.length > 0) {
    }
  }, []);

  //   const wishlistData = {};
  const wishlistData = [];

  wishlist.forEach((element) => {
    // console.log(element);
    // console.log(products.products);

    const product = Object.values(products.products).find(
      (p) => p._id === String(element)
    );
    wishlistData.push(product);
    // console.log(product);
  });

  //   const wishlistData = wishlist.map((wishlistId) => {
  //     const product = Object.values(products).find(
  //       (p) => p._id === String(wishlistId)
  //     );
  //     console.log()
  //     return product;
  //   });

  console.log(wishlistData);

  const handleGoToHomePage = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Center>
        <WishlistContainer>
          <Title>Wishlist</Title>
          {wishlist.length === 0 ? (
            <>
              <p>Votre liste de souhaits est vide.</p>
              <p>
                Ajoutez vos articles préférés à votre wishlist et ils
                apparaîtront ici
              </p>
              <Button primary onClick={handleGoToHomePage}>
                Voir les produits
              </Button>
            </>
          ) : (
            <div className="">
              {wishlistData?.length > 0 && (
                <div className="wish-container">
                  {/* <div className="head-title">
                    <div>Produit</div>
                    <div>Prix</div>
                    <div>Statut</div>
                  </div> */}
                  <div className="wish-content">
                    {wishlistData.map((product) => (
                      <div className="wish-item" key={product._id}>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </WishlistContainer>
      </Center>
      <Footer />
    </>
  );
}
export async function getServerSideProps() {
  await mongooseConnect();

  const products = await Product.find({}, null, { sort: { _id: -1 } });

  // Return the fetched data as props for the ProductsPage component
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
