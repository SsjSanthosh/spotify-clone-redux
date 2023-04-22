import { createSlice } from "@reduxjs/toolkit";
import { removeToken, setLocalToken } from "utils/functions";
import { AuthType } from "utils/types";
import { RootReduxState } from "./types";

const initialState: AuthType = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }: { payload: AuthType }) => {
      if (payload.token) {
        state.token = payload.token;
        setLocalToken(payload.token);
      }
    },
    deleteToken: (state) => {
      state.token = null;
      removeToken();
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, deleteToken } = authSlice.actions;
export const authSelector = (state: RootReduxState) => state.auth;

export default authSlice.reducer;
