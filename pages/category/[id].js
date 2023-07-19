import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { useState } from "react";
import Footer from "@/components/Footer";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function CategoriesPage({ products, category }) {
  const numberOfProductsInCategory = products.length;

  const [sortOption, setSortOption] = useState("default");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Fonction pour trier les produits en fonction de l'option de tri sélectionnée
  const sortProducts = () => {
    switch (sortOption) {
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);
      case "date-asc":
        return [...products].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      case "date-desc":
        return [...products].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts();

  return (
    <>
      <Header />
      <Center>
        <Wrapper>
          <Title>
            {category
              ? `${category.name} (${numberOfProductsInCategory})`
              : "Pas de Catégorie"}
          </Title>
          <SortSelector value={sortOption} onChange={handleSortChange} />
        </Wrapper>

        <ProductsGrid products={sortedProducts} />
      </Center>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const products = await Product.find({ category: id }, null, {
    sort: { _id: -1 },
  });
  const category = await Category.findById(id);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      category: JSON.parse(JSON.stringify(category)),
    },
  };
}
const SortSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const SortSelect = styled.select`
  padding: 8px;
  border-radius: 4px;
`;

function SortSelector({ value, onChange }) {
  return (
    <SortSelectorContainer>
      <SortSelect value={value} onChange={onChange}>
        <option value="default">Tri par défaut</option>
        <option value="price-asc">Prix ​​croissant</option>
        <option value="price-desc">Prix dé​​croissant</option>
        <option value="date-desc">Les plus récents</option>
        <option value="date-asc">Les plus anciens</option>
      </SortSelect>
    </SortSelectorContainer>
  );
}
