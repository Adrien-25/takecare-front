// Import the required dependencies
import {createContext, useEffect, useState} from "react";

// Create a new context called CartContext
export const CartContext = createContext({});

// Define the CartContextProvider component
export function CartContextProvider({children}) {
  // Get a reference to the local storage (ls) object if available
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  
  // Define a state variable to hold the list of cart products
  const [cartProducts,setCartProducts] = useState([]);
  
  // Save the cartProducts to local storage whenever it changes
  useEffect(() => {
    if (cartProducts?.length > 0) {
      // Use localStorage to store the cartProducts in the browser
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  
  // Load the cartProducts from local storage when the component mounts
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);
  
  // Function to add a product to the cart
  function addProduct(productId) {
    setCartProducts(prev => [...prev,productId]);
  }
  
  // Function to remove a product from the cart
  function removeProduct(productId) {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        // Filter out the product with the given productId from the cartProducts
        return prev.filter((value,index) => index !== pos);
      }
      return prev;
    });
  }
  
  // Function to clear the cart, removing all products
  function clearCart() {
    setCartProducts([]);
  }
  
  // Provide the cartProducts state and the functions to manipulate the cart as context value
  return (
    <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>
      {children}
    </CartContext.Provider>
  );
}