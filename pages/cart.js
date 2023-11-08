// Import necessary dependencies and components
import styled from "styled-components";
import Center from "@/components/UI/Center";
import Button from "@/components/UI/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/UI/Table";
import Input from "@/components/UI/Input";

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
    justify-self: end;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  .select-price {
    min-width: 50px;
    height: 40px;
    padding-left: 10px;
    padding-right: 30px;
    margin-bottom: 20px;
    background-origin: content-box;
    background-position: right -1.78308rem center;
    border-radius: 5px;
  }
  .price {
    font-weight: 600;
    font-size: 14px;
    margin: 0;
    .total-text {
      margin-right: 5px;
    }
  }
  table {
    border-top: 1px solid rgb(128 128 128 / 20%);
    &:last-child{
      border-bottom: 1px solid rgb(128 128 128 / 20%);
    }
    tbody {
      tr {
        td {
          border: 0;
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
    padding: 10px;
    width: 70px;
    height: 70px;
    img {
      max-width: 60px;
      max-height: 60px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

// CartPage component
export default function CartPage({ Categories }) {
  // Use the CartContext to access cart products and functions
  const { cartProducts, addProduct, removeProduct, clearCart } =
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
                {/* <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Prix</th>
                  </tr>
                </thead> */}
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
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
                      <td>
                        <select id="" class="select-price">
                          <option
                            value="1"
                            data-quantity="1"
                            selected="selected"
                          >
                            1
                          </option>

                          <option value="2" data-quantity="2">
                            2
                          </option>

                          <option value="3" data-quantity="3">
                            3
                          </option>

                          <option value="4" data-quantity="4">
                            4
                          </option>

                          <option value="5" data-quantity="5">
                            5
                          </option>

                          <option value="6" data-quantity="6">
                            6
                          </option>

                          <option value="7" data-quantity="7">
                            7
                          </option>

                          <option value="8" data-quantity="8">
                            8
                          </option>

                          <option value="9" data-quantity="9">
                            9
                          </option>
                        </select>
                        <p className="price">
                          <span className="total-text">TOTAL </span>
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}{" "}
                          €
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
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
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
