"use client";
import { useState } from "react";
import LoadingComponent from "../../LoadingComponent";
import { toast } from "react-hot-toast";
import { useAddDepartmentMutation } from "../../../redux/departments/departmentSlice";
import Modal from "../../apstracts/Modal";
import Input from "../input";
import { useForm } from "react-hook-form";

export default function AddDepartmentFrom({ refetch }) {
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [leader, setLeader] = useState("");
  const [addDepartment, { isLoading }] = useAddDepartmentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    addDepartment({ ...data })
      .unwrap()
      .then(() => {
        setDepartmentName("");
        setLeader("");
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.data);
      })
      .finally(() => {
        refetch();
        reset();
      });
  };
  return (
    <div>
      <div className="btns-group place-end">
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Add
        </button>
      </div>
      <Modal setOpen={setOpen} open={open} title={"Add Department"}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Input label={"name"} register={register} error={errors.name} />
          <Input label={"leader"} register={register} error={errors.Leader} />

          <button type="submit" className="btn btn-warning form-submit">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}
