import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { GamesContext } from "../contexts/gamesContext";
import { CheckoutContext } from "../contexts/checkoutContext";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import FetchHomeGameData from "./FetchHomeGameData";
import { apiURL } from "../constants";
import CoverFlow from "./CoverFlow";
const Home = () => {
  const { restartCheckoutStatus } = useContext(CheckoutContext);
  const {
    authState: { user, isAuthed },
  } = useContext(AuthContext);
  const {
    accessToken,
    fetchRecentGames,
    fetchComingSoon,
    fetchMostAnticipated,
  } = useContext(GamesContext);

  useEffect(() => {
    fetchRecentGames();
    fetchComingSoon();
    fetchMostAnticipated();
    restartCheckoutStatus();
    if (!accessToken) return;
    localStorage.setItem("IDGB_Token", accessToken);
  }, [accessToken]);

  return (
    <div>
      <h2 style={{ color: "#9147FF" }}>These are recommended PS4 tittles</h2>
      <CoverFlow />

      <div>
        <Row
          style={{ marginLeft: 0, marginRight: 0 }}
          className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3"
        >
          <Col>
            <div>
              <Link style={{ textDecoration: "none" }} to={"/recentGames"}>
                <h2 style={{ marginLeft: "20px" }}>Recently Released</h2>
              </Link>
              <FetchHomeGameData data={"recentGames"} />
            </div>
          </Col>
          <Col>
            <div>
              <Link style={{ textDecoration: "none" }} to={"/comingSoon"}>
                <h2 style={{ marginLeft: "20px" }}>Coming Soon</h2>
              </Link>
              <FetchHomeGameData data={"comingSoon"} />
            </div>
          </Col>
          <Col>
            <div>
              <Link
                style={{ textDecoration: "none" }}
                to={"/mostAnticipated/topAnticipated"}
              >
                <h2 style={{ marginLeft: "20px" }}>Most Anticipated</h2>
              </Link>
              <FetchHomeGameData data={"mostAnticipated"} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
