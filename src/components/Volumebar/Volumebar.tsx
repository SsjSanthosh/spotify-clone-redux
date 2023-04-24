import { useSelector } from "react-redux";
import styles from "./Volumebar.module.scss";
import ProgressBar from "@ramonak/react-progress-bar";
import { playerSelector, setVolume } from "redux/playerSlice";
import { useAppDispatch } from "redux/types";
import { putData } from "utils/functions";
import { VOLUME_ENDPOINT } from "utils/endpoints";
import {
  BsFillVolumeDownFill,
  BsFillVolumeMuteFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";

const Volumebar = () => {
  const { player } = useSelector(playerSelector);
  const volume = player?.device.volume_percent;
  const dispatch = useAppDispatch();
  const changeVolume = async (val: number) => {
    dispatch(setVolume({ volume: val }));
    await putData(
      VOLUME_ENDPOINT.replace("{volume}", val as unknown as string),
      {}
    );
  };
  const VolumeIcon = () => {
    if (volume || volume === 0) {
      if (volume === 0) {
        return <BsFillVolumeMuteFill className={styles["volume-icon"]} />;
      }
      if (volume > 0 && volume <= 70) {
        return <BsFillVolumeDownFill className={styles["volume-icon"]} />;
      }
      if (volume > 70) {
        return <BsFillVolumeUpFill className={styles["volume-icon"]} />;
      }
    }
    return null;
  };
  return (
    <div className={styles["container"]}>
      {player && (
        <div className={styles["volume-bar"]}>
          <VolumeIcon />
          <input
            type="range"
            value={volume}
            onChange={(e) => {
              changeVolume(e.target.value as unknown as number);
            }}
            style={{
              background: `linear-gradient(to right, #089c3c ${volume}%, #ccc ${volume}%)`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Volumebar;
