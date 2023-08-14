"use client";
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
  const list_Item = [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      path: "/dashboard/attendance",
      title: "Attendance",
    },
    {
      path: "/dashboard/overtime",
      title: "Overtime",
    },
    {
      path: "/dashboard/tasks",
      title: "Tasks",
    },
    {
      path: "/dashboard/holidays",
      title: "Holidays",
    },
    {
      path: "/dashboard/vacations",
      title: "Vacations",
    },
  ];
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
        <h3>Mitral Hr</h3>
      </div>
      <ul className="navbar__list">
        {list_Item.map((item, index) => (
          <li key={index}>
            <Link href={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
