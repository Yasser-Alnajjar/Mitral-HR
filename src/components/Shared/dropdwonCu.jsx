import { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateAttendance } from "redux/slices/attendance-slice";
import styles from "../../styles/menu.module.css";

const Dorpmenu = ({ attend, setAttend, translate }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { theme } = useSelector((state) => state);
  return (
    <div className={theme.mode}>
      <button onClick={() => setShow(!show)} className={theme.mode}>
        <AiOutlineMore />
      </button>
      <div className="position-relative">
        <ul
          style={{
            opacity: show ? "1" : "0",
            zIndex: show ? "1000" : "-100",
            transform: translate,
          }}
          className={`${styles.dropdownMenu} ${theme.mode} p-1 rounded shadow `}
        >
          <li
            onClick={() => setAttend(true)}
            className={`mb-1 ${
              theme.mode === "dark" ? "dark-revers" : "light-revers"
            }`}
          >
            Attend
          </li>
          <li
            onClick={() => setAttend(false)}
            className={theme.mode === "dark" ? "dark-revers" : "light-revers"}
          >
            Leave
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Dorpmenu;
