import styles from "./SectionHeader.module.scss";

const SectionHeader = ({ title }: { title: string }) => {
  return <h3 className={styles['header']}>{title}</h3>;
};

export default SectionHeader;
