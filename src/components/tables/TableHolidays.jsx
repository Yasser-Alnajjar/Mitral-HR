import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Modal from "../apstracts/Modal";
import EditHoliday from "../forms/holiday/EditHoliday";
import { useDeleteHolidayMutation } from "../../redux/holidays/holidaysSlice";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
export default function TableHolidays({ holidays }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [deleteHoliday, { isError, error }] = useDeleteHolidayMutation();
  const handleUpdateHoliday = async (id) => {
    setOpen(true);
    setId(id);
  };
  const handleDeleteHoliday = async (id, holidayName) => {
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
        console.log(id);
        deleteHoliday(id)
          .unwrap()
          .then(() => {
            toast.success(`(${holidayName}) Holiday has been deleted!`);
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
        <EditHoliday setOpen={setOpen} holidayId={id} />
      </Modal>
      <div className="table-container">
        <table className="table text-center">
          <thead className="table__head">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Holiday Date</th>
              <th>Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {holidays.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.day}</td>
                <td>
                  <div className="btns-group">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdateHoliday(item.id)}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteHoliday(item.id, item.name)}
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
