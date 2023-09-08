// Import the required dependencies
import styled from "styled-components";
import { useState } from "react";
// Styles pour l'affichage en mobile
const MobileGallery = styled.div`
  @media screen and (max-width: 980px) {
    flex-direction: column;

  }
  // display: flex;
  // align-items: center;
  display: flex;
  flex-direction: row-reverse;
  gap: 30px;
`;

// Styles pour l'affichage en desktop
const DesktopGallery = styled.div`
  @media screen and (max-width: 980px) {
    display: none;
  }
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  overflow: hidden;
  display: none;
`;

const ImageContainer = styled.div``;

// Define a set of reusable CSS styles for the product image
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

// Styled component for the container of the big image
const BigImageWrapper = styled.div`
  text-align: center;
  padding:3px;
`;

// Styled component for the large image displayed at the top
const BigImage = styled.img`
  max-width: 100%;
  aspect-ratio: 500/500;
  object-fit: cover;
  border-radius: 20px;
`;

// Styled component for the container of image buttons/thumbnails
const ImageButtons = styled.div`
  display: flex;
  flex-direction:column;
  gap: 20px;
  flex-grow: 0;
  margin-top: 10px;
  @media screen and (max-width: 980px) {
    flex-direction:row;
  }
 
`;

// Styled component for the individual image button/thumbnail
const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) =>
    props.active
      ? `
      border-color: #ccc;
      opacity:1;

    `
      : `
      border-color: transparent;
      // opacity:0.8;
    `}
  height: 100px;
  width:100px;
  padding: 2px;
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  @media screen and (max-width: 980px) {
    width:50px;
    height: 50px;

  }
    > img{
    width:100%;
    max-width:unset;
    object-fit: cover;

  }
`;



// CategoriesSection functional component
export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <MobileGallery>
        <BigImageWrapper>
          <BigImage src={activeImage} />
        </BigImageWrapper>
        <ImageButtons>
          {images.map((image) => (
            <ImageButton
              key={image}
              active={image === activeImage}
              onClick={() => setActiveImage(image)}
            >
              <Image src={image} alt="" />
            </ImageButton>
          ))}
        </ImageButtons>
      </MobileGallery>

      {/* Affichage en desktop */}
      <DesktopGallery>
        {images.map((image, index) => (
          <ImageContainer>
            {/* <img key={index} src={image} alt={`Image ${index + 1}`} /> */}
            <Image src={image} key={index} alt={`Image ${index + 1}`} />
          </ImageContainer>
        ))}
      </DesktopGallery>
    </>
  );
}
