import { AlbumType } from "utils/types";
import styles from "./AlbumCard.module.scss";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import { trimString } from "utils/functions";
import dayjs from "dayjs";
import { FALLBACK_IMAGE } from "utils/constants";
import PlayPauseButton from "components/PlayPauseButton";

const AlbumCard = ({ album }: { album: AlbumType }) => {
  const imageUrl = album.images?.length ? album.images[0].url : FALLBACK_IMAGE;
  return (
    <div className={styles["container"]}>
      <div className={styles["image-container"]}>
        <div className={styles["play-icon-container"]}>
          <PlayPauseButton color="green" size={50} uri={album.uri} />
        </div>
        <Image src={imageUrl} alt={album.name} fill />
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
