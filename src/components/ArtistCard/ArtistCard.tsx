import { ArtistProfile, ArtistType, PlaylistType } from "utils/types";
import styles from "./ArtistCard.module.scss";
import Image from "next/image";
import { trimString } from "utils/functions";
import PlayIcon from "components/PlayIcon";
import { FALLBACK_IMAGE } from "utils/constants";

const ArtistCard = ({ artist }: { artist: ArtistType | ArtistProfile }) => {
  const artistImage = !artist.images.length
    ? FALLBACK_IMAGE
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
