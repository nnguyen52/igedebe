import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const [registerForm, setRegisterForm] = useState({
    username: null,
    password: null,
    confirmPassword: null,
  });
  const { username, password, confirmPassword } = registerForm;
  const onchangeForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const submitRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return alert("password and confirm password must match!");
    register(registerForm);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          onSubmit={submitRegister}
          style={{
            border: "2px solid black",
            width: "fit-content",
            marginTop: "20px",
            borderRadius: "15px",
            padding: "10px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Sign Up</h3>
          <Form.Label>
            <h5>User Name</h5>
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="User Name"
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
            placeholder="Password"
            value={password}
            onChange={onchangeForm}
            style={{ width: "450px" }}
          />{" "}
          <Form.Control
            type="text"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={onchangeForm}
            style={{ width: "450px" }}
          />{" "}
          <div style={{ display: "flex", marginTop: "20px" }}>
            <Button type="submit" style={{ width: "450px" }}>
              Sign Up
            </Button>
          </div>
          Already have an account?{" "}
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            Log In
          </Link>
        </Form>
      </div>
    </>
  );
};

export default RegisterForm;
