export const userReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MODAL_IMAGE": {
      return { ...state, openModalImage: true };
    }
    case "CLOSE_MODAL_IMAGE": {
      return { ...state, openModalImage: false, loadingChangingAvatar: null };
    }
    case "LOADING_AVATAR": {
      return { ...state, loadingChangingAvatar: action.payload };
    }
    case "SET_AVATAR": {
      return { ...state, newImgURL: action.payload };
    }
    default:
      return state;
  }
};
