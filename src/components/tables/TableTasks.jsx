import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useDeleteTaskMutation } from "../../redux/tasks/tasksSlice";
import Swal from "sweetalert2";
import Modal from "../apstracts/Modal";
import EditTask from "../forms/tasks/EditTask";
import Link from "next/link";
export default function TableTasks({ tasks }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [deleteTasks, { isError, error }] = useDeleteTaskMutation();
  const handleUpdateTask = async (id) => {
    setOpen(true);
    setId(id);
  };
  const handleDeleteTask = async (id, taskName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#198754",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTasks(id)
          .unwrap()
          .then(() => {
            toast.success(`(${taskName}) tasks has been deleted!`);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  };
  if (isError) {
    toast.error(error.data);
  }
  return (
    <section>
      <Modal open={open} setOpen={setOpen} title="Edit Holiday">
        <EditTask setOpen={setOpen} taskId={id} />
      </Modal>
      <div className="table-container mt-lg">
        {tasks?.length === 0 ? (
          <p>nooooooooo</p>
        ) : (
          <table className="table text-center">
            <thead className="table__head">
              <tr>
                <th>#</th>
                <th>title</th>
                <th>employee</th>
                <th>from</th>
                <th>to</th>
                <th>description</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody className="table__body">
              {tasks.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="capitalize">{item.title}</td>
                  <td className="capitalize">{item.employee}</td>
                  <td className="capitalize">{item.from}</td>
                  <td className="capitalize">{item.to}</td>
                  <td className="capitalize">
                    {item.description.substring(0, 70)}...
                  </td>
                  <td>
                    <div className="btns-group">
                      <button
                        className="btn btn-warning"
                        onClick={() => handleUpdateTask(item.id)}
                      >
                        <AiOutlineEdit />
                      </button>
                      <Link
                        className="btn btn-primary"
                        href={`/dashboard/tasks/${item.id}`}
                      >
                        <AiOutlineEye />
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteTask(item.id, item.employee)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
