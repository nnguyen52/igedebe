export const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH": {
      return {
        ...state,
        isAuthed: action.payload.isAuthed,
        user: action.payload.user,
        loading: false,
      };
    }
    case "LOADING": {
      return { ...state, loading: true };
    }
    case "VERIFY_USER": {
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        isAuthed: action.payload.isAuthed,
        message: action.payload.message,
      };
    }
    case "RESET_USER": {
      return {
        ...state,
        loading: false,
        isAuthed: false,
        user: null,
        message: null,
      };
    }
    case "GET_USER_GAMEIDS": {
      return { ...state, gameIDs: action.payload };
    }

    default:
      return state;
  }
};
