import React, { useContext } from "react";
import { GamesContext } from "../contexts/gamesContext";
import { CheckoutContext } from "../contexts/checkoutContext";
import { useHistory } from "react-router-dom";
import {
  Spinner,
  Button,
  From,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";
const SearchGameResults = () => {
  let history = useHistory();
  const {
    gamesState: { searchedGames, loadSearchGames },
  } = useContext(GamesContext);
  const { addItemBasedOnID, removeItemFromCart } = useContext(CheckoutContext);
  const visitBackGame = (gameID) => {
    history.push(`/singleGame/${gameID}`);
  };
  if (loadSearchGames) return <Spinner animation="border" />;
  if (!loadSearchGames && searchedGames.length == 0)
    return <h2>Data unavalable, please try something else! </h2>;
  return (
    <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Row
        className="row-cols-2 row-cols-md-3  mt-3 mt-md-2"
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        {searchedGames.map((each) => {
          return (
            <Col>
              <Card
                style={{
                  margin: "5px",
                  border: "3px solid #343a40",
                  backgroundColor: "#343a40",
                }}
              >
                <Card.Body onClick={(e) => visitBackGame(each.id)}>
                  {each?.cover?.image_id ? (
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${each.cover.image_id}.jpg`}
                      alt="image cover"
                      style={{
                        width: `${
                          window.innerWidth <= 600 ? "180px" : "300px"
                        }`,
                      }}
                    />
                  ) : (
                    <img
                      alt={`${each.name}`}
                      style={{ width: "90px", height: "128px" }}
                    />
                  )}
                  <h5 style={{ color: "white" }}>{each.name}</h5>
                  <hr />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {!JSON.parse(localStorage.getItem("cartItems")).includes(
                      each.id + ""
                    ) ? (
                      <Button
                        variant="success"
                        onClick={(e) => addItemBasedOnID(each.id)}
                      >
                        Add Item
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={(e) => removeItemFromCart(each.id)}
                      >
                        Remove Item
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      ;
    </Container>
  );
};

export default SearchGameResults;
