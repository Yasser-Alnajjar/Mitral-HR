import Image from "next/image";
import {
  AiOutlineBranches,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineDashboard,
  AiOutlineStock,
  AiOutlineUngroup,
  AiOutlineUserAdd,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Dropdown, Nav, Offcanvas, Row } from "react-bootstrap";
import { showSidbar } from "redux/slices/theme-slice";
import SideBarLink from "./SideBarLink";
export default function Sidebar() {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  // let side = {
  // marginRight: "20px",
  // position: "absolute",
  // left: "20px",
  // top: "15px",
  // lineHeight: "1.25",
  // height: "20px",
  // width: "20px",
  // };
  // let OffcanvasStyle = {
  //   right: "0",
  //   top: "15px",
  //   transform: "translateX(120%)",
  // };
  return (
    <div>
      <Offcanvas
        show={theme.sidbar}
        className={`${theme.mode} OffcanvasStyle`}
        onHide={() => dispatch(showSidbar(!theme.sidbar))}
      >
        <Offcanvas.Header
          closeVariant={theme.mode === "dark" ? "white" : "black"}
          closeButton
        >
          <Offcanvas.Title className="d-flex w-100 flex-column justify-content-cneter align-items-center">
            <Image
              alt="logo"
              width={30}
              height={30}
              src="/favicon.ico"
              className="mb-2"
            />
            <span className="me-2">Mitral HR</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Dropdown>
            <Nav className={theme.mode + " d-flex flex-column"}>
              <SideBarLink
                path={"/dashboard"}
                icon={<AiOutlineDashboard size={22} />}
                title="Dashboard"
              />
              <SideBarLink
                path={"/dashboard/branches"}
                icon={<AiOutlineBranches size={22} />}
                title="Branches"
              />
              <SideBarLink
                path={"/dashboard/departments"}
                icon={<AiOutlineUngroup size={22} />}
                title="Departments"
              />
              <SideBarLink
                path={"/dashboard/employees"}
                icon={<AiOutlineUsergroupAdd size={22} />}
                title="Employees"
              />
              <SideBarLink
                path={"/dashboard/attendance"}
                icon={<AiOutlineCheckCircle size={22} />}
                title="Attendance"
              />
              <SideBarLink
                path={"/dashboard/tasks"}
                icon={<AiOutlineStock size={22} />}
                title="Tasks"
              />
              <SideBarLink
                path={"/dashboard/tasks"}
                icon={<AiOutlineClockCircle size={22} />}
                title="Over Time"
              />
              <SideBarLink
                path={"/dashboard/register"}
                icon={<AiOutlineUserAdd size={22} />}
                title="Register"
              />
            </Nav>
          </Dropdown>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
