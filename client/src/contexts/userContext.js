import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";
import { apiURL } from "../constants";
import { userReducer } from "../reducers/userReducer";
import { AuthContext } from "../contexts/authContext";

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const {
    authState: { user },
    loadUser,
  } = useContext(AuthContext);

  const [userState, dispatch] = useReducer(userReducer, {
    //image modal
    openModalImage: false,
    newImgURL: null,
    loadingChangingAvatar: null,
  });
  const onchangeImage = (imageUrl) => {
    // dispatch({ type: "LOADING_AVATAR", payload: true });
    dispatch({ type: "SET_AVATAR", payload: imageUrl });
    // return dispatch({ type: "LOADING_AVATAR", payload: false });
  };

  const openModalImageFnc = () => {
    dispatch({ type: "OPEN_MODAL_IMAGE" });
  };
  const closeModalImageFnc = () => {
    dispatch({ type: "CLOSE_MODAL_IMAGE" });
    return loadUser();
  };
  const updateAvatar = () => {
    axios
      .post(`${apiURL}/user/updateAvatar`, {
        imgURL: userState.newImgURL,
        user: user,
      })
      .then((result) => {
        dispatch({ type: "SET_AVATAR", payload: null });

        return closeModalImageFnc();
      });
  };
  const userContextData = {
    userState,
    openModalImageFnc,
    closeModalImageFnc,
    onchangeImage,
    updateAvatar,
  };

  return (
    <UserContext.Provider value={userContextData}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
