import { GenericPageHeaderType } from "utils/types";
import styles from "./GenericPageHeader.module.scss";
import Image from "next/image";
import SpotifyLink from "components/SpotifyLink";
import { BsDot } from "react-icons/bs";
import { nanoid } from "nanoid";
import PlayPauseButton from "components/PlayPauseButton";
import { trimString } from "utils/functions";

const GenericPageHeader = ({
  header,
  imageType = "square",
}: {
  header: GenericPageHeaderType;
  imageType?: "square" | "circle";
}) => {
  const Seperator = () => <BsDot className={styles["seperator"]} />;
  return (
    <div className={styles["header"]}>
      <div
        className={`${styles["image-container"]} ${
          imageType === "circle" && styles["image-container-border-radius"]
        }`}
      >
        <Image src={header.image} fill alt={header.title} priority />
      </div>
      <div className={styles["header-content"]}>
        <h4>{header.type}</h4>
        <div className={styles["header-play-container"]}>
          <h1>{trimString(header.title, 20)}</h1>
          {header.showPlayButton && (
            <PlayPauseButton
              color="green"
              uri={header.uri as string}
              size={60}
            />
          )}
        </div>
        <div className={styles["header-description"]}>
          {header.descriptions.map((des, odx) => {
            const { type } = des;
            if (type === "artists" && Array.isArray(des.renderItems)) {
              return des.renderItems.map((art) => {
                return (
                  <p className={styles["artist-container"]} key={art.id}>
                    <SpotifyLink text={art.name} link={`/artist/${art.id}`} />
                    <Seperator />
                  </p>
                );
              });
            } else if (!Array.isArray(des.renderItems)) {
              return (
                <p className={styles["desc-container"]} key={nanoid()}>
                  {des.renderItems}
                  {odx !== header.descriptions.length - 1 && <Seperator />}
                </p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default GenericPageHeader;
