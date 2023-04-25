import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import styles from "./PlayPauseButton.module.scss";

const PlayPauseButton = ({
  onClick,
  isPlaying,
  color,
}: {
  onClick: () => void;
  isPlaying: boolean;
  color: string;
}) => {
  const className = `${styles["play-icon"]} ${styles[`play-icon-${color}`]}`;
  return (
    <div className={styles["container"]} onClick={onClick}>
      {isPlaying ? (
        <AiFillPauseCircle className={className} />
      ) : (
        <AiFillPlayCircle className={className} />
      )}
    </div>
  );
};

export default PlayPauseButton;
