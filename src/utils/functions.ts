import axios from "axios";

export const setAxiosToken = (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
