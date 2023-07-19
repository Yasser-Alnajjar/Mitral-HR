"use client";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const { theme } = useSelector((state) => state);

  return (
    <>
      <div className={`w-100 mvh-100 ${theme.mode}`}>{children}</div>
    </>
  );
}
