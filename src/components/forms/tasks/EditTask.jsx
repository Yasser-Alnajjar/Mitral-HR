"use client";
import { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import Input from "../input";
import { useForm } from "react-hook-form";

import { useGetUsersQuery } from "../../../redux/users/usersSlice";
import {
  useGetSlingleTaskQuery,
  useUpdateTaskMutation,
} from "../../../redux/tasks/tasksSlice";

export default function EditTask({ taskId, setOpen }) {
  const { data: task } = useGetSlingleTaskQuery(taskId);
  const { data: users, isSuccess, isError, error } = useGetUsersQuery();
  const [updateTask] = useUpdateTaskMutation(taskId);
  // React hook from
  console.log(task);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // Restore default values
  useEffect(() => {
    reset(task);
  }, [reset, task]);
  const onSubmit = async (data) => {
    const employee = data.employee.split(" ");
    updateTask({
      id: taskId,
      employee: `${employee[0]} ${employee[1]}`,
      title: data.title,
      from: data.from,
      to: data.to,
      description: data.description,
    })
      .unwrap()
      .then(() => {
        toast.success(`${data.title} Task has been Updated!`);
        reset();
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.data);
      });
  };

  let inputs = [
    { name: "title", type: "text" },
    { name: "from", type: "date" },
    { name: "to", type: "date" },
  ];

  let content;
  if (isSuccess) {
    content = (
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container">
          <div>
            <select
              className="form-select"
              {...register("employee", {
                required: "Invalid user pls select!",
              })}
            >
              <option value={""}>Select User</option>
              {users.map((user) => (
                <option key={user.id} value={() => ({})}>
                  {user.first_name} {user.last_name}
                </option>
              ))}
            </select>
          </div>
          {inputs.map((inp) => {
            return (
              <div key={inp.name}>
                <Input
                  register={register}
                  label={inp.name}
                  type={inp.type}
                  error={errors.hasOwnProperty(inp.name)}
                />
              </div>
            );
          })}
        </div>
        <textarea
          className="form-textarea"
          {...register("description", {
            required: "Invalid description pls try again!",
          })}
        ></textarea>
        <button type="submit" className="btn btn-warning form-submit">
          Save
        </button>
      </form>
    );
  }
  if (isError) {
    toast.error(error.data);
  }
  return content;
}
