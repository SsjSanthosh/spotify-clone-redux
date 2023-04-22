import { GenericObject } from "utils/types";
import Image from "next/image";
import styles from "./PlaylistPage.module.scss";
export const PlaylistHeader = ({ playlist }: { playlist: GenericObject }) => {
  return (
    <div className={styles["header"]}>
      <div className={styles["image-container"]}>
        <Image src={playlist.images[0].url} alt={playlist.name} fill />
      </div>
      <div className={styles["header-content"]}>
        <h4>Playlist</h4>
        <h1>{playlist.name}</h1>
        <p>{playlist.description}</p>
        <div className={styles["playlist-owner-container"]}>
          <h6>{playlist.owner.display_name}</h6> .{" "}

          <h6>{playlist.tracks.total} songs</h6>
        </div>
      </div>
    </div>
  );
};
