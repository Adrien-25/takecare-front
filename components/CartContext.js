import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }
  function removeAllProducts(productId) {
    setCartProducts((prev) => {
      return prev.filter((value) => value !== productId);
    });
  }
  

  function clearCart() {
    setCartProducts([]);
  }

  // const handleQuantityChange = (productId, newQuantity) => {
  //   setProductQuantities((prevQuantities) => ({
  //     ...prevQuantities,
  //     [productId]: parseInt(newQuantity, 10),
  //   }));
  // };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
        removeAllProducts
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
