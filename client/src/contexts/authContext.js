import React, { createContext, useReducer, useEffect, useState } from "react";
import { authReducer } from "../reducers/authReducer";
import axios from "axios";
import setAuthToken from "../setAuthToken";
import { LOCAL_STORAGE_TOKEN_NAME, apiURL } from "../constants";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    isAuthed: false,
    loading: false,
    user: null,

    message: null,

    //gameIDs
    gameIDs: [],
  });
  const getGameIDsFromUser = () => {
    if (authState.user == null) return;

    dispatch({
      type: "GET_USER_GAMEIDS",
      payload: authState.user.gamesPurchased,
    });
  };
  const resetUser = () => {
    dispatch({ type: "RESET_USER" });
  };
  const login = async (userForm) => {
    dispatch({ type: "LOADING" });
    await axios.post(`${apiURL}/user/login`, userForm).then(async (res) => {
      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        await loadUser();
        return res.data;
      } else {
        alert(res.data.message);
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthed: false,
            user: null,
          },
        });
        return res.data.message;
      }
    });
  };
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthed: false, user: null },
    });
  };
  const register = async (userForm) => {
    dispatch({ type: "LOADING" });
    await axios.post(`${apiURL}/user/register`, userForm).then(async (res) => {
      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        await loadUser();
        return res.data;
      } else {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthed: false,
            user: null,
          },
        });
        return res.data.message;
      }
    });
  };
  const checkUserValid = () => {
    dispatch({ type: "LOADING" });
    let token = localStorage.getItem("user");
    axios
      .post(`${apiURL}/checkout/checkValidUser`, { token: token })
      .then((result) => {
        dispatch({
          type: "VERIFY_USER",
          payload: {
            isAuthed: true,
            user: result.data.found[0],
            message: "valid",
          },
        });
      })
      .catch((error) => {
        return dispatch({
          type: "VERIFY_USER",
          payload: { isAuthed: false, user: null, message: "malware" },
        });
      });
  };
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${apiURL}/user/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthed: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthed: false, user: null },
      });
    }
  };
  useEffect(() => {
    loadUser();
  }, []);
  const authContextData = {
    authState,
    login,
    register,
    logout,
    checkUserValid,
    resetUser,
    loadUser,
    getGameIDsFromUser,
  };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
