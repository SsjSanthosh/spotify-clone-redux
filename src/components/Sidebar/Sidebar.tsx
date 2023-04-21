import React from "react";
import styles from "./Sidebar.module.scss";
import Image from "next/image";

import SpotifyLogo from "../../../public/images/spotify_logo_white.png";
const Sidebar = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["logo-container"]}>
        <Image src={SpotifyLogo} alt="Spotify Logo" layout="fill" />
      </div>
    </div>
  );
};

export default Sidebar;
