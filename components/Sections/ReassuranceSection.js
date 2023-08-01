// Import the required dependencies
import styled from "styled-components";
import { useState, useEffect } from "react";
import ShieldCheck from "../Icons/ShieldCheck";
import Arrowback from "../Icons/ArrowBack";
import Truck from "../Icons/Truck";
// import ShieldCheck from "@/components/Icons/ShieldCheck";
// import Arrowback from "@/components/Icons/ArrowBack";
// import Truck from "@/components/Icons/Truck";

// Styled component for the reassurance section container
const StyledReassuranceSection = styled.section`
  display: flex;
  justify-content: center;
  background-color: #6fdcff;
  padding: 0;
  gap: 4vw;
  @media screen and (max-width: 980px) {
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
  }
`;

// Styled component for each reassurance column
const Column = styled.div`
  // flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  gap: 15px;
  display: flex;
  @media screen and (max-width: 980px) {
    left:0;
    right:0;
    position: ${(props) => (props.active ? "relative" : "absolute")};
    opacity: ${(props) => (props.active ? 1 : 0)};
    transform: ${(props) => (props.active ? "none" : "translateX(-100%)")};
    transition: all 0.5s ease;
  }
`;

// Styled component for the reassurance text
const ReassuranceText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  font-weight: bold;
`;

// ReassuranceSection functional component
export default function ReassuranceSection() {
  const [activeColumn, setActiveColumn] = useState(0);

  // UseEffect to update the activeColumn and animate the reassurance columns
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveColumn((prevColumn) => (prevColumn + 1) % 3);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Render the reassurance section
  return (
    <StyledReassuranceSection>
      <Column active={activeColumn === 0}>
        <Truck />
        <ReassuranceText>Livraison gratuite dès 50 €</ReassuranceText>
      </Column>
      <Column active={activeColumn === 1}>
        <Arrowback />
        <ReassuranceText>Retours sans frais</ReassuranceText>
      </Column>
      <Column active={activeColumn === 2}>
        <ShieldCheck />
        <ReassuranceText>Paiement sécurisé</ReassuranceText>
      </Column>
    </StyledReassuranceSection>
  );
}
