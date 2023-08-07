"use client";
import {
  useGetSlingleBranchQuery,
  useUpdateBranchMutation,
} from "../../redux/branches/branchesSlice";
import { useState } from "react";
import Loading from "../Loading";
import { toast } from "react-hot-toast";
export default function EditBranchFrom({ branchId, setOpen }) {
  const { data: branch } = useGetSlingleBranchQuery(branchId);
  const [branchName, setBranchName] = useState(branch && branch?.name);
  const [updateBranch, { isLoading }] = useUpdateBranchMutation();
  if (isLoading) {
    return <Loading />;
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      updateBranch({ id: branchId, name: branchName }).unwrap();
      setBranchName("");
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
        defaultValue={branch?.name}
        value={branchName}
        onChange={({ target }) => setBranchName(target.value)}
      />
      <button type="submit" className="btn btn-success form-submit">
        Save
      </button>
    </form>
  );
}
