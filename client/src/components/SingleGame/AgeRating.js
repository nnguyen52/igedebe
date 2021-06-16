import React, { useContext } from "react";
import { GamesContext } from "../../contexts/gamesContext";
import pegiErsb from "../../assets/pegiErsb.png";
import { Link } from "react-router-dom";
const AgeRating = () => {
  const {
    gamesState: { currentChosenGame },
  } = useContext(GamesContext);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Link to={`/ageRating/${currentChosenGame.id}`}>
        {currentChosenGame.age_ratings !== undefined ? (
          <>
            <img
              src={pegiErsb}
              alt=""
              style={{ width: "120px", height: "100px" }}
            />
          </>
        ) : (
          "data undavailable"
        )}
      </Link>
    </div>
  );
};

export default AgeRating;
