"use client";
import { toast } from "react-hot-toast";
import LoadingComponent from "../../../components/LoadingComponent";
import { useGetUsersQuery } from "../../../redux/users/usersSlice";
import TableEmployees from "../../../components/tables/TableEmployees";
import PaginatedItems from "../../../components/Paginate";
export default function Employees() {
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
    content = (
      <>
        <h1 className="text-center mt-lg fs-5 text-primary">Employees</h1>
        <PaginatedItems items={users} itemsPerPage={8} refetch={refetch} />
      </>
    );
  } else if (isError) {
    toast.error(error.message);
  }
  return content;
}
