"use client";
import { toast } from "react-hot-toast";
import Loading from "../../../components/Loading";
import { useGetUsersQuery } from "../../../redux/users/usersSlice";
import TableSalary from "../../../components/tables/TableSalary";
import AddSalary from "../../../components/forms/salary/AddSalary";
import Modal from "../../../components/apstracts/Modal";
import { useState } from "react";
export default function Salary() {
  const [open, setOpen] = useState(false);
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
    content = (
      <section>
        <div className="container">
          <div className="btns-group place-end">
            <button className="btn btn-primary" onClick={() => setOpen(true)}>
              Change Salary
            </button>
          </div>
        </div>
        <Modal setOpen={setOpen} open={open}>
          <AddSalary setOpen={setOpen} refetch={refetch} />
        </Modal>
        <TableSalary users={users} refetch={refetch} />
      </section>
    );
  } else if (isError) {
    toast.error(error.message);
  }
  return content;
}
