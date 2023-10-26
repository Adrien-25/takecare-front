import Center from "@/components/UI/Center";
import Title from "@/components/UI/Title";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
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

const signinContainer = styled.div`

`;

const SignIn = (props) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);
  };

  return (
    <>
      <Entete>
        <Center>
          <Title>Mon Compte</Title>
        </Center>
      </Entete>
      <Center>
        <signinContainer>
          <form onSubmit={handleSubmit} className="form-signin">
            <input
              value={userInfo.email}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, email: target.value })
              }
              type="email"
              placeholder="john@email.com"
            />
            <input
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              }
              type="password"
              placeholder="********"
            />
            <input type="submit" value="Login" />
          </form>
        </signinContainer>
      </Center>
    </>
  );
};

export default SignIn;
