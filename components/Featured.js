import Center from "@/components/Center";
import styled from "styled-components";
import ButtonLink from "@/components/ButtonLink";
// import Button from "@/components/Button";
// import CartIcon from "@/components/icons/CartIcon";
// import {useContext} from "react";
// import {CartContext} from "@/components/CartContext";


const Bg = styled.div`
  background-color: rgba(18, 18, 18, 0.1);
  color: #fff;
  padding: 50px 0;
  height: 70vh;
  display: flex;
  align-items: center;
  position:relative;
  overflow:hidden;
`;
const HeroBg = styled.img`
  width: 100%;
  height: auto;
  position:absolute;
  top:0;
  z-index:-1;
`;
const SubTitle = styled.h2`
  margin: 0;
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 1.3rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Title = styled.h1`
  margin: 0;
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 1.8rem;
  @media screen and (min-width: 768px) {
    font-size: 5rem;
  }
`;
const Desc = styled.p`
  color: #fff;
  font-size: 1.1rem;
  
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 25px;
  justify-content: center;
`;

export default function Featured({ product }) {
  // const {addProduct} = useContext(CartContext);
  // function addFeaturedToCart() {
  //   addProduct(product._id);
  // }
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
              <ButtonLink href={"/product/"} outline={1} white={1}>
                Boutique Femme
              </ButtonLink>
              <ButtonLink href={"/product/"} outline={1} white={1}>
                Boutique Homme
              </ButtonLink>
            </ButtonsWrapper>
          </div>
        </Column>
      </Center>
      <HeroBg src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FHero-Bg-Dark.jpg?alt=media&token=5d2ec159-418f-4227-98bf-89090a07717d"/>
    </Bg>
  );
}
