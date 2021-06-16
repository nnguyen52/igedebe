//dark hexcode :#343a40
import axios from "axios";

export const apiURL = "https://igeedb.herokuapp.com";
export const clientApiURL =
  window.location.href.split("//")[1].split("/")[0] == "localhost:3000"
    ? "http://localhost:3000"
    : "netlify-url";
export const LOCAL_STORAGE_TOKEN_NAME = "user";
export const GET_ACCESS_TOKEN =
  "https://id.twitch.tv/oauth2/token?client_id=5t9m4qnwuraip9o8mxg8avgcje9b3j&client_secret=d2xzgjxku7m9ontmfhf7u6q52ylojk&grant_type=client_credentials";
export const headers = (accessToken) => {
  return {
    Accept: "application/json",
    "Content-Type": "text/plain",
    "Client-ID": "5t9m4qnwuraip9o8mxg8avgcje9b3j",
    Authorization: `Bearer ${accessToken}`,
  };
};
