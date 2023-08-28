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
        deleteHoliday(id)
          .unwrap()
          .then(() => {
            toast.success(`(${holidayName}) Holiday has been deleted!`);
          })
          .catch((err) => {
            toast.error(err.data);
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
      <div className="table-container mt-lg">
        <table className="table text-center">
          <caption>Holidays</caption>
          <thead className="table__head">
            <tr className="table__head__tr">
              <th className="table__head__tr__th">#</th>
              <th className="table__head__tr__th">Title</th>
              <th className="table__head__tr__th">Holiday Date</th>
              <th className="table__head__tr__th">Day</th>
              <th className="table__head__tr__th">Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {holidays.map((item) => (
              <tr key={item.id}>
                <td data-label={"#"} className="table__body__tr__td">
                  {item.id}
                </td>
                <td data-label={"Name"} className="table__body__tr__td">
                  {item.name}
                </td>
                <td data-label={"Date"} className="table__body__tr__td">
                  {item.date}
                </td>
                <td data-label={"day"} className="table__body__tr__td">
                  {item.day}
                </td>
                <td data-label={"Actions"} className="table__body__tr__td">
                  <div className="btns-group place-end">
                    <button
                      className="btn btn-warning"
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
