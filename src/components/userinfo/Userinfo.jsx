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
        <h1 className="fs-4 text-center mt-lg capitalize">User</h1>
        <section className="userinfo">
          <Card
            classes={"text-start"}
            titleClassName="fs-2 mb-md"
            title={`Name: ${user?.first_name} ${user?.last_name}`}
          >
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
          </Card>
          <Card
            classes={"text-start"}
            titleClassName="fs-2 mb-md"
            title={`Country: ${user?.country}`}
          >
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
          </Card>
        </section>
      </>
    );
  }
}
