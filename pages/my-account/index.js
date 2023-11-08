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
import Title from "@/components/UI/Title";

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

  const UpdateAddress = () => {};
  // console.log(session);
  return (
    <div>
      <DashboardNavigation
        selectedTab={selectedTab}
        handleTabChange={handleTabChange}
      >
        {selectedTab === "Dashboard" || selectedTab === undefined ? (
          <>
            <h2>Tableau de bord</h2>
            Bonjour <b>{session?.user?.name}</b> ( Vous n'êtes pas
            <b> {session?.user?.name}</b> ?
            <b className="btn-logout" onClick={logout}>
              {" "}
              Se déconnecter
            </b>{" "}
            )
            <p>
              À partir du tableau de bord de votre compte, vous pouvez consulter
              vos commandes récentes, gérer vos adresses de livraison et de
              facturation et modifier votre mot de passe et les détails de votre
              compte.
            </p>
          </>
        ) : selectedTab === "Commandes" ? (
          <>
            <h2>Commandes</h2>

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
          <>
            <h2>Carnet d'adresse</h2>

            <div className="form-item">
              <label htmlFor="postalCode">Code Postal</label>
              <span>{session?.user?.address.postalCode}</span>
              {/* <input
                value={session?.user?.address.postalCode || ""}
                type="postalCode"
                onChange={null}
              /> */}
            </div>
            <div className="form-item">
              <label htmlFor="city">Ville</label>
              <span>{session?.user?.address.city}</span>
              {/* <input
                value={session?.user?.address.city || ""}
                type="city"
                onChange={null}
              /> */}
            </div>
            <div className="form-item">
              <label htmlFor="streetAddress">Adresse</label>
              <span>{session?.user?.address.streetAddress}</span>

              {/* <input
                value={session?.user?.address.streetAddress || ""}
                type="streetAddress"
                onChange={null}
              /> */}
            </div>
            <div className="form-item">
              <label htmlFor="country">Pays</label>
              <span>{session?.user?.address.country}</span>

              {/* <input
                value={session?.user?.address.country || ""}
                type="country"
                onChange={null}
              /> */}
            </div>
            {/* <Button primary onClick={UpdateAddress}>
              Sauvegarder l'adresse
            </Button> */}
          </>
        ) : selectedTab === "Details du compte" ? (
          <>
            <h2>Details du compte</h2>
            <div className="form-item">
              <b>Nom</b>

              <span>{session?.user?.name}</span>
            </div>

            <div className="form-item">
              <b>Adresse mail</b>

              <span>{session?.user?.email}</span>
            </div>

            {/* <div className="form-item">
              <label htmlFor="name">Nom</label>
              <input
                value={session?.user?.name || ""}
                type="name"
                onChange={null}
              />
            </div>
            <div className="form-item">
              <label htmlFor="email">Adresse mail</label>
              <input
                value={session?.user?.email || ""}
                type="email"
                onChange={null}
              />
            </div> */}
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

  // console.log(session);

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
