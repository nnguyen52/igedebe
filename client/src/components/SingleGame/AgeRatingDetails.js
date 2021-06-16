import React, { useEffect, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import { GamesContext } from "../../contexts/gamesContext";
import { Row, Col } from "react-bootstrap";
import pegi18 from "../../assets/pegi18.png";
import ersb from "../../assets/ersb.png";
const AgeRatingDetails = () => {
  //   const params = new URLSearchParams(window.location.search);
  //   let id2 = params.get("id");
  const { id } = useParams();
  const {
    gamesState: { currentChosenGame },
  } = useContext(GamesContext);
  useEffect(() => {}, [id]);
  if (!id) return <Redirect to={"/"} />;
  if (id && currentChosenGame == null) {
    return (
      <>
        <h5>please visit any games to see Age Rating!</h5>
      </>
    );
  }

  return (
    <>
      <h1
        style={{ fontSize: "24px" }}
      >{`Age Rating for ${currentChosenGame.name}`}</h1>
      {/* {currentChosenGame} */}
      {currentChosenGame.age_ratings ? (
        <>
          {currentChosenGame.age_ratings.map((each) => {
            return (
              <Row
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  marginLeft: 0,
                  marginRight: 0,
                }}
              >
                <Col lg={1} style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <img
                    src={
                      each.category == 1
                        ? pegi18
                        : each.category == 2
                        ? ersb
                        : null
                    }
                    alt="age rating cover"
                    style={{ width: "90px", height: "130px" }}
                  />
                </Col>
                <Col
                  lg={11}
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                >
                  {each.synopsis ? each.synopsis : "data unavailable"}
                </Col>
                <hr />
              </Row>
            );
          })}
        </>
      ) : (
        "data unavailable"
      )}
    </>
  );
};

export default AgeRatingDetails;
