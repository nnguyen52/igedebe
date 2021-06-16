import React, { useContext, useEffect } from "react";
import { GamesContext } from "../../contexts/gamesContext";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const CurrentPage = () => {
  const {
    gamesState: { currentActivePage, gamesTillEndOfYear, endPage },
  } = useContext(GamesContext);
  return (
    <div>
      {gamesTillEndOfYear
        .slice(
          currentActivePage == 1 ? 0 : currentActivePage * 10 - 10,
          currentActivePage == 1 ? 10 : currentActivePage * 10
        )
        .map((each, index) => {
          return (
            <Row style={{ textAlign: "center" }}>
              <Col lg={{ span: 15 }}>
                <Row
                  style={{
                    borderTop: index % 2 !== 0 ? `1px solid grey` : "none",
                    borderBottom: index % 2 !== 0 ? `1px solid grey` : "none",
                  }}
                >
                  <Col lg={8} xs={8}>
                    <Link
                      to={`/singleGame/${each.game.id}`}
                      style={{ textDecoration: "none", color: "#9147FF" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          padding: "5px",
                        }}
                      >
                        {each?.game?.cover?.image_id ? (
                          <img
                            key={each.id}
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${each.game.cover.image_id}.jpg `}
                            alt="cover img"
                            style={{ width: "45px", height: "64px" }}
                          />
                        ) : (
                          <img
                            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.newdesignfile.com%2Fpostpic%2F2015%2F02%2Fwomen-no-picture-available-icon_68019.png&f=1&nofb=1"
                            alt="cover img"
                            style={{ width: "45px", height: "64px" }}
                          />
                        )}
                        <h6
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            marginLeft: "10px",
                          }}
                        >
                          {each.game.name}
                        </h6>
                      </div>
                    </Link>
                  </Col>
                  <Col lg={4} xs={4} style={{ paddingTop: "20px" }}>
                    {new Date(each.date * 1000)
                      .toString()
                      .split(" ")
                      .slice(1, 4)
                      .join("/")}
                  </Col>
                </Row>
              </Col>
            </Row>
          );
        })}
    </div>
  );
};

export default CurrentPage;
