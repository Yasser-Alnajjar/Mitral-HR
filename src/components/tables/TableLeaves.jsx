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
          <caption>Leaves</caption>
          <thead className="table__head">
            <tr className="table__head__tr">
              <th className="table__head__tr__th">#</th>
              <th className="table__head__tr__th">name</th>
              <th className="table__head__tr__th">type</th>
              <th className="table__head__tr__th">from</th>
              <th className="table__head__tr__th">to</th>
              <th className="table__head__tr__th">Reason</th>
              <th className="table__head__tr__th">Status</th>
              <th className="table__head__tr__th">Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {leaves.map((leave) => (
              <tr className="table__body__tr" key={leave.id}>
                <td data-label={"#"} className="capitalize table__body__tr__td">
                  {leave.id}
                </td>
                <td
                  data-label={"Name"}
                  className="capitalize table__body__tr__td"
                >
                  {leave.name}
                </td>
                <td
                  data-label={"Type"}
                  className="capitalize table__body__tr__td"
                >
                  {leave.type.replaceAll("_", " ")}
                </td>
                <td
                  data-label={"From"}
                  className="capitalize table__body__tr__td"
                >
                  {leave.from}
                </td>
                <td
                  data-label={"To"}
                  className="capitalize table__body__tr__td"
                >
                  {leave.to}
                </td>
                <td
                  data-label={"Reason"}
                  className="capitalize table__body__tr__td"
                >
                  {leave.reason}
                </td>
                <td
                  data-label={"Status"}
                  className="capitalize table__body__tr__td"
                >
                  {leave.status ? "Approved" : "Disagree"}
                </td>
                <td
                  data-label={"Actions"}
                  className="capitalize table__body__tr__td"
                >
                  <div className="btns-group place-end">
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
