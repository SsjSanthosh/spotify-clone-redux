import axios from "axios";
import { BASE_ENDPOINT } from "./constants";

export const setAxiosToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const fetchData = async (resource: string) => {
  const endpoint = BASE_ENDPOINT + resource;
  try {
    const rdata = await axios.get(endpoint);
    return { data: rdata.data, error: null };
  } catch (err) {
    console.log({ err });
    return { data: null, error: true };
  }
};
