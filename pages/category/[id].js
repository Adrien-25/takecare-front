


import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { useRouter } from "next/router";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";

export default function CategoriesPage({ products }) {

  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const products = await Product.find({ "category": id }, null, { sort: { '_id': -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  };
}
