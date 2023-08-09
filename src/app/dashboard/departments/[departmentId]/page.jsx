"use client";
import { useParams } from "next/navigation";
import { useGetUsersOfDepartmentQuery } from "../../../../redux/users/usersSlice";
import Loading from "../../../../components/Loading";

import { toast } from "react-hot-toast";
import Alert from "../../../../components/apstracts/Alert";
import Link from "next/link";
import Table from "../../../../components/tables/TableEmpolyees";
export default function DepartmentDetails() {
  const { departmentId } = useParams();

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUsersOfDepartmentQuery(departmentId);

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = users?.length ? (
      <section>
        <Table users={users} refetch={refetch} />
      </section>
    ) : (
      <section className="alert-container">
        <Alert type={"primary"}>
          <div>This Department has not been any users yet</div>
        </Alert>
        <Link href={"/dashboard/departments"} className="btn btn-success">
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
