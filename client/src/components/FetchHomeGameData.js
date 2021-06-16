import React, { useContext } from "react";
import { GamesContext } from "../contexts/gamesContext";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const FetchHomeGameData = ({ data }) => {
  let dataRender;
  let history = useHistory();
  const {
    gamesState: {
      loadRecentGames,
      recentGames,
      loadComingSoon,
      comingSoon,
      loadMostAnticipated,
      mostAnticipated,
    },
    openGamesBasedOnID,
  } = useContext(GamesContext);
  const openGame = (item) => {
    openGamesBasedOnID(item.game ? item.game : item);
    return history.push({
      pathname: `/singleGame/${item.game ? item.game.id : item.id}`,
      state: item.game ? item.game.name : item.name,
    });
  };
  switch (data) {
    case "recentGames": {
      dataRender = recentGames;
      break;
    }
    case "comingSoon": {
      dataRender = comingSoon;
      break;
    }
    case "mostAnticipated": {
      dataRender = mostAnticipated;
      break;
    }
  }
  if (data === "recentGames" && (loadRecentGames || recentGames.length == 0))
    return <Spinner animation="border" />;
  if (data === "comingSoon" && (loadComingSoon || comingSoon.length == 0))
    return <Spinner animation="border" />;
  if (
    data === "mostAnticipated" &&
    (loadMostAnticipated || mostAnticipated.length == 0)
  )
    return (
      <>
        <Spinner animation="border" />
      </>
    );
  if (data === "mostAnticipated")
    return (
      <>
        <div>
          {dataRender.slice(0, 10).map((each) => {
            return (
              <div
                key={each.id}
                style={{ display: "flex", margin: "20px" }}
                onClick={(e) => openGame(each)}
              >
                {each?.cover?.image_id ? (
                  <img
                    key={each.id}
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${each.cover.image_id}.jpg `}
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
                  <h5>{each.name}</h5>

                  {each?.release_dates ? (
                    <h6>{each.release_dates[0].human + ""}</h6>
                  ) : (
                    "releasing date unavailable"
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  return (
    <>
      <div>
        {dataRender.map((each, index) => {
          if (index < 10)
            return (
              <div
                key={each.id}
                style={{ display: "flex", margin: "20px" }}
                onClick={(e) => openGame(each)}
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
                <div style={{ marginLeft: "10px" }}>
                  <h5> {each.game.name}</h5>
                  {each?.game?.release_dates ? (
                    <h6>{each.game.release_dates[0].human + ""}</h6>
                  ) : (
                    "none"
                  )}
                </div>
              </div>
            );
          else return;
        })}
      </div>
    </>
  );
};

export default FetchHomeGameData;
