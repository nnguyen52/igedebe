import React, { useContext } from "react";
import { GamesContext } from "../../contexts/gamesContext";
const GeneralInfomation = () => {
  const {
    gamesState: { currentChosenGame },
  } = useContext(GamesContext);

  return (
    <div style={{ paddingLeft: "20px" }}>
      <h6>Releases Dates:</h6>
      {currentChosenGame.release_dates !== undefined ? (
        <ul style={{ listStyleType: "none" }}>
          {currentChosenGame.release_dates.map((e, index) => {
            return (
              <li>
                {new Date(e.date * 1000)
                  .toString()
                  .split(" ")
                  .slice(1, 4)
                  .join("/")}
                ,{" "}
                <span style={{ color: "#9174FF" }}>
                  {currentChosenGame.release_dates[index].platform.name !==
                  undefined
                    ? currentChosenGame.release_dates[index].platform.name
                    : null}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        "data unavailable"
      )}
      <h6>Developers:</h6>
      {currentChosenGame.involved_companies !== undefined ? (
        <ul style={{ listStyleType: "none" }}>
          {currentChosenGame.involved_companies
            .filter((each) => each.developer == true)
            .map((e) => {
              return <li>{e.company.name}</li>;
            })}
        </ul>
      ) : (
        "data unavailable"
      )}
      <h6>Publishers:</h6>
      {currentChosenGame.involved_companies !== undefined ? (
        <ul style={{ listStyleType: "none" }}>
          {currentChosenGame.involved_companies
            .filter((each) => each.developer !== true)
            .map((e) => {
              return <li>{e.company.name}</li>;
            })}
        </ul>
      ) : (
        "data unavailable"
      )}
      <h6>Supporting Developers:</h6>
      {currentChosenGame.involved_companies !== undefined ? (
        <ul style={{ listStyleType: "none" }}>
          {currentChosenGame.involved_companies
            .filter((each) => each.supporting == true)
            .map((e) => {
              return <li>{e.company.name}</li>;
            })}
        </ul>
      ) : (
        "data unavailable"
      )}
      <h6>Game Modes:</h6>
      {currentChosenGame.game_modes !== undefined ? (
        <ul style={{ listStyleType: "none" }}>
          {currentChosenGame.game_modes.map((e) => {
            return <li>{e.name}</li>;
          })}
        </ul>
      ) : (
        "data unavailable"
      )}
      <h6>Genres </h6>
      {currentChosenGame?.genres !== undefined ? (
        <ul style={{ listStyleType: "none" }}>
          {currentChosenGame.genres.map((e) => {
            return <li>{e.name}</li>;
          })}
        </ul>
      ) : (
        "data unavailable"
      )}
      <h6>Themes </h6>
      {currentChosenGame.themes !== undefined ? (
        <ul style={{ listStyleType: "none" }}>
          {currentChosenGame.themes.map((e) => {
            return <li>{e.name}</li>;
          })}
        </ul>
      ) : (
        "data unavailable"
      )}
      <h6>Series:</h6>
      <ul style={{ listStyleType: "none" }}>
        {currentChosenGame.collection !== undefined ? (
          <li> {currentChosenGame.collection.name}</li>
        ) : (
          "data unavailable"
        )}
      </ul>
      <h6>Player perspectives: </h6>
      <ul style={{ listStyleType: "none" }}>
        {currentChosenGame.player_perspectives !== undefined
          ? currentChosenGame.player_perspectives.map((e) => {
              return <li>{e.name}</li>;
            })
          : "data unavailable"}
      </ul>
      <h6>Franchises: </h6>
      <ul style={{ listStyleType: "none" }}>
        {currentChosenGame.franchises !== undefined ? (
          <li> {currentChosenGame.franchises.name}</li>
        ) : (
          "data unavailable"
        )}
      </ul>
      <h6>Game Engines: </h6>
      <ul style={{ listStyleType: "none" }}>
        {currentChosenGame.game_engines !== undefined
          ? currentChosenGame.game_engines.map((e) => {
              return <li>{e.name}</li>;
            })
          : "data unavailable"}
      </ul>
      <h6>Alternative names:</h6>
      <ul style={{ listStyleType: "none" }}>
        {currentChosenGame.alternative_names !== undefined
          ? currentChosenGame.alternative_names.map((e) => {
              return <li>{e.name}</li>;
            })
          : "data unavailable"}
      </ul>
    </div>
  );
};

export default GeneralInfomation;
