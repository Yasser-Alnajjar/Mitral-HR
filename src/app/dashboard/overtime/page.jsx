"use client";
import { useGetOvertimesQuery } from "../../../redux/overtime/overtimeSlice";
import TableOverTime from "../../../components/tables/TableOverTime";
import { useState } from "react";
import Modal from "../../../components/apstracts/Modal";
import AddOverTime from "../../../components/forms/overtime/AddOverTime";
import { toast } from "react-hot-toast";
export default function Overtime() {
  const [open, setOpen] = useState(false);
  const { data: overTimes, isSuccess, isError, error } = useGetOvertimesQuery();
  let content;
  if (isSuccess) {
    content = (
      <section>
        <div className="container">
          <div className="btns-group place-end">
            <button className="btn btn-primary" onClick={() => setOpen(true)}>
              Add Overtime
            </button>
          </div>
        </div>
        <Modal open={open} setOpen={setOpen} title={"Add Over Time"}>
          <AddOverTime setOpen={setOpen} />
        </Modal>
        <TableOverTime overTimes={overTimes} />
      </section>
    );
  } else if (isError) {
    toast.error(error.data);
  }
  return content;
}
