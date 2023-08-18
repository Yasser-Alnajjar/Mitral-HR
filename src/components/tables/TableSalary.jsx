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
export default function TableSalary({ users, refetch }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const [deleteSalary] = useDeleteSalaryMutation(id);
  const { data: salaries } = useGetSalariesQuery();
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

  let content;

  content = (
    <section>
      <Modal open={open} setOpen={setOpen} title="Edit Salary">
        <EditSalary setOpen={setOpen} userId={id} refetch={refetch} />
      </Modal>
      <div className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Conveyance</th>
              <th>Medical</th>
              <th>Leave</th>
              <th>Other</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {salaries?.map((item) => (
              <tr key={item.id}>
                <td className="capitalize">{item.id}</td>
                <td className="capitalize">
                  {item.first_name} {item.last_name}
                </td>
                <td>${item.salary}</td>
                <td>${item.conveyance}</td>
                <td>${item.medical}</td>
                <td>${item.leave ? item.leave : 0}</td>
                <td>${item.other ? item.other : 0}</td>
                <td>${item.total}</td>
                <td>
                  <div className="btns-group">
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
            {/* {users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td className="capitalize">
                  {user.first_name} {user.last_name}
                </td>
                <td className="capitalize">{user.job_title}</td>

                <td>
                  <div className="btns-group">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdateUser(user.id)}
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(user.id, user.first_name)}
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </section>
  );
  return content;
}
