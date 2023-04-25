import Link from "next/link";
import styles from "./SpotifyLink.module.scss";

const SpotifyLink = ({ text, link }: { text: string; link: string }) => {
  return (
    <span className={styles["container"]}>
      <Link href={link}>
        <span>{text}</span>
      </Link>
    </span>
  );
};

export default SpotifyLink;
