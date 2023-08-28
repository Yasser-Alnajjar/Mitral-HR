"use client";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Modal from "../apstracts/Modal";
import EditEmployees from "../forms/employee/EditEmployees";
import { useState } from "react";
import { useDeleteUserMutation } from "../../redux/users/usersSlice";
import LoadingComponent from "../LoadingComponent";
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
    content = <LoadingComponent />;
  }
  content = (
    <section>
      <Modal open={open} setOpen={setOpen} title="Edit Employee">
        <EditEmployees setOpen={setOpen} userId={id} refetch={refetch} />
      </Modal>
      <div className="table-container">
        <table className="table text-start mt-lg">
          <thead className="table__head">
            <tr className="table__head__tr">
              <th className="table__head__tr__th">#</th>
              <th className="table__head__tr__th">Name</th>
              <th className="table__head__tr__th">Email</th>
              <th className="table__head__tr__th">jop title</th>
              <th className="table__head__tr__th">Gender</th>
              <th className="table__head__tr__th">Phone</th>
              <th className="table__head__tr__th">Address</th>
              <th className="table__head__tr__th">Country</th>
              <th className="table__head__tr__th">Role</th>
              <th className="table__head__tr__th">Actions</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {users.map((user, index) => (
              <tr key={user.id}>
                <td data-label={"#"} className="table__body__tr__td">
                  {index + 1}
                </td>
                <td data-label={"Name"} className="table__body__tr__td">
                  {user.first_name} {user.last_name}
                </td>
                <td data-label={"Email"} className="table__body__tr__td">
                  {user.email}
                </td>
                <td
                  data-label={"Jop Title"}
                  className="capitalize table__body__tr__td"
                >
                  {user.job_title}
                </td>
                <td
                  data-label={"Gender"}
                  className="capitalize table__body__tr__td"
                >
                  {user.gender}
                </td>
                <td
                  data-label={"Phone"}
                  className="capitalize table__body__tr__td"
                >
                  {user.phone}
                </td>
                <td
                  data-label={"Address"}
                  className="capitalize table__body__tr__td"
                >
                  {user.address}
                </td>
                <td
                  data-label={"Country"}
                  className="capitalize table__body__tr__td"
                >
                  {user.country}
                </td>
                <td
                  data-label={"Role"}
                  className="capitalize table__body__tr__td"
                >
                  {user.role}
                </td>
                <td
                  data-label={"Actions"}
                  className="capitalize table__body__tr__td"
                >
                  <div className="btns-group place-end">
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
  return content;
}
