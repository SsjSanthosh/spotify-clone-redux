import { GenreType } from "utils/types";
import styles from "./GenreCard.module.scss";
import Image from "next/image";

const GenreCard = ({ genre }: { genre: GenreType }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["image-container"]}>
        <Image src={genre.icons[0].url} alt={genre.name} fill />
      </div>
      <h4>{genre.name}</h4>
    </div>
  );
};

export default GenreCard;
