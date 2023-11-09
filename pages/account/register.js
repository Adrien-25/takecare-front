import Center from "@/components/UI/Center";
import Title from "@/components/UI/Title";
import GithubIcon from "@/components/icons/Github";
import GoogleIcon from "@/components/icons/Google";
import axios, { AxiosError } from "axios";
// import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
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
    .error {
      font-size: 12px;
      color: red;
    }
  }
  .register-container > a {
    font-size: 14px;
    color: black;
  }
  .error-container {
    font-size: 12px;
    color: red;
  }
`;

const SignIn = (props) => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const [data, setData] = useState({
  //   fullName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const [validationErrors, setValidationErrors] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateData = () => {
    const err = [];

    if (userInfo.fullName && userInfo.fullName.length < 4) {
      err.push({
        fullName: "Le nom complet doit comporter au moins 4 caractères",
      });
    } else if (userInfo.fullName && userInfo.fullName.length > 30) {
      err.push({
        fullName: "Le nom complet doit comporter moins de 30 caractères",
      });
    } else if (userInfo.password && userInfo.password.length < 6) {
      err.push({
        password: "Le mot de passe doit comporter au moins 6 caractères",
      });
    } else if (userInfo.password !== userInfo.confirmPassword) {
      err.push({ confirmPassword: "Les mots de passe ne correspondent pas" });
    }

    setValidationErrors(err);
    console.log(err);

    if (err.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const loginUser = async ({ email, password }) => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    return res;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateData();
    console.log(isValid);

    if (isValid) {
      // sign up
      console.log('Valide')
      try {
        console.log('Test connexion');

        setLoading(true);
        const apiRes = await axios.post(
          "http://localhost:3000/api/auth/register",
          userInfo
        );
        console.log('apiRes');
        console.log(apiRes);

        if (apiRes && apiRes.userInfo && apiRes.userInfo.success) {
          const loginRes = await loginUser({
            email: userInfo.email,
            password: userInfo.password,
          });

          if (loginRes && !loginRes.ok) {
            setSubmitError(loginRes.error || "");
          } else {
            router.push("/");
          }
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.userInfo?.error;
          setSubmitError(errorMsg);
        }
      }

      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   // validate your userinfo
  //   e.preventDefault();

  //   const res = await signIn("credentials", {
  //     //   name: userInfo.name,
  //     email: userInfo.email,
  //     password: userInfo.password,
  //     redirect: false,
  //   });

  //   console.log(res);
  // };
  return (
    <>
      <Entete>
        <Center>
          <Title>Créer un compte</Title>
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
              <label htmlFor="text">Nom entier</label>
              {validationErrors.map(
                (err, index) =>
                  err.hasOwnProperty("fullName") && (
                    <div className="error" key={index}>
                      {err.fullName}
                    </div>
                  )
              )}
              <input
                value={userInfo.fullName}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, fullName: target.value })
                }
                type="text"
                placeholder="john murphy"
                required
              />

              <label htmlFor="email">Adresse e-mail</label>
              <input
                value={userInfo.email}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
                type="email"
                placeholder="john@email.com"
                required
                error="test"
              />

              <label htmlFor="password">Mot de passe </label>
              {validationErrors.map(
                (err, index) =>
                  err.hasOwnProperty("password") && (
                    <div className="error" key={index}>
                      {err.password}
                    </div>
                  )
              )}
              <input
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
                type="password"
                placeholder="********"
                required
              />

              <label htmlFor="password">Confirmation de mot de passe </label>
              {validationErrors.map(
                (err, index) =>
                  err.hasOwnProperty("confirmPassword") && (
                    <div className="error" key={index}>
                      {err.confirmPassword}
                    </div>
                  )
              )}
              <input
                value={userInfo.confirmPassword}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, confirmPassword: target.value })
                }
                type="password"
                placeholder="********"
                required
              />

              <input type="submit" value="Créer un compte" />
            </form>
          </div>

          {submitError && <div className="error-container">{submitError}</div>}
          <div className="register-container">
            <Link href="/account/login">Déjà inscrit ? Se connecter</Link>
          </div>
        </SigninContainer>
      </Center>
    </>
  );
};

export default SignIn;
