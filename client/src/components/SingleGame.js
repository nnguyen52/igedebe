import React, { useContext, useEffect, useState } from "react";
import { GamesContext } from "../contexts/gamesContext";
import { CheckoutContext } from "../contexts/checkoutContext";
import { Redirect, useParams } from "react-router-dom";
import {
  Spinner,
  Col,
  Row,
  Tabs,
  Tab,
  Container,
  Button,
} from "react-bootstrap";
import GameInfo from "../components/GameInfo";
import ProgressBar from "../components/ProgressBar";
import Coverflow from "react-coverflow";
import { AuthContext } from "../contexts/authContext";
import WebsitesCate from "./SingleGame/WebsitesCate";
import BundlesExpansions from "./SingleGame/BundlesExpansions";
import GeneralInformation from "./SingleGame/GeneralInfomation";
import AgeRating from "./SingleGame/AgeRating";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import Recommendations from "./SingleGame/Recommendations";
const SingleGame = () => {
  const [galleryy, setGalleryy] = useState(null);
  const { id } = useParams();

  const {
    authState: { user, gameIDs },
    getGameIDsFromUser,
    checkUserValid,
  } = useContext(AuthContext);

  const unavailableImg =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.baxter.com%2Fassets%2Fimages%2Fproducts%2FRenal%2Fthumb_image_not_available.png&f=1&nofb=1";
  const {
    gamesState: { loadingChosenGame, currentChosenGame },
    openGamesBasedOnID2,
  } = useContext(GamesContext);
  const {
    checkoutState: { addButtonDisable },
    addItemBasedOnID,
    checkIfItemIsAdded,
    removeItemFromCart,
  } = useContext(CheckoutContext);
  //set Gallery for coverflow
  useEffect(() => {
    if (currentChosenGame == null || currentChosenGame == undefined) return;
    if (currentChosenGame.screenshots && currentChosenGame.artworks)
      return setGalleryy(
        currentChosenGame.screenshots
          .concat(currentChosenGame.artworks)
          .map((e) => {
            return {
              original: `https://images.igdb.com/igdb/image/upload/t_1080p/${e.image_id}.jpg`,
            };
          })
      );

    if (currentChosenGame.screenshots && !currentChosenGame.artworks)
      return setGalleryy(
        currentChosenGame.screenshots.map((e) => {
          return {
            original: `https://images.igdb.com/igdb/image/upload/t_1080p/${e.image_id}.jpg`,
          };
        })
      );
    if (!currentChosenGame.screenshots && currentChosenGame.artworks)
      return setGalleryy(
        currentChosenGame.artworks.map((e) => {
          return {
            original: `https://images.igdb.com/igdb/image/upload/t_1080p/${e.image_id}.jpg`,
          };
        })
      );
    if (!currentChosenGame.screenshots && !currentChosenGame.artworks)
      return setGalleryy(null);
  }, [currentChosenGame]);
  //{location.state} this is params
  useEffect(() => {
    if (user) {
      getGameIDsFromUser();
    }
    checkUserValid();
    return getGameIDsFromUser();
  }, [user]);
  useEffect(() => {
    if (currentChosenGame !== null && id) {
      getGameIDsFromUser();
      return setupSingleGame();
    }
    if (currentChosenGame == null) {
      if (id) {
        getGameIDsFromUser();
        return setupSingleGame();
      }
    }
    return <Redirect to={"/"} />;
  }, [id]);
  useEffect(() => {
    if (currentChosenGame == null) return;
    return checkIfItemIsAdded(currentChosenGame.id);
  }, [currentChosenGame]);
  const setupSingleGame = async () => {
    return await openGamesBasedOnID2(id);
  };
  // if (currentChosenGame.id !== id || !currentChosenGame)
  //   return <Spinner animation="border" />;
  if (loadingChosenGame) return <Spinner animation="border" />;

  if (loadingChosenGame && currentChosenGame == null)
    return <Spinner animation="border" />;
  if (loadingChosenGame == false && currentChosenGame == "NO_DATA")
    return <Redirect to={"/"} />;
  return (
    <>
      {/* <PictureModal /> */}
      <Container>
        <Row
          className="row-cols-1 row-cols-md-2 mt-3"
          style={{ marginLeft: 0, marginRight: 0 }}
        >
          <Col md={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {currentChosenGame?.cover?.image_id !== undefined ? (
                <img
                  src={`//images.igdb.com/igdb/image/upload/t_cover_big/${currentChosenGame.cover.image_id}.jpg`}
                  alt=""
                />
              ) : (
                <img
                  src={unavailableImg}
                  alt="not available"
                  style={{
                    width: "264px",
                    height: "374px",
                  }}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              {gameIDs.indexOf(currentChosenGame.id) >
              -1 ? null : addButtonDisable == false ? (
                <Button
                  onClick={(e) => addItemBasedOnID(currentChosenGame.id)}
                  variant="success"
                >
                  Add to Cart
                </Button>
              ) : (
                <Button
                  onClick={(e) => removeItemFromCart(currentChosenGame.id)}
                  variant="danger"
                >
                  Remove Item
                </Button>
              )}
            </div>
          </Col>
          <Col
            md={9}
            style={{
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <h1 className="mt-md-5">{currentChosenGame.name}</h1>
            <h5>
              {new Date(currentChosenGame.first_release_date * 1000)
                .toString()
                .split(" ")
                .slice(1, 3)
                .join(" ") +
                ", " +
                new Date(currentChosenGame.first_release_date * 1000)
                  .toString()
                  .split(" ")
                  .slice(3, 4)
                  .join(" ")
                  .split(" ")
                  .slice(-4)
                  .join(" ")}
            </h5>
            <h6>
              {currentChosenGame?.involved_companies?.length > 0
                ? currentChosenGame.involved_companies
                    .filter((e) => e.developer == true)
                    .map((each) => {
                      return `${each.company.name}`;
                    })
                : "Company: data unavailable"}
            </h6>
            <Row style={{ marginLeft: 0, marginRight: 0 }}>
              <Col
                md={7}
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                <Tabs defaultActiveKey="about">
                  <Tab eventKey="about" title="About">
                    <GameInfo
                      param={"about"}
                      id={id ? id : currentChosenGame.id}
                    />
                  </Tab>
                  <Tab eventKey="moreInfo" title="Share">
                    <GameInfo
                      param={"moreInfo"}
                      id={id ? id : currentChosenGame.id}
                    />
                  </Tab>
                </Tabs>
                <WebsitesCate />
              </Col>
              <Col
                style={{
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                <Row
                  style={{
                    marginLeft: 0,
                    marginRight: 0,
                  }}
                >
                  <Col
                    style={{
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    <div style={{ marginLeft: "10px" }}>
                      <ProgressBar
                        rating={currentChosenGame.total_rating}
                        size={70}
                      />
                    </div>
                    <h6 style={{ textAlign: "center" }}>
                      Rating from many sources
                    </h6>
                  </Col>
                  <Col
                    style={{
                      paddingLeft: 0,
                      paddingRight: 0,
                    }}
                  >
                    <div style={{ marginLeft: "25px" }}>
                      <ProgressBar
                        rating={currentChosenGame.rating}
                        size={55}
                      />
                    </div>
                    <h6 style={{ textAlign: "center" }}>Rating from IGDB</h6>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <hr />
        </Row>
        {galleryy !== null && (
          <Row
            style={{
              marginLeft: 0,
              marginRight: 0,
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <Col
              style={{
                paddingLeft: 0,
                paddingRight: 0,
                backgroundColor: "black",
              }}
            >
              <ImageGallery items={galleryy} showThumbnails={false} />
            </Col>
          </Row>
        )}
        {/* <Row style={{ marginLeft: 0, marginRight: 0 }}>
          <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div style={{ marginBottom: "20px", marginTop: "20px" }}>
              {currentChosenGame?.artworks !== undefined ||
              currentChosenGame?.screenshots !== undefined ? (
                // coverflowBody
                galleryy && (
                  <>
                    <Coverflow
                      width="960"
                      height="400"
                      classes={{ background: "rgb(233, 23, 23)" }}
                      className=""
                      displayQuantityOfSide={2}
                      navigation={false}
                      enableScroll={true}
                      infiniteScroll={true}
                      clickable={true}
                      currentFigureScale={2}
                    >
                      {galleryy.map((each) => {
                        return (
                          <img
                            src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/${each.image_id}.jpg`}
                            alt=""
                            onClick={(e) =>
                              checkPopupPituresModal(each.image_id)
                            }
                          />
                        );
                      })}
                    </Coverflow>
                  </>
                )
              ) : (
                <div>
                  <h5 style={{ textAlign: "center" }}>Gallery unavailable</h5>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={`https://cdn2.iconfinder.com/data/icons/picons-basic-1/57/basic1-145_no_image-512.png`}
                      alt="gallery unavailable"
                      style={{ width: "400px", height: "400px" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row> */}
        <Row>
          <hr />
        </Row>
        <Row
          style={{
            marginLeft: 0,
            marginRight: 0,
          }}
        >
          <Col
            lg={9}
            style={{ paddingLeft: "20px", paddingLeft: 0, paddingRight: 0 }}
          >
            <h4>RELATED CONTENT</h4>
            {currentChosenGame.bundles !== undefined ||
            currentChosenGame.expansions !== undefined ||
            currentChosenGame.remakes !== undefined ||
            currentChosenGame.remasters !== undefined ? (
              <Tabs
                defaultActiveKey={
                  currentChosenGame.bundles !== undefined
                    ? "bundles"
                    : "expansions"
                }
              >
                {currentChosenGame.bundles && (
                  <Tab
                    eventKey="bundles"
                    title={`Bundles (${currentChosenGame.bundles.length})`}
                  >
                    <BundlesExpansions type={"bundles"} />
                  </Tab>
                )}
                {currentChosenGame.expansions && (
                  <Tab
                    eventKey="expansions"
                    title={`Expansions (${currentChosenGame.expansions.length})`}
                  >
                    <BundlesExpansions type={"expansions"} />
                  </Tab>
                )}
                {currentChosenGame.remakes && (
                  <Tab
                    eventKey="remakes"
                    title={`Remakes (${currentChosenGame.remakes.length})`}
                  >
                    <BundlesExpansions type={"remakes"} />
                  </Tab>
                )}
                {currentChosenGame.remasters && (
                  <Tab
                    eventKey="remasters"
                    title={`Bundles (${currentChosenGame.remasters.length})`}
                  >
                    <BundlesExpansions type={"remasters"} />
                  </Tab>
                )}
              </Tabs>
            ) : (
              "Expansions/Bundles and DLCs unavailable"
            )}
            <Col
              style={{
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <h4>STORYLINE</h4>
              {currentChosenGame.storyline !== undefined ? (
                <p> {currentChosenGame.storyline}</p>
              ) : (
                "data unavailable"
              )}
            </Col>
            <Col
              style={{
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <h4>RECOMMENDATIONS</h4>
              <Row
                style={{
                  marginLeft: 0,
                  marginRight: 0,
                }}
              >
                <Col>
                  <Recommendations />
                </Col>
              </Row>
            </Col>
          </Col>
          <Col
            style={{
              paddingLeft: 0,
              paddingRight: 0,
            }}
            lg={3}
          >
            <h4>INFORMAITON</h4>
            <GeneralInformation />
            <h4>AGE RATING</h4>
            <AgeRating />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SingleGame;
