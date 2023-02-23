import { useSelector } from "react-redux";

import styles from "../../styles/Loading.module.css";
export default function Loading() {
  const { theme } = useSelector((state) => state);
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}></div>
      <div
        className={`${theme.mode} ${styles.loaderSection} ${styles.sectionLeft}`}
      ></div>
      <div
        className={`${theme.mode} ${styles.loaderSection} ${styles.sectionRight}`}
      ></div>
    </div>
  );
}
