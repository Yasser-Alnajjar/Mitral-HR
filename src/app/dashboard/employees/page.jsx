"use client";
import { toast } from "react-hot-toast";
import Loading from "../../../components/Loading";
import { useGetUsersQuery } from "../../../redux/users/usersSlice";
import Table from "../../../components/tables/TableEmpolyees";
import AddEmployee from "../../../components/forms/AddEmployee";
import Modal from "../../../components/apstracts/Modal";
import { useState } from "react";
export default function Employees() {
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
              Add
            </button>
          </div>
        </div>
        <Modal setOpen={setOpen} open={open}>
          <AddEmployee setOpen={setOpen} refetch={refetch} />
        </Modal>
        <Table users={users} refetch={refetch} />
      </section>
    );
  } else if (isError) {
    toast.error(error.message);
  }
  return content;
}
