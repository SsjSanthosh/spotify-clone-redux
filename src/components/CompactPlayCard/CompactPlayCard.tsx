import { CompactCardType } from "utils/types";
import styles from "./CompactPlayCard.module.scss";
import { FALLBACK_IMAGE } from "utils/constants";
import Image from "next/image";
import { putData, trimString } from "utils/functions";
import PlayPauseButton from "components/PlayPauseButton";
import { useSelector } from "react-redux";
import { playerSelector } from "redux/playerSlice";
import { PLAYER_PAUSE_ENDPOINT, PLAYER_PLAY_ENDPOINT } from "utils/endpoints";
import { useToast } from "@chakra-ui/react";

const CompactPlayCard = ({ play }: { play: CompactCardType }) => {
  const imageUrl = play.images.length ? play.images[0].url : FALLBACK_IMAGE;
  const { player } = useSelector(playerSelector);
  const isActive =
    (player?.is_playing && player.context.uri === play.uri) || false;
  const toast = useToast();
  const handlePlay = async () => {
    if (isActive) {
      // @TODO - build a generic function for this
      await putData(PLAYER_PAUSE_ENDPOINT, {});
    } else {
      if (player?.device.is_active) {
        await putData(PLAYER_PLAY_ENDPOINT, { context_uri: play.uri });
      } else {
        const id = "bad_card_play";
        if (!toast.isActive(id)) {
          toast({ description: "No active player found", id, position: "top" });
        }
      }
    }
  };
  return (
    <div className={styles["container"]}>
      <div className={styles["image-container"]}>
        <Image src={imageUrl} fill alt={play.name} />
      </div>
      <div className={styles["title"]}>
        <h4>{trimString(play.name, 28)}</h4>
        <div className={styles["play-icon"]}>
          <PlayPauseButton
            isPlaying={isActive}
            color="green"
            size={50}
            onClick={handlePlay}
          />
        </div>
      </div>
    </div>
  );
};

export default CompactPlayCard;
