"use client";
import { useState } from "react";
import Loading from "../Loading";
import { toast } from "react-hot-toast";
import {
  useAddDepartmentMutation,
  useGetSlingleDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../../redux/departments/departmentSlice";
import Modal from "../apstracts/Modal";
export default function EditDepartmentFrom({ departmentId }) {
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [leader, setLeader] = useState("");
  const [addDepartment, { isLoading }] = useAddDepartmentMutation();

  if (isLoading) {
    return <Loading />;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      addDepartment({
        name: departmentName,
        leader: leader,
      }).unwrap();
      setDepartmentName("");
      setLeader("");
      setOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <div className="btns-group place-end">
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Add
        </button>
      </div>
      <Modal setOpen={setOpen} open={open} title={"Add Department"}>
        <form className="form" onSubmit={onSubmit}>
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            value={departmentName}
            onChange={({ target }) => setDepartmentName(target.value)}
          />
          <label className="form-label">Leader</label>
          <input
            className="form-control"
            type="text"
            value={leader}
            onChange={({ target }) => setLeader(target.value)}
          />
          <button type="submit" className="btn btn-success form-submit">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}
