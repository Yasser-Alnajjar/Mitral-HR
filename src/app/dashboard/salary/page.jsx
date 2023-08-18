"use client";
import { toast } from "react-hot-toast";
import LoadingComponent from "../../../components/LoadingComponent";
import { useGetUsersQuery } from "../../../redux/users/usersSlice";
import TableSalary from "../../../components/tables/TableSalary";
import AddSalary from "../../../components/forms/salary/AddSalary";
import Modal from "../../../components/apstracts/Modal";
import { useState } from "react";
export default function Salary() {
  const [open, setOpen] = useState(false);
  const {
    data: users,
    isLoadingComponent,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUsersQuery();
  let content;
  if (isLoadingComponent) {
    content = <LoadingComponent />;
  } else if (isSuccess) {
    content = (
      <section>
        <div className="container">
          <div className="btns-group place-end">
            <button className="btn btn-primary" onClick={() => setOpen(true)}>
              Add Salary
            </button>
          </div>
        </div>
        <Modal setOpen={setOpen} open={open} title={"Add Salary"}>
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
