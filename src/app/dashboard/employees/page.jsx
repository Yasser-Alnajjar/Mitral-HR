"use client";
import { toast } from "react-hot-toast";
import Loading from "../../../components/Loading";
import { useGetUsersQuery } from "../../../redux/users/usersSlice";
import Table from "../../../components/tables/TableEmpolyees";
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
    content = <Loading />;
  } else if (isSuccess) {
    content = <Table users={users} refetch={refetch} />;
  } else if (isError) {
    toast.error(error.message);
  }
  return content;
}
