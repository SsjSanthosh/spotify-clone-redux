import React, { useContext, useEffect } from "react";
import { AppLayoutProps } from "./AppLayout.types";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";

import styles from "./AppLayout.module.scss";
import { fetchPlaylists, fetchProfile, userSelector } from "redux/userSlice";
import { useAppDispatch } from "redux/types";

const AppLayout = ({ children }: AppLayoutProps) => {
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();
  // get user
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  // get playlists
  useEffect(() => {
    if (user.profile?.id) {
      dispatch(fetchPlaylists());
    }
  }, [user.profile, dispatch]);
  return (
    <div className={styles["container"]}>
      <div className={styles["sidebar-container"]}>
        <Sidebar />
      </div>
      <div className={styles["content-container"]}>{children}</div>
    </div>
  );
};

export default AppLayout;
