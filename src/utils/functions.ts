import axios from "axios";
import Cookies from "js-cookie";
import { BASE_ENDPOINT } from "./constants";
import dayjs from "dayjs";
import { GenericObject } from "./types";

import duration from "dayjs/plugin/duration";
import { store } from "redux/store";
import { clearUser } from "redux/userSlice";
import { deleteToken } from "redux/authSlice";
import { clearPlayer } from "redux/playerSlice";
import { useToast } from "@chakra-ui/react";
dayjs.extend(duration);

export const isTokenAvailable = () => {
  return Cookies.get("token");
};

export const raxios = axios.create({
  baseURL: BASE_ENDPOINT,
  timeout: 10000,
});

raxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log({ error });
    if (error.response.status === 401) {
      store.dispatch(clearUser());
      store.dispatch(deleteToken());
      store.dispatch(clearPlayer());
      window.location.href = "/login";
      // toast({
      //   description:
      //     "Your token has expired, please click the button below to connect your account and continue using this application",
      //   status: "error",
      // });
    }
    return Promise.reject(error);
  }
);

export const setLocalToken = (token: string) => {
  const expireTime = new Date(new Date().getTime() + 59 * 60 * 1000);
  Cookies.set("token", token, {
    expires: expireTime,
  });
  raxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeToken = () => {
  Cookies.remove("token");
  raxios.defaults.headers.common["Authorization"] = "";
};

export const fetchData = async (resource: string) => {
  const rdata = await raxios.get(resource);
  return rdata.data;
};

export const postData = async (resource: string, body: GenericObject) => {
  await raxios.post(resource, body);
};

export const putData = async (resource: string, body: GenericObject) => {
  await raxios.put(resource, body);
};

export const trimString = (str: string, limit: number) => {
  if (str.length < limit) return str;
  return str.slice(0, limit) + "...";
};

export const getDuration = (duration_ms: number) => {
  return dayjs.duration(duration_ms).format("mm:ss");
};
