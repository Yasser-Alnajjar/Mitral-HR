"use client";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Modal from "../apstracts/Modal";
import EditEmployees from "../forms/EditEmployees";
import { useState } from "react";

export default function Table({ users }) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const handleUpdateUser = async (id) => {
    setOpen(true);
    setId(id);
  };
  let content = (
    <section>
      <Modal open={open} setOpen={setOpen} title="Edit Branch">
        <EditEmployees setOpen={setOpen} userId={id} />
      </Modal>
      <div className="table-container">
        <table className="table">
          <thead className="table__head">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job_title</th>
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
                <td>{index + 1}</td>
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
                    <button className="btn btn-danger">
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
