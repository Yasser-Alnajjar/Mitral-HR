import React from "react";
import Card from "../Card";
import { useGetSingleUserQuery } from "../../redux/users/usersSlice";
export default function Userinfo({ userId }) {
  const {
    data: user,
    isSuccess,
    isError,
    error,
  } = useGetSingleUserQuery(userId);
  if (isSuccess) {
    return (
      <>
        <section className="userinfo">
          <Card classes={"text-start"}>
            <div className="userinfo__more">
              <div className="user-border">
                <p className="mb-md">
                  <b>Name:</b> {user?.first_name} {user?.last_name}
                </p>
                <p className="mb-sm">
                  <b>Email:</b> {user?.email}
                </p>
                <p className="mb-sm">
                  <b>Address:</b> {user?.address}
                </p>
                <p className="mb-sm">
                  <b>Job Title:</b> {user.job_title}
                </p>
                <p className="mb-sm">
                  <b>Phone: </b>
                  {user.phone}
                </p>
              </div>
              <div>
                <p className="mb-sm">
                  <b>Country: </b>
                  {user?.country}
                </p>
                <p className="mb-sm">
                  <b>Role:</b> {user?.role}
                </p>
                <p className="mb-sm">
                  <b>Gender:</b> {user?.gender}
                </p>
                <p className="mb-sm">
                  <b>Salary:</b> {user.salary}
                </p>
                <p className="mb-sm">
                  <b>Department: </b>
                  {user.department.replace("_", " ")}
                </p>
              </div>
            </div>
          </Card>
        </section>
      </>
    );
  }
}
