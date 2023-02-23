import Link from "next/link";
import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
export default function SideBarLink({ icon, title, path }) {
  const { theme } = useSelector((state) => state);
  return (
    <Nav.Item
      as={Link}
      className={theme.mode + " w-100 mb-3  fs-small"}
      href={path}
    >
      <div className="d-flex gap-3 mb-2">
        <div>{icon}</div>
        <div>{title}</div>
      </div>
    </Nav.Item>
  );
}
