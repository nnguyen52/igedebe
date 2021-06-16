import React, { useContext } from "react";
import { GamesContext } from "../contexts/gamesContext";
import {
  FacebookShareButton,
  TwitterIcon,
  FacebookIcon,
  TwitterShareButton,
} from "react-share";
import { clientApiURL } from "../constants";
const GameInfo = ({ param, id }) => {
  const {
    gamesState: { currentChosenGame },
  } = useContext(GamesContext);
  let body = <> </>;
  if (param === "about")
    body = (
      <>
        <b>Genre: </b>{" "}
        {currentChosenGame?.genres
          ? Object.values(currentChosenGame.genres.map((ea) => ea.name)).join(
              ", "
            )
          : "data unavailable"}{" "}
        <br />
        <b>Platforms: </b>{" "}
        {currentChosenGame?.platforms
          ? Object.values(
              currentChosenGame.platforms.map((ea) => ea.name)
            ).join(", ")
          : "data unavailable"}
        <p style={{ marginTop: "5px" }}>
          {currentChosenGame?.summary
            ? currentChosenGame.summary
            : "data unavailable"}
        </p>
      </>
    );
  else
    body = (
      <>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <FacebookShareButton url={`${clientApiURL}/singleGame/${id}`}>
            <FacebookIcon iconFillColor="white" round={true}></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton url={`${clientApiURL}/singleGame/${id}`}>
            <TwitterIcon iconFillColor="white" round={true}></TwitterIcon>
          </TwitterShareButton>
        </div>
      </>
    );
  return body;
};

export default GameInfo;
