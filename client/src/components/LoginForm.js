import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { AuthContext } from "../contexts/authContext";
import { Link } from "react-router-dom";
const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({
    username: null,
    password: null,
  });
  const { username, password } = loginForm;
  const onchangeForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const submitLogin = (e) => {
    e.preventDefault();
    login(loginForm);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          onSubmit={submitLogin}
          style={{
            border: "2px solid black",
            width: "fit-content",
            marginTop: "20px",
            borderRadius: "15px",
            padding: "10px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Login</h3>
          <Form.Label>
            <h5>User Name</h5>
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={onchangeForm}
            style={{ width: "450px" }}
          />{" "}
          <br />
          <Form.Label>
            <h5>Password</h5>
          </Form.Label>
          <Form.Control
            type="text"
            name="password"
            placeholder="password"
            value={password}
            onChange={onchangeForm}
            style={{ width: "450px" }}
          />{" "}
          <div style={{ display: "flex", marginTop: "20px" }}>
            <Button type="submit" style={{ width: "450px" }}>
              Login
            </Button>
          </div>
          Don't have an account?{" "}
          <Link to={"/register"} style={{ textDecoration: "none" }}>
            Sign up
          </Link>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
