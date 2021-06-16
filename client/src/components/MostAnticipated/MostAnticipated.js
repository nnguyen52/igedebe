import React, { useContext, useEffect, useState } from "react";
import { GamesContext } from "../../contexts/gamesContext";
import { Spinner, Row, Col, Form, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import pleadingFaceEmoji from "../../assets/pleading-face-facebook.png";
const MostAnticipated = () => {
  const isNumeric = (str) => {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  };
  const { type } = useParams();
  const {
    gamesState: {
      mostAnticipated,
      loadMostAnticipated,
      loadCompanies,
      companies,
      loadGames,
      games,
    },
    fetchMostAnticipated,
    fetchCompanies,
    fetchGames,
  } = useContext(GamesContext);
  const [yearForm, setYearForm] = useState({
    fromYear: "1970",
    toYear: new Date().getFullYear() + "",
  });
  const [formError, setFormError] = useState(null);
  const onChangeYearForm = (e) => {
    setYearForm({ ...yearForm, [e.target.name]: e.target.value });
  };
  const onSubmitYearForm = (e) => {
    e.preventDefault();
    if (
      !isNumeric(fromYear) ||
      parseFloat(fromYear) < 1970 ||
      parseFloat(fromYear) >= parseFloat(toYear)
    )
      return setFormError(
        <>
          <h6 style={{ color: "red" }}> Can not search...</h6>
          <ul>
            <li>From year must be a number</li>
            <li>From year must be equal or bigger than 1970</li>
            <li>
              From year must be smaller than To year and <b>different</b> from
              To year
            </li>
          </ul>
        </>
      );
    if (
      !isNumeric(toYear) ||
      parseFloat(toYear) > parseFloat(new Date().getFullYear().toString())
    )
      return setFormError(
        <>
          <h6 style={{ color: "red" }}> Can not search...</h6>
          <ul>
            <li>To year must be a number</li>
            <li>To year must be bigger than From year</li>
            <li>
              To year must be smaller or equal than {new Date().getFullYear()}
            </li>
          </ul>
        </>
      );
    return fetchGames(parseFloat(fromYear), parseFloat(toYear));
  };
  const { fromYear, toYear } = yearForm;
  useEffect(() => {
    if (type == "games" && games.length !== 0) return;
    if (type == "companies" && companies.length !== 0) return;
    if (
      (type == "topAnticipated" || type == undefined) &&
      mostAnticipated.length !== 0
    )
      return;
    if (type == undefined || type == "topAnticipated") {
      if (mostAnticipated.length == 0)
        return fetchMostAnticipated("topAnticipated");
      fetchMostAnticipated("topAnticipated");
    }
    if (type == "companies") {
      if (companies.length == 0) return fetchCompanies();
      fetchCompanies();
    }
    if (type == "games") {
      if (games.length == 0)
        return fetchGames(
          1970,
          parseFloat(new Date().getFullYear().toString())
        );
      return fetchGames(1970, parseFloat(new Date().getFullYear().toString()));
    }
  }, [type]);
  if ((type == "topAnticipated" || type == undefined) && loadMostAnticipated)
    return <Spinner animation="border" />;
  if (type == "companies" && loadCompanies)
    return (
      <>
        <h5 style={{ marginTop: "20px" }}>
          We process and filter larger data for this section, please be patient
          <span style={{ display: "inline" }}>
            <img
              src={pleadingFaceEmoji}
              alt=""
              style={{ height: "30px", width: "30px" }}
            />
          </span>
        </h5>
        <Spinner animation="border" />{" "}
      </>
    );
  if (type == "games" && loadGames) return <Spinner animation="border" />;
  return (
    <Row className="row-cols-1 row-cols-md-2  g-4 mx-auto">
      <Col lg={{ offset: 1, span: 8 }}>
        <h1
          style={{
            fontSize: "24px",
            margin: "25px 0px",
          }}
        >
          {type == "topAnticipated" || type == undefined
            ? "Top Anticipated Games"
            : type == "companies"
            ? "Top Companies"
            : `Best Games`}
        </h1>
        {type == "games" && (
          <Row style={{ marginBottom: "20px" }}>
            <Form onSubmit={onSubmitYearForm}>
              <Row>
                <Col>{formError}</Col>
              </Row>
              <Row className="row-cols-1 row-cols-md-3  g-2 mx-auto">
                <Col lg={{ span: 5 }}>
                  <div style={{ display: "flex" }}>
                    <Form.Label>
                      <span
                        style={{
                          marginBottom: "10px",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        From Year:
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="fromYear"
                      placeholder={fromYear}
                      value={fromYear}
                      onChange={onChangeYearForm}
                    />
                  </div>
                </Col>
                <Col lg={{ span: 5 }}>
                  <div style={{ display: "flex" }}>
                    <Form.Label>
                      <span
                        style={{
                          marginBottom: "10px",
                          fontSize: "13px",
                          fontWeight: "bold",
                          marginRight: "17px",
                        }}
                      >
                        To Year:
                      </span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="toYear"
                      placeholder={toYear}
                      value={toYear}
                      onChange={onChangeYearForm}
                    />
                  </div>
                </Col>
                <Col lg={1} className="pt-md-2">
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button type="submit">Search</Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Row>
        )}
        <Row
          style={{
            backgroundColor: "#F5F5F5",
            padding: "20px 0px 20px 0px ",
            marginBottom: "20px",
          }}
        >
          <Col
            lg={{ span: 1 }}
            xs={{ span: 1 }}
            style={{ textAlign: "center" }}
          >
            #
          </Col>
          <Col
            style={{ paddingLeft: "60px" }}
            lg={{ span: 10 }}
            xs={{ span: 9 }}
          >
            Name
          </Col>
          <Col>Rating</Col>
        </Row>
        {/* Top anticipated */}
        {(type == "topAnticipated" || type == undefined) &&
          mostAnticipated.slice(0, 100).map((each, index) => {
            return (
              <>
                <Row>
                  <Col
                    lg={{ span: 1 }}
                    xs={{ span: 1 }}
                    style={{
                      textAlign: "center",
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    <h4>{index + 1}</h4>
                  </Col>
                  <Col lg={{ span: 9 }} xs={{ span: 8 }}>
                    <Link
                      to={`/singleGame/${each.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex" }}>
                        {each?.cover?.image_id ? (
                          <img
                            key={each.id}
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${each.cover.image_id}.jpg `}
                            alt="cover img"
                            style={{ width: "45px", height: "64px" }}
                          />
                        ) : (
                          <img
                            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.newdesignfile.com%2Fpostpic%2F2015%2F02%2Fwomen-no-picture-available-icon_68019.png&f=1&nofb=1"
                            alt="cover img"
                            style={{ width: "45px", height: "64px" }}
                          />
                        )}
                        <h6
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            padding: "5px",
                            color: "#9147FF",
                          }}
                        >
                          {each.name} (
                          {each.first_release_date
                            ? new Date(each.first_release_date * 1000)
                                .toString()
                                .split(" ")[3]
                            : each.release_dates
                            ? new Date(each.release_date[0] * 1000)
                                .toString()
                                .split(" ")[3]
                            : null}
                          )
                        </h6>
                      </div>
                    </Link>
                  </Col>
                  <Col
                    style={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    <h5
                      style={{
                        marginTop: "auto",
                        marginBottom: "auto",
                        textAlign: "center",
                      }}
                    >
                      {each.rating ? (
                        <span>
                          <span style={{ color: "#9147FF" }}>
                            {Math.floor(each.rating)}
                          </span>{" "}
                          / 100
                        </span>
                      ) : null}
                    </h5>
                  </Col>
                </Row>
                <hr />
              </>
            );
          })}
        {/* Companies */}
        {type == "companies" &&
          companies.map((each, index) => {
            return (
              <>
                <Row>
                  <Col
                    lg={{ span: 1 }}
                    xs={{ span: 1 }}
                    style={{
                      textAlign: "center",
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    <h4>{index + 1}</h4>
                  </Col>
                  <Col lg={{ span: 9 }} xs={{ span: 8 }}>
                    <Link
                      to={`/companies/${each.company.name}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex" }}>
                        {each?.company?.logo?.image_id ? (
                          <img
                            key={each.id}
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${each.company.logo.image_id}.jpg `}
                            alt="cover img"
                            style={{ width: "45px", height: "64px" }}
                          />
                        ) : (
                          <img
                            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.newdesignfile.com%2Fpostpic%2F2015%2F02%2Fwomen-no-picture-available-icon_68019.png&f=1&nofb=1"
                            alt="cover img"
                            style={{ width: "45px", height: "64px" }}
                          />
                        )}
                        <h6
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            padding: "5px",
                            color: "#9147FF",
                          }}
                        >
                          {each.company.name}
                        </h6>
                      </div>
                    </Link>
                  </Col>
                  <Col
                    style={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    <h5
                      style={{
                        marginTop: "auto",
                        marginBottom: "auto",
                        textAlign: "center",
                      }}
                    >
                      {each.weightedRating ? (
                        <span>
                          <span style={{ color: "#9147FF" }}>
                            {Math.floor(each.weightedRating)}
                          </span>{" "}
                          / 100
                        </span>
                      ) : null}
                    </h5>
                  </Col>
                </Row>
                <hr />
              </>
            );
          })}
        {/* Games */}
        {type == "games" && !loadGames && games.length == 0 && (
          <>
            <Row>
              <Col>no games found : (</Col>
            </Row>
          </>
        )}
        {type == "games" &&
          !loadGames &&
          games.map((each, index) => {
            return (
              <>
                <Row>
                  <Col
                    lg={{ span: 1 }}
                    xs={{ span: 1 }}
                    style={{
                      textAlign: "center",
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    <h4>{index + 1}</h4>
                  </Col>
                  <Col lg={{ span: 9 }} xs={{ span: 8 }}>
                    <Link
                      to={`/singleGame/${each.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ display: "flex" }}>
                        {each?.cover?.image_id ? (
                          <img
                            key={each.id}
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${each.cover.image_id}.jpg `}
                            alt="cover img"
                            style={{ width: "45px", height: "64px" }}
                          />
                        ) : (
                          <img
                            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.newdesignfile.com%2Fpostpic%2F2015%2F02%2Fwomen-no-picture-available-icon_68019.png&f=1&nofb=1"
                            alt="cover img"
                            style={{ width: "45px", height: "64px" }}
                          />
                        )}
                        <h6
                          style={{
                            marginTop: "auto",
                            marginBottom: "auto",
                            padding: "5px",
                            color: "#9147FF",
                          }}
                        >
                          {each.name} (
                          {each.first_release_date
                            ? new Date(
                                each.first_release_date * 1000
                              ).getFullYear()
                            : null}
                          )
                        </h6>
                      </div>
                    </Link>
                  </Col>
                  <Col
                    style={{
                      marginTop: "auto",
                      marginBottom: "auto",
                    }}
                  >
                    <h5
                      style={{
                        marginTop: "auto",
                        marginBottom: "auto",
                        textAlign: "center",
                      }}
                    >
                      <span>
                        {each.total_rating ? (
                          <span style={{ color: "#9147FF" }}>
                            {Math.floor(each.total_rating)}
                          </span>
                        ) : each.rating ? (
                          <span style={{ color: "#9147FF" }}>
                            {Math.floor(each.total_rating)}
                          </span>
                        ) : null}
                      </span>{" "}
                      / 100
                    </h5>
                  </Col>
                </Row>
                <hr />
              </>
            );
          })}
        {/* /// */}
      </Col>
      <Col lg={{ span: 3 }}>
        <Row className="mt-md-3">
          <Col lg={{ offset: 1 }}>
            <h4 style={{ color: "#777777", fontSize: "16px" }}>
              Other Top 100s{" "}
            </h4>
            <hr />
            <Link
              to="/mostAnticipated/games"
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  backgroundColor: type == "games" ? "#9147FF" : null,
                  color: type == "games" ? "white" : "black",
                  padding: "15px 10px",
                }}
              >
                Games
              </div>
            </Link>
            <Link
              to="/mostAnticipated/companies"
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  backgroundColor: type == "companies" ? "#9147FF" : null,
                  color: type == "companies" ? "white" : "black",
                  padding: "15px 10px",
                }}
              >
                Companies
              </div>
            </Link>
            <Link
              to="/mostAnticipated/"
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  backgroundColor:
                    type == "topAnticipated" || type == undefined
                      ? "#9147FF"
                      : null,
                  color:
                    type == "topAnticipated" || type == undefined
                      ? "white"
                      : "black",
                  padding: "15px 10px",
                }}
              >
                <div>Most Anticipated</div>
              </div>
            </Link>
          </Col>
        </Row>
        <Row style={{ marginTop: "30px" }}>
          <Col lg={{ offset: 1 }}>
            <h5>
              <span style={{ color: "red" }}>* </span>Rating based on amount of
              products decveloped, rating count, rating respectively
            </h5>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MostAnticipated;
