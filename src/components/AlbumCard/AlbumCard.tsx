import { AlbumType } from "utils/types";
import styles from "./AlbumCard.module.scss";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import { trimString } from "utils/functions";
import dayjs from "dayjs";
import PlayIcon from "components/PlayIcon";

const AlbumCard = ({ album }: { album: AlbumType }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["image-container"]}>
        <div className={styles["play-icon-container"]}>
          <PlayIcon onClick={() => console.log("hey")} />
        </div>
        <Image src={album.images[0].url} alt={album.name} fill />
      </div>
      <h5>{trimString(album.name, 20)}</h5>

      <div className={styles["album-info"]}>
        <time>{dayjs(album.release_date).year()}</time>
        <BsDot />
        {trimString(album.artists.map((art) => art.name).join(","), 20)}
      </div>
    </div>
  );
};

export default AlbumCard;
