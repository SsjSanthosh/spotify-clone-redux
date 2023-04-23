import React, { useContext, useEffect } from "react";
import { AppLayoutProps } from "./AppLayout.types";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";

import styles from "./AppLayout.module.scss";
import { fetchPlaylists, fetchProfile, userSelector } from "redux/userSlice";
import { useAppDispatch } from "redux/types";
import SearchBar from "components/SearchBar";
import UserPill from "components/UserPill";
import { useRouter } from "next/router";
import { fetchPlayerData, playerSelector } from "redux/playerSlice";

const AppLayout = ({ children }: AppLayoutProps) => {
  const user = useSelector(userSelector);
  const player = useSelector(playerSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // get user
  useEffect(() => {
    if (!user.profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, user.profile]);
  // get playlists
  useEffect(() => {
    if (user.profile?.id && !user.playlists) {
      dispatch(fetchPlaylists());
    }
  }, [user.profile, dispatch, user.playlists]);

  // fetch player
  useEffect(() => {
    dispatch(fetchPlayerData());
  }, [dispatch]);
  return (
    <div className={styles["container"]}>
      <div className={styles["sidebar-container"]}>
        <Sidebar />
      </div>
      <div className={styles["content-container"]}>
        <div className={styles["top-bar-container"]}>
          <SearchBar />
          <UserPill />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
