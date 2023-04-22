import React from "react";
import styles from "./TrackTable.module.scss";

import { TrackType } from "utils/types";
import dayjs from "dayjs";
import Image from "next/image";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const TrackTable = ({ tracks }: { tracks: TrackType[] }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <span className={styles["item-1"]}>#</span>
        <span className={styles["item-2"]}>Title</span>
        <span className={styles["item-3"]}>Album</span>
        <span className={styles["item-4"]}>Date added</span>
        <span className={styles["item-5"]}>Liked</span>
        <span className={styles["item-6"]}>Duration</span>
      </div>
      <div className={styles["tracks"]}>
        {tracks.map((song: TrackType, idx: number) => {
          const { track } = song;
          return (
            <div className={styles["track"]} key={song.id}>
              <div className={`${styles["item-1"]}`}>{idx + 1}</div>
              <div
                className={`${styles["item-2"]} ${styles["track-container"]}`}
              >
                <div className={styles["track-image"]}>
                  <Image
                    src={track.album.images[0].url}
                    width={40}
                    height={40}
                    alt={track.album.name}
                  />
                </div>
                <div className={styles["track-title"]}>
                  <span>{track.name}</span>
                  <span className={styles["track-artists"]}>{track.artists?.map((art) => art.name).join(",")}</span>
                </div>
              </div>
              <div className={styles["item-3"]}>{track.album?.name}</div>
              <div className={styles["item-4"]}>
                {dayjs(song.added_at).from()}
              </div>
              <div className={styles["item-5"]}>No</div>
              <div className={styles["item-6"]}>
                {dayjs(track.duration_ms).format("mm:ss")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackTable;
