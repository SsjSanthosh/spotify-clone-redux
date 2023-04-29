import React from "react";
import styles from "./TrackTable.module.scss";

import { GenericObject, TrackType } from "utils/types";
import dayjs from "dayjs";
import Image from "next/image";
import { playPauseResource } from "utils/playbackFunctions";
import { useAppDispatch } from "redux/types";
import { fetchPlayerData } from "redux/playerSlice";
import { getDuration, handleFaveClick, putData } from "utils/functions";
import { FALLBACK_IMAGE } from "utils/constants";
import { nanoid } from "nanoid";
import SpotifyLink from "components/SpotifyLink";
import { AiOutlineClockCircle, AiOutlineHeart } from "react-icons/ai";
import { SAVE_TRACK_ENDPOINT } from "utils/endpoints";
import { useToast } from "@chakra-ui/react";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const TrackTable = ({
  tracks,
  album = false,
  albumInfo = null,
}: {
  tracks: TrackType[];
  album: boolean;
  albumInfo: null | GenericObject;
}) => {
  const dispatch = useAppDispatch();
  const handleTrack = async (track: TrackType) => {
    await playPauseResource({ uris: [track.uri] });
    dispatch(fetchPlayerData());
  };
  const toast = useToast();
  const toastId = "liked-song";

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <span className={styles["item-1"]}>#</span>
        <span className={styles["item-2"]}>Title</span>
        <span className={styles["item-3"]}>Album</span>
        <span className={styles["item-4"]}> </span>
        <span className={styles["item-5"]}>
          <AiOutlineClockCircle size={18} />
        </span>
      </div>
      <div className={styles["tracks"]}>
        {tracks.map((track: TrackType, idx: number) => {
          if (!!track.name.length) {
            const imageSrc = !!track.album?.images.length
              ? track.album.images[0].url
              : FALLBACK_IMAGE;
            return (
              <div className={styles["track"]} key={nanoid()}>
                <div className={`${styles["item-1"]}`}>{idx + 1}</div>
                <div
                  className={`${styles["item-2"]} ${styles["track-container"]}`}
                >
                  {!album && (
                    <div className={styles["track-image"]}>
                      <Image
                        src={imageSrc}
                        width={40}
                        height={40}
                        alt={track.album.name}
                      />
                    </div>
                  )}
                  <div className={styles["track-title"]}>
                    <p
                      className={styles["track-name"]}
                      onClick={() => handleTrack(track)}
                    >
                      {track.name}
                    </p>
                    <span className={styles["track-artists"]}>
                      {Array.isArray(track.artists) &&
                        track.artists.map((art, i) => {
                          return (
                            <span
                              className={styles["track-artist"]}
                              key={art.id}
                            >
                              <SpotifyLink
                                link={`/artist/${art.id}`}
                                text={art.name}
                              />
                              {i !== (track.artists?.length as number) - 1 && (
                                <>,</>
                              )}
                            </span>
                          );
                        })}
                    </span>
                  </div>
                </div>
                <div className={styles["item-3"]}>
                  <p className={styles["track-album"]}>
                    <SpotifyLink
                      text={album ? albumInfo?.name : track.album.name}
                      link={`/album/${album ? albumInfo?.id : track.album.id}`}
                    />
                  </p>
                </div>
                <div className={styles["item-4"]}>
                  <AiOutlineHeart
                    size={18}
                    onClick={() => {
                      handleFaveClick(track.id);
                      if (!toast.isActive(toastId)) {
                        toast({
                          position: "top",
                          description: "Added to your liked songs.",
                          id: toastId,
                        });
                      }
                    }}
                  />
                </div>
                <div className={styles["item-5"]}>
                  {getDuration(track.duration_ms)}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default TrackTable;
