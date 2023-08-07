"use client";

import Card from "../../../components/Card";
import Loading from "../../../components/Loading";
import {
  useGetBranchesQuery,
  useDeleteBranchMutation,
} from "../../../redux/branches/branchesSlice";
import { useState } from "react";
import { toast } from "react-hot-toast";
import EditBranchFrom from "../../../components/forms/EditBranchFrom";
import Modal from "../../../components/apstracts/Modal";
export default function Branches() {
  const [open, setOpen] = useState(false);
  const [branchId, setBranchId] = useState("");
  const [deleteBranch] = useDeleteBranchMutation(branchId && branchId);

  const {
    data: branches,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBranchesQuery();

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isSuccess) {
    content = (
      <section className="branches">
        <Modal open={open} setOpen={setOpen} title="Edit Branch">
          <EditBranchFrom setOpen={setOpen} branchId={branchId} />
        </Modal>
        <div className="add-branch">
          <div className="container">
            <button className="btn btn-primary">Add</button>
          </div>
        </div>
        <div className="container">
          <div className="branches__items">
            {branches.map((item) => (
              <Card key={item.id} title={item.name}>
                <div className="btns-group">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setBranchId(item.id);
                    }}
                    className="btn btn-primary"
                  >
                    More
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBranch(item.id).unwrap()}
                  >
                    Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  } else if (isError) {
    toast.error(error.data);
  }
  return content;
}
