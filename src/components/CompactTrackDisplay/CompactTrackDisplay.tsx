import { TrackType } from "utils/types";
import styles from "./CompactTrackDisplay.module.scss";
import Image from "next/image";

const CompactTrackDisplay = ({ tracks }: { tracks: TrackType[] }) => {
  return (
    <div className={styles["container"]}>
      {tracks.map((t) => {
        return (
          <div className={styles["track"]} key={t.id}>
            <div className={styles["track-image-container"]}>
              <Image src={t.album.images[0].url} fill alt={t.name} />
            </div>
            <div className={styles["track-title"]}>
              <h5>{t.name}</h5>
              {t.artists && (
                <span>{t.artists.map((art) => art.name).join(", ")}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompactTrackDisplay;
