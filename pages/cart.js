// Import necessary dependencies and components
import styled from "styled-components";
import Center from "@/components/UI/Center";
import Button from "@/components/UI/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/UI/Table";
import Input from "@/components/UI/Input";
import Xmark from "@/components/icons/Xmark";

// Styled components for layout and styling
const ColumnsWrapper = styled.div`
  display: grid;
  /* grid-template-columns: 1fr;
  @media screen and (min-width: 980px) {
    grid-template-columns: 1.2fr 0.8fr;
  } */
  grid-template-columns: 1fr;

  gap: 40px;
  margin-top: 40px;
  .panier {
  }
  .infos-commande {
    max-width: 600px;
    min-width: 300px;
    justify-self: end;
    .subtotal-container,
    .ship-container,
    .total-container {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 15px;
    }
    .total-container {
      padding: 30px 0 0 0;
      margin: 30px 0;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  h2 {
    margin-top: 0;
  }
  .select-price {
    min-width: 50px;
    height: 40px;
    padding-left: 10px;
    padding-right: 30px;
    margin-bottom: 15px;
    background-origin: content-box;
    background-position: right -1.78308rem center;
    border-radius: 5px;
  }
  .right-content {
    display: flex;
    gap: 30px;
    justify-content: end;
    .delete-wish {
      cursor: pointer;
      >svg{
        width: 16px;
        stroke-width: 3;
            }
      
    }
    .price {
      font-weight: 600;
      font-size: 14px;
      margin: 0;
      .total-text {
        margin-right: 5px;
      }
    }
  }
  table {
    tbody {
      tr {
        /* border-top: 1px solid rgb(128 128 128 / 20%);
        &:last-child {
          border-bottom: 1px solid rgb(128 128 128 / 20%);
        } */
        td {
          /* border: 0; */
        }
      }
    }
  }
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 70px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 5px;
    width: 70px;
    height: 70px;
    img {
      max-width: 60px;
      max-height: 60px;
    }
  }
`;

// const QuantityLabel = styled.span`
//   padding: 0 15px;
//   display: block;
//   @media screen and (min-width: 768px) {
//     display: inline-block;
//     padding: 0 10px;
//   }
// `;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

// CartPage component
export default function CartPage({ Categories }) {
  // Use the CartContext to access cart products and functions
  const { cartProducts, addProduct, removeProduct, clearCart,removeAllProducts } =
    useContext(CartContext);
  // States for managing form inputs and order status
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [step, setPaid] = useState(false);
  const [productQuantities, setProductQuantities] = useState({});

  // Fetch product data when the cartProducts change
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  // Check for order success when the component mounts
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  // Increase the quantity of a product in the cart
  function moreOfThisProduct(id) {
    addProduct(id);
  }

  // Decrease the quantity of a product in the cart
  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function RemoveProducts(id) {
    removeAllProducts(id);
  }

  // Proceed to payment and handle the response
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  // Calculate the total price of the items in the cart
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  function goToInfos() {
    setPaid(true);
  }

  console.log(cartProducts);

  const handleQuantityChange = (productId, newQuantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: parseInt(newQuantity, 10),
    }));
  };

  // Render the success message if the order is successful
  if (isSuccess) {
    return (
      <>
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Merci pour votre commande!</h1>
              <p>
                Nous vous enverrons un e-mail lorsque votre commande sera
                envoyée.
              </p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  // Render the cart and order form
  return (
    <>
      <Center>
        <ColumnsWrapper>
          <Box className="panier">
            <h2>Panier</h2>
            {!cartProducts?.length && <div>Votre panier est vide</div>}
            {products?.length > 0 && (
              <Table>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                     
                      <td>
                        <div className="right-content">
                          <div>
                            <select
                              className="select-price"
                              value={productQuantities[product._id] || 1}
                              onChange={(e) =>
                                handleQuantityChange(
                                  product._id,
                                  e.target.value
                                )
                              }
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((quantity) => (
                                <option
                                  key={quantity}
                                  value={quantity}
                                  data-quantity={quantity}
                                >
                                  {quantity}
                                </option>
                              ))}
                            </select>
                            <p className="price">
                              <span className="total-text">TOTAL </span>
                              {cartProducts.filter((id) => id === product._id)
                                .length * product.price}{" "}
                              €
                            </p>
                          </div>

                          <div
                            className="delete-wish"
                            onClick={() => removeAllProducts(product._id)}
                          >
                            <Xmark className="" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <>
              <Box className="infos-commande">
                <h2>Récapitulatif</h2>
                <div className="subtotal-container">
                  <span>Sous-total</span>
                  <span>{total} €</span>
                </div>
                <div className="ship-container">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="total-container">
                  <span>Total</span>
                  <span>{total} €</span>
                </div>
                <Button black block onClick={goToInfos}>
                  Valider la commande
                </Button>
              </Box>
              <Box className="infos-commande">
                <h2>Informations sur la commande</h2>
                <Input
                  type="text"
                  placeholder="Nom"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="E-mail"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="Ville"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Code Postal"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Adresse"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Pays"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                <Button black block onClick={goToPayment}>
                  Continuer vers le paiement
                </Button>
              </Box>
            </>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
 {/* <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td> */}
