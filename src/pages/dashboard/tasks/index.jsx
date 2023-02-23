import Link from "next/link";
import { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineEdit,
  AiOutlineEye,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks } from "redux/slices/task-slice";
import Swal from "sweetalert2";

export default function Tasks() {
  const { theme, tasks } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  console.log(tasks);
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
  return (
    <div className={`mvh-100 ${theme.mode}`}>
      <Container>
        <div className="py-4">
          <Button
            as={Link}
            href="/dashboard/tasks/addtask"
            variant={theme.mode}
          >
            <AiOutlineCheckCircle size={22} />
            <span> Add Task</span>
          </Button>
        </div>
        <Table
          responsive
          variant={theme.mode === "dark" ? "dark" : ""}
          className="text-center"
          hover
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
