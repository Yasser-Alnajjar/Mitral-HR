"use client";
import { toast } from "react-hot-toast";
import LoadingComponent from "../../../components/LoadingComponent";
import PaginateSalary from "../../../components/PaginateSalary";
import AddSalary from "../../../components/forms/salary/AddSalary";
import Modal from "../../../components/apstracts/Modal";
import { useState } from "react";
import { useGetSalariesQuery } from "../../../redux/salary/salarySlice";
export default function Salary() {
  const [open, setOpen] = useState(false);

  const {
    data: salaries,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetSalariesQuery();
  let content;
  if (isLoading) {
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
        <PaginateSalary items={salaries} itemsPerPage={7} refetch={refetch} />
      </section>
    );
  } else if (isError) {
    toast.error(error.message);
  }
  return content;
}
