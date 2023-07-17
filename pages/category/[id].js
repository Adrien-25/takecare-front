import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { useRouter } from "next/router";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function CategoriesPage({ products }) {
  const router = useRouter();
  const { categoryId } = router.query;

  const filteredProducts = categoryId
    ? products.filter((product) => product.category === categoryId)
    : products;

  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={filteredProducts} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { '_id': -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  };
}
