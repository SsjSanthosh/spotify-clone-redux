import React, { useContext, useEffect } from "react";
import { AppLayoutProps } from "./AppLayout.types";
import Sidebar from "../Sidebar/Sidebar";

import styles from "./AppLayout.module.scss";
import { UserContextType } from "context/types";
import { UserContext } from "context/user";

const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, fetchUser, fetchPlaylists } = useContext(
    UserContext
  ) as UserContextType;
  useEffect(() => {
    const fetchUserAndPlaylists = async () => {
      await fetchUser();
      await fetchPlaylists();
    };
    fetchUserAndPlaylists();
  }, []);
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
