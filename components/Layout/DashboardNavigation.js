// components/DashboardNavigation.js

import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/UI/Center";
import Title from "@/components/UI/Title";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const DashboardLayout = styled.div`
  margin: 100px 0;
  padding: 40px;
  border: 2px solid #e2e2e2;
  display: grid;
  grid-template-columns: 25% 75%;
  font-size: 14px;
  /* align-items: center; */

  @media screen and (max-width: 980px) {
    flex-direction: column;
    grid-template-columns: 100%;
    padding: 20px;
    margin: 50px 0;
  }
  > nav {
    border-right: 2px solid #e2e2e2;
    @media screen and (max-width: 980px) {
      border-bottom: 2px solid #e2e2e2;
      border-right: none;
      margin-bottom: 30px;
      padding-bottom: 30px;
    }
    > ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      > li {
        padding: 5px 0;

        > a,
        > button {
          color: black;
          text-decoration: none;
          display: inline-block;
          position: relative;
          border: none;
          /* padding: 0; */
          font-size: 16px !important;
          cursor: pointer;
          padding: 0;
          font-family: "Poppins";
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
          &:hover:after {
            width: 100%;
          }
        }
      }
      li.active a:after{
        width: 100%;
      }
    }
  }
  .content-nav {
    padding-left: 30px;
    @media screen and (max-width: 980px) {
      padding-left: 0;
    }
  }
  .btn-logout {
    cursor: pointer;
  }

  .no-order {
    margin-bottom: 20px;
  }
  // Detail du compte
  .form-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    max-width: 400px;
    gap: 5px;

    label {
      text-transform: uppercase;
    }
    input {
      padding: 10px 15px;
      color: grey;
      line-height: 1.5rem;
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

function DashboardNavigation({ children,selectedTab, handleTabChange, }) {
  // const [selectedTab, setSelectedTab] = useState("Dashboard");

  // const handleTabChange = (tab) => {
  //   setSelectedTab(tab);
  // };

  const router = useRouter();
  const { pathname } = router;

  async function logout() {
    await router.push("/");
    await signOut();
  }
console.log(selectedTab);
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
              <li
                className={selectedTab === "Dashboard" ? "active" : ""}
                onClick={() => handleTabChange("Dashboard")}
              >
                <a>Dashboard</a>
              </li>
              <li
                className={selectedTab === "Commandes" ? "active" : ""}
                onClick={() => handleTabChange("Commandes")}
              >
                <a>Commandes</a>
              </li>
              <li
                className={selectedTab === "Carnet d'adresse" ? "active" : ""}
                onClick={() => handleTabChange("Carnet d'adresse")}
              >
                <a>Carnet d'adresse</a>
              </li>
              <li
                className={selectedTab === "Details du compte" ? "active" : ""}
                onClick={() => handleTabChange("Details du compte")}
              >
                <a>Détails du compte</a>
              </li>
              <li>
                <button onClick={logout}>Déconnexion</button>
              </li>
            </ul>
          </nav>
          <div className="content-nav">{children}</div>
        </DashboardLayout>
      </Center>
    </>
  );
}

export default DashboardNavigation;
