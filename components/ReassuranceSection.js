import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import ShieldCheck from "@/components/icons/ShieldCheck";
// import Gift from "@/components/icons/Gift";
import Arrowback from "@/components/icons/ArrowBack";
import Truck from "@/components/icons/Truck";

const StyledReassuranceSection = styled.section`
  display: flex;
  justify-content: center;
  background-color: #6fdcff;
  padding: 0;
`;

const Column = styled.div`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  gap: 15px;
  display: flex;
  // display: ${(props) => (props.active ? "flex" : "none")};
  // opacity: ${(props) => (props.active ? 1 : 0)};
  // visibility: ${(props) => (props.active ? "active" :"hidden")};
  // transform: translateY(${(props) => (props.active ? "0" : "100%")});
  // transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

const ReassuranceText = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

export default function ReassuranceSection() {
  const [activeColumn, setActiveColumn] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveColumn((prevColumn) => (prevColumn + 1) % 3);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <StyledReassuranceSection>
      <Column active={activeColumn === 0}>
        <Truck />
        <ReassuranceText>
          Livraison gratuite à partir de 50 €
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
