import { CompactCardType } from "utils/types";
import styles from "./CompactPlayCard.module.scss";
import { FALLBACK_IMAGE } from "utils/constants";
import Image from "next/image";
import { trimString } from "utils/functions";
import PlayPauseButton from "components/PlayPauseButton";

const CompactPlayCard = ({ play }: { play: CompactCardType }) => {
  const imageUrl = play.images.length ? play.images[0].url : FALLBACK_IMAGE;

  return (
    <div className={styles["container"]}>
      <div className={styles["image-container"]}>
        <Image src={imageUrl} fill alt={play.name} />
      </div>
      <div className={styles["title"]}>
        <h4>{trimString(play.name, 28)}</h4>
        <div className={styles["play-icon"]}>
          <PlayPauseButton uri={play.uri} color="green" size={50} />
        </div>
      </div>
    </div>
  );
};

export default CompactPlayCard;
