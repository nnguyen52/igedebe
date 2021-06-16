import React, { useContext, useEffect, useState } from "react";
import { GamesContext } from "../../contexts/gamesContext";
import { Link } from "react-router-dom";
import { Figure } from "react-bootstrap";

const BundlesExpansions = ({ type }) => {
  let [packages, setPackages] = useState();
  const {
    gamesState: { currentChosenGame },
  } = useContext(GamesContext);
  useEffect(() => {
    if (!currentChosenGame) return;
    if (type == "bundles") return setPackages(currentChosenGame.bundles);
    if (type == "expansions") return setPackages(currentChosenGame.expansions);
    if (type == "remakes") return setPackages(currentChosenGame.remakes);
    if (type == "remasters") return setPackages(currentChosenGame.remasters);
  }, [type, currentChosenGame]);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {packages &&
        packages.map((e) => {
          return (
            <Link to={`/singleGame/${e.id}`}>
              <div
                style={{
                  textAlign: "center",
                  margin: "10px",
                }}
              >
                <Figure>
                  {e?.cover?.image_id !== undefined ? (
                    <Figure.Image
                      src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${e.cover.image_id}.jpg`}
                    />
                  ) : (
                    <Figure.Image
                      style={{ width: "120px", height: "160px" }}
                      src={`https://internationallamps.co.uk/site/wp-content/uploads/2017/09/IMAGE-UNAVAILABLE-4-1.jpg`}
                    />
                  )}

                  <Figure.Caption>
                    <h6>{e.name}</h6>
                  </Figure.Caption>
                </Figure>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default BundlesExpansions;
