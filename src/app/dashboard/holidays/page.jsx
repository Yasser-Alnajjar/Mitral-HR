"use client";
import { useGetHolidaysQuery } from "../../../redux/holidays/holidaysSlice";
import LoadingComponent from "../../../components/LoadingComponent";
import TableHolidays from "../../../components/tables/TableHolidays";
import { toast } from "react-hot-toast";
import Modal from "../../../components/apstracts/Modal";
import AddHoliday from "../../../components/forms/holiday/AddHoliday";
import { useState } from "react";
export default function Holidays() {
  const [open, setOpen] = useState(false);
  const {
    data: holidays,
    isLoadingComponent,
    isSuccess,
    isError,
    error,
  } = useGetHolidaysQuery();
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
        <Modal setOpen={setOpen} open={open} title={"Add Holiday"}>
          <AddHoliday setOpen={setOpen} />
        </Modal>
        <TableHolidays holidays={holidays} />;
      </section>
    );
  } else if (isError) {
    toast.error(error.data);
  }
  return content;
}
