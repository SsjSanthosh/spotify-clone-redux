import React from "react";
import { AppLayoutProps } from "./AppLayout.types";
import Sidebar from "../Sidebar/Sidebar";

import styles from "./AppLayout.module.scss";

const AppLayout = ({ children }: AppLayoutProps) => {
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
