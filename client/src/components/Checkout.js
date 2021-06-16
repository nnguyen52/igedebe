import React, { useEffect, useContext } from "react";
import { CheckoutContext } from "../contexts/checkoutContext";
import { Card, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
import { clientApiURL } from "../constants";
import { useHistory, Link } from "react-router-dom";
import pleadingFace from "../assets/pleading-face-facebook.png";
import ValidUserCheckoutModal from "../components/Modals/ValidUserCheckoutModal";
const Checkout = () => {
  let history = useHistory();
  const {
    checkoutState: { loadingListGameCheckout, listGamesCheckout, doneCheckout },
    listGamesForCheckout,
    removeItemFromCartCheckout,
    checkValidUser,
    ///
    restartCheckoutStatus,
  } = useContext(CheckoutContext);
  useEffect(() => {
    listGamesForCheckout();
  }, []);

  const visitBackGame = (gameID) => {
    history.push(`/singleGame/${gameID}`);
  };
  const continueShopping = () => {
    restartCheckoutStatus();
    return history.push("/");
  };
  if (loadingListGameCheckout || !listGamesCheckout)
    return <Spinner animation="border" />;

  if (
    (!doneCheckout &&
      JSON.parse(localStorage.getItem("cartItems"))?.length == 0) ||
    !JSON.parse(localStorage.getItem("cartItems"))
  )
    return (
      <>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to={"/"}>
            <Button variant="success">Visit shop! (づ￣ ³￣)づ </Button>
          </Link>
        </div>
      </>
    );
  if (doneCheckout)
    return (
      <>
        <h2>Thank you for shopping with us!!!</h2>
        <h2>Please continue shopping :3 </h2>
        <Button onClick={continueShopping}>Shop now</Button>
      </>
    );
  if (!doneCheckout && JSON.parse(localStorage.getItem("cartItems")))
    return (
      <div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <h3>Thank you for chosing us! 😍 </h3>
          <h4>Here are games that you're interested in! </h4>

          <Row
            className={
              JSON.parse(localStorage.getItem("cartItems")).length <= 3
                ? `row-cols-1 row-cols-md-3 g-4 mx-auto mt-3`
                : `row-cols-1 row-cols-md-5 g-4 mx-auto mt-3`
            }
            style={{ marginLeft: 0, marginRight: 0 }}
          >
            {!listGamesCheckout ? (
              <Spinner animation="border" />
            ) : (
              listGamesCheckout.map((each) => (
                <Col
                  className="my-2"
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <Card>
                    <Card.Body>
                      <img
                        src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${each.cover.image_id}.jpg`}
                        alt=""
                        onClick={(e) => visitBackGame(each.id)}
                      />
                      <Card.Title onClick={(e) => visitBackGame(each.id)}>
                        {each.name}
                      </Card.Title>
                      <Button
                        variant="danger"
                        onClick={(e) => removeItemFromCartCheckout(each.id)}
                      >
                        Remove from Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          <hr />
          <Row style={{ marginLeft: 0, marginRight: 0 }}>
            <Col
              style={{
                paddingLeft: 0,
                paddingRight: 0,
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "20px",
              }}
            >
              <ValidUserCheckoutModal />
              <Button variant="dark" onClick={(e) => checkValidUser()}>
                Checkout
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    );
};

export default Checkout;
