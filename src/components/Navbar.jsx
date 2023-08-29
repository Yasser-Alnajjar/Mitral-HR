"use client";
import Link from "next/link";
import React from "react";
import { AiOutlineAlignRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar, selectOpen } from "../redux/theme/themeSlice";
import logo from "public/images/logo32x32.png";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import { logOut } from "../redux/auth/authSlice";
import DropDown from "../components/apstracts/DropDown";
import { useState, useRef, forwardRef } from "react";
import ClickOutside from "./ClickOutSide";

// eslint-disable-next-line react/display-name
const Navbar = forwardRef(({ show, setShow }, ref) => {
  const open = useSelector(selectOpen);
  const dispatch = useDispatch();
  return (
    <nav ref={ref} className={`navbar ${open ? "open" : ""}`}>
      <div className="navbar__logo">
        <Link href="/dashboard">
          <Image src={logo} alt="logo" />
        </Link>
        <Link href="/dashboard">
          <h3>Mitral Hr</h3>
        </Link>
        <div className="navbar__logo__toggle">
          <span
            onClick={() => dispatch(openSidebar(!open))}
            style={{ cursor: "pointer" }}
          >
            <AiOutlineAlignRight size={25} />
          </span>
        </div>
      </div>
      <ul className="navbar__list" onClick={() => setShow(!show)}>
        <DropDown show={show} />
      </ul>
    </nav>
  );
});
export default ClickOutside(Navbar);
