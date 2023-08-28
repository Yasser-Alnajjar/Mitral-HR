"use client";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Modal from "../apstracts/Modal";
import EditSalary from "../forms/salary/EditSalary";
import { useState } from "react";
import { useDeleteUserMutation } from "../../redux/users/usersSlice";
import LoadingComponent from "../LoadingComponent";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import {
  useDeleteSalaryMutation,
  useGetSalariesQuery,
} from "../../redux/salary/salarySlice";
export default function TableSalary({ salaries, refetch }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const [deleteSalary] = useDeleteSalaryMutation(id);
  const handleUpdateUser = async (id) => {
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
        deleteSalary(id)
          .unwrap()
          .then(() => {
            toast.success(`Salary Of (${name}), has been deleted!`);
            refetch();
          })
          .catch((err) => {
            toast.error(err.data);
          });
      }
    });
  };

  // Format the price above to USD using the locale, style, and currency.
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let content;

  content = (
    <section>
      <Modal open={open} setOpen={setOpen} title="Edit Salary">
        <EditSalary setOpen={setOpen} userId={id} refetch={refetch} />
      </Modal>
      <div className="table-container">
        <table className="table">
          <caption>Salary</caption>
          <thead className="table__head">
            <tr className="table__head__tr">
              <th className="table__head__tr__th">#</th>
              <th className="table__head__tr__th">Name</th>
              <th className="table__head__tr__th">Salary</th>
              <th className="table__head__tr__th">Conveyance</th>
              <th className="table__head__tr__th">Medical</th>
              <th className="table__head__tr__th">Leave</th>
              <th className="table__head__tr__th">Other</th>
              <th className="table__head__tr__th">Total</th>
              <th className="table__head__tr__th">Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {salaries?.map((item, index) => (
              <tr className="table__body__tr" key={item.id}>
                <td data-label={"#"} className="capitalize table__body__tr__td">
                  {index + 1}
                </td>
                <td
                  data-label={"Name"}
                  className="capitalize table__body__tr__td"
                >
                  {item.first_name} {item.last_name}
                </td>
                <td
                  data-label={"Salary"}
                  className="capitalize table__body__tr__td"
                >
                  {USDollar.format(item.salary)}
                </td>
                <td
                  data-label={"Conveyance"}
                  className="capitalize table__body__tr__td"
                >
                  {item.conveyance ? USDollar.format(item.conveyance) : 0}
                </td>
                <td
                  data-label={"Medical"}
                  className="capitalize table__body__tr__td"
                >
                  {item.medical ? USDollar.format(item.medical) : 0}
                </td>
                <td
                  data-label={"Leave"}
                  className="capitalize table__body__tr__td"
                >
                  {item.leave ? USDollar.format(item.leave) : 0}
                </td>
                <td
                  data-label={"Other"}
                  className="capitalize table__body__tr__td"
                >
                  {item.other ? USDollar.format(item.other) : 0}
                </td>
                <td
                  data-label={"Total"}
                  className="capitalize table__body__tr__td"
                >
                  {USDollar.format(item.total)}
                </td>
                <td
                  data-label={"Actions"}
                  className="capitalize table__body__tr__td"
                >
                  <div className="btns-group place-end">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdateUser(item.id)}
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
