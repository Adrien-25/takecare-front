// Import necessary components and dependencies
import Header from "@/components/Layout/Header";
import styled from "styled-components";
import Center from "@/components/UI/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import ProductsGrid from "@/components/Product/ProductsGrid";
import Title from "@/components/UI/Title";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { useState } from "react";
import Footer from "@/components/Layout/Footer";

// Styled component for flex container
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

// CategoriesPage component
export default function CategoriesPage({ products, category }) {
  // Get the number of products in the current category
  const numberOfProductsInCategory = products.length;

  // State to manage the selected sort option
  const [sortOption, setSortOption] = useState("default");

  // Handler for changing the sort option
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Function to sort the products based on the selected sort option
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

  // Sort the products based on the selected sort option
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

// Function to fetch data from the server
export async function getServerSideProps(context) {
  // Connect to the MongoDB database using Mongoose
  await mongooseConnect();

  // Get the "id" parameter from the context query
  const { id } = context.query;

  // Fetch the products with the specified category ID from the database and sort them by ID in descending order
  const products = await Product.find({ category: id }, null, {
    sort: { _id: -1 },
  });

  // Fetch the category with the specified ID from the database
  const category = await Category.findById(id);

  // Return the fetched product and category data as props for the CategoriesPage component
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      category: JSON.parse(JSON.stringify(category)),
    },
  };
}

// Styled components for sort selector
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

// SortSelector component for rendering the sort options
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
