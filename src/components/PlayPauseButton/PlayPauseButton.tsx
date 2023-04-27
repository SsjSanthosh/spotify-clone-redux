import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import styles from "./PlayPauseButton.module.scss";
import { useSelector } from "react-redux";
import { playerSelector } from "redux/playerSlice";
import { PLAYER_PAUSE_ENDPOINT, PLAYER_PLAY_ENDPOINT } from "utils/endpoints";
import { putData } from "utils/functions";
import { useToast } from "@chakra-ui/react";

const PlayPauseButton = ({
  uri,
  color,
  size,
}: {
  uri: string;
  color: string;
  size: number;
}) => {
  const props = {
    className: `${styles["play-icon"]} ${styles[`play-icon-${color}`]}`,
    size,
  };
  const { player } = useSelector(playerSelector);
  const toast = useToast();
  const isActive = player?.is_playing && player.context.uri === uri;
  const handlePlay = async () => {
    if (isActive) {
      await putData(PLAYER_PAUSE_ENDPOINT, {});
    } else {
      if (player?.device.is_active) {
        await putData(PLAYER_PLAY_ENDPOINT, { context_uri: uri });
      } else {
        const id = "bad_card_play";
        if (!toast.isActive(id)) {
          toast({ description: "No active player found", id, position: "top" });
        }
      }
    }
  };
  return (
    <div className={styles["container"]} onClick={handlePlay}>
      {isActive ? (
        <AiFillPauseCircle {...props} />
      ) : (
        <AiFillPlayCircle {...props} />
      )}
    </div>
  );
};

export default PlayPauseButton;
