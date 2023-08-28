"use client";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Modal from "../apstracts/Modal";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { useDeleteOverTimeMutation } from "../../redux/overtime/overtimeSlice";
import EditOverTime from "../forms/overtime/EditOverTime";
export default function TableOverTime({ overTimes }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const [deleteOverTime] = useDeleteOverTimeMutation(id);
  // const { data: salaries } = useGetSalariesQuery();
  const handleUpdate = async (id) => {
    setOpen(true);
    setId(id);
  };
  const handleDeleteSalary = async (id, name) => {
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
        deleteOverTime(id)
          .unwrap()
          .then(() => {
            toast.success(`Salary Of (${name}), has been deleted!`);
          })
          .catch((err) => {
            toast.error(err.data);
          });
      }
    });
  };

  let content;

  content = (
    <section>
      <Modal open={open} setOpen={setOpen} title="Edit Salary">
        <EditOverTime setOpen={setOpen} overTimeId={id} />
      </Modal>
      <div className="table-container">
        <table className="table">
          <caption>OverTime</caption>
          <thead className="table__head">
            <tr className="table__head__tr">
              <th className="table__head__tr__th">#</th>
              <th className="table__head__tr__th">Name</th>
              <th className="table__head__tr__th">OT Date</th>
              <th className="table__head__tr__th">OT Hours</th>
              <th className="table__head__tr__th">Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {overTimes?.map((item, index) => (
              <tr className="table__body__tr" key={item.id}>
                <td data-label={"#"} className="table__body__tr__td">
                  {index + 1}
                </td>
                <td data-label={"Name"} className="table__body__tr__td">
                  {item.first_name} {item.last_name}
                </td>
                <td data-label={"Date"} className="table__body__tr__td">
                  {item.date}
                </td>
                <td data-label={"Hours"} className="table__body__tr__td">
                  {item.hours}
                </td>
                <td data-label={"Actions"} className="table__body__tr__td">
                  <div className="btns-group">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdate(item.id)}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDeleteSalary(item.id, item.first_name)
                      }
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
  return content;
}
