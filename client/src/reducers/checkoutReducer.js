export const checkoutReducer = (state, action) => {
  switch (action.type) {
    case "DISABLE_BUTTON_ADD": {
      return { ...state, addButtonDisable: action.payload };
    }
    case "SET_LIST_GAMES_CHECKOUT": {
      return {
        ...state,
        listGamesCheckout: [],
        loadingListGameCheckout: false,
      };
    }
    case "SET_CHECKOUT_ITEMS": {
      return {
        ...state,
        listGamesCheckout: action.payload,
        loadingListGameCheckout: false,
      };
    }
    case "SET_CHECKOUT_ITEMS2": {
      return { ...state, listGamesCheckout: action.payload };
    }
    case "LOADING_CHECKOUT_CART": {
      return { ...state, loadingListGameCheckout: true };
    }
    case "REMOVE_1_GAME_FROM_CHECKOUT": {
      const newList = state.listGamesCheckout.filter(
        (each) => each.id !== action.payload
      );
      return {
        ...state,
        listGamesCheckout: newList,
        loadingListGameCheckout: false,
      };
    }
    case "LOAD_VERIFY_USER": {
      return { ...state, loadVerifyUser: true };
    }
    //REMEMBER TO turn loadverifyuser to false
    case "OPEN_CHECKOUT_MODAL": {
      return {
        ...state,
        loadVerifyUser: false,
        checkoutModalType: "OPEN_CHECKOUT_MODAL",
        openModal: true,
      };
    }
    case "OPEN_CHECKOUT_MODAL_ASK_LOGIN": {
      return {
        ...state,
        loadVerifyUser: false,
        checkoutModalType: "OPEN_CHECKOUT_MODAL_ASK_LOGIN",
        openModal: true,
      };
    }
    case "OPEN_CHECKOUT_MODAL_MALWARE_TOKEN": {
      return {
        ...state,
        loadVerifyUser: false,
        checkoutModalType: "OPEN_CHECKOUT_MODAL_MALWARE_TOKEN",
        openModal: true,
      };
    }
    case "CLOSE_MODAL": {
      return { ...state, openModal: false };
    }
    case "DONE_CHECKOUT": {
      return { ...state, doneCheckout: true };
    }
    case "RESTART_CHECKOUT_STATUS": {
      return { ...state, doneCheckout: null };
    }
    default:
      return state;
  }
};
