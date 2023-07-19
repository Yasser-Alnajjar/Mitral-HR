"use client";
import Modals from "../../../components/Shared/Modals";
import AddTask from "../../../components/tasks/AddTask";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineEdit,
  AiOutlineEye,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks } from "../../../redux/slices/task-slice";
import Swal from "sweetalert2";

export default function Tasks() {
  const { theme, tasks } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleClick = (id) => {
    Swal.fire({
      title: "Are you sure !",
      text: "You won't be able to revert this!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(id));
        setTimeout(() => {
          dispatch(fetchTasks());
        }, 200);
      }
    });
  };
  const [open, setOpen] = useState(false);
  return (
    <div className={`mvh-100 ${theme.mode}`}>
      <Container>
        <Modals
          onHide={() => setOpen(!open)}
          show={open}
          title="Add Task"
          forms={<AddTask />}
        />
        <div className="py-4 d-flex align-items-center justify-content-end ">
          <Button
            onClick={() => setOpen(!open)}
            className="d-flex align-items-center gap-2"
            variant={"warning"}
          >
            <AiOutlineCheckCircle size={22} />
          </Button>
        </div>
        <Table
          size="lg"
          variant={theme.mode}
          responsive
          className={`text-center ${theme.mode}`}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>desc</th>
              <th>Employee</th>
              <th>Start</th>
              <th>End</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td className="text-capitalize">{task.taskname}</td>
                <td className="text-capitalize">{task.description}</td>
                <td className="text-capitalize">{task.employee}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>
                  <tr className="d-flex justify-content-center gap-2">
                    <Link className="cursor-p" href={`tasks/update/${task.id}`}>
                      <AiOutlineEdit size={20} className="text-success" />
                    </Link>
                    <Link className="cursor-p" href={`tasks/view/${task.id}`}>
                      <AiOutlineEye size={20} className="text-info" />
                    </Link>
                    <td
                      className="cursor-p"
                      onClick={() => handleClick(task.id)}
                    >
                      <AiOutlineCloseCircle size={20} className="text-danger" />
                    </td>
                  </tr>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
