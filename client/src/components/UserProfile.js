import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { UserContext } from "../contexts/userContext";
import {
  Spinner,
  Modal,
  Button,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { PencilSquare } from "react-bootstrap-icons";
import CoverFlow from "./CoverFlow";

import { GamesContext } from "../contexts/gamesContext";
import ChangeProfilePicModal from "./Modals/ChangeProfilePicModal";
import { apiURL } from "../constants";
const UserProfile = () => {
  const {
    gamesState: { loadGameDetails, gameDetails },
    getGamesDetails,
  } = useContext(GamesContext);
  const { openModalImageFnc } = useContext(UserContext);
  let history = useHistory();

  let body = <> </>;
  const {
    authState: { isAuthed, user, loading, message },
    checkUserValid,
    resetUser,
    getGameIDsFromUser,
  } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      getGameIDsFromUser();
      return getGamesDetails(user);
    }
    checkUserValid();
    return getGameIDsFromUser();
  }, [user]);
  const redirectToLogin = () => {
    history.push("/login");
  };
  const resetAndRedirectToLogin = () => {
    localStorage.removeItem("user");
    resetUser();
    history.push("/login");
  };

  if (loading) return <Spinner animation="border" />;
  if (message == "malware") {
    return (body = (
      <Modal show={true} onHide={resetAndRedirectToLogin}>
        <Modal.Header style={{ color: "white", backgroundColor: "#343a40" }}>
          <Modal.Title>
            Invalid data detected! Please log in/sign up again!
          </Modal.Title>
        </Modal.Header>
      </Modal>
    ));
  }
  if (!loading && !isAuthed)
    return (
      <Modal show={true} onHide={redirectToLogin}>
        <Modal.Header style={{ color: "white", backgroundColor: "#343a40" }}>
          <Modal.Title>
            You have to Log In/Sign Up to see your profile!
          </Modal.Title>
        </Modal.Header>
        <div
          style={{
            margin: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link to={"/login"}>
            <Button variant="dark" style={{ marginRight: "5px" }}>
              Log In
            </Button>
          </Link>
          <Link to={"/register"}>
            <Button variant="dark">Sign Up</Button>
          </Link>
        </div>
      </Modal>
    );

  body = (
    <div>
      <ChangeProfilePicModal />
      <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row
          className="row-cols-2 row-cols-md-2 mt-3"
          style={{ marginLeft: 0, marginRight: 0 }}
        >
          <Col lg={2} xs={3} style={{ border: "2px solid black " }}>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {(user.avatar == null) | (user.avatar == undefined) ? (
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Fimmersivelrn.org%2Fwp-content%2Fuploads%2Fno_avatar.jpg%3Ffit%3D250%252C250%26ssl%3D1&f=1&nofb=1"
                  alt="no avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              ) : (
                <img
                  src={user.avatar}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
              )}

              <PencilSquare size={20} onClick={openModalImageFnc} />
            </div>
            <h5> {user.username}</h5>
          </Col>

          <Col lg={9} xs={9} style={{ border: "2px solid blue" }}>
            {loadGameDetails ? (
              <Spinner animation="border" />
            ) : !loadGameDetails && gameDetails == "NO_DATA" ? (
              <>
                {" "}
                <h5>you can visit our home page to see games!</h5>
                <Link to={"/"}>
                  <Button variant="success">Visit now! (づ￣ ³￣)づ </Button>
                </Link>
              </>
            ) : (
              <>
                This is what you are interested in: <br />
                <Row
                  className="row-cols-2 row-cols-md-2 mt-3"
                  style={{ marginLeft: 0, marginRight: 0 }}
                >
                  {gameDetails.map((each) => {
                    return (
                      <Col>
                        <Card>
                          <Card.Header>{each.name}</Card.Header>
                          <Card.Body>
                            <Link to={`singleGame/${each.id}`}>
                              <img
                                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                                  each?.cover?.image_id
                                    ? each.cover.image_id
                                    : null
                                }.png`}
                                alt=""
                              />
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
  return <>{body}</>;
};

export default UserProfile;
