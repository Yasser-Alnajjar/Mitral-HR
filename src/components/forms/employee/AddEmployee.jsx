"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../input";
import { useForm } from "react-hook-form";
import { useAddUserMutation } from "../../../redux/users/usersSlice";
import { useGetDepartmentsQuery } from "../../../redux/departments/departmentSlice";
export default function AddEmployee({ setOpen, refetch }) {
  const { data: departments, isSuccess } = useGetDepartmentsQuery();
  const [addUser] = useAddUserMutation();

  // React hook from
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    addUser({
      ...data,
    })
      .unwrap()
      .then(() => {
        toast.success(`${data.first_name} ${data.last_name} has been added!`);
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

  let selectBox;
  if (isSuccess) {
    selectBox = (
      <select
        className={`form-control ${
          errors.department && "text-danger border-danger"
        }`}
        {...register("department", { required: true })}
      >
        <option>Select Please</option>
        {departments.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    );
  }
  let inputs = [
    { name: "first_name", type: "text" },
    { name: "last_name", type: "text" },
    { name: "email", type: "email" },
    { name: "password", type: "password" },
    { name: "address", type: "text" },
    { name: "job_title", type: "text" },
    { name: "phone", type: "text" },
    { name: "country", type: "text" },
    { name: "role", type: "text" },
    { name: "salary", type: "text" },
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
                required={true}
                error={errors.hasOwnProperty(inp.name)}
              />
            </div>
          );
        })}
        <select
          className={`form-control ${
            errors.gender && "text-danger border-danger"
          }`}
          {...register("gender", { required: true })}
        >
          <option value="">Select Please</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {selectBox}
      </div>
      <button type="submit" className="btn btn-success form-submit">
        Save
      </button>
    </form>
  );
}
