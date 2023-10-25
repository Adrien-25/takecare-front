// components/DashboardNavigation.js

import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/UI/Center";
import Title from "@/components/UI/Title";

const DashboardLayout = styled.div`
  margin: 100px 0;
  padding: 40px;
  border: 2px solid #e2e2e2;
  display: grid;
  grid-template-columns: 33% 67%;
  > nav {
    border-right: 2px solid #e2e2e2;
    > ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      > li {
        > a {
          color: black;
          text-decoration: none;
          padding: 5px 0;
          display: inline-block;
          position: relative;
          &:after {
            content: "";
            height: 2px;
            width: 0;
            background-color: black;
            position: absolute;
            bottom: 0;
            left: 0;
            -webkit-transition: width 0.25s;
            transition: width 0.25s;
          }
          &:hover:after{
            width: 100%;
          }
        }
      }
    }
  }
`;

const Entete = styled.div`
  padding: 10px 0;
  background-color: black;
  > div {
    justify-content: center;
    h1 {
      text-align: center;
      color: white;
      @media screen and (min-width: 980px) {
        font-size: 2em;
      }
      @media screen and (max-width: 500px) {
        font-size: 1.2em;
      }
    }
  }
`;

function DashboardNavigation({ children }) {
  return (
    <>
      <Entete>
        <Center>
          <Title>Mon Compte</Title>
        </Center>
      </Entete>
      <Center>
        <DashboardLayout>
          <nav>
            <ul>
              <li>
                <Link href="/my-account">Dashboard</Link>
              </li>
              <li>
                <Link href="/my-account/orders">Commandes</Link>
              </li>
              <li>
                <Link href="/my-account/downloads">Téléchargements</Link>
              </li>
              <li>
                <Link href="/my-account/addresses">Addresses</Link>
              </li>
              <li>
                <Link href="/my-account/account-details">Détails du compte</Link>
              </li>
              <li>
                <Link href="/my-account/logout">Déconnexion</Link>
              </li>
            </ul>
          </nav>
          <Center>{children}</Center>
        </DashboardLayout>
      </Center>
    </>
  );
}

export default DashboardNavigation;
