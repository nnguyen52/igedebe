import React, { useContext } from "react";
import { GamesContext } from "../../contexts/gamesContext";
import { Row, Col } from "react-bootstrap";
import WebsiteCateDetails from "./WebsiteCateDetails";
const WebsitesCate = () => {
  const {
    gamesState: { currentChosenGame },
  } = useContext(GamesContext);
  if (currentChosenGame.websites)
    return (
      <div>
        <Row className="row-cols-1 row-cols-md-3 mt-3">
          {currentChosenGame.websites
            .filter(
              (each) =>
                each.category == 13 ||
                each.category == 15 ||
                each.category == 16 ||
                each.category == 17
            )
            .map((e) => {
              return (
                <Col>
                  <div style={{ display: "flex" }}>
                    <WebsiteCateDetails cateGory={e.category} url={e.url} />
                  </div>
                </Col>
              );
            })}
        </Row>
        <hr />
        <Row className="row-cols-2 row-cols-md-3 mt-3">
          {currentChosenGame.websites
            .filter((e) => e.category == 1)
            .map((each) => {
              return (
                <Col>
                  <div style={{ display: "flex" }}>
                    <WebsiteCateDetails
                      cateGory={each.category}
                      url={each.url}
                    />
                  </div>
                </Col>
              );
            })}
          {currentChosenGame.websites
            .filter(
              (each) =>
                each.category !== 1 &&
                each.category !== 13 &&
                each.category !== 15 &&
                each.category !== 16 &&
                each.category !== 17
            )
            .map((e) => {
              return (
                <Col>
                  <div style={{ display: "flex" }}>
                    <WebsiteCateDetails cateGory={e.category} url={e.url} />
                  </div>
                </Col>
              );
            })}
        </Row>
      </div>
    );

  return <>Can not find websites related to this game : ()</>;
};

export default WebsitesCate;
