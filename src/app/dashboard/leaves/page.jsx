"use client";
import { useGetLeavesQuery } from "../../../redux/leave/leaveSlice";
import { toast } from "react-hot-toast";
import { useState } from "react";
import TableLeave from "../../../components/tables/TableLeaves";
import LoadingComponent from "../../../components/LoadingComponent";
import AddLeaves from "../../../components/forms/leaves/AddLeaves";
import Modal from "../../../components/apstracts/Modal";
export default function Leaves() {
  const {
    data: leaves,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLeavesQuery();
  const [open, setOpen] = useState(false);
  const [leaveId, setLeaveId] = useState("");
  let content;
  if (isLoading) {
    content = <LoadingComponent />;
  } else if (isSuccess) {
    content = (
      <section>
        <h1 className="text-center mt-lg fs-5 text-primary">Leaves</h1>
        <div className="container">
          <div className="btns-group place-end">
            <button className="btn btn-primary" onClick={() => setOpen(true)}>
              Add Leave
            </button>
          </div>
        </div>
        <Modal open={open} setOpen={setOpen} title={"Add Leave"}>
          <AddLeaves setOpen={setOpen} />
        </Modal>
        <TableLeave leaves={leaves} />
      </section>
    );
  } else if (isError) {
    toast.error(error.data);
  }
  return content;
}
