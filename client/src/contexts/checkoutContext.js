import React, { useReducer, createContext } from "react";
import { apiURL } from "../constants";
import axios from "axios";
import { checkoutReducer } from "../reducers/checkoutReducer";
import { GET_ACCESS_TOKEN } from "../constants";
export const CheckoutContext = createContext();
const CheckoutContextProvidder = ({ children }) => {
  const [checkoutState, dispatch] = useReducer(checkoutReducer, {
    addButtonDisable: false,
    listGamesCheckout: [],
    loadingListGameCheckout: true,
    //
    loadVerifyUser: false,
    //open modal
    openModal: false,
    checkoutModalType: null,

    //load checkout
    loadCheckout: false,
    doneCheckout: null,
  });
  const restartCheckoutStatus = () => {
    dispatch({ type: "RESTART_CHECKOUT_STATUS" });
  };

  const checkout = () => {
    closeModal();
    axios
      .post(`${apiURL}/checkout/finalCheckout`, {
        userID: localStorage.getItem("user"),
        cartItems: checkoutState.listGamesCheckout.map((e) => e.id),
      })
      .then((result) => {
        localStorage.setItem("cartItems", JSON.stringify([]));
        return dispatch({ type: "DONE_CHECKOUT" });
      });
  };
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  const addItemBasedOnID = (gameID) => {
    dispatch({ type: "DISABLE_BUTTON_ADD", payload: true });
    let currentLocal = localStorage.getItem("cartItems");
    if (currentLocal == null || currentLocal == undefined)
      return localStorage.setItem(
        "cartItems",
        JSON.stringify((gameID + "").split())
      );
    currentLocal = JSON.stringify([
      ...new Set(JSON.parse(currentLocal).concat((gameID + "").split())),
    ]);

    return localStorage.setItem("cartItems", currentLocal);
  };
  const listGamesForCheckout = () => {
    if (
      localStorage.getItem("cartItems") == null ||
      localStorage.getItem("cartItems") == undefined
    )
      return dispatch({ type: "SET_LIST_GAMES_CHECKOUT", payload: [] });
    const stringIDS = JSON.parse(localStorage.getItem("cartItems"))
      .map((each) => parseFloat(each))
      .toString();
    axios
      .post(`${apiURL}/checkout/getListGameCheckout`, {
        stringIDS: stringIDS,
        tokenLink: GET_ACCESS_TOKEN,
      })
      .then((res) => {
        dispatch({ type: "SET_CHECKOUT_ITEMS", payload: res.data.data });
      });
  };
  const removeItemFromCart = (gameID) => {
    const newCart = JSON.parse(localStorage.getItem("cartItems")).filter(
      (each) => each !== gameID + ""
    );
    localStorage.setItem("cartItems", JSON.stringify(newCart));

    dispatch({ type: "DISABLE_BUTTON_ADD", payload: false });
  };
  const removeItemFromModal = (gameID) => {
    const newCart = JSON.parse(localStorage.getItem("cartItems")).filter(
      (each) => each !== gameID + ""
    );

    localStorage.setItem("cartItems", JSON.stringify(newCart));
    dispatch({
      type: "SET_CHECKOUT_ITEMS2",
      payload: checkoutState.listGamesCheckout.filter((e) => e.id !== gameID),
    });
  };
  const removeItemFromCartCheckout = (gameID) => {
    dispatch({ type: "LOADING_CHECKOUT_CART" });
    const newCart = JSON.parse(localStorage.getItem("cartItems")).filter(
      (each) => each !== gameID + ""
    );
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    dispatch({ type: "REMOVE_1_GAME_FROM_CHECKOUT", payload: gameID });
  };
  const checkIfItemIsAdded = (gameID) => {
    if (!localStorage.getItem("cartItems"))
      localStorage.setItem("cartItems", JSON.stringify([]));
    JSON.parse(localStorage.getItem("cartItems")).indexOf(gameID + "") > -1
      ? dispatch({ type: "DISABLE_BUTTON_ADD", payload: true })
      : dispatch({ type: "DISABLE_BUTTON_ADD", payload: false });
  };

  const checkValidUser = () => {
    dispatch({ type: "LOAD_VERIFY_USER" });
    let token = localStorage.getItem("user");

    axios
      .post(`${apiURL}/checkout/checkValidUser`, { token: token })
      .then((res) => {
        // console.log(res.data);
        if (res.data.success) return dispatch({ type: "OPEN_CHECKOUT_MODAL" });
        if (res.data.message == "token not found")
          return dispatch({ type: "OPEN_CHECKOUT_MODAL_ASK_LOGIN" });
        if (res.data.message == "malware token")
          return dispatch({ type: "OPEN_CHECKOUT_MODAL_MALWARE_TOKEN" });
      });
  };
  const checkoutContextData = {
    checkoutState,
    addItemBasedOnID,
    checkIfItemIsAdded,
    removeItemFromCart,
    listGamesForCheckout,
    removeItemFromCartCheckout,
    ///
    checkValidUser,
    ///
    closeModal,
    removeItemFromModal,

    //checkout
    checkout,
    //+ add items id to user gameArr
    //+ clear localStorage
    //+ push to thank you page

    restartCheckoutStatus,
  };
  return (
    <CheckoutContext.Provider value={checkoutContextData}>
      {children}
    </CheckoutContext.Provider>
  );
};
export default CheckoutContextProvidder;
