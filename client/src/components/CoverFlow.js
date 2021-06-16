import React, { useContext, useState, useEffect } from "react";
import { GamesContext } from "../contexts/gamesContext";
import Coverflow from "react-coverflow";
import { Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const CoverFlow = () => {
  let history = useHistory();
  const {
    gamesState: { latestGames, latestGamesLoading },
    openGamesBasedOnID,
  } = useContext(GamesContext);
  const [currentProductID, setcurrentProductID] = useState(
    latestGames[0] ? latestGames[0].id : null
  );
  useEffect(() => {
    setcurrentProductID(null);
  }, [latestGames]);
  if (latestGamesLoading || latestGames == [])
    return <Spinner animation="border" />;

  const chooseGame = (each) => {
    if (currentProductID !== each.id) return setcurrentProductID(each.id);
    if (currentProductID == each.id) {
      openGamesBasedOnID(each);

      return history.push({
        pathname: `/singleGame/${each.id}`,
        state: each.name,
      });
    }
    return setcurrentProductID(each.id);
  };

  return (
    <>
      <Coverflow
        width="960"
        height="600"
        classes={{ background: "rgb(233, 23, 23)" }}
        displayQuantityOfSide={2}
        navigation={false}
        enableScroll={true}
        infiniteScroll={true}
        clickable={true}
        active={latestGames[0]?.rating ? latestGames[0].rating : null}
      >
        {latestGames.map((eachImg) => {
          return (
            <div
              key={eachImg.id}
              onClick={(e) => chooseGame(eachImg)}
              role="menuitem"
              //   tabIndex={eachImg?.rating ? eachImg.rating : null}
            >
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                  eachImg?.cover?.image_id ? eachImg.cover.image_id : null
                }.png`}
                alt="image unavalable"
                style={{
                  display: "block",
                  width: "100%",
                }}
              />
            </div>
          );
        })}
      </Coverflow>
    </>
  );
};

export default CoverFlow;
