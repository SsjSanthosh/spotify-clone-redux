import React from "react";
import styles from "./Sidebar.module.scss";
import { Button } from "@chakra-ui/react";
import Image from "next/image";

import SpotifyLogo from "../../../public/images/spotify_logo_white.png";
import { NAVLINKS, USER_LINKS } from "./Sidebar.utils";
import { NavlinkType, UserActionLink } from "./Sidebar.types";
import axios from "axios";
const Sidebar = () => {
  const handleLogin = async () => {
    const rdata = await axios.get("/api/login");
    window.location.href = rdata.data.link;
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["logo-container"]}>
        <Image src={SpotifyLogo} alt="Spotify Logo" fill />
      </div>
      {/* Navlinks */}
      <div className={styles["navlinks-container"]}>
        {NAVLINKS.map((navlink: NavlinkType) => {
          return (
            <div className={styles["navlink-container"]} key={navlink.key}>
              {navlink.icon}
              <span className={styles["navlink-link"]}>{navlink.text}</span>
            </div>
          );
        })}
      </div>
      {/* User action links */}
      <div className={styles["navlinks-container"]}>
        {USER_LINKS.map((userLink: UserActionLink) => {
          return (
            <div className={styles["userlink-container"]} key={userLink.key}>
              <div className={`${styles["userlink-icon-container"]}`}>
                {userLink.icon}
              </div>
              <span className={styles["navlink-link"]}>{userLink.text}</span>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <span className={styles["sidebar-divider"]}></span>

      <Button colorScheme="teal" onClick={handleLogin}>
        Connect your spotify!
      </Button>
    </div>
  );
};

export default Sidebar;
