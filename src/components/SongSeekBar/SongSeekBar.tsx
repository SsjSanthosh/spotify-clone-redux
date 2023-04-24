import { useSelector } from "react-redux";
import styles from "./SongSeekBar.module.scss";
import { playerSelector, setProgress } from "redux/playerSlice";
import { useAppDispatch } from "redux/types";
import { getDuration, putData } from "utils/functions";
import { SEEK_ENDPOINT } from "utils/endpoints";


const SongSeekBar = () => {
  const { player } = useSelector(playerSelector);
  const dispatch = useAppDispatch();
  if (!player) return null;
  const progress = player.progress_ms;
  const percentage = Math.floor((progress / player.item.duration_ms) * 100);

  const handleSeek = async (pos: number) => {
    await putData(
      SEEK_ENDPOINT.replace("{position}", pos as unknown as string),
      {}
    );
  };



  return (
    <div className={styles["container"]}>
      <span>{getDuration(progress)}</span>
      <input
        type="range"
        value={percentage}
        onChange={(e) => {
          const position = Math.ceil(
            ((e.target.value as unknown as number) / 100) *
              player.item.duration_ms
          );
          handleSeek(position);
        }}
        style={{
          background: `linear-gradient(to right, #e3e6e4 ${percentage}%, #4b4848 ${percentage}%)`,
        }}
      />
      <span>{getDuration(player.item.duration_ms)}</span>
    </div>
  );
};

export default SongSeekBar;
