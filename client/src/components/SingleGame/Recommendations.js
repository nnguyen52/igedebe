import React, { useContext, useEffect, useState } from "react";
import { GamesContext } from "../../contexts/gamesContext";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import {
  ArrowRightCircleFill,
  ArrowLeftCircleFill,
} from "react-bootstrap-icons";
const Recommendations = () => {
  let history = useHistory();
  const [previouslyDragged, setpreviouslyDragged] = useState(false);
  const {
    gamesState: { currentChosenGame },
  } = useContext(GamesContext);
  const [width, setWidth] = useState(window.innerWidth);
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });
  useEffect(() => {
    setpreviouslyDragged(false);
    if (!currentChosenGame || currentChosenGame.similar_games == undefined)
      return;
  }, [currentChosenGame]);
  const rightArrow = <ArrowRightCircleFill size={60} color="#9147FF" />;
  const leftArrow = <ArrowLeftCircleFill size={60} color="#9147FF" />;

  const handleClick = (e, gameID) => {
    if (previouslyDragged) {
      e.stopPropagation();
      e.preventDefault();
      return;
    } else {
      return history.push(`/singleGame/${gameID}`);
    }
  };
  let settings = {
    nextArrow: rightArrow,
    prevArrow: leftArrow,
    adaptiveHeight: true,
    useCss: true,
    infinite: true,
    speed: 500,
    slidesToShow: width <= 600 ? 4 : 8,
    slidesToScroll: 1,
    swipeToSlide: true,
    accessibility: true,
  };

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <Slider {...settings}>
        {currentChosenGame.similar_games !== undefined &&
          currentChosenGame.similar_games.map((e) => {
            return (
              <div style={{ justifyContent: "center", height: "fit-content" }}>
                {e?.cover?.image_id ? (
                  <img
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${e.cover.image_id}.jpg`}
                    alt=""
                    onClick={(event) => handleClick(event, e.id)}
                  />
                ) : (
                  <img
                    src={`https://internationallamps.co.uk/site/wp-content/uploads/2017/09/IMAGE-UNAVAILABLE-4-1.jpg`}
                    alt=""
                    style={{ width: "90px", height: "120px" }}
                    onClick={(event) => handleClick(event, e.id)}
                  />
                )}
                {e.name}
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default Recommendations;
