import { PlaylistType } from "utils/types";
import styles from "./PlaylistCard.module.scss";
import Image from "next/image";
import { trimString } from "utils/functions";
import PlayIcon from "components/PlayIcon";

const PlaylistCard = ({ playlist }: { playlist: PlaylistType }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["image-container"]}>
        <div className={styles["play-icon-container"]}>
          <PlayIcon onClick={() => console.log("hey")} />
        </div>
        <Image src={playlist.images[0].url} alt={playlist.name} fill />
      </div>
      <h5>{trimString(playlist.name, 15)}</h5>

      <div className={styles["album-info"]}>
        <span>By {trimString(playlist.owner.display_name, 12)}</span>
      </div>
    </div>
  );
};

export default PlaylistCard;
