import React, { useContext, useEffect } from "react";
import { GamesContext } from "../../contexts/gamesContext";
import { useHistory } from "react-router-dom";
import { Spinner, Card, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../contexts/authContext";
const RecentGames = () => {
  let history = useHistory();
  const {
    authState: { user },
    checkUserValid,
    getGameIDsFromUser,
    getGamesDetails,
  } = useContext(AuthContext);
  const {
    gamesState: { loadRecentGame1Month, recentGame1Month },
    fetchRecentGames1Month,
    openGamesBasedOnID,
  } = useContext(GamesContext);

  useEffect(() => {
    fetchRecentGames1Month();
  }, []);
  const openGame = (game) => {
    openGamesBasedOnID(game);
    return history.push({
      pathname: `/singleGame/${game.id}`,
      state: game.name,
    });
  };
  if (loadRecentGame1Month) return <Spinner animation="border" />;
  return (
    <Row className="row-cols-1 row-cols-md-1  g-4 mx-auto mt-1">
      <Col lg={{ span: 6, offset: 2 }}>
        <h2>Recently Released on PlayStation 4/PlayStation 5</h2>
        {loadRecentGame1Month ? (
          <Spinner animation="border" />
        ) : (
          <Card>
            <Card.Body style={{ textAlign: "center" }}>
              {recentGame1Month.map((each, index) => {
                return (
                  <div
                    style={{
                      border: index % 2 == 0 ? "1px solid black" : null,
                    }}
                  >
                    <Row>
                      <Col lg={8} xs={6}>
                        <div style={{ display: "flex", padding: "5px" }}>
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
                              padding: "5px",
                            }}
                            onClick={(e) => openGame(each.game)}
                          >
                            {each.game.name}
                          </h6>
                        </div>
                      </Col>
                      <Col lg={4} xs={6}>
                        <div
                          style={{
                            margin: "5px",
                            marginTop: "25px",
                          }}
                        >
                          {each?.game?.release_dates
                            ? each.game.release_dates[0].human
                            : "no date"}
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default RecentGames;
