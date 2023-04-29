import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import styles from "./PlayerBar.module.scss";
import { useSelector } from "react-redux";
import { fetchPlayerData, playerSelector } from "redux/playerSlice";
import { BsRepeat, BsRepeat1, BsShuffle } from "react-icons/bs";
import { fetchData, postData, putData } from "utils/functions";
import {
  PLAYER_NEXT_ENDPOINT,
  PLAYER_PAUSE_ENDPOINT,
  PLAYER_PLAY_ENDPOINT,
  PLAYER_PREV_ENDPOINT,
  PLAYER_REPEAT_ENDPOINT,
  PLAYER_SHUFFLE_ENDPOINT,
} from "utils/endpoints";
import { useAppDispatch } from "redux/types";
import Image from "next/image";
import Volumebar from "components/Volumebar";
import SongSeekBar from "components/SongSeekBar";
import { useToast } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import SpotifyLink from "components/SpotifyLink";

const PlayerBar = () => {
  const { player } = useSelector(playerSelector);
  const dispatch = useAppDispatch();
  const isPlayerActive = player?.is_playing || player?.device.is_active;
  const toast = useToast();
  const PlayPauseIcon = () => {
    return player?.is_playing ? (
      <AiFillPauseCircle className={styles["play-icon"]} onClick={pauseTrack} />
    ) : (
      <AiFillPlayCircle className={styles["play-icon"]} onClick={playTrack} />
    );
  };
  const RepeatIcon = () => {
    if (player) {
      // @TODO - handle this switch case better
      const repeat = player.repeat_state;
      const className = `${styles["repeat-icon"]} ${
        repeat !== "off" && styles["active-icon"]
      }`;
      return repeat === "off" || repeat === "context" ? (
        <BsRepeat className={className} onClick={toggleRepeat} />
      ) : (
        <BsRepeat1 className={className} onClick={toggleRepeat} />
      );
    }
    return <BsRepeat className={styles["repeat-icon"]} />;
  };

  const infoToast = () => {
    const id = "info-toast";
    if (!toast.isActive(id)) {
      toast({
        description:
          "No active players. Please start a session on another device to use this app's playback features.",
        position: "top",
        id,
      });
    }
  };

  const playNext = async () => {
    if (isPlayerActive) {
      await postData(PLAYER_NEXT_ENDPOINT, {});
      dispatch(fetchPlayerData());
    } else infoToast();
  };
  const playPrev = async () => {
    if (isPlayerActive) {
      await postData(PLAYER_PREV_ENDPOINT, {});
      dispatch(fetchPlayerData());
    } else infoToast();
  };

  const toggleShuffle = async () => {
    if (isPlayerActive) {
      await putData(
        PLAYER_SHUFFLE_ENDPOINT.replace(
          "{state}",
          !player?.shuffle_state as unknown as string
        ),
        {}
      );
      dispatch(fetchPlayerData());
    }
  };

  const toggleRepeat = async () => {
    if (isPlayerActive) {
      let state: string = "";
      if (player?.repeat_state === "off") state = "context";
      if (player?.repeat_state === "context") state = "track";
      if (player?.repeat_state === "track") state = "off";
      await putData(
        PLAYER_REPEAT_ENDPOINT.replace("{state}", state as unknown as string),
        {}
      );
      dispatch(fetchPlayerData());
    }
  };
  const playTrack = async () => {
    if (isPlayerActive) {
      await putData(PLAYER_PLAY_ENDPOINT, {});
      dispatch(fetchPlayerData());
    } else {
      infoToast();
    }
  };
  const pauseTrack = async () => {
    if (isPlayerActive) {
      await putData(PLAYER_PAUSE_ENDPOINT, {});
      dispatch(fetchPlayerData());
    }
  };

  const track = player?.item;

  return (
    <div className={styles["container"]}>
      <div className={styles["track-container"]}>
        {isPlayerActive && track && (
          <div className={styles["track-info"]}>
            <div className={styles["track-image-container"]}>
              <Image
                src={track.album.images[0].url as string}
                alt={track.name}
                fill
              />
            </div>
            <div className={styles["track-details"]}>
              <p>{track.name}</p>
              <span>
                {Array.isArray(track.artists) &&
                  track.artists.map((art, idx) => {
                    return (
                      <span className={styles["track-artist"]} key={art.id}>
                        <SpotifyLink
                          link={`/artist/${art.id}`}
                          text={art.name}
                        />
                        {idx !==
                          (track.artists?.length as number) - 1 && (
                          <>,</>
                        )}
                      </span>
                    );
                  })}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className={styles["controls-container"]}>
        <div className={styles["main-controls-container"]}>
          <div className={styles["main-controls-icons"]}>
            <BsShuffle
              className={`${styles["shuffle-icon"]} ${
                player?.shuffle_state && styles["active-icon"]
              }`}
              onClick={toggleShuffle}
            />
            <BiSkipPrevious
              className={styles["prev-icon"]}
              onClick={playPrev}
            />
            <PlayPauseIcon />
            <BiSkipNext className={styles["next-icon"]} onClick={playNext} />
            <RepeatIcon />
          </div>
          <div className={styles["main-controls-seekbar"]}>
            <SongSeekBar />
          </div>
        </div>
      </div>
      <div className={styles["volume-container"]}>
        <Volumebar />
      </div>
    </div>
  );
};

export default PlayerBar;
