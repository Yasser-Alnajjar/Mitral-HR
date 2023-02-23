import { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../../styles/menu.module.css";

export default function MenuCard({ setAttend, attend }) {
  const { theme } = useSelector((state) => state);
  const [expand, setExpand] = useState(false);

  return (
    <div className={`${styles.parent} ${theme.mode}`}>
      <span
        className="d-block cursor-p position-absolute top-0 end-0"
        onClick={() => setExpand(!expand)}
      >
        <AiOutlineMore />
      </span>
      <ul
        className={` shadow ${styles.menu} ${
          theme.mode === "dark" ? "bg-black " : "bg-white "
        } ${expand && styles.expandmenu}`}
      >
        <li>
          <li className={theme.mode} onClick={() => setAttend(true)}>
            Attend
          </li>
          <li className={theme.mode} onClick={() => setAttend(false)}>
            Leave
          </li>
        </li>
      </ul>
    </div>
  );
}
