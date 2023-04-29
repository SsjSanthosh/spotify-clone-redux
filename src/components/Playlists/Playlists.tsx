import React from "react";
import { useSelector } from "react-redux";

import styles from "./Playlists.module.scss";
import { userSelector } from "redux/userSlice";
import Link from "next/link";
import { SkeletonText } from "@chakra-ui/react";
import { HiSpeakerWave } from "react-icons/hi2";
import { COMMON_SKELETON_PROPS } from "utils/constants";
import { playerSelector } from "redux/playerSlice";
import { putData } from "utils/functions";
import { PLAYER_PLAY_ENDPOINT } from "utils/endpoints";

const Playlists = () => {
  const { playlists } = useSelector(userSelector);
  const { player } = useSelector(playerSelector);
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
  const handlePlay = async (uri: string) => {
    await putData(PLAYER_PLAY_ENDPOINT, { context_uri: uri });
  };
  return (
    <div className={styles["container"]}>
      {playlists.map((pl) => {
        const isActive = player?.is_playing && player.context?.uri === pl.uri;
        return (
          <div
            className={styles["playlist-item"]}
            key={pl.id}
            onDoubleClick={() => handlePlay(pl.uri)}
          >
            <div className={styles["playlist-link"]}>
              <Link href={`/playlist/${pl.id}`}>
                {" "}
                <p>{pl.name}</p>
              </Link>
            </div>
            {isActive && (
              <HiSpeakerWave className={styles["playlist-active"]} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Playlists;
