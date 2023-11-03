// pages/my-account/index.js

import React, { useEffect, useState } from "react";
import DashboardNavigation from "@/components/Layout/DashboardNavigation";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { Order } from "@/models/Order";
import { mongooseConnect } from "@/lib/mongoose";
import Link from "next/link";
import Button from "@/components/UI/Button";

function MyAccount({ clientOrders }) {
  const { data: session, status, loading } = useSession();
  const router = useRouter();
  // const { selectedTab } = router.query;

  async function logout() {
    await router.push("/");
    await signOut();
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/account/login");
    }
  }, [session, loading, router]);

  const handleGoToHomePage = () => {
    window.location.href = "/";
  };

  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  console.log(selectedTab);
  return (
    <div>
      <DashboardNavigation
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
      >
        {selectedTab === "Dashboard" || selectedTab === undefined ? (
          <>
            Bonjour <b>{session?.user?.name}</b> ( Vous n'êtes pas
            <b> {session?.user?.name}</b> ?
            <b className="btn-logout" onClick={logout}>
              {" "}
              Se déconnecter
            </b>
            <p>
              À partir du tableau de bord de votre compte, vous pouvez consulter
              vos commandes récentes, gérer vos adresses de livraison et de
              facturation et modifier votre mot de passe et les détails de votre
              compte.
            </p>
          </>
        ) : selectedTab === "Commandes" ? (
          <>
            {clientOrders ? (
              clientOrders.map((order) => (
                <div key={order.id}>{order.name}</div>
              ))
            ) : (
              <>
                <div className="no-order">Aucune commande disponible</div>
                <Button primary onClick={handleGoToHomePage}>
                  Voir les produits
                </Button>
              </>
            )}
          </>
        ) : selectedTab === "Carnet d'adresse" ? (
          <p>Contenu pour l'onglet "Adresse"</p>
        ) : selectedTab === "Details du compte" ? (
          <>
            <div className="form-item">
              <label htmlFor="name">Nom</label>
              <input value={session?.user?.name || ""} type="name"onChange={null} />
            </div>
            <div className="form-item">
              <label htmlFor="email">Adresse mail</label>
              <input value={session?.user?.email || ""} type="email" onChange={null}/>
            </div>
          </>
        ) : (
          <p></p>
        )}
      </DashboardNavigation>
    </div>
  );
}

export default MyAccount;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let clientOrders = [];
  console.log(session);

  if (session) {
    const userId = session.user.id;
    await mongooseConnect();
    clientOrders = await Order.findById(userId);
  }
  // const clientOrders = await Order.find({ userId: userId });
  // console.log(clientOrders);
  // console.log(session);

  return {
    props: {
      clientOrders: JSON.parse(JSON.stringify(clientOrders)),
    },
  };
}
