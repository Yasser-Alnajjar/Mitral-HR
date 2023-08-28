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
        <table className="table text-center">
          <caption>Tasks</caption>
          <thead className="table__head">
            <tr className="table__head__tr">
              <th className="table__head__tr__th">#</th>
              <th className="table__head__tr__th">title</th>
              <th className="table__head__tr__th">employee</th>
              <th className="table__head__tr__th">from</th>
              <th className="table__head__tr__th">to</th>
              <th className="table__head__tr__th">description</th>
              <th className="table__head__tr__th">actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {tasks.map((item, index) => (
              <tr className="table__body__tr" key={item.id}>
                <td data-label={"#"} className="capitalize table__body__tr__td">
                  {index + 1}
                </td>
                <td
                  data-label={"Title"}
                  className="capitalize table__body__tr__td"
                >
                  {item.title}
                </td>
                <td
                  data-label={"Employee"}
                  className="capitalize table__body__tr__td"
                >
                  {item.employee}
                </td>
                <td
                  data-label={"From"}
                  className="capitalize table__body__tr__td"
                >
                  {item.from}
                </td>
                <td
                  data-label={"To"}
                  className="capitalize table__body__tr__td"
                >
                  {item.to}
                </td>
                <td
                  data-label={"Description"}
                  className="capitalize table__body__tr__td"
                >
                  {item.description.substring(0, 70)}...
                </td>
                <td
                  data-label={"Actions"}
                  className="capitalize table__body__tr__td"
                >
                  <div className="btns-group  place-end">
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
      </div>
    </section>
  );
}
