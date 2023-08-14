"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../input";
import { useForm } from "react-hook-form";
import { useGetUsersQuery } from "../../../redux/users/usersSlice";
import {
  useAddSalaryMutation,
  useUpdateSalaryMutation,
} from "../../../redux/salary/salarySlice";
export default function AddSalary({ setOpen, refetch }) {
  const { data: users, isSuccess } = useGetUsersQuery();
  const [updateSalary] = useUpdateSalaryMutation();

  // React hook from
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    updateSalary({
      id: data.userId,
      ...data,
      leave: Math.ceil((data.salary / 30) * data.leave),
    })
      .unwrap()
      .then(() => {
        toast.success(`Salary has been added!`);
        reset();
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.data);
      })
      .finally(() => {
        refetch();
      });
  };
  useEffect(() => {
    setValue("tax", "2%");
  }, [setValue]);
  let selectBox;
  if (isSuccess) {
    selectBox = (
      <select
        className={`form-control ${
          errors.userId && "text-danger border-danger"
        }`}
        {...register("userId", { required: true })}
      >
        <option value="">Select Please</option>
        {users.map((item) => (
          <option key={item.id} value={item.id}>
            {item.first_name} {item.last_name}
          </option>
        ))}
      </select>
    );
  }
  let inputs = [
    { name: "salary", type: "number", required: true },
    { name: "conveyance", type: "number", required: true },
    { name: "medical", type: "number", required: true },
    { name: "leave", type: "number", required: true },
    { name: "other", type: "number", required: false },
  ];
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        {inputs.map((inp) => {
          return (
            <div key={inp.name}>
              <Input
                register={register}
                label={inp.name}
                type={inp.type}
                required={inp.required}
                error={errors.hasOwnProperty(inp.name)}
              />
            </div>
          );
        })}
        {selectBox}
      </div>
      <button type="submit" className="btn btn-success form-submit">
        Save
      </button>
    </form>
  );
}
