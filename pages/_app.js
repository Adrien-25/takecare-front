// Import necessary dependencies
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import Header from "@/components/Layout/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import axios from "axios";

// Global styles for the entire application
const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;

// App component - Entry point of the application
export default function App({ Component, pageProps }) {
  const [Categories, setCategories] = useState([]);

  // useEffect hook to fetch categories data from the API when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch categories data from the API
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  // The main return statement of the App component
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Header ListCategory={Categories} />
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
