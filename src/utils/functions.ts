import axios from "axios";
import Cookies from "js-cookie";
import { BASE_ENDPOINT } from "./constants";
import dayjs from "dayjs";
import { GenericObject } from "./types";

import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

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

export const postData = async (resource: string, body: GenericObject) => {
  const endpoint = BASE_ENDPOINT + resource;
  await axios.post(endpoint, body);
};

export const putData = async (resource: string, body: GenericObject) => {
  const endpoint = BASE_ENDPOINT + resource;
  await axios.put(endpoint, body);
};

export const trimString = (str: string, limit: number) => {
  if (str.length < limit) return str;
  return str.slice(0, limit) + "...";
};

export const getDuration = (duration_ms: number) => {
  return dayjs.duration(duration_ms).format("mm:ss");
};
