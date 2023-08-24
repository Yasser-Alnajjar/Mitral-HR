"use client";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../redux/auth/authSlice";
import EditProfile from "../../../components/forms/profile/EditProfile";
import Userinfo from "../../../components/userinfo/Userinfo";
export default function Profile() {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="profile">
      <div className="container">
        <h1 className="text-center mt-lg fs-5 text-primary">Profile</h1>
        <div className="profile__content">
          <EditProfile userId={user?.id} />
          <Userinfo userId={user?.id} />
        </div>
      </div>
    </div>
  );
}
