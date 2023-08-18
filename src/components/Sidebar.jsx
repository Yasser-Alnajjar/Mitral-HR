"use client";
import {
  AiOutlineDashboard,
  AiOutlineAppstore,
  AiOutlineTeam,
  AiOutlineCheckSquare,
  AiOutlineFieldTime,
  AiOutlineDollar,
  AiOutlineBarChart,
  AiOutlineClockCircle,
  AiOutlineBranches,
  AiOutlineCoffee,
} from "react-icons/ai";
import { PiUmbrellaSimpleThin } from "react-icons/pi";
import { LiaUserClockSolid } from "react-icons/lia";

import Sidebar__list from "./Sidebar__Item";
import { selectOpen } from "../redux/theme/themeSlice";
import { useSelector } from "react-redux";
export default function Sidebar() {
  const open = useSelector(selectOpen);
  let size = open ? 20 : 25;

  const list_Item = [
    {
      icon: <AiOutlineDashboard size={size} />,
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <AiOutlineBranches size={size} />,
      path: "/dashboard/branches",
      title: "Branches",
    },
    {
      icon: <AiOutlineAppstore size={size} />,
      path: "/dashboard/departments",
      title: "Departments",
    },
    {
      icon: <AiOutlineTeam size={size} />,
      path: "/dashboard/employees",
      title: "Employees",
    },
    {
      icon: <LiaUserClockSolid size={size} />,
      path: "/dashboard/attendance",
      title: "Attendance",
    },
    {
      icon: <AiOutlineDollar size={size} />,
      path: "/dashboard/salary",
      title: "Salary",
    },
    {
      icon: <AiOutlineFieldTime size={size} />,
      path: "/dashboard/overtime",
      title: "Overtime",
    },
    {
      icon: <AiOutlineCheckSquare size={size} />,
      path: "/dashboard/tasks",
      title: "Tasks",
    },
    {
      icon: <PiUmbrellaSimpleThin size={size} />,
      path: "/dashboard/holidays",
      title: "Holidays",
    },
    {
      icon: <AiOutlineCoffee size={size} />,
      path: "/dashboard/vacations",
      title: "Vacations",
    },
  ];
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <ul className="sidebar__list">
        {list_Item.map((item, index) => (
          <Sidebar__list
            key={index}
            icon={item.icon}
            link={item.path}
            title={item.title}
          />
        ))}
      </ul>
      {/* <ul className="sidebar__list">
        <Sidebar__list
          icon={
            <AiOutlineDashboard
              size={size}
              style={{ transition: ".3s ease-in-out" }}
            />
          }
          link="/dashboard"
          title={"Dashboard"}
        />
        <Sidebar__list
          icon={
            <AiOutlineBranches
              size={size}
              style={{ transition: ".3s ease-in-out" }}
            />
          }
          link="/dashboard/branches"
          title={"Branches"}
        />
        <Sidebar__list
          icon={
            <AiOutlineAppstore
              size={size}
              style={{ transition: ".3s ease-in-out" }}
            />
          }
          link="/dashboard/departments"
          title={"Departments"}
        />
        <Sidebar__list
          icon={
            <AiOutlineTeam
              size={size}
              style={{ transition: ".3s ease-in-out" }}
            />
          }
          link="/dashboard/employees"
          title={"Employees"}
        />
        <Sidebar__list
          icon={
            <AiOutlineCheckSquare
              size={size}
              style={{ transition: ".3s ease-in-out" }}
            />
          }
          link="/dashboard/tasks"
          title={"Tasks"}
        />
        <Sidebar__list
          icon={
            <AiOutlineClockCircle
              size={size}
              style={{ transition: ".3s ease-in-out" }}
            />
          }
          link="/dashboard/attendance"
          title={"Attendance"}
        />
        <Sidebar__list
          icon={
            <AiOutlineDollar
              size={size}
              style={{ transition: ".3s ease-in-out" }}
            />
          }
          link="/dashboard/salary"
          title={"Salary"}
        />
        <Sidebar__list
          icon={
            <AiOutlineCoffee
              size={size}
              style={{ transition: ".3s ease-in-out" }}
            />
          }
          link="/dashboard/vacations"
          title={"Vacations"}
        />
        <Sidebar__list
          icon={
            <AiOutlineBarChart
              size={size}
              style={{ transition: ".3s ease-in-out" }}
            />
          }
          link="/dashboard/Finance"
          title={"Finance"}
        />
        <Sidebar__list
          icon={
            <AiOutlineFieldTime
              size={size}
              style={{ transition: ".3s ease-in-out" }}
            />
          }
          link="/dashboard/Overtime"
          title={"Overtime"}
        />
      </ul> */}
    </aside>
  );
}
