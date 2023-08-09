"use client";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import Input from "../forms/input";
import {
  useGetSlingleUserQuery,
  useUpdateUserMutation,
} from "../../redux/users/usersSlice";
import { useGetDepartmentsQuery } from "../../redux/departments/departmentSlice";
import { useForm } from "react-hook-form";
export default function EditDepartmentEmployee({ userId, setOpen, refetch }) {
  const { data: user } = useGetSlingleUserQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const { data: departments, isSuccess } = useGetDepartmentsQuery();

  // React hook from
  const userObj = useMemo(
    () => ({
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      password: user?.password,
      address: user?.address,
      job_title: user?.job_title,
      phone: user?.phone,
      country: user?.country,
      gender: user?.gender,
      role: user?.role,
      salary: user?.salary,
      department: user?.department,
    }),
    [
      user?.first_name,
      user?.last_name,
      user?.email,
      user?.password,
      user?.address,
      user?.job_title,
      user?.phone,
      user?.country,
      user?.gender,
      user?.role,
      user?.salary,
      user?.department,
    ]
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: userObj,
  });
  useEffect(() => {
    reset(userObj);
  }, [reset, userObj]);

  const onSubmit = (data) => {
    updateUser({
      id: userId,
      ...data,
    })
      .unwrap()
      .catch((err) => {
        toast.error(err.data);
      })
      .finally(() => {
        refetch();
        reset();
        setOpen(false);
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
  const inputs = [
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
            <Input
              key={inp.name}
              register={register}
              label={inp.name}
              type={inp.type}
              required={true}
              error={errors.hasOwnProperty(inp.name)}
            />
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
