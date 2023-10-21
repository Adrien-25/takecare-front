// components/Loading.js
import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  font-size: 24px;
  display:none;
  .loading-img{
    max-width:100px;
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      {/* <div className="loading">Loading...</div> */}
      <img
        src="https://firebasestorage.googleapis.com/v0/b/take-care-f1ac3.appspot.com/o/images%2FTC-removebg-preview%20(1).png?alt=media&token=124597d4-e352-46cc-aab2-89e1f2172930&_gl=1*1ovvxe9*_ga*MTE3NTcyMDU2My4xNjg5NzYxODY2*_ga_CW55HF8NVT*MTY5N7A4MzE5MjEuMzEuMC4w"
        alt="Loading Image"
        className="loading-img"
      />
    </LoadingContainer>
  );
};

export default Loading;
