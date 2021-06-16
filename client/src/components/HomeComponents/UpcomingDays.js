import React, { useContext, useEffect } from "react";
import { GamesContext } from "../../contexts/gamesContext";
import { Row, Col, Spinner } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
const UpcomingDays = ({ type }) => {
  let loading;
  let data;
  const {
    gamesState: {
      load_7d_ComingSoon,
      coming_7d_Soon,
      load_14d_ComingSoon,
      coming_14d_Soon,
    },
  } = useContext(GamesContext);
  if (type === "7d") {
    loading = load_7d_ComingSoon;
    data = coming_7d_Soon;
  } else if (type === "14d") {
    loading = load_14d_ComingSoon;
    data = coming_14d_Soon;
  }
  return (
    <>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        data.map((each) => {
          return (
            <Link
              to={`/singleGame/${each.game.id}`}
              style={{ textDecoration: "none" }}
            >
              <div key={each.id} style={{ display: "flex", margin: "20px" }}>
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
                <div style={{ marginLeft: "10px" }}>
                  <h5 style={{ color: "#9147FF" }}>{each.game.name}</h5>

                  {each?.game?.release_dates ? (
                    <h6 style={{ color: "black" }}>
                      {new Date(each.date * 1000)
                        .toString()
                        .split(" ")
                        .slice(1, 4)
                        .join("/")}
                    </h6>
                  ) : (
                    "releasing date unavailable"
                  )}
                </div>
              </div>
            </Link>
          );
        })
      )}{" "}
    </>
  );
};

export default UpcomingDays;
