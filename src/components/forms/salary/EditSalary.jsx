"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../input";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "../../../redux/users/usersSlice";
// import { useGetDepartmentsQuery } from "../../../redux/departments/departmentSlice";
import {
  useGetSingleUserSalaryQuery,
  useUpdateSalaryMutation,
} from "../../../redux/salary/salarySlice";
import { useForm } from "react-hook-form";
export default function EditSalary({ userId, setOpen, refetch }) {
  const { data: salary, isSuccess } = useGetSingleUserSalaryQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const { data: user } = useGetSingleUserQuery(userId);
  const [updateSalary] = useUpdateSalaryMutation();
  // React hook from
  const salaryObj = useMemo(
    () => ({
      salary: salary?.salary,
      conveyance: salary?.conveyance,
      medical: salary?.medical,
      leave: salary?.leave,
      tax: salary?.tax,
      other: salary?.other,
    }),
    [
      salary?.salary,
      salary?.conveyance,
      salary?.medical,
      salary?.leave,
      salary?.tax,
      salary?.other,
    ]
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: salaryObj,
  });
  useEffect(() => {
    // setValue("userId", user?.first_name);
    reset(salaryObj);
  }, [reset, salaryObj]);

  const onSubmit = async (data) => {
    updateSalary({
      id: userId,
      salary: data.salary,
    })
      .unwrap()
      .then(() => {
        toast.success(`Salary has been updated!`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data);
      })
      .finally(() => {
        refetch();
      });
    // updateSalaryUser
    updateUser({ ...user, salary: data.salary }).unwrap();
    reset();
    setOpen(false);
  };

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
                key={inp.name}
                register={register}
                label={inp.name}
                type={inp.type}
                required={inp.required}
                error={errors.hasOwnProperty(inp.name)}
              />
            </div>
          );
        })}
      </div>
      <button type="submit" className="btn btn-success form-submit">
        Save
      </button>
    </form>
  );
}
