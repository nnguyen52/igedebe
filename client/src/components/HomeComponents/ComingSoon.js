import React, { useContext, useEffect } from "react";
import { GamesContext } from "../../contexts/gamesContext";
import { Row, Col, Spinner } from "react-bootstrap";
import UpcomingDays from "../HomeComponents/UpcomingDays";
import { useParams } from "react-router-dom";
import Pagination from "../ComingSoonPagination/Paginationn";
import CurrentPage from "../ComingSoonPagination/CurrentPage";
const ComingSoon = () => {
  const { page, name } = useParams();
  const {
    gamesState: { loadCommingGamesTillEndOfYear, gamesTillEndOfYear },
    fetch_7d_comingSoon,
    fetch_gamesTillEndOfYear,
    coming_7d_Soon,
    coming_14d_Soon,
  } = useContext(GamesContext);
  useEffect(() => {
    if (!coming_14d_Soon) fetch_7d_comingSoon(14);
    if (!coming_7d_Soon) fetch_7d_comingSoon(8);
    fetch_gamesTillEndOfYear(page);
    // const a = [
    //   { id: 1, game: { re: [{ date: 2 }, { date: 3 }, { date: 4 }] } },
    //   { id: 2, game: { re: [{ date: 4 }, { date: 6 }, { date: 7 }] } },
    // ];
    // let b = a.filter((eachItem) => {
    //   let game = eachItem.game.re.some(({ date }) => date > 4);
    //   return game;
    // });
    // console.log(b);
  }, []);

  return (
    <div>
      <Row>
        <Col lg={{ offset: 2 }}>
          <h1
            style={{
              margin: "25px 0px",
              fontSize: "24px",
              fontFamily: "sans-serif",
            }}
          >
            Coming Soon to Playstation 4/Playstation 5
          </h1>
        </Col>
      </Row>
      <Row style={{ marginLeft: 0, marginRight: 0 }}>
        <Col lg={{ span: 8, offset: 2 }}>
          <Row className="row-cols-1 row-cols-md-2 mt-3">
            <Col>
              <div
                style={{
                  borderBottom: "1px grey solid",
                  margin: "0px 0px 20px",
                }}
              >
                <h4
                  style={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    fontWeight: 300,
                    color: "#333232",
                  }}
                >
                  Upcoming 7 days
                </h4>
              </div>
              <UpcomingDays type={"7d"} />
            </Col>
            <Col>
              <div
                style={{
                  borderBottom: "1px grey solid",
                  margin: "0px 0px 20px",
                }}
              >
                <h4
                  style={{
                    fontSize: "18px",
                    fontFamily: "sans-serif",
                    fontWeight: 300,
                    color: "#333232",
                  }}
                >
                  Upcoming 14 days
                </h4>
              </div>
              <UpcomingDays type={"14d"} />
            </Col>
          </Row>
          <Row>
            {loadCommingGamesTillEndOfYear ? (
              <Spinner animation="border" />
            ) : (
              <>
                <Row style={{ marginTop: "20px" }}>
                  <Col lg={{ span: 15 }}>
                    <div
                      style={{
                        borderBottom: "1px grey solid",
                        marginBottom: "20px",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "18px",
                          fontFamily: "sans-serif",
                          fontWeight: 300,
                          color: "#333232",
                        }}
                      >
                        All upcoming games
                      </h4>
                    </div>
                    <CurrentPage />
                  </Col>
                </Row>
              </>
            )}
          </Row>
        </Col>
        <Col
          lg={{ offset: 2 }}
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <Pagination />
        </Col>
      </Row>
    </div>
  );
};

export default ComingSoon;
