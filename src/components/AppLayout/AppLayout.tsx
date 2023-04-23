import React, { useContext, useEffect } from "react";
import { AppLayoutProps } from "./AppLayout.types";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";

import styles from "./AppLayout.module.scss";
import { fetchPlaylists, fetchProfile, userSelector } from "redux/userSlice";
import { useAppDispatch } from "redux/types";
import SearchBar from "components/SearchBar";

const AppLayout = ({ children }: AppLayoutProps) => {
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();
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
  return (
    <div className={styles["container"]}>
      <div className={styles["sidebar-container"]}>
        <Sidebar />
      </div>
      <div className={styles["content-container"]}>
        <SearchBar />
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
