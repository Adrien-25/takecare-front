// Import the required dependencies
import Center from "@/components/Center";
import styled from "styled-components";
import ButtonLink from "@/components/ButtonLink";

// Define a set of reusable CSS styles for the featured
const Bg = styled.div`
  background-color: rgba(18, 18, 18, 0.1);
  color: #fff;
  padding: 50px 0;
  height: 70vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image: url(https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FHero-Bg-Dark.jpg?alt=media&token=5d2ec159-418f-4227-98bf-89090a07717d);
  background-size: cover;
  background-position-x: center;
`;

// Styled component for the background image
const HeroBg = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  z-index: -1;
`;

// Styled component for the sub-title
const SubTitle = styled.h2`
  margin: 0;
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 3rem;
  @media screen and (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

// Styled component for the title
const Title = styled.h1`
  margin: 0;
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 5rem;
  @media screen and (max-width: 980px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

// Styled component for the description
const Desc = styled.p`
  color: #fff;
  font-size: 1.1rem;
`;

// Styled component for the column
const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// Styled component for the buttons wrapper
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 25px;
  justify-content: center;
  @media screen and (max-width: 600px) {
    a{
      justify-content:center;
    }
    flex-direction:column;
  }
`;

// Featured functional component
export default function Featured({ product }) {
  // const {addProduct} = useContext(CartContext);
  // function addFeaturedToCart() {
  //   addProduct(product._id);
  // }
  return (
    // Background section
    <Bg>
      {/* Center component to horizontally center the content */}
      <Center>
        <Column>
          <div>
            <SubTitle>Soldes d'Été</SubTitle>
            <Title>Jusqu'à 50% de réduction*</Title>
            <Desc>Temps chaud. Offres plus chaudes.</Desc>
            {/* Buttons for different categories */}
            <ButtonsWrapper>
              <ButtonLink href={"/product/"} outline={0} white={1}>
                Femme
              </ButtonLink>
              <ButtonLink href={"/product/"} outline={0} white={1}>
                Homme
              </ButtonLink>
              <ButtonLink href={"/product/"} outline={0} white={1}>
                Enfant
              </ButtonLink>
            </ButtonsWrapper>
          </div>
        </Column>
      </Center>
      {/* Background image */}
      {/* <HeroBg src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FHero-Bg-Dark.jpg?alt=media&token=5d2ec159-418f-4227-98bf-89090a07717d" /> */}
    </Bg>
  );
}
