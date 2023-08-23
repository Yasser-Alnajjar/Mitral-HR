"use client";
import LoadingComponent from "../../../components/LoadingComponent";

import TableTasks from "../../../components/tables/TableTasks.jsx";
import { toast } from "react-hot-toast";
import Modal from "../../../components/apstracts/Modal";
import AddTask from "../../../components/forms/tasks/AddTask";
import { useState } from "react";
import { useGetTasksQuery } from "../../../redux/tasks/tasksSlice";
export default function Tasks() {
  const {
    data: tasks,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTasksQuery();
  const [open, setOpen] = useState(false);
  let content;
  if (isLoading) {
    content = <LoadingComponent />;
  } else if (isSuccess) {
    content = (
      <section>
        <h1 className="text-center mt-lg fs-5 text-primary">Tasks</h1>
        <div className="container">
          <div className="btns-group place-end">
            <button className="btn btn-primary" onClick={() => setOpen(true)}>
              Add
            </button>
          </div>
        </div>
        <Modal setOpen={setOpen} open={open} title={"Add Task"}>
          <AddTask setOpen={setOpen} />
        </Modal>
        <TableTasks tasks={tasks} />
      </section>
    );
  } else if (isError) {
    toast.error(error.data);
  }
  return content;
}
