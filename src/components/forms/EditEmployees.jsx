"use client";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { toast } from "react-hot-toast";
import Input from "../forms/input";
import {
  useGetSlingleUserQuery,
  useUpdateUserMutation,
} from "../../redux/users/usersSlice";
import { useGetDepartmentsQuery } from "../../redux/deparments/departmentSlice";
import { useForm } from "react-hook-form";
export default function EditEmployees({ userId, setOpen }) {
  const { data: user } = useGetSlingleUserQuery(userId);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { data: deparments, isSuccess } = useGetDepartmentsQuery();

  // React hook from
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = async (data) => {
    try {
      updateUser({
        id: userId,
        ...data,
      }).unwrap();
      reset();
      setOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      toast.success("Success");
    }
  };
  let selectBox;
  if (isSuccess) {
    selectBox = (
      <select
        className={`form-control ${
          errors.deparmentId && "text-danger border-danger"
        }`}
        {...register("departmentId", { required: true })}
      >
        <option value="">Select Please</option>
        {deparments.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    );
  }
  let canSave = [
    errors.departmentId,
    errors.first_name,
    errors.last_name,
    errors.email,
    errors.password,
    errors.address,
    errors.job_title,
    errors.phone,
    errors.country,
  ].every(Boolean);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <Input
          defaultValue={user?.first_name}
          register={register}
          label={"first_name"}
          required={true}
          error={errors.first_name}
        />
        <Input
          defaultValue={user?.last_name}
          register={register}
          label={"last_name"}
          required={true}
          error={errors.last_name}
        />
        <Input
          defaultValue={user?.email}
          register={register}
          label={"email"}
          required={true}
          error={errors.email}
        />
        <Input
          defaultValue={user?.password}
          register={register}
          label={"password"}
          required={true}
          type={"password"}
          error={errors.password}
        />
        <Input
          defaultValue={user?.address}
          register={register}
          label={"address"}
          required={true}
          error={errors.address}
        />
        <select
          value={user?.gender}
          className={`form-control ${
            errors.deparmentId && "text-danger border-danger"
          }`}
          {...register("gender", { required: true })}
        >
          <option value="">Select Please</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <Input
          defaultValue={user?.job_title}
          register={register}
          label={"job_title"}
          required={true}
          error={errors.job_title}
        />
        <Input
          defaultValue={user?.phone}
          register={register}
          label={"phone"}
          required={true}
          error={errors.phone}
        />
        {selectBox}
        <Input
          defaultValue={user?.country}
          register={register}
          label={"country"}
          required={true}
          error={errors.country}
        />
        <Input
          defaultValue={user?.role}
          register={register}
          label={"role"}
          required={true}
          error={errors.role}
        />
        <Input
          defaultValue={user?.salary}
          register={register}
          label={"salary"}
          required={true}
          type={"number"}
          error={errors.salary}
        />
      </div>
      <button
        disabled={canSave}
        type="submit"
        className="btn btn-success form-submit"
      >
        Save
      </button>
    </form>
  );
}
