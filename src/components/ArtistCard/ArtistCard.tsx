import { ArtistType, PlaylistType } from "utils/types";
import styles from "./ArtistCard.module.scss";
import Image from "next/image";
import { trimString } from "utils/functions";
import PlayIcon from "components/PlayIcon";

const ArtistCard = ({ artist }: { artist: ArtistType }) => {
  const artistImage = !artist.images.length
    ? "https://w7.pngwing.com/pngs/427/957/png-transparent-musical-note-musical-note-rectangle-monochrome-musical-notation-thumbnail.png"
    : artist.images[0].url;
  return (
    <div className={styles["container"]}>
      <div className={styles["image-container"]}>
        <div className={styles["play-icon-container"]}>
          <PlayIcon onClick={() => console.log("hey")} />
        </div>
        <Image src={artistImage} alt={artist.name} fill />
      </div>
      <h5>{trimString(artist.name, 15)}</h5>
      <div className={styles["album-info"]}>
        <span>{artist.type}</span>
      </div>
    </div>
  );
};

export default ArtistCard;
