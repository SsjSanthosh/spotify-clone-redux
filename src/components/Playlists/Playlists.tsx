import React from "react";
import { useSelector } from "react-redux";

import styles from "./Playlists.module.scss";
import { userSelector } from "redux/userSlice";
import Link from "next/link";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { COMMON_SKELETON_PROPS } from "utils/constants";

const Playlists = () => {
  const { playlists } = useSelector(userSelector);
  if (!playlists)
    return (
      <div className={styles["skeleton-container"]}>
        <SkeletonText
          noOfLines={10}
          height={8}
          {...COMMON_SKELETON_PROPS}
          spacing={4}
        />
      </div>
    );

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
