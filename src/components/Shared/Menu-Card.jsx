import { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "../../styles/menu.module.css";
import Dorpmenu from "./dropdwonCu";

export default function MenuCard({ setAttend, attend }) {
  const { theme } = useSelector((state) => state);
  const [expand, setExpand] = useState(false);

  return (
    <div className={`${styles.parent} ${theme.mode}`}>
      {/* <div
        className="d-block cursor-p position-absolute top-0 end-0"
        onClick={() => setExpand(!expand)}
      >
        <AiOutlineMore />
      </div> */}

      <ul
        className={` shadow ${styles.menu} ${
          theme.mode === "dark" ? "bg-black " : "bg-white "
        } ${expand && styles.expandmenu}`}
      >
        <li>
          <div className={theme.mode} onClick={() => setAttend(true)}>
            Attend
          </div>
          <div className={theme.mode} onClick={() => setAttend(false)}>
            Leave
          </div>
        </li>
      </ul>
    </div>
  );
}
