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

const PlayerBar = () => {
  const { player } = useSelector(playerSelector);
  const dispatch = useAppDispatch();
  const PlayIcon = () => {
    return player?.is_playing ? (
      <AiFillPauseCircle className={styles["play-icon"]} onClick={pauseTrack} />
    ) : (
      <AiFillPlayCircle className={styles["play-icon"]} onClick={playTrack} />
    );
  };
  const RepeatIcon = () => {
    if (player) {
      const repeat = player.repeat_state;
      // @TODO - handle this switch case better
      const className = `${styles["repeat-icon"]} ${
        repeat !== "off" && styles["active-icon"]
      }`;
      return repeat === "off" || repeat === "context" ? (
        <BsRepeat className={className} onClick={toggleRepeat} />
      ) : (
        <BsRepeat1 className={className} onClick={toggleRepeat} />
      );
    }
    return null;
  };
  const playNext = async () => {
    await postData(PLAYER_NEXT_ENDPOINT, {});
    dispatch(fetchPlayerData());
  };
  const playPrev = async () => {
    await postData(PLAYER_PREV_ENDPOINT, {});
    dispatch(fetchPlayerData());
  };
  const toggleShuffle = async () => {
    await putData(
      PLAYER_SHUFFLE_ENDPOINT.replace(
        "{state}",
        !player?.shuffle_state as unknown as string
      ),
      {}
    );
    dispatch(fetchPlayerData());
  };
  const toggleRepeat = async () => {
    let state: string = "";
    if (player?.repeat_state === "off") state = "context";
    if (player?.repeat_state === "context") state = "track";
    if (player?.repeat_state === "track") state = "off";
    await putData(
      PLAYER_REPEAT_ENDPOINT.replace("{state}", state as unknown as string),
      {}
    );
    dispatch(fetchPlayerData());
  };
  const playTrack = async () => {
    await putData(PLAYER_PLAY_ENDPOINT, {});
    dispatch(fetchPlayerData());
  };
  const pauseTrack = async () => {
    await putData(PLAYER_PAUSE_ENDPOINT, {});
    dispatch(fetchPlayerData());
  };
  const track = player?.item;
  return (
    <div className={styles["container"]}>
      {player?.is_playing && track && (
        <div className={styles["track-container"]}>
          <div className={styles["track-image-container"]}>
            <Image
              src={track.album.images[0].url as string}
              alt={track.name}
              fill
            />
          </div>
          <div className={styles["track-details"]}>
            <h5>{track.name}</h5>
            <span>{track.artists?.map((art) => art.name).join(", ")}</span>
          </div>
        </div>
      )}
      <div className={styles["controls-container"]}>
        <BsShuffle
          className={`${styles["shuffle-icon"]} ${
            player?.shuffle_state && styles["active-icon"]
          }`}
          onClick={toggleShuffle}
        />
        <div className={styles["main-controls"]}>
          <BiSkipPrevious className={styles["prev-icon"]} onClick={playPrev} />
          <PlayIcon />
          <BiSkipNext className={styles["next-icon"]} onClick={playNext} />
        </div>
        <RepeatIcon />
      </div>
    </div>
  );
};

export default PlayerBar;
