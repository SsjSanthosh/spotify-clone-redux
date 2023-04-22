import React from "react";
import { useSelector } from "react-redux";

import styles from "./Playlists.module.scss";
import { userSelector } from "redux/userSlice";
import Link from "next/link";

const Playlists = () => {
  const { playlists } = useSelector(userSelector);
  if (!playlists) return null;

  return (
    <div className={styles["container"]}>
      {playlists.map((pl) => {
        return (
          <div className={styles["playlist-item"]} key={pl.id}>
            <Link href={`/playlist/${pl.id}`}>
              {" "}
              <p>{pl.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Playlists;
