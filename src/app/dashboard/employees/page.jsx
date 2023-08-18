"use client";
import { toast } from "react-hot-toast";
import LoadingComponent from "../../../components/LoadingComponent";
import { useGetUsersQuery } from "../../../redux/users/usersSlice";
import TableEmpolyees from "../../../components/tables/TableEmpolyees";
import AddEmployee from "../../../components/forms/employee/AddEmployee";
import Modal from "../../../components/apstracts/Modal";
import { useState } from "react";
export default function Employees() {
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
              Add
            </button>
          </div>
        </div>
        <Modal setOpen={setOpen} open={open}>
          <AddEmployee setOpen={setOpen} refetch={refetch} />
        </Modal>
        <TableEmpolyees users={users} refetch={refetch} />
      </section>
    );
  } else if (isError) {
    toast.error(error.message);
  }
  return content;
}
