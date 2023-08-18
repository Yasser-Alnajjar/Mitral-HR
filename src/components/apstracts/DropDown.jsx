import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../redux/auth/authSlice";
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
export default function DropDown() {
  const user = useSelector(selectCurrentUser);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  return (
    <li class="dropdown" onClick={() => setShow(!show)}>
      <button className={`dropdown__toggle ${show ? "show" : ""}`}></button>
      <span className="user-name">{user?.first_name}</span>
      <div className={`dropdown__menu ${show ? "show" : ""}`}>
        <div className="dropdown__menu__item">
          <Link
            className="dropdown__menu__item__link"
            href={`/dashboard/profile/${user?.id}`}
          >
            <span>Profile</span>
            <AiOutlineUser size={22} />
          </Link>
        </div>
        <div className="dropdown__menu__item">
          <Link
            className="dropdown__menu__item__link"
            href="/"
            onClick={() => dispatch(logOut())}
          >
            <span>Logout</span>
            <IoIosLogOut size={22} />
          </Link>
        </div>
      </div>
    </li>
  );
}
