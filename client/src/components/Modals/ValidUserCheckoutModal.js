import React, { useContext, useEffect } from "react";
import { Modal, Button, Form, Spinner, Card, Col } from "react-bootstrap";
import { CheckoutContext } from "../../contexts/checkoutContext";
import { Trash } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const ValidUserCheckoutModal = () => {
  let history = useHistory();
  const { logout } = useContext(AuthContext);
  const {
    checkoutState: {
      listGamesCheckout,
      loadVerifyUser,
      openModal,
      checkoutModalType,
    },
    closeModal,
    removeItemFromModal,
    //checkout
    checkout,
  } = useContext(CheckoutContext);
  useEffect(() => {
    closeModal();
  }, []);
  const logInSignUp = (type) => {
    closeModal();
    history.push(`/${type}`);
  };
  const logInIfMalware = () => {
    logout();
    closeModal();
    history.push("/login");
  };
  if (loadVerifyUser) return <Spinner animation="border" />;
  let body = <> </>;
  if (checkoutModalType == "OPEN_CHECKOUT_MODAL") {
    body = (
      <>
        <Modal show={openModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>You are checking out! 🥰 </Modal.Title>
          </Modal.Header>
          <Form>
            <div
              style={{
                color: "white",
                backgroundColor: "#343a40",
                padding: "10px",
              }}
            >
              <h5>Please feel free to add more products! 😚</h5>
              <h5>Your Cart: </h5>
            </div>
            {listGamesCheckout.map((each) => {
              return (
                <Card style={{ margin: "10px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <Col lg={2}>
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_micro/${each.cover.image_id}.jpg`}
                        alt="cover image"
                      />
                    </Col>
                    <Col
                      lg={8}
                      xs={9}
                      style={{
                        borderRight: "1px solid black",
                        borderLeft: "1px solid black",
                        paddingLeft: "10px",
                      }}
                    >
                      <h5>{each.name}</h5>
                    </Col>
                    <Col
                      style={{ paddingLeft: "10px" }}
                      onClick={(e) => removeItemFromModal(each.id)}
                    >
                      <Trash color="red" />
                    </Col>
                  </div>
                  <Card.Footer>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        style={{ marginRight: "10px" }}
                        variant="danger"
                        onClick={(e) => closeModal()}
                      >
                        Go Back
                      </Button>
                      <Button variant="warning" onClick={(e) => checkout()}>
                        Purchase!
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              );
            })}
          </Form>
        </Modal>
      </>
    );
  }
  if (checkoutModalType == "OPEN_CHECKOUT_MODAL_ASK_LOGIN") {
    body = (
      <>
        <Modal show={openModal} onHide={closeModal}>
          <Modal.Header
            closeButton
            style={{ backgroundColor: "#343a40", color: "white" }}
          >
            <Modal.Title>
              Please{" "}
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "red",
                }}
              >
                {" "}
                Log in
              </span>{" "}
              or{" "}
              <span
                style={{
                  textDecoration: "underline",
                  textDecorationColor: "red",
                }}
              >
                {" "}
                Sign up
              </span>{" "}
              to proceed further!
            </Modal.Title>
          </Modal.Header>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <Button
              onClick={(e) => logInSignUp("login")}
              style={{ marginRight: "5px" }}
              variant="dark"
            >
              Log in
            </Button>
            <Button
              onClick={(e) => logInSignUp("register")}
              style={{ marginRight: "10px" }}
              variant="dark"
            >
              Sign up{" "}
            </Button>
          </div>
        </Modal>
      </>
    );
  }
  if (checkoutModalType == "OPEN_CHECKOUT_MODAL_MALWARE_TOKEN") {
    body = (
      <>
        <Modal show={openModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Please log in again!</Modal.Title>
          </Modal.Header>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={(e) => logInIfMalware()}>Log in </Button>
          </div>
        </Modal>
      </>
    );
  }
  return body;
};

export default ValidUserCheckoutModal;
