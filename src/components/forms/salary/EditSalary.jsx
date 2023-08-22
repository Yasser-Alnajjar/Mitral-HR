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
  useGetSingleSalaryQuery,
  useUpdateSalaryMutation,
} from "../../../redux/salary/salarySlice";
import { useForm } from "react-hook-form";
export default function EditSalary({ userId, setOpen, refetch }) {
  const { data: salary } = useGetSingleSalaryQuery(userId);
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
      other: salary?.other ? salary?.other : 0,
      total: salary?.total,
    }),
    [
      salary?.salary,
      salary?.conveyance,
      salary?.medical,
      salary?.leave,
      salary?.other,
      salary?.total,
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
    reset(salaryObj);
  }, [reset, salaryObj]);
  let total;
  const onSubmit = async (data) => {
    const { salary, conveyance, medical, leave, other } = data;
    total = +salary + +conveyance + +medical + +other - +leave;

    updateSalary({
      id: userId,
      first_name: user.first_name,
      last_name: user.last_name,
      salary: data.salary,
      conveyance: data.conveyance,
      medical: data.medical,
      other: data.other,
      leave: Math.ceil((data.salary / 30) * data.leave),
      total,
    })
      .unwrap()
      .then(() => {
        toast.success(`Salary has been updated!`);
        reset();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data);
      })
      .finally(() => {
        refetch();
      });
    // updateSalaryUser
    updateUser({ ...user, salary: total }).unwrap();
  };

  let inputs = [
    { name: "salary", type: "number", required: true },
    { name: "conveyance", type: "number", required: true },
    { name: "medical", type: "number", required: true },
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
        <div>
          <label className={`form-label `} htmlFor="leave">
            Leave (enter number of days to leave)
          </label>
          <input
            className={`form-control  ${
              errors.leave ? "text-danger border-danger" : ""
            }`}
            id={"leave"}
            {...register("leave", { required: true })}
            type={"number"}
          />
        </div>

        <div className="total">
          <span>Total</span>
          {salary?.total}
        </div>
      </div>
      <button type="submit" className="btn btn-warning form-submit">
        Save
      </button>
    </form>
  );
}
