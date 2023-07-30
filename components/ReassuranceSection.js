// Import the required dependencies
import styled from "styled-components";
import { useState, useEffect } from "react";
import ShieldCheck from "@/components/icons/ShieldCheck";
import Arrowback from "@/components/icons/ArrowBack";
import Truck from "@/components/icons/Truck";

// Styled component for the reassurance section container
const StyledReassuranceSection = styled.section`
  display: flex;
  justify-content: center;
  background-color: #6fdcff;
  padding: 0;
  gap:4vw;
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
`;

// Styled component for the reassurance text
const ReassuranceText = styled.p`
  font-size: 16px;
  line-height: 1.5;
  font-weight:bold;
`;

// ReassuranceSection functional component
export default function ReassuranceSection() {
  const [activeColumn, setActiveColumn] = useState(0);

  // UseEffect to update the activeColumn and animate the reassurance columns
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveColumn((prevColumn) => (prevColumn + 1) % 3);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Render the reassurance section
  return (
    <StyledReassuranceSection>
      <Column active={activeColumn === 0}>
        <Truck />
        <ReassuranceText>
          Livraison gratuite dès 50 €
        </ReassuranceText>
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
