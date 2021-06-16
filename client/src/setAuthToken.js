import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["UserAuthorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["UserAuthorization"];
  }
};

export default setAuthToken;
