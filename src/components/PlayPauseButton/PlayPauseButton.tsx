import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import styles from "./PlayPauseButton.module.scss";

const PlayPauseButton = ({
  onClick,
  isPlaying,
  color,
  size,
}: {
  onClick: () => void;
  isPlaying: boolean;
  color: string;
  size: number;
}) => {
  const props = {
    className: `${styles["play-icon"]} ${styles[`play-icon-${color}`]}`,
    size,
  };
  return (
    <div className={styles["container"]} onClick={onClick}>
      {isPlaying ? (
        <AiFillPauseCircle {...props} />
      ) : (
        <AiFillPlayCircle {...props} />
      )}
    </div>
  );
};

export default PlayPauseButton;
