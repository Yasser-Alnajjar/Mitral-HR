import { useSelector } from "react-redux";
import styles from "../../styles/MainTitle.module.css";

export default function MainTitle({ title, classes }) {
  const { theme } = useSelector((state) => state);
  return (
    <div className={`py-2 ${theme.mode} ${classes} ${styles.main}`}>
      <h2 className={styles.main_h2}>{title}</h2>
    </div>
  );
}
