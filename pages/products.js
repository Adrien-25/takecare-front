// Import necessary components and dependencies
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import styled from "styled-components";
import Center from "@/components/UI/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/Product/ProductsGrid";
import Title from "@/components/UI/Title";

// ProductsPage component
export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
      <Footer />
    </>
  );
}

// Function to fetch data from the server
export async function getServerSideProps() {
  // Connect to the MongoDB database using Mongoose
  await mongooseConnect();

  // Fetch all products from the database and sort them by ID in descending order
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  
  // Return the fetched data as props for the ProductsPage component
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
