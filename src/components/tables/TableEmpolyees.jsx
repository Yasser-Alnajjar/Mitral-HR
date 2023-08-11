"use client";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Modal from "../apstracts/Modal";
import EditEmployees from "../forms/employee/EditEmployees";
import { useState } from "react";
import { useDeleteUserMutation } from "../../redux/users/usersSlice";
import Loading from "../Loading";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
export default function Table({ users, refetch }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [deleteUser, { isLoading }] = useDeleteUserMutation(id);
  const handleUpdateUser = async (id) => {
    setOpen(true);
    setId(id);
  };
  const handleDeleteUser = async (id, name) => {
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
        deleteUser(id)
          .unwrap()
          .then(() => {
            toast.success(`${name}, has been deleted!`);
            refetch();
          })
          .catch((err) => {
            toast.error(err.data);
          });
      }
    });
  };
  let content;
  if (isLoading) {
    content = <Loading />;
  }
  content = (
    <section>
      <Modal open={open} setOpen={setOpen} title="Edit Branch">
        <EditEmployees setOpen={setOpen} userId={id} refetch={refetch} />
      </Modal>
      <div className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job title</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Country</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.email}</td>
                <td>{user.job_title}</td>
                <td>{user.gender}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.country}</td>
                <td>{user.role}</td>
                <td>{user.salary}</td>
                <td>
                  <div className="btns-group">
                    <button
                      className="btn btn-success"
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
  return content;
}
