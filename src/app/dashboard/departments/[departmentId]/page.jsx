"use client";
import { useParams } from "next/navigation";
import { useGetUsersOfDepartmentQuery } from "../../../../redux/users/usersSlice";
import LoadingComponent from "../../../../components/LoadingComponent";

import { toast } from "react-hot-toast";
import Alert from "../../../../components/apstracts/Alert";
import Link from "next/link";
import TableEmployees from "../../../../components/tables/TableEmployees";
export default function DepartmentDetails() {
  const { departmentId } = useParams();

  const {
    data: users,
    isLoadingComponent,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUsersOfDepartmentQuery(departmentId);

  let content;
  if (isLoadingComponent) {
    content = <LoadingComponent />;
  } else if (isSuccess) {
    content = users?.length ? (
      <section>
        <h1 className="text-center mt-lg mb-lg fs-5 text-primary">
          Department Details
        </h1>
        <TableEmployees users={users} refetch={refetch} />
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
