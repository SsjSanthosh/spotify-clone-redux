import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "utils/functions";
import { PlayerType } from "utils/types";
import { RootReduxState } from "./types";
import { PLAYER_ENDPOINT } from "utils/endpoints";

const initialState: PlayerType = {
  player: null,
  loading: false,
  error: null,
};

export const fetchPlayerData = createAsyncThunk(
  "player/fetchPlayerData",
  async () => {
    return fetchData(PLAYER_ENDPOINT);
  }
);

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setVolume: (state, { payload }) => {
      if (state.player) {
        state.player.device.volume_percent = payload.volume;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlayerData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPlayerData.fulfilled, (state, action) => {
      state.loading = false;
      state.player = action.payload || null;
      state.error = null;
    });
    builder.addCase(fetchPlayerData.rejected, (state, action) => {
      state.loading = false;
      state.player = null;
      state.error = "Could not fetch player data";
    });
  },
});

// Action creators are generated for each case reducer function
export const { setVolume } = playerSlice.actions;
export const playerSelector = (state: RootReduxState) => state.player;

export default playerSlice.reducer;
