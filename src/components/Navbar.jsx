import Link from "next/link";
import React from "react";
import { AiOutlineAlignRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar, selectOpen } from "../redux/theme/themeSlice";
import logo from "public/images/logo32x32.png";
import Image from "next/image";
export default function Navbar() {
  const open = useSelector(selectOpen);
  const dispatch = useDispatch();
  return (
    <nav className={`navbar ${open ? "open" : ""}`}>
      <div className="navbar__logo">
        <Image src={logo} alt="logo" />
        <div className="navbar__logo__toggle">
          <span
            onClick={() => dispatch(openSidebar(!open))}
            style={{ cursor: "pointer" }}
          >
            <AiOutlineAlignRight size={25} />
          </span>
        </div>
      </div>
      <ul className="navbar__list">
        <li>
          <Link href="/">test</Link>
        </li>
        <li>
          <Link href="/">test</Link>
        </li>
        <li>
          <Link href="/">test</Link>
        </li>
        <li>
          <Link href="/">test</Link>
        </li>
        <li>
          <Link href="/">test</Link>
        </li>
      </ul>
    </nav>
  );
}
