import { AiFillPlayCircle } from "react-icons/ai";
import styles from "./PlayIcon.module.scss";

const PlayIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={styles["container"]}>
      <AiFillPlayCircle className={styles["play-icon"]} />
    </div>
  );
};

export default PlayIcon;
