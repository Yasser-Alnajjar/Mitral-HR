"use client";
import { useState, useEffect } from "react";
import LoadingComponent from "../../LoadingComponent";
import { toast } from "react-hot-toast";
import {
  useGetSingleDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../../../redux/departments/departmentSlice";
import { useForm } from "react-hook-form";
import Input from "../input";
export default function EditDepartmentFrom({ departmentId, setOpen, refetch }) {
  const { data: department } = useGetSingleDepartmentQuery(departmentId);

  const [updateDepartment] = useUpdateDepartmentMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    reset(department);
  }, [department, reset]);

  const onSubmit = async (data) => {
    updateDepartment({
      id: departmentId,
      ...data,
    })
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch((err) => {
        console.log(err?.message);
      })
      .finally(() => {
        refetch();
      });
  };
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <Input label={"name"} register={register} error={errors.name} />
      <Input label={"leader"} register={register} error={errors.Leader} />

      <button type="submit" className="btn btn-warning form-submit">
        Save
      </button>
    </form>
  );
}
