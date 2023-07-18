


import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";

export default function CategoriesPage({ products,category }) {
  const numberOfProductsInCategory = products.length;

  return (
    <>
      <Header />
      <Center>
      <Title>{category ? `${category.name} (${numberOfProductsInCategory})` : "Pas de Catégorie"}</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const products = await Product.find({ "category": id }, null, { sort: { '_id': -1 } });
  const category = await Category.findById(id);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      category: JSON.parse(JSON.stringify(category)),
    }
  };
}
