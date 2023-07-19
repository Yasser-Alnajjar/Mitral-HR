"use client";
import MainTitle from "../../../../components/Shared/MainTitle";

import FormEditprofile from "../../../../components/profile/FormEditprofile";
export default function Editprofile({ params }) {
  const { userId } = params;
  return (
    <div className="py-5">
      <MainTitle title={"Edit Profile"} classes={"pb-4"} />
      <FormEditprofile id={userId} />
    </div>
  );
}
