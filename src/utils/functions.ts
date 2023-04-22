import axios from "axios";
import Cookies from "js-cookie";
import { BASE_ENDPOINT } from "./constants";

export const isTokenAvailable = () => {
  return Cookies.get("token");
};

export const setLocalToken = (token: string) => {
  const expireTime = new Date(new Date().getTime() + 59 * 60 * 1000);
  Cookies.set("token", token, {
    expires: expireTime,
  });
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeToken = () => {
  Cookies.remove("token");
  axios.defaults.headers.common["Authorization"] = "";
};

export const fetchData = async (resource: string) => {
  const endpoint = BASE_ENDPOINT + resource;
  const rdata = await axios.get(endpoint);
  return rdata.data;
};
