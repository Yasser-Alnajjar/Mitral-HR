"use client";
import { useState } from "react";
import Loading from "../Loading";
import { toast } from "react-hot-toast";
import {
  useGetSlingleDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../../redux/deparments/departmentSlice";
export default function EditDepartmentFrom({ departmentId, setOpen }) {
  const { data: department } = useGetSlingleDepartmentQuery(departmentId);
  const [departmentName, setDepartmentName] = useState(
    department && department?.name
  );
  const [leader, setLeader] = useState(department && department?.leader);
  const [updateDepartment, { isLoading }] = useUpdateDepartmentMutation();

  if (isLoading) {
    return <Loading />;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      updateDepartment({
        id: departmentId,
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
    <form className="form" onSubmit={onSubmit}>
      <label className="form-label">Name</label>
      <input
        className="form-control"
        type="text"
        defaultValue={department?.name}
        value={departmentName}
        onChange={({ target }) => setDepartmentName(target.value)}
      />
      <label className="form-label">Leader</label>
      <input
        className="form-control"
        type="text"
        defaultValue={department?.leader}
        value={leader}
        onChange={({ target }) => setLeader(target.value)}
      />
      <button type="submit" className="btn btn-success form-submit">
        Save
      </button>
    </form>
  );
}
