import Center from "@/components/Center";
import styled from "styled-components";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import CartIcon from "@/components/icons/CartIcon";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";

const Bg = styled.div`
  background-color: rgba(18, 18, 18, 0.1);
  color:#000;
  padding: 50px 0;
  height:80vh;
  display:flex;
  align-items:center;
`;
const SubTitle = styled.h2`
  margin:0;
  padding-bottom:20px;
  font-weight:normal;
  font-size:1.3rem;
  @media screen and (min-width: 768px) {
    font-size:2.5rem;
  }
`;
const Title = styled.h1`
  margin:0;
  padding-bottom:20px;
  font-weight:bold;
  font-size:1.8rem;
  @media screen and (min-width: 768px) {
    font-size:3rem;
  }
`;
const Desc = styled.p`
  color:#000;
  font-size:1rem;
`;
// const ColumnsWrapper = styled.div`
//  < // display: grid;
//   // grid-template-columns: 1fr;
//   // gap: 40px;
//   // img{
//   //   max-width: 100%;
//   //   max-height: 200px;
//   //   display: block;
//   //   margin: 0 auto;
//   // }
//   // div:nth-child(1) {
//   //   order: 2;
//   // }
//   // @media screen and (min-width: 768px) {
//   //   grid-template-columns: 1.1fr 0.9fr;
//   //   div:nth-child(1) {
//   //     order: 0;
//   //   }
//   //   img{
//   //     max-width: 100%;
//   //   }
//   // }>
// `;
const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  text-align:center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
  justify-content:center;
`;

export default function Featured({product}) {
  const {addProduct} = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        {/* <ColumnsWrapper> */}
          <Column>
            <div>
              <SubTitle>Soldes d'Été</SubTitle>
              <Title>Jusqu'à 50% de réduction*</Title>
              <Desc>Temps chaud. Offres plus chaudes.</Desc>
              <ButtonsWrapper>
                <ButtonLink href={'/product/'+product._id} outline={1} black={1}>Femme</ButtonLink>
                <ButtonLink href={'/product/'+product._id} outline={1} black={1}>Homme</ButtonLink>
                {/* <Button white onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to cart
                </Button> */}
              </ButtonsWrapper>
            </div>
          </Column>
          {/* <Column>
            <img src="https://dawid-next-ecommerce.s3.amazonaws.com/1679151719649.png" alt=""/>
          </Column> */}
        {/* </ColumnsWrapper> */}
      </Center>

    </Bg>
  );
}