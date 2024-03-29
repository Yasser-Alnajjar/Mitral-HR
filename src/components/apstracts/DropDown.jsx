import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../redux/auth/authSlice";
import { IoIosLogOut } from "react-icons/io";
import ClickOutSide from "../ClickOutSide";
import { useState, forwardRef, useEffect, useCallback } from "react";
import { AiOutlineUser } from "react-icons/ai";
export default function DropDown({ show }) {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  return (
    <>
      <li className="dropdown">
        <button className={`dropdown__toggle ${show ? "show" : ""}`}></button>
        <span className="user-name">{user?.first_name}</span>
        <div className={`dropdown__menu ${show ? "show" : ""}`}>
          <div className="dropdown__menu__item">
            <Link
              className="dropdown__menu__item__link"
              href={`/dashboard/profile`}
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
    </>
  );
}
