"use client";
import { useParams } from "next/navigation";
import {
  useGetUsersOfDepartmentQuery,
  useGetUsersQuery,
} from "../../../../redux/users/usersSlice";
import LoadingComponent from "../../../../components/LoadingComponent";

import { toast } from "react-hot-toast";
import Alert from "../../../../components/apstracts/Alert";
import Link from "next/link";
import TableEmployees from "../../../../components/tables/TableEmployees";
export default function DepartmentDetails() {
  const { departmentId } = useParams();
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUsersQuery();

  let content;
  if (isLoading) {
    content = <LoadingComponent />;
  } else if (isSuccess) {
    let filterdUsers = users.filter((user) => user.department === departmentId);
    content = filterdUsers?.length ? (
      <section>
        <h1 className="text-center mt-lg mb-lg fs-5 text-primary">
          Department Details
        </h1>
        <TableEmployees users={filterdUsers} refetch={refetch} />
      </section>
    ) : (
      <section className="alert-container">
        <Alert type={"primary"}>
          <div>This Department has not been any users yet</div>
        </Alert>
        <Link href={"/dashboard/departments"} className="btn btn-warning">
          Go Back
        </Link>
      </section>
    );
    !users?.length && toast.error("This Department has not been any users yet");
  } else if (isError) {
    toast.error(error.message);
  }
  return content;
}
