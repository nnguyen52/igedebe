import React from "react";
import ProgressBar from "react-customizable-progressbar";
const progressBar = ({ rating, size }) => {
  const progressBarstyle = {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    position: "absolute",
    top: "45%",
    width: "100%",
    height: "100%",
    margin: "0 auto",
    userSelect: "none",
  };
  return (
    <ProgressBar
      strokeWidth={10}
      trackStrokeWidth={15}
      counterClockwise
      initialAnimation
      transition="2s ease"
      progress={rating}
      strokeColor={
        rating == undefined
          ? "grey"
          : rating <= 30
          ? "red"
          : rating <= 70
          ? "yellow"
          : "green"
      }
      radius={size}
      children={
        <div style={progressBarstyle}>
          <h4>{rating !== undefined ? Number(rating.toFixed(2)) : "NaN"}</h4>
        </div>
      }
    />
  );
};

export default progressBar;
