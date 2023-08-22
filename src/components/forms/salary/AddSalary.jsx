"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../input";
import { useForm } from "react-hook-form";
import {
  selectUserById,
  useGetSingleUserQuery,
  useGetUsersQuery,
} from "../../../redux/users/usersSlice";
import { useAddSalaryMutation } from "../../../redux/salary/salarySlice";
export default function AddSalary({ setOpen, refetch }) {
  const { data: users, isSuccess } = useGetUsersQuery();
  // const { data: user } = useGetSingleUserQuery(userId && userId);
  const [addSalary] = useAddSalaryMutation();
  // React hook from
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const user = data.user.split(" ");

    addSalary({
      id: user[0],
      first_name: user[1],
      last_name: user[2],
      salary: data.salary,
      total: data.salary,
    })
      .unwrap()
      .then(() => {
        toast.success(`Salary has been added!`);
        reset();
        setOpen(false);
      })
      .catch((err) => {
        toast.error("You can't add salary because salary added before");
      });
  };

  let selectBox;
  if (isSuccess) {
    selectBox = (
      <>
        <label htmlFor="selectUser">User</label>
        <select
          id="selectUser"
          className={`form-control ${
            errors.userId && "text-danger border-danger"
          }`}
          {...register("user", { required: true })}
        >
          <option value="">Select Please</option>
          {users.map((item) => (
            <option key={item.id} value={() => ({})}>
              {item.id} {item.first_name} {item.last_name}
            </option>
          ))}
        </select>
      </>
    );
  }
  // let inputs = [{ name: "salary", type: "number", required: true }];
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-container">
        <div>
          <Input
            register={register}
            label={"salary"}
            type={"number"}
            required
            error={errors.salary}
          />
        </div>
        {/*
        // For Testing
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
        })} */}
        <div>{selectBox}</div>
      </div>
      <button type="submit" className="btn btn-warning form-submit">
        Save
      </button>
    </form>
  );
}
