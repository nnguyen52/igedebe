import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navbar, Form, Button, Nav, Badge } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Cart, PersonCircle } from "react-bootstrap-icons";
import { CheckoutContext } from "../contexts/checkoutContext";
import { GamesContext } from "../contexts/gamesContext";

const NavBar = () => {
  let history = useHistory();
  const { searchGame } = useContext(GamesContext);

  const {
    authState: { isAuthed, user },
    logout,
  } = useContext(AuthContext);
  const {
    checkoutState: {},
  } = useContext(CheckoutContext);
  const [searchQuery, setsearchQuery] = useState(null);
  const onSearch = (e) => {
    setsearchQuery(e.target.value);
  };
  const onSubmitSearch = async (e) => {
    e.preventDefault();
    await searchGame(searchQuery);
    history.push("/query");
  };
  return (
    <Navbar
      expand="lg"
      style={{ position: "sticky" }}
      fixed="top"
      bg="dark"
      variant="dark"
    >
      <div style={{ display: "flex" }}>
        <Navbar.Brand>
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              marginLeft: "10px",
              width: "fit-content",
              color: "white",
              border: "2px solid red",
              borderRadius: "15px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            Shop-PS4
          </Link>
        </Navbar.Brand>
        <Link to={"/checkout"} style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              color: "white",
              border: "2px solid yellow",
              paddingLeft: "10px",
              paddingRight: "10px",
              borderRadius: "15px",
            }}
          >
            <Cart color="yellow" size={30} />{" "}
            <span style={{ marginLeft: "5px", fontSize: "20px" }}>
              {JSON.parse(localStorage.getItem("cartItems")) !== null
                ? JSON.parse(localStorage.getItem("cartItems")).length
                : 0}
            </span>
          </div>
        </Link>
        <Link to={"/user"}>
          <PersonCircle
            color="white"
            size={30}
            style={{ marginLeft: "20px", marginTop: "2px" }}
          />
        </Link>
      </div>
      <Navbar.Toggle />

      <Navbar.Collapse>
        <Nav>
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              marginLeft: "20px",
              color: "yellow",
            }}
          >
            <div
              style={{
                color: "white",
                border: "2px solid red",
                borderRadius: "15px",
                paddingLeft: "10px",
                paddingRight: "10px",
                width: "fit-content",
                marginTop: `${window.innerWidth <= 600 ? "10px" : 0}`,
              }}
            >
              Home
            </div>
          </Link>
          <Link
            to={"/checkout"}
            style={{
              textDecoration: "none",
              marginLeft: "20px",
              marginRight: "30px",
            }}
          >
            <div
              style={{
                color: "white",
                border: "2px solid yellow",
                paddingLeft: "10px",
                paddingRight: "10px",
                borderRadius: "15px",
                width: "fit-content",
                marginTop: `${window.innerWidth <= 600 ? "10px" : 0}`,
              }}
            >
              CheckOut
            </div>
          </Link>
        </Nav>
        <Nav>
          <Button
            variant={user == null ? "success" : "danger"}
            style={{ marginTop: "10px" }}
            onClick={user == null ? null : logout}
          >
            {user == null ? (
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Log In/Sign Up
              </Link>
            ) : (
              "Log Out"
            )}
          </Button>
          <Form
            style={{ display: "flex", margin: "10px 0 0 10px" }}
            onSubmit={onSubmitSearch}
          >
            <Form.Control
              type="text"
              placeholder="Search Games"
              className="mr-sm-2"
              style={{ marginRight: "5px" }}
              onChange={onSearch}
            />
            <Button variant="dark" type="submit">
              Search
            </Button>
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
