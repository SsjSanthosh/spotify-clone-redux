import { createSlice } from "@reduxjs/toolkit";
import { ThemeType } from "utils/types";
import { RootReduxState } from "./types";

const initialState: ThemeType = {
  contextColor: null,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setContextColor: (state, { payload }: { payload: ThemeType }) => {
      state.contextColor = payload.contextColor;
    },
    resetContextColor: (state) => {
      state.contextColor = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setContextColor, resetContextColor } = themeSlice.actions;
export const themeSelector = (state: RootReduxState) => state.theme;

export default themeSlice.reducer;
