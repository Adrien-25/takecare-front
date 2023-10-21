// Import necessary dependencies
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import Loading from "@/components/Layout/Loading";

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
  const [loading, setLoading] = useState(true);

  // Utilisation du hook useEffect pour effectuer l'effet secondaire une fois que le composant est monté.
  useEffect(() => {
    // Create and add a link tag to load the Poppins font from Google Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);

    setTimeout(() => {
      setLoading(false); // Une fois que le chargement est terminé, mettez loading à false
    }, 1000); // Exemple de délai de 2 secondes

    // Clean up the side effect when the component is unmounted.
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // The main return statement of the App component
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        {/* {loading ? (
          // Affichez l'écran de chargement tant que loading est true
          <Loading />
          
        ) : (
          // Affichez la page principale une fois le chargement terminé
          <Component {...pageProps} />
        )} */}
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
