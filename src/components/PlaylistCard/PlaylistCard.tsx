import { PlaylistType } from "utils/types";
import styles from "./PlaylistCard.module.scss";
import Image from "next/image";
import { trimString } from "utils/functions";
import PlayPauseButton from "components/PlayPauseButton";
import { FALLBACK_IMAGE } from "utils/constants";

const PlaylistCard = ({ playlist }: { playlist: PlaylistType }) => {
  const imageUrl = playlist.images.length
    ? playlist.images[0].url
    : FALLBACK_IMAGE;
  return (
    <div className={styles["container"]}>
      <div className={styles["image-container"]}>
        <div className={styles["play-icon-container"]}>
          <PlayPauseButton uri={playlist.uri} color="green" size={50} />
        </div>
        <Image src={imageUrl} alt={playlist.name} fill />
      </div>
      <h5>{trimString(playlist.name, 15)}</h5>

      <div className={styles["album-info"]}>
        <span>By {trimString(playlist.owner.display_name, 12)}</span>
      </div>
    </div>
  );
};

export default PlaylistCard;
