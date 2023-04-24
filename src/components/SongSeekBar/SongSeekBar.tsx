import { useSelector } from "react-redux";
import styles from "./SongSeekBar.module.scss";
import { playerSelector } from "redux/playerSlice";
import dayjs from "dayjs";
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

const SongSeekBar = () => {
  const { player } = useSelector(playerSelector);
  if (!player) return null;
  const progress = player.progress_ms;
  const percentage = Math.floor((progress / player.item.duration_ms) * 100);
  return (
    <div className={styles["container"]}>
      <span>{dayjs.duration(progress).format("mm:ss")}</span>
      <input
        type="range"
        value={percentage}
        style={{
          background: `linear-gradient(to right, #e3e6e4 ${percentage}%, #4b4848 ${percentage}%)`,
        }}
      />
      <span>
        {dayjs.duration(player.item.duration_ms).format("mm:ss")}
      </span>
    </div>
  );
};

export default SongSeekBar;
