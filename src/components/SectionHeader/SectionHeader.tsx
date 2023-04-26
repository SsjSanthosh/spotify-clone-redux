import styles from "./SectionHeader.module.scss";

const SectionHeader = ({
  title,
  size = "normal",
}: {
  title: string;
  size?: "normal" | "large";
}) => {
  return size === "normal" ? (
    <h3 className={styles["header"]}>{title}</h3>
  ) : (
    <h2 className={`${styles["header"]} ${styles['header-large']}`}>{title}</h2>
  );
};

export default SectionHeader;
