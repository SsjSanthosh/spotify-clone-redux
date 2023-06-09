import React from "react";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import SpotifyLogo from "../../../public/images/spotify_logo_white.png";
import { NAVLINKS, USER_LINKS } from "./Sidebar.utils";
import { NavlinkType, UserActionLink } from "./Sidebar.types";
import Playlists from "components/Playlists";
import Link from "next/link";
import { useRouter } from "next/router";
const Sidebar = () => {
  const router = useRouter();
  return (
    <div className={styles["container"]}>
      <div className={styles["sidebar-top-half"]}>
        <div className={styles["logo-container"]}>
          <Image src={SpotifyLogo} alt="Spotify Logo" fill priority />
        </div>
        {/* Navlinks */}
        <div className={styles["navlinks-container"]}>
          {NAVLINKS.map((navlink: NavlinkType) => {
            const active = navlink.link === router.asPath;
            return (
              <Link key={navlink.key} href={navlink.link as string}>
                <div
                  className={`${styles["navlink-container"]} ${
                    active && styles["navlink-container-active"]
                  }`}
                >
                  {navlink.icon}
                  <span className={styles["navlink-link"]}>{navlink.text}</span>
                </div>
              </Link>
            );
          })}
        </div>
        {/* User action links */}
        <div className={styles["navlinks-container"]}>
          {USER_LINKS.map((userLink: UserActionLink) => {
            return (
              <Link href={userLink.link as string} key={userLink.key}>
                <div className={styles["userlink-container"]}>
                  <div className={`${styles["userlink-icon-container"]}`}>
                    {userLink.icon}
                  </div>
                  <span className={styles["navlink-link"]}>
                    {userLink.text}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <span className={styles["sidebar-divider"]}></span>

      {/* Playlist links */}
      <div className={styles["playlists-container"]}>
        <Playlists />
      </div>
    </div>
  );
};

export default Sidebar;
