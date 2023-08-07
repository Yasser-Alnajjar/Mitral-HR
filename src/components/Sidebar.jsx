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
import Sidebar__list from "./Sidebar__Item";
import { selectOpen } from "../redux/theme/themeSlice";
import { useSelector } from "react-redux";
export default function Sidebar() {
  const open = useSelector(selectOpen);
  let size = open ? 20 : 25;
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <ul className="sidebar__list">
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
      </ul>
    </aside>
  );
}
