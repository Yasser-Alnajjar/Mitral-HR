"use client";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/auth/authSlice";

export default function Profile() {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="profile">
      <h1 className="text-center mt-lg fs-5 text-primary">Profile</h1>
    </div>
  );
}
