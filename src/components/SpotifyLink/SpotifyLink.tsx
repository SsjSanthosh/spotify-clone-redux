import Link from "next/link";
import styles from "./SpotifyLink.module.scss";

const SpotifyLink = ({ text, link }: { text: string; link: string }) => {
  return (
    <div className={styles["container"]}>
      <Link href={link}>
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default SpotifyLink;
