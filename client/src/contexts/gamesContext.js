import React, { useReducer, createContext, useState, useEffect } from "react";
import { gamesReducer } from "../reducers/gamesReducer";
import { Pagination } from "react-bootstrap";
import axios from "axios";
import { apiURL, GET_ACCESS_TOKEN, headers } from "../constants";
export const GamesContext = createContext();

const GamesContextProvider = ({ children }) => {
  const [axiosHeader, setAxiosHeader] = useState({
    Accept: "application/json",
    "Content-Type": "text/plain",
    "Client-ID": "5t9m4qnwuraip9o8mxg8avgcje9b3j",
    Authorization: "",
  });

  const [gamesState, dispatch] = useReducer(gamesReducer, {
    // latest games only contain image_id and game id
    latestGames: [],
    latestGamesLoading: false,
    //single game
    loadingChosenGame: true,
    currentChosenGame: null,

    //if user enter some game imediately without going through home:
    loadingSingleGame: false,

    //search games
    loadSearchGames: false,
    searchedGames: [],

    //user games details
    loadGameDetails: false,
    gameDetails: [],

    //home games Data
    loadRecentGames: false,
    recentGames: [],
    loadComingSoon: false,
    comingSoon: [],
    //3 types
    //top anticipated
    loadMostAnticipated: false,
    mostAnticipated: [],
    //companies
    loadCompanies: false,
    companies: [],
    //games
    loadGames: false,
    games: [],

    load_7d_ComingSoon: false,
    coming_7d_Soon: [],
    load_14d_ComingSoon: false,
    coming_14d_Soon: [],
    load_500_ComingSoon: false,
    coming_500_Soon: [],
    load_500_MostAnticipated: false,
    most_500_Anticipated: [],

    //recentGames page:
    loadRecentGame1Month: false,
    recentGame1Month: [],
    //
    loadCommingGamesTillEndOfYear: false,
    gamesTillEndOfYear: [],
    //pagination for upcoming page
    startPage: 1,
    endPage: 5,
    currentActivePage: 1,
    paginationPages: [],
    loadPaginationPages: false,
  });

  const [accessToken, setAccessToken] = useState(null);
  const [updateRecentReleasedGames, setupdateRecentReleasedGames] =
    useState(true);
  //coming soon page

  const setNextPage = () => {
    changePage(gamesState.currentActivePage + 1);
    dispatch({ type: "SET_NEXT_PAGE" });
  };
  const setPreviousPage = () => {
    changePage(gamesState.currentActivePage - 1);
    dispatch({ type: "SET_PREVIOUS_PAGE" });
  };
  const setLastPage = () => {
    changePage(Math.floor(gamesState.gamesTillEndOfYear.length / 10));
    dispatch({ type: "SET_LAST_PAGE" });
  };
  const setFirstPage = () => {
    changePage(1);
    dispatch({ type: "SET_FIRST_PAGE" });
  };
  const setStartPage = (page) => {
    dispatch({ type: "SET_START_PAGE", payload: page });
  };
  const setEndPage = (page) => {
    dispatch({ type: "SET_END_PAGE", payload: page });
  };
  const changePage = (currentPage) => {
    dispatch({ type: "CHANGE_PAGE", payload: currentPage });
  };
  const makeCurrentPaginationPage = () => {
    dispatch({ type: "LOAD_PAGINATION_PAGES", payload: true });
    dispatch({ type: "MAKE_CURRENT_PAGINATION_PAGE" });
  };
  const fetch_gamesTillEndOfYear = () => {
    dispatch({ type: "LOAD_GAME_TILL_END_YEAR", payload: true });
    if (localStorage.getItem("IDGB_Token") || accessToken) {
      if (gamesState.gamesTillEndOfYear.length !== 0) {
        dispatch({ type: "LOAD_GAME_TILL_END_YEAR", payload: false });
      }
      axios
        .post(`${apiURL}/games/fetch_gameTillEndYear`, {
          headers: headers(
            localStorage.getItem("IDGB_Token")
              ? localStorage.getItem("IDGB_Token")
              : accessToken
          ),
        })
        .then((result) => {
          dispatch({
            type: "SET_GAME_TILL_END_YEAR",
            payload: result.data.data,
          });
          dispatch({ type: "LOAD_GAME_TILL_END_YEAR", payload: false });
        });
    }
  };
  const fetch_7d_comingSoon = (days) => {
    dispatch({ type: "LOAD_D_COMINGSOON", payload: true });
    if (localStorage.getItem("IDGB_Token") || accessToken) {
      return axios
        .post(`${apiURL}/games/fetch_d_comingSoon`, {
          headers: headers(
            localStorage.getItem("IDGB_Token")
              ? localStorage.getItem("IDGB_Token")
              : accessToken
          ),
          days: days,
        })
        .then((result) => {
          if (days == 8) {
            return dispatch({
              type: "SET_D_COMINGSOON",
              payload: result.data.data,
              days: 7,
            });
          }
          return dispatch({
            type: "SET_D_COMINGSOON",
            payload: result.data.data,
            days: 14,
          });
        });
    } else {
      ///////
      axios
        .post(`${apiURL}/games/getAccessTokenGames`, {
          url: GET_ACCESS_TOKEN,
        })
        .then((res) => {
          axios.post(`${apiURL}/games/fetch_d_comingSoon`, {
            headers: headers(res.data.data.access_token),
            days: days,
          });
        })
        .then((result) => {
          if (days == 8) {
            return dispatch({
              type: "SET_D_COMINGSOON",
              payload: result.data.data,
              days: 7,
            });
          }
          return dispatch({
            type: "SET_D_COMINGSOON",
            payload: result.data.data,
            days: 14,
          });
        });
    }
  };
  // recentGames page :
  const fetchRecentGames1Month = () => {
    axios
      .post(`${apiURL}/games/fetchRecentGames1Month`, {
        headers: headers(
          localStorage.getItem("IDGB_Token")
            ? localStorage.getItem("IDGB_Token")
            : accessToken
        ),
      })
      .then((result) => {
        dispatch({ type: "LOAD_RECENT_GAMES_1_MONTH", payload: true });
        return dispatch({
          type: "SET_RECENT_GAMES_1_MONTH",
          payload: result.data.data,
        });
      });
  };
  //
  const fetchGames = (fromYear, toYear) => {
    dispatch({ type: "LOAD_GAMES", payload: true });
    if (!localStorage.getItem("IDGB_Token") || !accessToken) {
      return axios
        .post(`${apiURL}/games/getAccessTokenGames`, {
          url: GET_ACCESS_TOKEN,
        })
        .then((res) => {
          axios
            .post(`${apiURL}/games/fetchGames`, {
              headers: headers(res.data.data.access_token),
              years: {
                fromYrFull: fromYear ? fromYear : 1970,
                toYrFull: toYear
                  ? toYear
                  : parseFloat(new Date().getFullYear()),
                fromYr: fromYear
                  ? Math.floor(new Date(fromYear, 0, 1).getTime() / 1000)
                  : Math.floor(new Date(1970, 0, 1).getTime() / 1000),
                toYr: toYear
                  ? Math.floor(new Date(toYear, 11, 31).getTime() / 1000)
                  : Math.floor(
                      new Date(new Date().getFullYear(), 11, 31).getTime() /
                        1000
                    ),
              },
            })
            .then((result) => {
              dispatch({ type: "SET_GAMES", payload: result.data.data });
              return dispatch({
                type: "LOAD_GAMES",
                payload: false,
              });
            });
        });
    }
    return axios
      .post(`${apiURL}/games/fetchGames`, {
        headers: headers(
          localStorage.getItem("IDGB_Token")
            ? localStorage.getItem("IDGB_Token")
            : accessToken
        ),
        years: {
          fromYrFull: fromYear ? fromYear : 1970,
          toYrFull: toYear ? toYear : parseFloat(new Date().getFullYear()),
          fromYr: fromYear
            ? Math.floor(new Date(fromYear, 0, 1).getTime() / 1000)
            : Math.floor(new Date(1970, 0, 1).getTime() / 1000),
          toYr: toYear
            ? Math.floor(new Date(toYear, 11, 31).getTime() / 1000)
            : Math.floor(
                new Date(new Date().getFullYear(), 11, 31).getTime() / 1000
              ),
        },
      })
      .then((result) => {
        dispatch({ type: "SET_GAMES", payload: result.data.data });
        return dispatch({
          type: "LOAD_GAMES",
          payload: false,
        });
      });
  };
  //
  const fetchCompanies = () => {
    const calculateAverage = (array) => {
      let fin = 0;
      let arrayFinLen = array.length;
      for (let i = 0; i < array.length; i++) {
        if (
          array[i].total_rating == undefined ||
          array[i].total_rating == null
        ) {
          arrayFinLen = arrayFinLen - 1;
          continue;
        }
        fin += array[i].total_rating;
      }
      return fin / arrayFinLen;
    };
    dispatch({ type: "LOAD_COMPANIES", payload: true });
    if (!localStorage.getItem("IDGB_Token") || !accessToken) {
      return axios
        .post(`${apiURL}/games/getAccessTokenGames`, {
          url: GET_ACCESS_TOKEN,
        })
        .then((res) => {
          axios
            .post(`${apiURL}/games/fetchCompanies`, {
              headers: headers(res.data.data.access_token),
            })
            .then((result) => {
              let arr = result.data.data
                .filter((each) => each?.developed.length >= 1)
                .map((eachCom) => {
                  return {
                    weightedRating: calculateAverage(eachCom.developed),
                    company: eachCom,
                  };
                });
              dispatch({
                type: "SET_COMPANIES",
                payload: arr
                  .sort((a, b) => {
                    return (
                      b.company.developed.length - a.company.developed.length ||
                      parseFloat(b.weightedRating) -
                        parseFloat(a.weightedRating)
                    );
                  })
                  .slice(0, 100),
              });
              return dispatch({
                type: "LOAD_COMPANIES",
                payload: false,
              });
            });
        });
    }
    return axios
      .post(`${apiURL}/games/fetchCompanies`, {
        headers: headers(
          localStorage.getItem("IDGB_Token")
            ? localStorage.getItem("IDGB_Token")
            : accessToken
        ),
      })
      .then((result) => {
        let arr = result.data.data
          .filter((each) => each?.developed.length >= 1)
          .map((eachCom) => {
            return {
              weightedRating: calculateAverage(eachCom.developed),
              company: eachCom,
            };
          });
        console.log(arr[3]);
        dispatch({
          type: "SET_COMPANIES",
          payload: arr.slice(0, 100),
        });
        return dispatch({
          type: "LOAD_COMPANIES",
          payload: false,
        });
      });
  };
  ////
  const fetchMostAnticipated = () => {
    if (gamesState.mostAnticipated.length > 0) return;
    dispatch({ type: "LOAD_MOST_ANTICIPATED", payload: true });
    if (!localStorage.getItem("IDGB_Token") || !accessToken) {
      return axios
        .post(`${apiURL}/games/getAccessTokenGames`, {
          url: GET_ACCESS_TOKEN,
        })
        .then((res) => {
          axios
            .post(`${apiURL}/games/fetchMostAnticipated`, {
              headers: headers(res.data.data.access_token),
            })
            .then((result) => {
              dispatch({
                type: "SET_MOST_ANTICIPATED",
                payload: result.data.data,
              });
              return dispatch({
                type: "LOAD_MOST_ANTICIPATED",
                payload: false,
              });
            });
        });
    }
    return axios
      .post(`${apiURL}/games/fetchMostAnticipated`, {
        headers: headers(
          localStorage.getItem("IDGB_Token")
            ? localStorage.getItem("IDGB_Token")
            : accessToken
        ),
      })
      .then((result) => {
        dispatch({
          type: "SET_MOST_ANTICIPATED",
          payload: [
            ...new Set(
              result.data.data
                .sort((a, b) => parseFloat(b.hypes) - parseFloat(a.hypes))
                .filter((each) => each.hypes !== undefined)
            ),
          ],
        });
        return dispatch({
          type: "LOAD_MOST_ANTICIPATED",
          payload: false,
        });
      });
  };
  ////
  const fetchComingSoon = () => {
    if (gamesState.comingSoon.length > 0) return;
    dispatch({ type: "LOAD_COMING_SOON", payload: true });
    if (!localStorage.getItem("IDGB_Token") || !accessToken) {
      return axios
        .post(`${apiURL}/games/getAccessTokenGames`, {
          url: GET_ACCESS_TOKEN,
        })
        .then((res) => {
          axios
            .post(`${apiURL}/games/fetchComingSoon`, {
              headers: headers(res.data.data.access_token),
            })
            .then((result) => {
              dispatch({
                type: "SET_COMING_SOON",
                payload: [...new Set(result.data.data)],
              });
              return dispatch({
                type: "LOAD_COMING_SOON",
                payload: false,
              });
            });
        });
    }
    return axios
      .post(`${apiURL}/games/fetchComingSoon`, {
        headers: headers(
          localStorage.getItem("IDGB_Token")
            ? localStorage.getItem("IDGB_Token")
            : accessToken
        ),
      })
      .then((result) => {
        dispatch({
          type: "SET_COMING_SOON",
          payload: [...new Set(result.data.data)],
        });
        return dispatch({
          type: "LOAD_COMING_SOON",
          payload: false,
        });
      });
  };
  ////
  const fetchRecentGames = () => {
    if (gamesState.recentGames.length > 0) {
      return;
    }
    dispatch({ type: "LOAD_RECENT_GAMES", payload: true });
    if (!localStorage.getItem("IDGB_Token") || !accessToken) {
      return axios
        .post(`${apiURL}/games/getAccessTokenGames`, { url: GET_ACCESS_TOKEN })
        .then((res) => {
          axios
            .post(`${apiURL}/games/fetchRecentGames`, {
              headers: headers(res.data.data.access_token),
            })
            .then((result) => {
              dispatch({
                type: "SET_RECENT_GAMES",
                payload: [...new Set(result.data.data)],
              });
              return dispatch({ type: "LOAD_RECENT_GAMES", payload: false });
            });
        });
    }
    return axios
      .post(`${apiURL}/games/fetchRecentGames`, {
        headers: headers(
          localStorage.getItem("IDGB_Token")
            ? localStorage.getItem("IDGB_Token")
            : accessToken
        ),
      })
      .then((result) => {
        dispatch({
          type: "SET_RECENT_GAMES",
          payload: [...new Set(result.data.data)],
        });
        return dispatch({
          type: "LOAD_RECENT_GAMES",
          payload: false,
        });
      });
  };
  const clearCurrentChosenGame = () => {
    dispatch({ type: "CLEAR_CURRENT_CHOSEN_GAME" });
  };
  useEffect(async () => {
    setAccessToken(null);
    dispatch({ type: "LOADING_LATEST_GAMES" });
    await axios
      .post(`${apiURL}/games/getAccessTokenGames`, { url: GET_ACCESS_TOKEN })
      .then((res) => {
        setAxiosHeader({
          ...axiosHeader,
          Authorization: `Bearer ${res.data.data.access_token}`,
        });
        localStorage.setItem("IDGB_Token", res.data.data.access_token);
        setAccessToken(res.data.data.access_token);
        axios
          .post(`${apiURL}/games/recentReleased`, {
            accessToken:
              accessToken == null ? res.data.data.access_token : accessToken,
          })
          .then((res) => {
            dispatch({
              type: "SET_LATEST_GAMES",
              payload: res.data.data.sort((a, b) => 0.5 - Math.random()),
            });
          });
      });
    //every 10 minute: update latest currently released games
    setTimeout(() => {
      setupdateRecentReleasedGames(!updateRecentReleasedGames);
    }, 600000);
  }, [updateRecentReleasedGames]);
  //open games based on ID2;
  const openGamesBasedOnID2 = async (id) => {
    if (gamesState.currentChosenGame !== null) {
      if (gamesState.currentChosenGame.id == id) return;
    }
    ///
    if (!localStorage.getItem("IDGB_Token") || !accessToken)
      return await axios
        .post(`${apiURL}/games/getAccessTokenGames`, { url: GET_ACCESS_TOKEN })
        .then((res) => {
          setAxiosHeader({
            ...axiosHeader,
            Authorization: `Bearer ${res.data.data.access_token}`,
          });
          setAccessToken(res.data.data.access_token);
          dispatch({ type: "LOADING_CHOSEN_GAME" });
          axios
            .post(`${apiURL}/games/gameBasedOnID/${id}`, {
              // gameID: game.id,
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
                "Client-ID": "5t9m4qnwuraip9o8mxg8avgcje9b3j",
                Authorization: `Bearer ${res.data.data.access_token}`,
              },
            })
            .then((result) => {
              dispatch({
                type: "SET_CURRENT_CHOSEN_GAME",
                payload: result.data.data,
              });
            });
        });
    else {
      dispatch({ type: "LOADING_CHOSEN_GAME" });
      axios
        .post(`${apiURL}/games/gameBasedOnID/${id}`, {
          // gameID: game.id,
          headers: {
            Accept: "application/json",
            "Content-Type": "text/plain",
            "Client-ID": "5t9m4qnwuraip9o8mxg8avgcje9b3j",
            Authorization: `Bearer ${
              localStorage.getItem("IDGB_Token")
                ? localStorage.getItem("IDGB_Token")
                : accessToken
            }`,
          },
        })
        .then((result) => {
          dispatch({
            type: "SET_CURRENT_CHOSEN_GAME",
            payload: result.data.data,
          });
        });
    }
    ///
  };
  //////////////////
  //open games based on ID;
  const openGamesBasedOnID = (game) => {
    dispatch({ type: "LOADING_CHOSEN_GAME" });
    axios
      .post(`${apiURL}/games/gameBasedOnID/${game.id}`, {
        // gameID: game.id,
        headers: axiosHeader,
      })
      .then((result) => {
        dispatch({
          type: "SET_CURRENT_CHOSEN_GAME",
          payload: result.data.data,
        });
      });
  };
  const searchGame = async (query) => {
    dispatch({ type: "LOAD_SEARCH_GAMES" });
    await axios
      .post(`${apiURL}/games/searchGame`, {
        query: query,
        accessToken: localStorage.getItem("IDGB_Token")
          ? localStorage.getItem("IDGB_Token")
          : accessToken,
      })
      .then((result) => {
        dispatch({ type: "SET_SEARCHED_GAME", payload: result.data });
      });
  };
  const getGamesDetails = (user) => {
    //userCurrentGames lis user, not user.gamesPurchased
    //must return array of game details

    dispatch({ type: "LOADING_GAME_DETAILS", payload: true });
    if (!accessToken && !localStorage.getItem("IDGB_Token"))
      axios
        .post(`${apiURL}/games/getAccessTokenGames`, { url: GET_ACCESS_TOKEN })
        .then((res) => {
          //res.data.data.access_token
          axios
            .post(`${apiURL}/games/getMultipleGames2`, {
              headers: {
                Accept: "application/json",
                "Content-Type": "text/plain",
                "Client-ID": "5t9m4qnwuraip9o8mxg8avgcje9b3j",
                Authorization: `Bearer ${res.data.data.access_token}`,
              },
              user: user,
            })
            .then((result) => {
              // return result.data.data;
              dispatch({
                type: "SET_GAME_DETAILS",
                payload: result.data.data,
              });
              return dispatch({ type: "LOADING_GAME_DETAILS", payload: false });
            });
        });
    else {
      axios
        .post(`${apiURL}/games/getMultipleGames2`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "text/plain",
            "Client-ID": "5t9m4qnwuraip9o8mxg8avgcje9b3j",
            Authorization: `Bearer ${localStorage.getItem("IDGB_Token")}`,
          },
          user: user,
        })
        .then((result) => {
          // return result.data.data;
          dispatch({
            type: "SET_GAME_DETAILS",
            payload: result.data.data,
          });
          return dispatch({ type: "LOADING_GAME_DETAILS", payload: false });
        });
    }
    ///
  };
  const gamesContextData = {
    gamesState,
    openGamesBasedOnID,
    openGamesBasedOnID2,
    // open_close_ModalSingleGamePictures,
    // setImageIDInPicModal,
    clearCurrentChosenGame,
    accessToken,
    getGamesDetails,
    searchGame,

    //fetch games for home data
    fetchRecentGames,
    fetchComingSoon,
    fetchMostAnticipated,

    //recentGames page
    fetchRecentGames1Month,

    //comingSoon page + pagination
    fetch_7d_comingSoon,
    fetch_gamesTillEndOfYear,
    makeCurrentPaginationPage,
    changePage,
    setStartPage,
    setEndPage,
    setFirstPage,
    setPreviousPage,
    setNextPage,
    setLastPage,

    //companies
    fetchCompanies,

    //games
    fetchGames,
  };
  return (
    <GamesContext.Provider value={gamesContextData}>
      {children}
    </GamesContext.Provider>
  );
};

export default GamesContextProvider;
