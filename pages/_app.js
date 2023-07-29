import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import { Helmet } from "react-helmet";
import { useEffect } from "react";


const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  // Utilisation du hook useEffect pour effectuer l'effet secondaire une fois que le composant est monté.
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);

    // Nettoyage de l'effet secondaire lorsque le composant est démonté.
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
