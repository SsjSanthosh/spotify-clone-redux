import { CompactCardType } from "utils/types";
import styles from "./CompactPlayCard.module.scss";
import { FALLBACK_IMAGE } from "utils/constants";
import Image from "next/image";
import { getColorFromImage, trimString } from "utils/functions";
import PlayPauseButton from "components/PlayPauseButton";
import { useAppDispatch } from "redux/types";
import { setContextColor } from "redux/themeSlice";
import Link from "next/link";

const CompactPlayCard = ({
  play,
  route,
}: {
  play: CompactCardType;
  route: "playlist" | "album" | "artist";
}) => {
  const imageUrl = play.images.length ? play.images[0].url : FALLBACK_IMAGE;
  const dispatch = useAppDispatch();
  const handleHover = () => {
    const colorChange = getColorFromImage(play.id);
    if (colorChange) {
      dispatch(setContextColor({ contextColor: colorChange }));
    }
  };
  return (
    <div className={styles["container"]} onMouseEnter={handleHover}>
      <div className={styles["image-container"]}>
        <Image src={imageUrl} fill alt={play.name} id={play.id} />
      </div>
      <div className={styles["title"]}>
        <Link href={`/${route}/${play.id}`}>
          <h4>{trimString(play.name, 28)}</h4>
        </Link>
        <div className={styles["play-icon"]}>
          <PlayPauseButton uri={play.uri} color="green" size={50} />
        </div>
      </div>
    </div>
  );
};

export default CompactPlayCard;
