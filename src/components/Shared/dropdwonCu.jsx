import { useEffect, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttendance,
  updateAttendance,
} from "redux/slices/attendance-slice";
import styles from "../../styles/menu.module.css";

const Dorpmenu = ({ attendId, translate }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { theme } = useSelector((state) => state);
  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);
  const clickAttend = () => {
    dispatch(updateAttendance([attendId, { attend: true }]));
    setTimeout(() => {
      dispatch(fetchAttendance());
    }, 200);
    setShow(false);
  };
  const clickLeave = () => {
    dispatch(updateAttendance([attendId, { attend: false }]));
    setTimeout(() => {
      dispatch(fetchAttendance());
    }, 200);
    setShow(false);
  };
  return (
    <div className={theme.mode}>
      <button
        onClick={() => setShow(!show)}
        className={`${theme.mode} border-0`}
      >
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
            onClick={clickAttend}
            className={`mb-1 ${
              theme.mode === "dark" ? "dark-revers" : "light-revers"
            }`}
          >
            Attend
          </li>
          <li
            onClick={clickLeave}
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
