import React, { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
const Auth = ({ authRoute }) => {
  const {
    authState: { loading, user },
  } = useContext(AuthContext);
  if (loading) return <Spinner animation="border" />;
  if (loading === false && user != null) {
    return <Redirect to={"/"} />;
  }
  return (
    <>
      {user && user.username}
      {authRoute === "login" && <LoginForm />}
      {authRoute === "register" && <RegisterForm />}
    </>
  );
};

export default Auth;
