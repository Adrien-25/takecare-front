import Center from "@/components/UI/Center";
import Title from "@/components/UI/Title";
import GithubIcon from "@/components/icons/Github";
import GoogleIcon from "@/components/icons/Google";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

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

const SigninContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  h2 {
    font-size: 16px;
  }
  .container-login {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 350px;
  }

  .button-signin {
    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      color: rgb(92, 108, 117);
      font-size: 16px;
      justify-content: center;
      border-radius: 6px;
      border: 1px solid rgb(136, 147, 151);
      font-weight: 600;
      box-shadow: lightgray 0px 0px 0px 1px;
      transition: all 300ms ease-in-out 0s;
      cursor: pointer;

      &:hover {
        box-shadow: lightgray 0px 0px 0px 3px;
      }
    }
  }
  .separator {
    margin: 10px 0;
    font-size: 12px;
    color: rgb(92, 108, 117);
    display: flex;
    &:before,
    &:after {
      content: "";
      flex: 1 1 10%;
      border-bottom: 1px solid rgb(193, 199, 198);
      margin: 0px 10px;
      transform: translateY(-50%);
    }
    &:before {
      margin-left: 0px;
    }
  }
  .form-signin {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    gap: 5px;
    background-color: transparent;

    label {
      font-size: 13px;
    }

    input {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 10px;
    }

    input[type="submit"] {
      background-color: rgb(0, 104, 74);
      color: #fff;
      cursor: pointer;
      transition: all 300ms ease-in-out 0s;

      &:hover {
        /* background-color: #0056b3; */
        box-shadow: rgb(192, 250, 230) 0px 0px 0px 3px;
      }
    }
  }
  .register-container > a {
    font-size: 14px;
    color: black;
  }
`;

const SignIn = (props) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    // validate your userinfo
    e.preventDefault();
    console.log(userInfo);

    const res = await signIn("Credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: true,
      callbackUrl: "/my-account"
    });

    // console.log(res);
  };

  return (
    <>
      <Entete>
        <Center>
          <Title>Se connecter</Title>
        </Center>
      </Entete>
      <Center>
        <SigninContainer>
          <div className="container-login">
            <div className="button-signin">
              <button
                onClick={() => signIn("google", { callbackUrl: "/my-account" })}
              >
                <GoogleIcon />
                Google
              </button>
            </div>
            <div className="button-signin">
              <button
                onClick={() => signIn("github", { callbackUrl: "/my-account" })}
              >
                <GithubIcon />
                Github
              </button>
            </div>
            <div className="separator">Ou avec email et mot de passe</div>
            <form onSubmit={handleSubmit} className="form-signin">
              <label htmlFor="email">Adresse e-mail</label>
              <input
                value={userInfo.email}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
                type="email"
                placeholder="john@email.com"
              />

              <label htmlFor="password">Mot de passe </label>
              <input
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
                type="password"
                placeholder="********"
              />
              <input type="submit" value="Connexion" />
            </form>
          </div>
          <div className="register-container">
            <Link href="/account/register">
              Pas encore de compte ? Inscrivez-vous
            </Link>
          </div>
        </SigninContainer>
      </Center>
    </>
  );
};

export default SignIn;
