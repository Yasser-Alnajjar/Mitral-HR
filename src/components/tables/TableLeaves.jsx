"use client";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Modal from "../apstracts/Modal";
import EditLeave from "../forms/leaves/EditLeave";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { useDeleteLeaveMutation } from "../../redux/leave/leaveSlice";
export default function TableLeaves({ leaves }) {
  const [open, setOpen] = useState(false);
  const [deleteLeave] = useDeleteLeaveMutation();
  const [id, setId] = useState("");
  const handleUpdateLeave = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleDeleteLeave = (id, name) => {
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
        deleteLeave(id)
          .unwrap()
          .then(() => {
            toast.success(`Leave of (${name}) has been deleted!`);
          })
          .catch((err) => {
            toast.error(err.data);
          });
      }
    });
  };
  let content;
  content = (
    <>
      <div>
        <Modal open={open} setOpen={setOpen} title={"Edit Leave"}>
          <EditLeave setOpen={setOpen} leaveId={id} />
        </Modal>
      </div>
      <div className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr>
              <th>#</th>
              <th>name</th>
              <th>type</th>
              <th>from</th>
              <th>to</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td className="capitalize">{leave.id}</td>
                <td className="capitalize">{leave.name}</td>
                <td className="capitalize">
                  {leave.type.replaceAll("_", " ")}
                </td>
                <td className="capitalize">{leave.from}</td>
                <td className="capitalize">{leave.to}</td>
                <td className="capitalize">{leave.reason}</td>
                <td className="capitalize">
                  {leave.status ? "Approved" : "Disagree"}
                </td>
                <td>
                  <div className="btns-group">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdateLeave(leave.id)}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteLeave(leave.id, leave.name)}
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
    </>
  );
  return content;
}
