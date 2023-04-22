import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthType, UserType } from "utils/types";
import { RootReduxState } from "./types";
import { fetchData } from "utils/functions";
import { MY_PROFILE_ENDPOINT, USER_PLAYLISTS_ENDPOINT } from "utils/endpoints";

const initialState: UserType = {
  profile: null,
  playlists: null,
  loading: false,
};

export const fetchProfile = createAsyncThunk("user/fetchProfile", async () => {
  return fetchData(MY_PROFILE_ENDPOINT);
});

export const fetchPlaylists = createAsyncThunk(
  "user/fetchPlaylists",
  async (_, { getState }) => {
    const { user } = getState() as { user: UserType };
    if (user.profile?.id) {
      return fetchData(
        USER_PLAYLISTS_ENDPOINT.replace("{user_id}", user.profile.id)
      );
    } else {
      throw "Invalid profile";
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = false;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.profile = null;
      state.error = true;
    });
    // playlists
    builder.addCase(fetchPlaylists.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      state.loading = false;
      state.playlists = action.payload.items;
      state.error = false;
    });
    builder.addCase(fetchPlaylists.rejected, (state, action) => {
      state.loading = false;
      state.profile = null;
      state.error = true;
    });
  },
});

export const userSelector = (state: RootReduxState) => state.user;

export default userSlice.reducer;
