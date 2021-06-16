export const gamesReducer = (state, action) => {
  switch (action.type) {
    case "LOADING_LATEST_GAMES": {
      return { ...state, latestGamesLoading: true };
    }
    case "SET_LATEST_GAMES": {
      return {
        ...state,
        latestGames: action.payload,
        latestGamesLoading: false,
      };
    }
    case "LOADING_CHOSEN_GAME": {
      return { ...state, loadingChosenGame: true };
    }

    case "SET_CURRENT_CHOSEN_GAME": {
      console.log(action.payload);
      return {
        ...state,
        currentChosenGame: action.payload,
        loadingChosenGame: false,
      };
    }

    case "CLEAR_CURRENT_CHOSEN_GAME": {
      return { ...state, currentChosenGame: null };
    }
    case "LOAD_SEARCH_GAMES": {
      return { ...state, loadSearchGames: true };
    }
    case "SET_SEARCHED_GAME": {
      const nonUndeArr = action.payload.data.filter(
        (each) => each.total_rating != undefined
      );
      const sortedRatingGame = nonUndeArr.sort(
        (a, b) => parseFloat(b.total_rating) - parseFloat(a.total_rating)
      );
      const undArr = action.payload.data.filter(
        (each) => each.total_rating == undefined
      );
      const arr = sortedRatingGame.concat(undArr);
      return {
        ...state,
        searchedGames: arr,
        loadSearchGames: false,
      };
    }
    case "LOADING_GAME_DETAILS": {
      return { ...state, loadGameDetails: action.payload };
    }
    case "SET_GAME_DETAILS": {
      return { ...state, gameDetails: action.payload };
    }
    case "LOAD_RECENT_GAMES": {
      return { ...state, loadRecentGames: action.payload };
    }
    case "SET_RECENT_GAMES": {
      let a = action.payload;

      a = a.filter(
        (v, i, a) => a.findIndex((t) => t.game.name === v.game.name) === i
      );

      return { ...state, recentGames: a };
    }
    case "LOAD_COMING_SOON": {
      return { ...state, loadComingSoon: action.payload };
    }
    case "SET_COMING_SOON": {
      let a = action.payload;

      a = a.filter(
        (v, i, a) => a.findIndex((t) => t.game.name === v.game.name) === i
      );

      return { ...state, comingSoon: a };
    }
    case "LOAD_MOST_ANTICIPATED": {
      return { ...state, loadMostAnticipated: action.payload };
    }
    case "SET_MOST_ANTICIPATED": {
      let a = action.payload;
      a = a.filter((v, i, a) => a.findIndex((t) => t.name === v.name) === i);

      return { ...state, mostAnticipated: a };
    }
    case "LOAD_COMPANIES": {
      return { ...state, loadCompanies: action.payload };
    }
    case "SET_COMPANIES": {
      return { ...state, companies: action.payload };
    }
    case "LOAD_GAMES": {
      return { ...state, loadGames: action.payload };
    }
    case "SET_GAMES": {
      return { ...state, games: action.payload.slice(0, 100) };
    }
    case "LOAD_RECENT_GAMES_1_MONTH": {
      return { ...state, loadRecentGame1Month: action.payload };
    }
    case "SET_RECENT_GAMES_1_MONTH": {
      let a = action.payload;
      a = a.filter(
        (v, i, a) => a.findIndex((t) => t.game.name === v.game.name) === i
      );

      return {
        ...state,
        recentGame1Month: a,
        loadRecentGame1Month: false,
      };
    }
    case "LOAD_D_COMINGSOON": {
      return {
        ...state,
        load_7d_ComingSoon: action.payload,
        load_14d_ComingSoon: action.payload,
      };
    }
    case "SET_D_COMINGSOON": {
      let a = action.payload;
      a = a.filter(
        (v, i, a) => a.findIndex((t) => t.game.name === v.game.name) === i
      );
      if (action.days == 7)
        return { ...state, coming_7d_Soon: a, load_7d_ComingSoon: false };
      else return { ...state, coming_14d_Soon: a, load_14d_ComingSoon: false };
    }
    case "LOAD_GAME_TILL_END_YEAR": {
      return { ...state, loadCommingGamesTillEndOfYear: action.payload };
    }
    case "SET_GAME_TILL_END_YEAR": {
      let a = action.payload;
      a = a.filter(
        (v, i, a) => a.findIndex((t) => t.game.name === v.game.name) === i
      );
      return {
        ...state,
        gamesTillEndOfYear: a,
      };
    }
    case "SET_START_PAGE": {
      return { ...state, startPage: action.payload };
    }
    case "SET_END_PAGE": {
      return { ...state, endPage: action.payload };
    }
    case "SET_FIRST_PAGE": {
      return { ...state, startPage: 1, endPage: 5 };
    }
    case "SET_LAST_PAGE": {
      return {
        ...state,
        startPage: Math.floor(state.gamesTillEndOfYear.length / 10) - 4,
        endPage: Math.floor(state.gamesTillEndOfYear.length / 10),
      };
    }
    case "LOAD_PAGINATION_PAGES": {
      return { ...state, loadPaginationPages: action.payload };
    }
    case "MAKE_CURRENT_PAGINATION_PAGE": {
      return {
        ...state,
        loadPaginationPages: false,
      };
    }
    case "CHANGE_PAGE": {
      return { ...state, currentActivePage: action.payload };
    }
    case "SET_PREVIOUS_PAGE": {
      if (state.startPage > 1) {
        return {
          ...state,
          endPage: state.startPage + 3,
          startPage: state.startPage - 1,
        };
      }
    }
    case "SET_NEXT_PAGE": {
      if (state.currentActivePage > state.endPage) {
        return {
          ...state,
          endPage: state.endPage + 1,
          startPage: state.startPage + 1,
        };
      }
    }
    default:
      return state;
  }
};
